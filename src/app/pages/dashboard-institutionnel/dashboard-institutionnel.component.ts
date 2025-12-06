import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import {
  statCards,
  cropProductions,
  regionalPerformances,
  commercialBalances,
  quickActions,
  systemAlerts,
  nationalObjectives,
  keyIndicators
} from '../../data/institutional.data';

@Component({
  selector: 'app-dashboard-institutionnel',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './dashboard-institutionnel.component.html'
})
export class DashboardInstitutionnelComponent {
  statCards = statCards;
  cropProductions = cropProductions;
  regionalPerformances = regionalPerformances;
  commercialBalances = commercialBalances;
  quickActions = quickActions;
  systemAlerts = systemAlerts;
  nationalObjectives = nationalObjectives;
  keyIndicators = keyIndicators;

  selectedPeriod = 'Ce mois';
  selectedRegion = 'Toutes les régions';
}