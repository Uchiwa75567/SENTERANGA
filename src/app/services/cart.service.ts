import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, CartState } from '../models/cart.schema';
import { Reservation } from '../models/schema';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'senteranga_cart';
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  // Load cart from localStorage
  private loadCartFromStorage(): void {
    try {
      const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
      if (storedCart) {
        const cartItems: CartItem[] = JSON.parse(storedCart);
        this.cartSubject.next(cartItems);
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      this.cartSubject.next([]);
    }
  }

  // Save cart to localStorage
  private saveCartToStorage(cartItems: CartItem[]): void {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  // Get current cart items
  getCartItems(): CartItem[] {
    return this.cartSubject.value;
  }

  // Get cart observable
  getCart(): Observable<CartItem[]> {
    return this.cart$;
  }

  // Get cart state (items + total)
  getCartState(): CartState {
    const items = this.getCartItems();
    const total = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    return { items, total };
  }

  // Get total number of items in cart
  getCartItemCount(): number {
    return this.getCartItems().reduce((total, item) => total + item.quantity, 0);
  }

  // Add item to cart
  addToCart(product: any, quantity: number = 1): void {
    const currentCart = this.getCartItems();
    const existingItemIndex = currentCart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      // Item already exists, increase quantity
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      const cartItem: CartItem = {
        id: product.id,
        name: product.titre || product.name,
        producer: this.getProducerName(product),
        unitPrice: product.prixParUnite || product.prix || 0,
        unit: product.unite || 'unité',
        quantity: quantity,
        imageUrl: this.getProductImage(product)
      };
      currentCart.push(cartItem);
    }

    this.cartSubject.next([...currentCart]);
    this.saveCartToStorage(currentCart);
  }

  // Remove item from cart
  removeFromCart(itemId: string): void {
    const currentCart = this.getCartItems().filter(item => item.id !== itemId);
    this.cartSubject.next(currentCart);
    this.saveCartToStorage(currentCart);
  }

  // Update item quantity
  updateQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }

    const currentCart = this.getCartItems();
    const itemIndex = currentCart.findIndex(item => item.id === itemId);

    if (itemIndex > -1) {
      currentCart[itemIndex].quantity = quantity;
      this.cartSubject.next([...currentCart]);
      this.saveCartToStorage(currentCart);
    }
  }

  // Clear entire cart
  clearCart(): void {
    this.cartSubject.next([]);
    this.saveCartToStorage([]);
  }

  // Helper methods
  private getProducerName(product: any): string {
    if (product.agriculteurId) {
      // This would normally come from a service call, but for now return the ID
      return product.agriculteurId;
    }
    return product.producer || 'Producteur inconnu';
  }

  private getProductImage(product: any): string {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return product.imageUrl || product.image || '/images/placeholder.png';
  }

  // Reservation methods
  createReservation(product: any, clientInfo: any, quantity: number = 1): Observable<Reservation> {
    const reservation: Reservation = {
      id: `reservation-${Date.now()}`,
      productId: product.id,
      productTitle: product.titre || product.name,
      clientId: clientInfo.id,
      clientName: `${clientInfo.firstName} ${clientInfo.lastName}`,
      clientEmail: clientInfo.email,
      clientPhone: clientInfo.phone,
      agriculteurId: product.agriculteurId,
      quantity: quantity,
      reservationDate: new Date(),
      status: 'active'
    };

    // In a real app, this would be an HTTP call to save to backend
    // For now, we'll simulate it by storing in localStorage
    const reservations = this.getStoredReservations();
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));

    // Create notification for the farmer
    this.createReservationNotification(reservation);

    return new Observable(observer => {
      observer.next(reservation);
      observer.complete();
    });
  }

  getReservationsForFarmer(farmerId: string): Observable<Reservation[]> {
    // In a real app, this would be an HTTP call
    const reservations = this.getStoredReservations()
      .filter(r => r.agriculteurId === farmerId)
      .sort((a, b) => new Date(a.reservationDate).getTime() - new Date(b.reservationDate).getTime()); // Oldest first

    return new Observable(observer => {
      observer.next(reservations);
      observer.complete();
    });
  }

  getReservationsForClient(clientId: string): Observable<Reservation[]> {
    const reservations = this.getStoredReservations()
      .filter(r => r.clientId === clientId)
      .sort((a, b) => new Date(b.reservationDate).getTime() - new Date(a.reservationDate).getTime()); // Newest first

    return new Observable(observer => {
      observer.next(reservations);
      observer.complete();
    });
  }

  private getStoredReservations(): Reservation[] {
    try {
      const stored = localStorage.getItem('reservations');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading reservations:', error);
      return [];
    }
  }

  private createReservationNotification(reservation: Reservation): void {
    // Create a notification for the farmer
    const notification = {
      id: `notification-${Date.now()}`,
      userId: reservation.agriculteurId,
      title: 'Nouvelle réservation',
      message: `${reservation.clientName} a réservé ${reservation.quantity} ${reservation.productTitle}`,
      type: 'reservation',
      read: false,
      createdAt: new Date().toISOString(),
      reservationId: reservation.id
    };

    // Store notification (in a real app, this would be sent to backend)
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }
}