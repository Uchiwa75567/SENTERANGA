import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { OrderCardComponent } from '../../components/order-card/order-card.component';
import { fishProducts, seafoodProducts, shellfishProducts } from '../../data/fishing-products.data';
import { recentOrders } from '../../data/marketplace.data';

@Component({
  selector: 'app-marketplace-fishing',
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
  templateUrl: './marketplace-fishing.component.html'
})
export class MarketplaceFishingComponent {
  categoryCards = [
    {
      id: '1',
      name: 'Poissons',
      image: '/images/category-poissons.png',
      link: '/marche-peche/poissons'
    },
    {
      id: '2',
      name: 'Fruits de mer',
      image: '/images/category-fruits-mer.png',
      link: '/marche-peche/fruits-mer'
    },
    {
      id: '3',
      name: 'Coquillages',
      image: '/images/category-coquillages.png',
      link: '/marche-peche/coquillages'
    }
  ];
  
  products = [...fishProducts.slice(0, 3), ...seafoodProducts.slice(0, 3), ...shellfishProducts.slice(0, 3)];
  recentOrders = recentOrders;
  searchQuery = '';
  selectedFilter = 'Tous les types';
}