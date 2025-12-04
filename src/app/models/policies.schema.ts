// Policies Schema

export interface PolicyStatCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

export interface Policy {
  id: string;
  title: string;
  category: string;
  status: {
    label: string;
    color: string;
    bgColor: string;
  };
  priority: {
    label: string;
    color: string;
    bgColor: string;
  };
  period: string;
  budget: string;
  budgetColor: string;
  beneficiaries: string;
  progression: number;
  progressColor: string;
  lastUpdate: string;
  responsible: string;
}

export interface PolicyCategory {
  name: string;
  count: string;
  countColor: string;
}

export interface RecentUpdate {
  title: string;
  description: string;
  date: string;
  borderColor: string;
}

export interface ImportantDeadline {
  message: string;
  time: string;
  dotColor: string;
}