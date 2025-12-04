import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { policyStatCards, policies, policyCategories, recentUpdates, importantDeadlines } from '../../data/policies.data';

@Component({
  selector: 'app-politiques-agricoles',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './politiques-agricoles.component.html'
})
export class PolitiquesAgricolesComponent {
  statCards = policyStatCards;
  policies = policies;
  policyCategories = policyCategories;
  recentUpdates = recentUpdates;
  importantDeadlines = importantDeadlines;

  selectedCategory = 'Toutes les catégories';
  selectedStatus = 'Tous les statuts';
}