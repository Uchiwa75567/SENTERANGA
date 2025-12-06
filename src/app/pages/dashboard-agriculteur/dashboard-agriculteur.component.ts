import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DataService, TestUser, Product } from '../../services/data.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormsModule, Validators } from '@angular/forms';

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
        alert('Erreur d\'accès à la caméra');
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
      alert('Veuillez remplir tous les champs obligatoires. Champs invalides: ' + names);
      return;
    }

    // ⚠️ Check that at least 1 image is selected (MANDATORY)
    if (this.selectedImages.length === 0) {
      alert('⚠️ Une image est obligatoire !\n\nVeuillez importer une photo ou en photographier une avant de publier le produit.');
      console.warn('Image upload required but none selected');
      return;
    }

    // Upload images via backend upload endpoint
    try {
      let uploadedUrls: string[] = [];
      if (this.selectedImages.length) {
        // Convert images to base64 for upload via backend
        const base64Images = await this.convertImagesToBase64(this.selectedImages);

        const response = await fetch('https://json-server-senteranga.onrender.com/upload-images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ images: base64Images })
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const result = await response.json();
        uploadedUrls = result.uploaded.map((item: any) => item.url);
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
          alert('Produit publié — en attente de validation');
          this.resetProductForm();
        },
        error: (err) => {
          console.error('Error publishing product', err);
          alert('Erreur lors de la publication du produit');
        }
      });
    } catch (err) {
      console.error('Image upload failed', err);
      alert('Échec lors de l\'upload des images');
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
        alert('Compte bancaire enregistré');
      },
      error: (err) => { console.error(err); alert('Erreur lors de l\'enregistrement'); }
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
        alert(`Commande passée: ${order.seedName} x${qty}`);
      },
      error: (err) => { console.error(err); alert('Erreur lors de la commande'); }
    });
  }
}
