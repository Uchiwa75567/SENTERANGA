import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cart.schema';
import { formatCurrency, formatUnitPrice, formatCartCount } from '../../utils/cart.formatters';

@Component({
  selector: 'app-cart-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-popup.component.html'
})
export class CartPopupComponent {
  @Input() items: CartItem[] = [];
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() continueShopping = new EventEmitter<void>();
  @Output() checkout = new EventEmitter<void>();
  @Output() updateQuantity = new EventEmitter<{ itemId: string; quantity: number }>();
  @Output() removeItem = new EventEmitter<string>();

  get totalItems(): number {
    return this.items.length;
  }

  get cartTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }

  formatCurrency(amount: number): string {
    return formatCurrency(amount);
  }

  formatUnitPrice(price: number, unit: string): string {
    return formatUnitPrice(price, unit);
  }

  formatCartCount(count: number): string {
    return formatCartCount(count);
  }

  getItemTotal(item: CartItem): number {
    return item.unitPrice * item.quantity;
  }

  onClose(): void {
    this.close.emit();
  }

  onContinueShopping(): void {
    this.continueShopping.emit();
    this.close.emit();
  }

  onCheckout(): void {
    this.checkout.emit();
  }

  incrementQuantity(item: CartItem): void {
    this.updateQuantity.emit({ itemId: item.id, quantity: item.quantity + 1 });
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.updateQuantity.emit({ itemId: item.id, quantity: item.quantity - 1 });
    }
  }

  onRemoveItem(itemId: string): void {
    this.removeItem.emit(itemId);
  }
}