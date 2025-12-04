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
  allProducts = products;
  recentOrders = recentOrders;
  searchQuery = '';
  selectedFilter = 'Tous les types';

  // Carousel indices for each category
  vegetablesIndex = 0;
  fruitsIndex = 0;
  cerealsIndex = 0;

  // Items per page
  itemsPerPage = 3;

  // Get products by category
  get vegetablesProducts() {
    return this.allProducts.filter(p => p.category === 'Légumes');
  }

  get fruitsProducts() {
    return this.allProducts.filter(p => p.category === 'Fruits');
  }

  get cerealsProducts() {
    return this.allProducts.filter(p => p.category === 'Céréales');
  }

  // Get visible products for each category
  get visibleVegetables() {
    return this.vegetablesProducts.slice(this.vegetablesIndex, this.vegetablesIndex + this.itemsPerPage);
  }

  get visibleFruits() {
    return this.fruitsProducts.slice(this.fruitsIndex, this.fruitsIndex + this.itemsPerPage);
  }

  get visibleCereals() {
    return this.cerealsProducts.slice(this.cerealsIndex, this.cerealsIndex + this.itemsPerPage);
  }

  // Navigation methods for Vegetables
  previousVegetables() {
    if (this.vegetablesIndex > 0) {
      this.vegetablesIndex--;
    }
  }

  nextVegetables() {
    if (this.vegetablesIndex + this.itemsPerPage < this.vegetablesProducts.length) {
      this.vegetablesIndex++;
    }
  }

  // Navigation methods for Fruits
  previousFruits() {
    if (this.fruitsIndex > 0) {
      this.fruitsIndex--;
    }
  }

  nextFruits() {
    if (this.fruitsIndex + this.itemsPerPage < this.fruitsProducts.length) {
      this.fruitsIndex++;
    }
  }

  // Navigation methods for Cereals
  previousCereals() {
    if (this.cerealsIndex > 0) {
      this.cerealsIndex--;
    }
  }

  nextCereals() {
    if (this.cerealsIndex + this.itemsPerPage < this.cerealsProducts.length) {
      this.cerealsIndex++;
    }
  }

  // Check if navigation buttons should be disabled
  canGoPreviousVegetables() {
    return this.vegetablesIndex > 0;
  }

  canGoNextVegetables() {
    return this.vegetablesIndex + this.itemsPerPage < this.vegetablesProducts.length;
  }

  canGoPreviousFruits() {
    return this.fruitsIndex > 0;
  }

  canGoNextFruits() {
    return this.fruitsIndex + this.itemsPerPage < this.fruitsProducts.length;
  }

  canGoPreviousCereals() {
    return this.cerealsIndex > 0;
  }

  canGoNextCereals() {
    return this.cerealsIndex + this.itemsPerPage < this.cerealsProducts.length;
  }
}