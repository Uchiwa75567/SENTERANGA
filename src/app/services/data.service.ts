import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Region {
  id: string;
  name: string;
  departements: string[];
}

export interface UserType {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredFields: string[];
  dashboard: string;
}

export interface ClientType {
  id: string;
  name: string;
  description: string;
}

export interface InvestorType {
  id: string;
  name: string;
  description: string;
}

export interface Ministry {
  id: string;
  name: string;
}

export interface TestUser {
  id: string;
  email: string;
  password: string;
  userType: string;
  firstName: string;
  lastName: string;
  phone: string;
  region?: string;
  department?: string;
  village?: string;
  clientType?: string;
  investorType?: string;
  investmentAmount?: number;
  professionalEmail?: string;
  structure?: string;
  interventionRegions?: string[];
  governmentId?: string;
  ministry?: string;
  agentCode?: string;
  adminCode?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any = null;

  constructor(private http: HttpClient) {}

  loadData(): Observable<any> {
    if (this.data) {
      return of(this.data);
    }
    return this.http.get('/assets/data/senteranga-data.json').pipe(
      map(data => {
        this.data = data;
        return data;
      })
    );
  }

  getRegions(): Observable<Region[]> {
    return this.loadData().pipe(
      map(data => data.regions || [])
    );
  }

  getUserTypes(): Observable<UserType[]> {
    return this.loadData().pipe(
      map(data => data.userTypes || [])
    );
  }

  getClientTypes(): Observable<ClientType[]> {
    return this.loadData().pipe(
      map(data => data.clientTypes || [])
    );
  }

  getInvestorTypes(): Observable<InvestorType[]> {
    return this.loadData().pipe(
      map(data => data.investorTypes || [])
    );
  }

  getMinistries(): Observable<Ministry[]> {
    return this.loadData().pipe(
      map(data => data.ministries || [])
    );
  }

  getStructures(): Observable<string[]> {
    return this.loadData().pipe(
      map(data => data.structures || [])
    );
  }

  getCertifications(): Observable<any[]> {
    return this.loadData().pipe(
      map(data => data.certifications || [])
    );
  }

  getTestUsers(): Observable<TestUser[]> {
    return this.loadData().pipe(
      map(data => data.testUsers || [])
    );
  }

  authenticateUser(telephone: string, password: string): Observable<TestUser | null> {
    // First check localStorage for registered users
    const registeredUsers = this.getRegisteredUsersFromStorage();
    const normalizedPhone = telephone.replace(/^(\+221|221)/, '');
    
    // Check in registered users first
    const registeredUser = registeredUsers.find(u => {
      const userPhone = u.phone.replace(/^(\+221|221)/, '');
      return userPhone === normalizedPhone && u.password === password;
    });
    
    if (registeredUser) {
      return of(registeredUser);
    }
    
    // If not found, check test users from JSON
    return this.getTestUsers().pipe(
      map(users => {
        const user = users.find(u => {
          const userPhone = u.phone.replace(/^(\+221|221)/, '');
          return userPhone === normalizedPhone && u.password === password;
        });
        return user || null;
      })
    );
  }

  registerUser(userData: any): Observable<{ success: boolean, user?: TestUser, error?: string }> {
    // Get existing registered users
    const registeredUsers = this.getRegisteredUsersFromStorage();
    
    // Normalize phone number
    const normalizedPhone = userData.telephone.replace(/^(\+221|221)/, '');
    
    // Check if user already exists
    const existingUser = registeredUsers.find(u => {
      const userPhone = u.phone.replace(/^(\+221|221)/, '');
      return userPhone === normalizedPhone;
    });
    
    if (existingUser) {
      return of({ success: false, error: 'Un compte avec ce numéro de téléphone existe déjà' });
    }
    
    // Create new user
    const newUser: TestUser = {
      id: `user-${Date.now()}`,
      email: userData.email || '',
      password: userData.password,
      userType: userData.userType.id,
      firstName: userData.prenom,
      lastName: userData.nom,
      phone: userData.telephone,
      region: userData.region || undefined,
      department: userData.departement || userData.department || undefined,
      village: userData.village || undefined,
      clientType: userData.clientType || undefined,
      investorType: userData.investorType || undefined,
      investmentAmount: userData.montantInvestissement || undefined,
      professionalEmail: userData.emailPro || undefined,
      structure: userData.structure || undefined,
      interventionRegions: userData.regionsIntervention || undefined,
      governmentId: userData.governmentId || undefined,
      ministry: userData.ministry || undefined,
      agentCode: userData.agentCode || undefined,
      adminCode: userData.adminCode || undefined
    };
    
    // Add to registered users
    registeredUsers.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    return of({ success: true, user: newUser });
  }
  
  private getRegisteredUsersFromStorage(): TestUser[] {
    const stored = localStorage.getItem('registeredUsers');
    return stored ? JSON.parse(stored) : [];
  }

  getDepartementsByRegion(regionId: string): Observable<string[]> {
    return this.getRegions().pipe(
      map(regions => {
        const region = regions.find(r => r.id === regionId);
        return region ? region.departements : [];
      })
    );
  }

  validateUserRegistration(userType: string, formData: any): Observable<{valid: boolean, errors: string[]}> {
    return this.getUserTypes().pipe(
      map(userTypes => {
        const type = userTypes.find(t => t.id === userType);
        if (!type) {
          return { valid: false, errors: ['Type d\'utilisateur invalide'] };
        }

        const errors: string[] = [];

        // Validation des champs requis
        type.requiredFields.forEach(field => {
          if (!formData[field]) {
            errors.push(`Le champ ${field} est requis`);
          }
        });

        // Validations spécifiques
        if (userType === 'agriculteur') {
          if (!formData.region) errors.push('La région est requise');
          if (!formData.departement) errors.push('Le département est requis');
          if (!formData.village) errors.push('Le village est requis');
        }

        if (userType === 'client') {
          if (!formData.clientType) errors.push('Le type de client est requis');
        }

        if (userType === 'investisseur') {
          if (!formData.email || !this.isValidEmail(formData.email)) {
            errors.push('Email invalide');
          }
          if (!formData.investorType) errors.push('Le type d\'investisseur est requis');
          if (!formData.montantInvestissement || formData.montantInvestissement < 100000) {
            errors.push('Montant minimum: 100 000 FCFA');
          }
        }

        if (userType === 'agronome') {
          if (!formData.emailPro || !this.isValidEmail(formData.emailPro)) {
            errors.push('Email professionnel invalide');
          }
          if (!formData.structure) errors.push('La structure est requise');
          if (!formData.regionsIntervention || formData.regionsIntervention.length === 0) {
            errors.push('Au moins une région d\'intervention requise');
          }
        }

        return { valid: errors.length === 0, errors };
      })
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}