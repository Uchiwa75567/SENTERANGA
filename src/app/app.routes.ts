import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'marche-agricole',
    loadComponent: () => import('./pages/marketplace/marketplace.component').then(m => m.MarketplaceComponent)
  },
  {
    path: 'marche-elevage',
    loadComponent: () => import('./pages/marketplace-livestock/marketplace-livestock.component').then(m => m.MarketplaceLivestockComponent)
  },
  {
    path: 'marche-peche',
    loadComponent: () => import('./pages/marketplace-fishing/marketplace-fishing.component').then(m => m.MarketplaceFishingComponent)
  },
  {
    path: 'marche-agricole/legumes',
    loadComponent: () => import('./pages/category-vegetables/category-vegetables.component').then(m => m.CategoryVegetablesComponent)
  },
  {
    path: 'marche-agricole/fruits',
    loadComponent: () => import('./pages/category-fruits/category-fruits.component').then(m => m.CategoryFruitsComponent)
  },
  {
    path: 'marche-agricole/cereales',
    loadComponent: () => import('./pages/category-cereals/category-cereals.component').then(m => m.CategoryCerealsComponent)
  },
  {
    path: 'connexion',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'inscription',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard-institutionnel',
    loadComponent: () => import('./pages/dashboard-institutionnel/dashboard-institutionnel.component').then(m => m.DashboardInstitutionnelComponent)
  },
  {
    path: 'dashboard-agriculteur',
    loadComponent: () => import('./pages/dashboard-agriculteur/dashboard-agriculteur.component').then(m => m.DashboardAgriculteurComponent)
  },
  {
    path: 'dashboard-admin',
    loadComponent: () => import('./pages/dashboard-admin/dashboard-admin.component').then(m => m.DashboardAdminComponent)
  },
  {
    path: 'rapports-gouvernementaux',
    loadComponent: () => import('./pages/rapports-gouvernementaux/rapports-gouvernementaux.component').then(m => m.RapportsGouvernementauxComponent)
  },
  {
    path: 'politiques-agricoles',
    loadComponent: () => import('./pages/politiques-agricoles/politiques-agricoles.component').then(m => m.PolitiquesAgricolesComponent)
  }
];