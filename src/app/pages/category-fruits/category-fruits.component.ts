import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { fruitsProducts } from '../../data/category-products.data';

@Component({
  selector: 'app-category-fruits',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent
  ],
  templateUrl: './category-fruits.component.html'
})
export class CategoryFruitsComponent {
  products = fruitsProducts;
  searchQuery = '';
  selectedFilter = 'Tous les types';
}