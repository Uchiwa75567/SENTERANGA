import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, TestUser } from '../../services/data.service';
import { CartService } from '../../services/cart.service';

// Product coming from API has fields like titre, images[], agriculteurId, quantiteMinimale, prixParUnite, unite, localisation
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  producerName: string | null = null;

  constructor(private dataService: DataService, private cartService: CartService) {}

  ngOnInit(): void {
    if (this.product && this.product.agriculteurId) {
      this.dataService.getTestUsers().subscribe(users => {
        const u = (users || []).find((x: TestUser) => x.id === this.product.agriculteurId);
        this.producerName = u ? `${u.firstName} ${u.lastName}` : this.product.agriculteurId;
      }, err => {
        console.error('Failed to load producer name', err);
      });
    }
  }

  // helper to get first image url/base64
  getImage(): string {
    if (!this.product) return '';
    if (Array.isArray(this.product.images) && this.product.images.length > 0) return this.product.images[0];
    // fallback: maybe product.image or product.photo
    return this.product.image || this.product.photo || '';
  }

  // Check if product is an announcement
  isAnnouncement(): boolean {
    return this.product?.isAnnonce === true;
  }

  // Check if announcement is available (validated and within date range)
  isAnnouncementAvailable(): boolean {
    if (!this.isAnnouncement()) return false;

    // Must be validated by admin
    if (this.product?.statutAnnonce !== 'validee') return false;

    // Check if current date is within the availability period
    const now = new Date();
    const startDate = this.product?.periodeApproximativeDebut ? new Date(this.product.periodeApproximativeDebut) : null;
    const endDate = this.product?.periodeApproximativeFin ? new Date(this.product.periodeApproximativeFin) : null;

    if (!startDate || !endDate) return false;

    return now >= startDate && now <= endDate;
  }

  // Get the appropriate button text
  getButtonText(): string {
    if (this.isAnnouncement() && !this.isAnnouncementAvailable()) {
      return 'Réservation';
    }
    return 'Ajouter au panier';
  }

  // Check if button should be disabled
  isButtonDisabled(): boolean {
    if (this.isAnnouncement() && !this.isAnnouncementAvailable()) {
      return false; // Reservation button is always enabled
    }
    // For regular products, check availability
    return this.product?.statutDisponibilite === 'vendu' || this.product?.statutValidation !== 'validé';
  }

  // Add product to cart or create reservation
  addToCart(): void {
    if (this.product && !this.isButtonDisabled()) {
      if (this.isAnnouncement() && !this.isAnnouncementAvailable()) {
        // Create reservation for announcement
        this.createReservation();
      } else {
        // Add to cart for regular product
        this.cartService.addToCart(this.product, 1);
        console.log('Produit ajouté au panier:', this.product.titre || this.product.name);
      }
    }
  }

  private createReservation(): void {
    // Get current user info from localStorage
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      alert('Vous devez être connecté pour faire une réservation.');
      return;
    }

    this.cartService.createReservation(this.product, currentUser, 1).subscribe({
      next: (reservation) => {
        console.log('Réservation créée:', reservation);
        alert(`Réservation créée avec succès pour "${this.product.titre || this.product.name}"`);
      },
      error: (error) => {
        console.error('Erreur lors de la création de la réservation:', error);
        alert('Erreur lors de la création de la réservation. Veuillez réessayer.');
      }
    });
  }

  private getCurrentUser(): any {
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  }
}