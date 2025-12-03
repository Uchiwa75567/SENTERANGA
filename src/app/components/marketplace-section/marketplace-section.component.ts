import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MarketplaceCategory } from '../../models/schema';

@Component({
  selector: 'app-marketplace-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './marketplace-section.component.html'
})
export class MarketplaceSectionComponent {
  @Input() categories!: MarketplaceCategory[];
}