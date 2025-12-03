import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'marche-agricole',
    loadComponent: () => import('./pages/marketplace/marketplace.component').then(m => m.MarketplaceComponent)
  }
];