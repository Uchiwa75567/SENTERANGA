import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../data/marketplace.data';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-card.component.html'
})
export class OrderCardComponent {
  @Input() order!: Order;
  
  getStatusClass(): string {
    switch(this.order.status) {
      case 'Livré': return 'bg-green-100 text-green-800';
      case 'En transit': return 'bg-blue-100 text-blue-800';
      case 'Préparation': return 'bg-yellow-100 text-yellow-800';
      default: return '';
    }
  }
}