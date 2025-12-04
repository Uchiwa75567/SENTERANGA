import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { vegetablesProducts } from '../../data/category-products.data';

@Component({
  selector: 'app-category-vegetables',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent
  ],
  templateUrl: './category-vegetables.component.html'
})
export class CategoryVegetablesComponent {
  products = vegetablesProducts;
  searchQuery = '';
  selectedFilter = 'Tous les types';
}