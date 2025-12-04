import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { OrderCardComponent } from '../../components/order-card/order-card.component';
import { ruminantsProducts, poultryProducts, porkProducts } from '../../data/livestock-products.data';
import { recentOrders } from '../../data/marketplace.data';

@Component({
  selector: 'app-marketplace-livestock',
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
  templateUrl: './marketplace-livestock.component.html'
})
export class MarketplaceLivestockComponent {
  categoryCards = [
    {
      id: '1',
      name: 'Ruminants',
      image: '/images/category-ruminants.png',
      link: '/marche-elevage/ruminants'
    },
    {
      id: '2',
      name: 'Volailles',
      image: '/images/category-volailles.png',
      link: '/marche-elevage/volailles'
    },
    {
      id: '3',
      name: 'Porc',
      image: '/images/category-porc.png',
      link: '/marche-elevage/porc'
    }
  ];
  
  products = [...ruminantsProducts.slice(0, 3), ...poultryProducts.slice(0, 3), ...porkProducts.slice(0, 3)];
  recentOrders = recentOrders;
  searchQuery = '';
  selectedFilter = 'Tous les types';
}