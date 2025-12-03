import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCard } from '../../data/marketplace.data';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent {
  @Input() category!: CategoryCard;
}