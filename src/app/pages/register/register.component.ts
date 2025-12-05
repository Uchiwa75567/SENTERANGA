import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService, UserType, Region, ClientType, InvestorType, Ministry } from '../../services/data.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  selectedUserType: UserType | null = null;
  registrationForm!: FormGroup;
  isLoading = false;

  // File previews
  idCardRectoPreview: string | null = null;
  idCardVersoPreview: string | null = null;

  // Data from service
  userTypes: UserType[] = [];
  regions: Region[] = [];
  clientTypes: ClientType[] = [];
  investorTypes: InvestorType[] = [];
  ministries: Ministry[] = [];
  structures: string[] = [];

  // Selected region for departements
  selectedRegionDepartements: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {
    this.registrationForm = this.createForm();
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    // Load user types
    this.dataService.getUserTypes().subscribe(types => {
      this.userTypes = types;
    });

    // Load regions
    this.dataService.getRegions().subscribe(regions => {
      this.regions = regions;
    });

    // Load client types
    this.dataService.getClientTypes().subscribe(types => {
      this.clientTypes = types;
    });

    // Load investor types
    this.dataService.getInvestorTypes().subscribe(types => {
      this.investorTypes = types;
    });

    // Load ministries
    this.dataService.getMinistries().subscribe(ministries => {
      this.ministries = ministries;
    });

    // Load structures
    this.dataService.getStructures().subscribe(structures => {
      this.structures = structures;
    });
  }

  selectUserType(userType: UserType) {
    this.selectedUserType = userType;
    this.registrationForm = this.createForm();
    this.setValidatorsForUserType(userType.id);
  }

  onRegionChange(regionId: string) {
    this.dataService.getDepartementsByRegion(regionId).subscribe(departements => {
      this.selectedRegionDepartements = departements;
      // Reset departement field when region changes
      this.registrationForm.get('departement')?.setValue('');
    });
  }

  onRegionInterventionChange(region: string, event: Event) {
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

  private setValidatorsForUserType(userTypeId: string) {
    // Clear all validators first
    this.clearValidators();

    // ID Card is required for agriculteur, client, agronome, agent-terrain
    if (userTypeId === 'agriculteur' || userTypeId === 'client' || userTypeId === 'agronome' || userTypeId === 'agent-terrain') {
      this.registrationForm.get('idCardRecto')?.setValidators(Validators.required);
      this.registrationForm.get('idCardVerso')?.setValidators(Validators.required);
    }

    // Set validators based on user type
    if (userTypeId === 'agriculteur') {
      this.registrationForm.get('region')?.setValidators(Validators.required);
      this.registrationForm.get('departement')?.setValidators(Validators.required);
      this.registrationForm.get('village')?.setValidators(Validators.required);
    } else if (userTypeId === 'client') {
      this.registrationForm.get('clientType')?.setValidators(Validators.required);
    } else if (userTypeId === 'admin') {
      this.registrationForm.get('adminCode')?.setValidators(Validators.required);
      this.registrationForm.get('department')?.setValidators(Validators.required);
    } else if (userTypeId === 'investisseur') {
      this.registrationForm.get('email')?.setValidators([Validators.required, Validators.email]);
      this.registrationForm.get('investorType')?.setValidators(Validators.required);
      this.registrationForm.get('montantInvestissement')?.setValidators([Validators.required, Validators.min(100000)]);
    } else if (userTypeId === 'agronome') {
      this.registrationForm.get('emailPro')?.setValidators(Validators.email);
      this.registrationForm.get('telephonePro')?.setValidators(Validators.pattern(/^(\+221|221)?[76|77|78|33|70|76|77|78][0-9]{7}$/));
      this.registrationForm.get('structure')?.setValidators(Validators.required);
      this.registrationForm.get('regionsIntervention')?.setValidators(Validators.required);
    } else if (userTypeId === 'agent-terrain') {
      this.registrationForm.get('agentCode')?.setValidators(Validators.required);
      this.registrationForm.get('region')?.setValidators(Validators.required);
      this.registrationForm.get('department')?.setValidators(Validators.required);
    } else if (userTypeId === 'etat') {
      this.registrationForm.get('governmentId')?.setValidators(Validators.required);
      this.registrationForm.get('ministry')?.setValidators(Validators.required);
      this.registrationForm.get('department')?.setValidators(Validators.required);
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
      // ID Card fields (required for agriculteur, client, agronome, agent-terrain)
      idCardRecto: [null],
      idCardVerso: [null],
      // Agriculteur fields
      region: [''],
      departement: [''],
      village: [''],
      // Client fields
      clientType: [''],
      // Admin fields
      adminCode: [''],
      department: [''],
      // Investisseur fields
      email: [''],
      investorType: [''],
      montantInvestissement: [''],
      // Agronome fields
      emailPro: [''],
      telephonePro: [''],
      structure: [''],
      regionsIntervention: [[]],
      // Agent Terrain fields
      agentCode: [''],
      // État fields
      governmentId: [''],
      ministry: ['']
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