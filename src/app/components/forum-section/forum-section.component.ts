import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumPost, ForumSidebarCategory } from '../../models/schema';

@Component({
  selector: 'app-forum-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forum-section.component.html'
})
export class ForumSectionComponent {
  @Input() categories!: ForumSidebarCategory[];
  @Input() posts!: ForumPost[];
  
  getRelativeTime(timestamp: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "à l'instant";
    if (diffMins < 60) return `il y'a ${diffMins}min`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `il y'a ${diffHours}h`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `il y'a ${diffDays}j`;
  }
}