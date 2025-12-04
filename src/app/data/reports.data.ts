import { Report, ReportType, RecentActivity, StatCard } from '../models/institutional.schema';

export const reportStatCards: StatCard[] = [
  {
    title: 'Rapports Publiés',
    value: '156',
    change: '++12 ce mois',
    icon: 'ti-file-text',
    bgColor: 'bg-[#00843d]',
    textColor: 'text-white'
  },
  {
    title: 'Téléchargements',
    value: '45,230',
    change: '++1,890 ce mois',
    icon: 'ti-download',
    bgColor: 'bg-[#ffd100]',
    textColor: 'text-[#006b32]'
  },
  {
    title: 'Vues Totales',
    value: '128,450',
    change: '++5,670 ce mois',
    icon: 'ti-eye',
    bgColor: 'bg-[#e31b23]',
    textColor: 'text-white'
  },
  {
    title: 'Rapports en Cours',
    value: '8',
    change: '++2 ce mois',
    icon: 'ti-clock',
    bgColor: 'bg-[#3b82f6]',
    textColor: 'text-white'
  }
];

export const reports: Report[] = [
  {
    id: '1',
    title: 'Rapport de Production Nationale',
    status: { label: 'Publié', color: 'text-[#166534]', bgColor: 'bg-[#dcfce7]' },
    category: 'Production',
    date: '2024-01-15',
    downloads: '1250 téléchargements',
    size: '2.4 MB'
  },
  {
    id: '2',
    title: 'Analyse des Exportations Agricoles',
    status: { label: 'En cours', color: 'text-[#854d0e]', bgColor: 'bg-[#fef3c7]' },
    category: 'Commerce',
    date: '2024-01-10',
    downloads: '890 téléchargements',
    size: '3.1 MB'
  },
  {
    id: '3',
    title: 'Évaluation de la Sécurité Alimentaire',
    status: { label: 'Publié', color: 'text-[#166534]', bgColor: 'bg-[#dcfce7]' },
    category: 'Sécurité',
    date: '2024-01-05',
    downloads: '2100 téléchargements',
    size: '5.8 MB'
  },
  {
    id: '4',
    title: 'Impact des Subventions Agricoles',
    status: { label: 'Brouillon', color: 'text-[#1f2937]', bgColor: 'bg-[#f3f4f6]' },
    category: 'Économique',
    date: '2024-01-01',
    downloads: '0 téléchargements',
    size: '1.9 MB'
  }
];

export const reportTypes: ReportType[] = [
  { name: 'Production', count: '45', countColor: 'text-[#166534]' },
  { name: 'Commerce', count: '32', countColor: 'text-[#1e40af]' },
  { name: 'Sécurité', count: '28', countColor: 'text-[#991b1b]' },
  { name: 'Économique', count: '51', countColor: 'text-[#854d0e]' }
];

export const recentActivities: RecentActivity[] = [
  { message: 'Rapport de production publié', time: 'Il y a 2 heures', dotColor: 'bg-[#22c55e]' },
  { message: 'Données d\'exportation mises à jour', time: 'Il y a 4 heures', dotColor: 'bg-[#3b82f6]' },
  { message: 'Nouveau rapport en cours', time: 'Il y a 1 jour', dotColor: 'bg-[#eab308]' }
];