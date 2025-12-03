import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { OrderCardComponent } from '../../components/order-card/order-card.component';
import { categoryCards, products, recentOrders } from '../../data/marketplace.data';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    CategoryCardComponent,
    OrderCardComponent
  ],
  templateUrl: './marketplace.component.html'
})
export class MarketplaceComponent {
  categoryCards = categoryCards;
  products = products;
  recentOrders = recentOrders;
  searchQuery = '';
  selectedFilter = 'Tous les types';
}