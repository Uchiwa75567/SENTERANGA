import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Use environment file to switch API URL between dev/prod
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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

export interface Product {
  id: string;
  agriculteurId: string;
  titre: string;
  description: string;
  categorie: string;
  quantite: number;
  quantiteMinimale?: number; // quantité minimale à partir de laquelle le produit est vendu
  prix: number;
  prixParUnite?: number; // prix par unité (FCFA par kg/tonne/etc.)
  unite: string; // kg, tonne, etc.
  localisation: string;
  images?: string[]; // base64 or URLs
  statutValidation: 'en_attente' | 'validé' | 'rejeté';
  statutDisponibilite: 'disponible' | 'reservé' | 'vendu';
  datePublication: string;
  dateMaj: string;
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
  // Validation + banking
  isValidated?: boolean;
  validationStatus?: 'pending' | 'approved' | 'rejected';
  bankAccount?: { bankName?: string; accountNumber?: string };
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Base URL for the backend API. Uses `environment.apiUrl` so you can
  // switch between local and production backends by replacing
  // `src/environments/environment.ts` and `environment.prod.ts`.
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.apiUrl}/regions`);
  }

  updateUser(user: TestUser): Observable<TestUser> {
    // Update user record on json-server
    return this.http.put<TestUser>(`${this.apiUrl}/users/${user.id}`, user);
  }

  createNotification(notification: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/notifications`, notification);
  }

  getUserTypes(): Observable<UserType[]> {
    return this.http.get<UserType[]>(`${this.apiUrl}/userTypes`);
  }

  getClientTypes(): Observable<ClientType[]> {
    return this.http.get<ClientType[]>(`${this.apiUrl}/clientTypes`);
  }

  getInvestorTypes(): Observable<InvestorType[]> {
    return this.http.get<InvestorType[]>(`${this.apiUrl}/investorTypes`);
  }

  getMinistries(): Observable<Ministry[]> {
    return this.http.get<Ministry[]>(`${this.apiUrl}/ministries`);
  }

  getStructures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/structures`);
  }

  getCertifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/certifications`);
  }

  getTestUsers(): Observable<TestUser[]> {
    return this.http.get<TestUser[]>(`${this.apiUrl}/users`);
  }

  authenticateUser(telephone: string, password: string): Observable<TestUser | null> {
    // Normalize the phone once
    const normalizedPhone = telephone.replace(/^(\+221|221)/, '');

    // Prefer authoritative source (JSON Server) first to avoid stale local copies
    const registeredUsers = this.getRegisteredUsersFromStorage();

    return this.getTestUsers().pipe(
      map(users => {
        // Try to find user on server
        const userFromServer = users.find(u => {
          const userPhone = (u.phone || '').toString().replace(/^(\+221|221)/, '');
          return userPhone === normalizedPhone && u.password === password;
        });

        if (userFromServer) {
          return userFromServer;
        }

        // Fallback: check locally registered users (client-side registrations)
        const localUser = registeredUsers.find(u => {
          const userPhone = (u.phone || '').toString().replace(/^(\+221|221)/, '');
          return userPhone === normalizedPhone && u.password === password;
        });

        return localUser || null;
      })
    );
  }

  registerUser(userData: any): Observable<{ success: boolean, user?: TestUser, error?: string }> {
    // Normalize phone number
    const normalizedPhone = userData.telephone.replace(/^(\+221|221)/, '');

    // Check if user already exists
    return this.getTestUsers().pipe(
      map(existingUsers => {
        const existingUser = existingUsers.find(u => {
          const userPhone = u.phone.replace(/^(\+221|221)/, '');
          return userPhone === normalizedPhone;
        });

        if (existingUser) {
          return { success: false, error: 'Un compte avec ce numéro de téléphone existe déjà' };
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
          ,
          // New accounts start as pending validation by admin
          isValidated: false,
          validationStatus: 'pending',
          bankAccount: undefined
        };

        // Save to json-server
        this.http.post<TestUser>(`${this.apiUrl}/users`, newUser).subscribe({
          next: (savedUser: TestUser) => {
            console.log('User registered successfully:', savedUser);
          },
          error: (error: any) => {
            console.error('Error saving user:', error);
          }
        });

        return { success: true, user: newUser };
      })
    );
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

  // Announcements (publication)
  createAnnouncement(announcement: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/announcements`, announcement);
  }

  getAnnouncementsByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/announcements?userId=${userId}`);
  }

  // Notifications
  getNotificationsForUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notifications?userId=${userId}&_sort=createdAt&_order=desc`);
  }

  markNotificationRead(notificationId: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/notifications/${notificationId}`, { read: true });
  }

  // Banking (simple simulation saved on user record)
  updateUserBankAccount(userId: string, bankAccount: { bankName: string; accountNumber: string }): Observable<TestUser> {
    return this.http.patch<TestUser>(`${this.apiUrl}/users/${userId}`, { bankAccount });
  }

  // Seeds catalog and orders (simulation)
  getSeedsCatalog(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/seeds`).pipe(
      // If /seeds is missing on the JSON server, return empty array instead of erroring
      catchError(err => {
        console.warn('seeds endpoint missing or error', err);
        return of([]);
      })
    );
  }

  createSeedOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/seedOrders`, order);
  }

  // Agronomist alerts
  getAlertsByRegion(regionId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/agronomeAlerts?region=${regionId}`);
  }

  // Products (marketplace)
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  getProductsByUser(userId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?agriculteurId=${userId}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?categorie=${category}`);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${productId}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${product.id}`, product);
  }

  updateProductStatus(productId: string, status: 'en_attente' | 'validé' | 'rejeté', disponibilite?: string): Observable<Product> {
    const patch: any = { statutValidation: status, dateMaj: new Date().toISOString() };
    if (disponibilite) patch.statutDisponibilite = disponibilite;
    return this.http.patch<Product>(`${this.apiUrl}/products/${productId}`, patch);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/products/${productId}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
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