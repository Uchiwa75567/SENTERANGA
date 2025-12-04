import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { reportStatCards, reports, reportTypes, recentActivities } from '../../data/reports.data';
import { quickActions } from '../../data/institutional.data';

@Component({
  selector: 'app-rapports-gouvernementaux',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './rapports-gouvernementaux.component.html'
})
export class RapportsGouvernementauxComponent {
  statCards = reportStatCards;
  reports = reports;
  reportTypes = reportTypes;
  recentActivities = recentActivities;
  quickActions = quickActions;

  selectedPeriod = 'Cette semaine';
  selectedType = 'Tous les types';
  viewMode: 'list' | 'grid' = 'list';
}