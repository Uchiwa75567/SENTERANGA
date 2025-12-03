import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../data/marketplace.data';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input() product!: Product;
}