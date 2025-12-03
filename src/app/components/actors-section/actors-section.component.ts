import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorCard } from '../../models/schema';

@Component({
  selector: 'app-actors-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actors-section.component.html'
})
export class ActorsSectionComponent {
  @Input() actors!: ActorCard[];
}