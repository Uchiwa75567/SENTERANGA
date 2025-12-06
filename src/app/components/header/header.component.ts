import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartPopupComponent } from '../cart-popup/cart-popup.component';
import { CartItem } from '../../models/cart.schema';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CartPopupComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCartOpen = false;
  isMobileMenuOpen = false;
  cartItems: CartItem[] = [];
  private cartSubscription: Subscription = new Subscription();

  get cartItemCount(): number {
    return this.cartService.getCartItemCount();
  }

  // Current user info read from localStorage
  currentUser: any = null;
  // Notifications
  notifications: any[] = [];
  showNotifications = false;

  get unreadCount(): number {
    return this.notifications ? this.notifications.filter(n => !n.read).length : 0;
  }

  constructor(private router: Router, private dataService: DataService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    // Listen to storage events to update header across tabs
    window.addEventListener('storage', (ev) => {
      if (ev.key === 'currentUser') this.loadCurrentUser();
    });
    // load notifications if user present
    this.loadNotifications();

    // Subscribe to cart changes
    this.cartSubscription = this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  private loadCurrentUser() {
    try {
      const raw = localStorage.getItem('currentUser');
      this.currentUser = raw ? JSON.parse(raw) : null;
    } catch (e) {
      this.currentUser = null;
    }
    // reload notifications when user changes
    this.loadNotifications();
  }

  loadNotifications() {
    if (!this.currentUser || !this.currentUser.id) {
      this.notifications = [];
      return;
    }

    this.dataService.getNotificationsForUser(this.currentUser.id).subscribe({
      next: (list) => {
        this.notifications = list || [];
      },
      error: (err) => {
        console.error('Error loading notifications', err);
        this.notifications = [];
      }
    });
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  get userDisplayName(): string {
    if (!this.currentUser) return '';
    return `${this.currentUser.firstName || ''} ${this.currentUser.lastName || ''}`.trim();
  }

  goToDashboard(): void {
    if (!this.currentUser) { this.router.navigate(['/connexion']); return; }
    const map: { [key: string]: string } = {
      'agriculteur': '/dashboard-agriculteur',
      'client': '/dashboard-institutionnel',
      'admin': '/dashboard-admin',
      'investisseur': '/dashboard-institutionnel',
      'agronome': '/dashboard-institutionnel',
      'agent-terrain': '/dashboard-institutionnel',
      'etat': '/dashboard-institutionnel'
    };
    const route = map[this.currentUser.userType] || '/';
    this.router.navigate([route]);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.router.navigate(['/']);
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications && this.notifications.length) {
      // mark first page of notifications as read (simulate)
      const unread = this.notifications.filter(n => !n.read).slice(0, 10);
      unread.forEach(n => this.dataService.markNotificationRead(n.id).subscribe());
      // reload after marking
      setTimeout(() => this.loadNotifications(), 300);
    }
  }

  closeCart(): void {
    this.isCartOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  onContinueShopping(): void {
    this.closeCart();
  }

  onCheckout(): void {
    console.log('Proceeding to checkout...');
    // Navigate to checkout page or handle checkout logic
    this.closeCart();
  }

  onUpdateQuantity(event: { itemId: string; quantity: number }): void {
    this.cartService.updateQuantity(event.itemId, event.quantity);
  }

  onRemoveItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }
}