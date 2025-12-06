import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DataService, TestUser, Product } from '../../services/data.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-agriculteur',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard-agriculteur.component.html',
  styleUrls: ['./dashboard-agriculteur.component.css']
})
export class DashboardAgriculteurComponent {
  // Data
  products: Product[] = [];
  seeds: any[] = [];
  seedOrderQty: { [key: string]: number } = {};
  alerts: any[] = [];
  currentUser: TestUser | null = null;
  uploadedImageCount = 0;
  selectedImages: File[] = [];
  cameraActive = false;
  stream: MediaStream | null = null;

  // Forms
  productForm!: FormGroup;
  bankForm!: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit() {
    const raw = localStorage.getItem('currentUser');
    this.currentUser = raw ? JSON.parse(raw) : null;

    // Initialize forms
    this.productForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      categorie: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(0)]],
      quantiteMinimale: ['', [Validators.required, Validators.min(0)]],
      // 'prix' removed from form: we compute total price from quantite * prixParUnite
      prixParUnite: ['', [Validators.required, Validators.min(0)]],
      unite: ['', Validators.required],
      localisation: ['', Validators.required]
    });

    this.bankForm = this.fb.group({
      bankName: [''],
      accountNumber: ['']
    });

    this.loadInitial();
  }

  loadInitial() {
    if (!this.currentUser) return;

    // Load user's products
    this.dataService.getProductsByUser(this.currentUser.id).subscribe(list => this.products = list || []);

    // Load seeds catalog
    this.dataService.getSeedsCatalog().subscribe(list => {
      this.seeds = list || [];
      this.seeds.forEach(s => this.seedOrderQty[s.id] = 1);
    });

    // Load alerts filtered by region
    if (this.currentUser.region) {
      this.dataService.getAlertsByRegion(this.currentUser.region).subscribe(list => this.alerts = list || []);
    }

    // Bank info prefill
    if (this.currentUser.bankAccount) {
      this.bankForm.patchValue(this.currentUser.bankAccount);
    }
  }

  // Handle image file selection
  onImagesSelected(event: any) {
    this.selectedImages = Array.from(event.target.files || []);
    this.uploadedImageCount = this.selectedImages.length;
  }

  // Start camera
  startCamera() {
    this.cameraActive = true;
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(mediaStream => {
        this.stream = mediaStream;
        setTimeout(() => {
          const video = document.getElementById('cameraVideo') as HTMLVideoElement;
          if (video) video.srcObject = mediaStream;
        }, 100);
      })
      .catch(err => {
        console.error('Camera error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur d\'accès à la caméra',
          text: 'Vérifiez les permissions de votre navigateur',
          confirmButtonColor: '#22c55e'
        });
        this.cameraActive = false;
      });
  }

  // Capture photo from camera
  capturePhoto() {
    const video = document.getElementById('cameraVideo') as HTMLVideoElement;
    const canvas = document.getElementById('cameraCanvas') as HTMLCanvasElement;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(blob => {
      if (blob) {
        const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
        this.selectedImages.push(file);
        this.uploadedImageCount = this.selectedImages.length;
      }
    }, 'image/jpeg', 0.95);
  }

  // Stop camera
  stopCamera() {
    this.cameraActive = false;
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  // Publish product
  async publishProduct() {
    if (!this.productForm.valid || !this.currentUser) {
      // Identify which controls are invalid to help debugging
      const invalid = Object.keys(this.productForm.controls).filter(k => this.productForm.get(k)?.invalid);
      console.warn('Product form invalid controls:', invalid);
      const names = invalid.length ? invalid.join(', ') : 'inconnus';
      Swal.fire({
        icon: 'warning',
        title: 'Champs obligatoires manquants',
        text: 'Veuillez remplir tous les champs obligatoires. Champs invalides: ' + names,
        confirmButtonColor: '#22c55e'
      });
      return;
    }

    // ⚠️ Check that at least 1 image is selected (MANDATORY)
    if (this.selectedImages.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Image obligatoire',
        text: 'Veuillez importer une photo ou en photographier une avant de publier le produit.',
        confirmButtonColor: '#22c55e'
      });
      console.warn('Image upload required but none selected');
      return;
    }

    // Upload images directly to Cloudinary (with unsigned preset)
    try {
      let uploadedUrls: string[] = [];
      if (this.selectedImages.length) {
        const cloudName = 'djha1kqvu';
        const uploadPreset = 'senteranga_products'; // You'll need to create this preset in Cloudinary

        const uploadUrls = await Promise.all(
          this.selectedImages.map(async (file, index) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', uploadPreset);
            formData.append('folder', 'senteranga_products');

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
              method: 'POST',
              body: formData
            });

            if (!response.ok) {
              throw new Error(`Cloudinary upload failed: ${response.statusText}`);
            }

            const result = await response.json();
            return result.secure_url;
          })
        );
        uploadedUrls = uploadUrls;
      }

      // compute total price from quantity and price per unit
      const q = parseFloat(this.productForm.value.quantite) || 0;
      const ppu = parseFloat(this.productForm.value.prixParUnite) || 0;
      const totalPrice = q * ppu;

      const product: Product = {
        id: `prod-${Date.now()}`,
        agriculteurId: this.currentUser!.id,
        titre: this.productForm.value.titre,
        description: this.productForm.value.description,
        categorie: this.productForm.value.categorie,
        quantite: q,
        quantiteMinimale: parseFloat(this.productForm.value.quantiteMinimale),
        prix: totalPrice,
        prixParUnite: ppu,
        unite: this.productForm.value.unite,
        localisation: this.productForm.value.localisation,
        images: uploadedUrls,
        statutValidation: 'en_attente',
        statutDisponibilite: 'disponible',
        datePublication: new Date().toISOString(),
        dateMaj: new Date().toISOString()
      };

      this.dataService.createProduct(product).subscribe({
        next: (created) => {
          this.products.unshift(created);
          Swal.fire({
            icon: 'success',
            title: 'Produit publié !',
            text: 'Votre produit est en attente de validation par l\'administration.',
            confirmButtonColor: '#22c55e'
          });
          this.resetProductForm();
        },
        error: (err) => {
          console.error('Error publishing product', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur de publication',
            text: 'Une erreur s\'est produite lors de la publication du produit.',
            confirmButtonColor: '#22c55e'
          });
        }
      });
    } catch (err) {
      console.error('Image upload failed', err);
      Swal.fire({
        icon: 'error',
        title: 'Échec de l\'upload',
        text: 'Une erreur s\'est produite lors de l\'upload des images.',
        confirmButtonColor: '#22c55e'
      });
    }
  }

  // Reset product form and image selection
  resetProductForm() {
    this.productForm.reset();
    this.selectedImages = [];
    this.uploadedImageCount = 0;
    this.stopCamera();
  }

  // Convert files to base64
  private convertImagesToBase64(files: File[]): Promise<string[]> {
    return Promise.all(
      files.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      })
    );
  }

  // Bank account save
  saveBankAccount() {
    if (!this.currentUser) return;
    const bank = this.bankForm.value as { bankName?: string; accountNumber?: string };
    const payload = { bankName: bank.bankName || '', accountNumber: bank.accountNumber || '' };
    this.dataService.updateUserBankAccount(this.currentUser.id, payload).subscribe({
      next: (u) => {
        this.currentUser = u;
        localStorage.setItem('currentUser', JSON.stringify(u));
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Compte bancaire enregistré avec succès',
          confirmButtonColor: '#22c55e'
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de l\'enregistrement du compte bancaire',
          confirmButtonColor: '#22c55e'
        });
      }
    });
  }

  // Order seed
  orderSeed(seed: any) {
    if (!this.currentUser) return;
    const qty = this.seedOrderQty[seed.id] || 1;
    const order = {
      id: `order-${Date.now()}`,
      userId: this.currentUser.id,
      seedId: seed.id,
      seedName: seed.name,
      quantity: qty,
      total: (seed.price || 0) * qty,
      status: 'paid',
      createdAt: new Date().toISOString()
    };

    this.dataService.createSeedOrder(order).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Commande passée',
          text: `Commande passée: ${order.seedName} x${qty}`,
          confirmButtonColor: '#22c55e'
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur de commande',
          text: 'Une erreur s\'est produite lors de la commande',
          confirmButtonColor: '#22c55e'
        });
      }
    });
  }
}
