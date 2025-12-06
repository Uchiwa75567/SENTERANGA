import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, TestUser } from '../../services/data.service';

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

  constructor(private dataService: DataService) {}

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
}