import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryCard } from '../../data/marketplace.data';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent {
  @Input() category!: CategoryCard;
}