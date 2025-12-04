// Institutional Dashboard Schema

export interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

export interface CropProduction {
  name: string;
  production: string;
  change: string;
  regions: string;
  trend: 'up' | 'down';
}

export interface RegionalPerformance {
  region: string;
  exploitations: string;
  production: string;
  revenus: string;
  croissance: string;
}

export interface CommercialBalance {
  crop: string;
  exports: string;
  imports: string;
  balance: string;
  balanceColor: string;
}

export interface QuickAction {
  label: string;
  icon: string;
  bgColor: string;
  route?: string;
}

export interface SystemAlert {
  level: 'Haute' | 'Moyenne' | 'Basse';
  levelColor: string;
  message: string;
  time: string;
  icon: string;
}

export interface NationalObjective {
  label: string;
  current: string;
  target: string;
  percentage: number;
  barColor: string;
}

export interface KeyIndicator {
  label: string;
  value: string;
  valueColor: string;
}

export interface ReportStatus {
  label: string;
  color: string;
  bgColor: string;
}

export interface Report {
  id: string;
  title: string;
  status: ReportStatus;
  category: string;
  date: string;
  downloads: string;
  size: string;
}

export interface ReportType {
  name: string;
  count: string;
  countColor: string;
}

export interface RecentActivity {
  message: string;
  time: string;
  dotColor: string;
}