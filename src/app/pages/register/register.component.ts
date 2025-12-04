import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

type UserType = 'agriculteur' | 'client' | 'investisseur' | 'agronome';

interface UserTypeOption {
  value: UserType;
  label: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  selectedUserType: UserType | null = null;
  registrationForm!: FormGroup;
  isLoading = false;

  // File previews
  idCardRectoPreview: string | null = null;
  idCardVersoPreview: string | null = null;

  userTypes: UserTypeOption[] = [
    {
      value: 'agriculteur',
      label: 'Agriculteur/Producteur',
      description: 'Producteurs agricoles, éleveurs, pêcheurs',
      icon: '🌾'
    },
    {
      value: 'client',
      label: 'Client Acheteur',
      description: 'Particuliers, commerçants, grossistes',
      icon: '🛒'
    },
    {
      value: 'investisseur',
      label: 'Investisseur Agricole',
      description: 'Investisseurs particuliers ou entreprises',
      icon: '💰'
    },
    {
      value: 'agronome',
      label: 'Agronome/Conseiller',
      description: 'Conseillers agricoles, techniciens, ONG',
      icon: '👨‍🔬'
    }
  ];

  regions = [
    'Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor',
    'Louga', 'Matam', 'Kolda', 'Tambacounda', 'Fatick',
    'Kaffrine', 'Kédougou', 'Sédhiou', 'Diourbel'
  ];

  clientTypes = [
    { value: 'famille', label: 'Moi / ma famille' },
    { value: 'boutique', label: 'Ma boutique / restaurant' },
    { value: 'commerce', label: 'Mon commerce en gros' }
  ];

  investorTypes = [
    { value: 'particulier', label: 'Particulier' },
    { value: 'entreprise', label: 'Entreprise / Fonds' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registrationForm = this.createForm();
  }

  selectUserType(userType: UserType) {
    this.selectedUserType = userType;
    this.registrationForm = this.createForm();
    this.setValidatorsForUserType(userType);
  }

  private setValidatorsForUserType(userType: UserType) {
    // Clear all validators first
    this.clearValidators();

    // ID Card is required for agriculteur, client, and agronome
    if (userType === 'agriculteur' || userType === 'client' || userType === 'agronome') {
      this.registrationForm.get('idCardRecto')?.setValidators(Validators.required);
      this.registrationForm.get('idCardVerso')?.setValidators(Validators.required);
    }

    // Set validators based on user type
    if (userType === 'agriculteur') {
      this.registrationForm.get('region')?.setValidators(Validators.required);
      this.registrationForm.get('departement')?.setValidators(Validators.required);
      this.registrationForm.get('village')?.setValidators(Validators.required);
    } else if (userType === 'client') {
      this.registrationForm.get('clientType')?.setValidators(Validators.required);
    } else if (userType === 'investisseur') {
      this.registrationForm.get('email')?.setValidators([Validators.required, Validators.email]);
      this.registrationForm.get('investorType')?.setValidators(Validators.required);
      this.registrationForm.get('montantInvestissement')?.setValidators([Validators.required, Validators.min(100000)]);
    } else if (userType === 'agronome') {
      this.registrationForm.get('emailPro')?.setValidators(Validators.email);
      this.registrationForm.get('telephonePro')?.setValidators(Validators.pattern(/^(\+221|221)?[76|77|78|33|70|76|77|78][0-9]{7}$/));
      this.registrationForm.get('structure')?.setValidators(Validators.required);
      this.registrationForm.get('regionsIntervention')?.setValidators(Validators.required);
    }

    // Update validity
    this.registrationForm.updateValueAndValidity();
  }

  private clearValidators() {
    ['idCardRecto', 'idCardVerso', 'region', 'departement', 'village', 'clientType', 'email', 'investorType', 'montantInvestissement', 'emailPro', 'telephonePro', 'structure', 'regionsIntervention'].forEach(field => {
      this.registrationForm.get(field)?.clearValidators();
      this.registrationForm.get(field)?.updateValueAndValidity();
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      userType: [this.selectedUserType],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      telephone: ['', [Validators.required, Validators.pattern(/^(\+221|221)?[76|77|78|33|70|76|77|78][0-9]{7}$/)]],
      // ID Card fields (required for agriculteur, client, agronome)
      idCardRecto: [null],
      idCardVerso: [null],
      // Agriculteur fields
      region: [''],
      departement: [''],
      village: [''],
      // Client fields
      clientType: [''],
      // Investisseur fields
      email: [''],
      investorType: [''],
      montantInvestissement: [''],
      // Agronome fields
      emailPro: [''],
      telephonePro: [''],
      structure: [''],
      regionsIntervention: [[]]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.isLoading = true;
      const formValue = this.registrationForm.value;

      // Simulate registration API call
      setTimeout(() => {
        console.log('Registration attempt:', formValue);
        // For demo purposes, just navigate to login
        this.router.navigate(['/connexion']);
        this.isLoading = false;
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      this.registrationForm.markAllAsTouched();
    }
  }

  goBack() {
    this.selectedUserType = null;
    this.registrationForm = this.createForm();
  }

  onRegionChange(region: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    const currentRegions = this.registrationForm.get('regionsIntervention')?.value || [];
    let updatedRegions: string[];

    if (checked) {
      updatedRegions = [...currentRegions, region];
    } else {
      updatedRegions = currentRegions.filter((r: string) => r !== region);
    }

    this.registrationForm.get('regionsIntervention')?.setValue(updatedRegions);
  }

  isRegionSelected(region: string): boolean {
    const selectedRegions = this.registrationForm.get('regionsIntervention')?.value || [];
    return selectedRegions.includes(region);
  }

  // File handling methods
  onFileChange(event: Event, fieldName: string) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      // Validate file type (images only)
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Veuillez sélectionner un fichier image valide (JPEG, PNG, GIF)');
        target.value = '';
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('La taille du fichier ne doit pas dépasser 5MB');
        target.value = '';
        return;
      }

      // Set file in form
      this.registrationForm.get(fieldName)?.setValue(file);

      // Generate preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        if (fieldName === 'idCardRecto') {
          this.idCardRectoPreview = e.target?.result as string;
        } else if (fieldName === 'idCardVerso') {
          this.idCardVersoPreview = e.target?.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Remove file and preview
  removeFile(fieldName: string) {
    this.registrationForm.get(fieldName)?.setValue(null);

    if (fieldName === 'idCardRecto') {
      this.idCardRectoPreview = null;
      const input = document.getElementById('idCardRecto') as HTMLInputElement;
      if (input) input.value = '';
    } else if (fieldName === 'idCardVerso') {
      this.idCardVersoPreview = null;
      const input = document.getElementById('idCardVerso') as HTMLInputElement;
      if (input) input.value = '';
    }
  }

  // Getters for form controls
  get prenom() { return this.registrationForm.get('prenom'); }
  get nom() { return this.registrationForm.get('nom'); }
  get telephone() { return this.registrationForm.get('telephone'); }
  get idCardRecto() { return this.registrationForm.get('idCardRecto'); }
  get idCardVerso() { return this.registrationForm.get('idCardVerso'); }
  get email() { return this.registrationForm.get('email'); }
  get region() { return this.registrationForm.get('region'); }
  get departement() { return this.registrationForm.get('departement'); }
  get village() { return this.registrationForm.get('village'); }
  get clientType() { return this.registrationForm.get('clientType'); }
  get investorType() { return this.registrationForm.get('investorType'); }
  get montantInvestissement() { return this.registrationForm.get('montantInvestissement'); }
  get emailPro() { return this.registrationForm.get('emailPro'); }
  get telephonePro() { return this.registrationForm.get('telephonePro'); }
  get structure() { return this.registrationForm.get('structure'); }
  get regionsIntervention() { return this.registrationForm.get('regionsIntervention'); }
}