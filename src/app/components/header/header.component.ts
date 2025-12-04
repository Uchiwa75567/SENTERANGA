import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartPopupComponent } from '../cart-popup/cart-popup.component';
import { CartItem } from '../../models/cart.schema';
import { mockCartItems } from '../../data/cart.data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CartPopupComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isCartOpen = false;
  isMobileMenuOpen = false;
  cartItems: CartItem[] = mockCartItems;

  get cartItemCount(): number {
    return this.cartItems.length;
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
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
    const item = this.cartItems.find(i => i.id === event.itemId);
    if (item) {
      item.quantity = event.quantity;
    }
  }

  onRemoveItem(itemId: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }
}