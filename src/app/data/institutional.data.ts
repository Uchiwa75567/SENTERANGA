import {
  StatCard,
  CropProduction,
  RegionalPerformance,
  CommercialBalance,
  QuickAction,
  SystemAlert,
  NationalObjective,
  KeyIndicator
} from '../models/institutional.schema';

export const statCards: StatCard[] = [
  {
    title: 'Production Totale',
    value: '2.4M tonnes',
    change: '+8% cette année',
    icon: 'ti-plant',
    bgColor: 'bg-[#00843d]',
    textColor: 'text-white'
  },
  {
    title: 'Exploitations Enregistrées',
    value: '45,678',
    change: '+1,250 ce mois',
    icon: 'ti-building',
    bgColor: 'bg-[#ffd100]',
    textColor: 'text-[#006b32]'
  },
  {
    title: 'Volume Commercial',
    value: '₣18.5B',
    change: '+15% ce trimestre',
    icon: 'ti-trending-up',
    bgColor: 'bg-[#e31b23]',
    textColor: 'text-white'
  },
  {
    title: 'Sécurité Alimentaire',
    value: '87%',
    change: 'Objectif: 90%',
    icon: 'ti-shield-check',
    bgColor: 'bg-[#3b82f6]',
    textColor: 'text-white'
  }
];

export const cropProductions: CropProduction[] = [
  { name: 'Mil', production: '850,000 tonnes', change: '+12%', regions: '8 régions', trend: 'up' },
  { name: 'Riz', production: '420,000 tonnes', change: '-3%', regions: '6 régions', trend: 'down' },
  { name: 'Maïs', production: '380,000 tonnes', change: '+8%', regions: '7 régions', trend: 'up' },
  { name: 'Arachides', production: '290,000 tonnes', change: '+15%', regions: '5 régions', trend: 'up' },
  { name: 'Tomates', production: '180,000 tonnes', change: '+22%', regions: '9 régions', trend: 'up' },
  { name: 'Oignons', production: '150,000 tonnes', change: '+5%', regions: '4 régions', trend: 'up' }
];

export const regionalPerformances: RegionalPerformance[] = [
  { region: 'Thiès', exploitations: '8 420', production: '420,000 tonnes', revenus: '₣3.2B', croissance: '+8%' },
  { region: 'Kaolack', exploitations: '7 850', production: '380,000 tonnes', revenus: '₣2.8B', croissance: '+12%' },
  { region: 'Saint-Louis', exploitations: '6 920', production: '350,000 tonnes', revenus: '₣2.5B', croissance: '+5%' },
  { region: 'Diourbel', exploitations: '5 680', production: '290,000 tonnes', revenus: '₣2.1B', croissance: '+15%' },
  { region: 'Fatick', exploitations: '4 920', production: '240,000 tonnes', revenus: '₣1.8B', croissance: '+3%' }
];

export const commercialBalances: CommercialBalance[] = [
  { crop: 'Mil', exports: '₣2.4B', imports: '₣180M', balance: '₣2.22B', balanceColor: 'text-[#16a34a]' },
  { crop: 'Riz', exports: '₣890M', imports: '₣1.2B', balance: '-₣310M', balanceColor: 'text-[#dc2626]' },
  { crop: 'Arachides', exports: '₣1.8B', imports: '₣45M', balance: '₣1.755B', balanceColor: 'text-[#16a34a]' },
  { crop: 'Tomates', exports: '₣650M', imports: '₣120M', balance: '₣530M', balanceColor: 'text-[#16a34a]' }
];

export const quickActions: QuickAction[] = [
  { label: 'Rapports', icon: 'ti-file-text', bgColor: 'bg-[#00843d]', route: '/rapports-gouvernementaux' },
  { label: 'Politiques', icon: 'ti-building-bank', bgColor: 'bg-[#e31b23]', route: '/politiques-agricoles' },
  { label: 'Analyses', icon: 'ti-chart-bar', bgColor: 'bg-[#3b82f6]' },
  { label: 'Exportations', icon: 'ti-ship', bgColor: 'bg-[#ffd100]' },
  { label: 'Subventions', icon: 'ti-gift', bgColor: 'bg-[#9333ea]' },
  { label: 'Formation', icon: 'ti-school', bgColor: 'bg-[#f97316]' }
];

export const systemAlerts: SystemAlert[] = [
  {
    level: 'Haute',
    levelColor: 'text-[#991b1b]',
    message: 'Baisse de production de riz dans la région de Saint-Louis',
    time: 'Il y a 2h',
    icon: 'ti-alert-triangle'
  },
  {
    level: 'Moyenne',
    levelColor: 'text-[#854d0e]',
    message: 'Nouvelle politique d\'exportation d\'arachides approuvée',
    time: 'Il y a 4h',
    icon: 'ti-info-circle'
  },
  {
    level: 'Basse',
    levelColor: 'text-[#166534]',
    message: 'Objectif de sécurité alimentaire atteint à 87%',
    time: 'Il y a 1 jour',
    icon: 'ti-check'
  }
];

export const nationalObjectives: NationalObjective[] = [
  { label: 'Sécurité Alimentaire', current: '87', target: '90', percentage: 97, barColor: 'bg-[#00843d]' },
  { label: 'Exploitations Digitalisées', current: '45,678', target: '50,000', percentage: 91, barColor: 'bg-[#3b82f6]' },
  { label: 'Revenus Agricoles', current: '₣18.5B', target: '₣20B', percentage: 93, barColor: 'bg-[#ffd100]' },
  { label: 'Exportations', current: '₣5.8B', target: '₣7B', percentage: 83, barColor: 'bg-[#e31b23]' }
];

export const keyIndicators: KeyIndicator[] = [
  { label: 'PIB Agricole', value: '₣2.8T', valueColor: 'text-[#00843d]' },
  { label: 'Emplois Créés', value: '125,000', valueColor: 'text-[#00843d]' },
  { label: 'Investissements', value: '₣450B', valueColor: 'text-[#00843d]' },
  { label: 'Subventions', value: '₣180B', valueColor: 'text-[#00843d]' }
];