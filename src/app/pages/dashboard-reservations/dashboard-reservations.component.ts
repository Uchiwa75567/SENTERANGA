import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartService } from '../../services/cart.service';
import { Reservation } from '../../models/schema';

@Component({
  selector: 'app-dashboard-reservations',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './dashboard-reservations.component.html',
  styleUrls: ['./dashboard-reservations.component.css']
})
export class DashboardReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  currentUser: any = null;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    const raw = localStorage.getItem('currentUser');
    this.currentUser = raw ? JSON.parse(raw) : null;

    if (this.currentUser) {
      this.loadReservations();
    }
  }

  loadReservations() {
    if (!this.currentUser) return;

    this.cartService.getReservationsForClient(this.currentUser.id).subscribe(list => {
      this.reservations = list || [];
    });
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active': return 'En attente';
      case 'fulfilled': return 'Acceptée';
      case 'cancelled': return 'Refusée';
      default: return 'Inconnu';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'bg-yellow-100 text-yellow-800';
      case 'fulfilled': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  // Getters for statistics
  get activeReservationsCount(): number {
    return this.reservations.filter(r => r.status === 'active').length;
  }

  get fulfilledReservationsCount(): number {
    return this.reservations.filter(r => r.status === 'fulfilled').length;
  }

  get cancelledReservationsCount(): number {
    return this.reservations.filter(r => r.status === 'cancelled').length;
  }
}