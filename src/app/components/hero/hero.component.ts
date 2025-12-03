import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroStats } from '../../models/schema';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  @Input() stats!: HeroStats;
}