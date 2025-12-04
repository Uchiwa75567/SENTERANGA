export interface PolicyStatCard {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: string;
  color: string;
}

export interface Policy {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'draft' | 'expired';
  startDate: string;
  endDate?: string;
  ministry: string;
  targetAudience: string[];
  keyBenefits: string[];
  requirements: string[];
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
}

export interface PolicyCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  policyCount: number;
}

export interface RecentUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'new' | 'update' | 'extension';
  category: string;
}

export interface ImportantDeadline {
  id: string;
  title: string;
  description: string;
  deadline: string;
  daysLeft: number;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export const policyStatCards: PolicyStatCard[] = [
  {
    id: '1',
    title: 'Politiques Actives',
    value: '24',
    description: 'Politiques agricoles en vigueur',
    icon: '📋',
    color: 'green'
  },
  {
    id: '2',
    title: 'Subventions Disponibles',
    value: '156M FCFA',
    description: 'Montant total des aides',
    icon: '💰',
    color: 'blue'
  },
  {
    id: '3',
    title: 'Échéances Prochaines',
    value: '8',
    description: 'Dans les 30 prochains jours',
    icon: '⏰',
    color: 'orange'
  },
  {
    id: '4',
    title: 'Bénéficiaires',
    value: '12,450',
    description: 'Agriculteurs inscrits',
    icon: '👥',
    color: 'purple'
  }
];

export const policies: Policy[] = [
  {
    id: '1',
    title: 'Programme National d\'Autosuffisance en Riz (PNAR)',
    description: 'Programme visant à atteindre l\'autosuffisance en riz d\'ici 2025 à travers des subventions pour les semences et équipements.',
    category: 'Production',
    status: 'active',
    startDate: '2022-01-01',
    ministry: 'Ministère de l\'Agriculture',
    targetAudience: ['Agriculteurs', 'Producteurs de riz'],
    keyBenefits: [
      'Subvention de 50% sur les semences certifiées',
      'Formation technique gratuite',
      'Accès aux équipements modernes'
    ],
    requirements: [
      'Être agriculteur enregistré',
      'Avoir une superficie minimum de 1 hectare',
      'Participer aux sessions de formation'
    ],
    contactInfo: {
      email: 'pnar@agriculture.sn',
      phone: '+221 33 869 50 50',
      website: 'www.agriculture.gouv.sn/pnar'
    }
  },
  {
    id: '2',
    title: 'Initiative pour la Sécurité Alimentaire (ISA)',
    description: 'Programme de distribution de semences améliorées et d\'intrants agricoles aux populations vulnérables.',
    category: 'Sécurité Alimentaire',
    status: 'active',
    startDate: '2023-03-15',
    endDate: '2024-12-31',
    ministry: 'Ministère de l\'Agriculture',
    targetAudience: ['Petits agriculteurs', 'Populations vulnérables'],
    keyBenefits: [
      'Semences gratuites pour 5 hectares',
      'Intrants agricoles subventionnés',
      'Accompagnement technique'
    ],
    requirements: [
      'Résider dans une zone éligible',
      'Avoir un revenu inférieur au seuil',
      'S\'engager dans les pratiques durables'
    ],
    contactInfo: {
      email: 'isa@agriculture.sn',
      phone: '+221 33 869 51 51'
    }
  },
  {
    id: '3',
    title: 'Programme d\'Appui aux Femmes Rurales (PAFR)',
    description: 'Soutien spécifique aux femmes agricultrices pour l\'accès aux terres et aux financements.',
    category: 'Genre & Inclusion',
    status: 'active',
    startDate: '2021-06-01',
    ministry: 'Ministère de la Femme',
    targetAudience: ['Femmes agricultrices', 'Groupements féminins'],
    keyBenefits: [
      'Accès facilité au crédit agricole',
      'Formation en entrepreneuriat',
      'Soutien à la commercialisation'
    ],
    requirements: [
      'Être femme agricultrice',
      'Avoir un projet viable',
      'Participer aux formations'
    ],
    contactInfo: {
      email: 'pafr@femme.sn',
      phone: '+221 33 823 10 10'
    }
  },
  {
    id: '4',
    title: 'Politique Nationale de Développement Durable (PNDD)',
    description: 'Stratégie nationale pour l\'agriculture durable et la préservation des ressources naturelles.',
    category: 'Environnement',
    status: 'draft',
    startDate: '2024-01-01',
    ministry: 'Ministère de l\'Environnement',
    targetAudience: ['Tous les agriculteurs', 'Organisations professionnelles'],
    keyBenefits: [
      'Subventions pour pratiques durables',
      'Certification environnementale',
      'Accès aux marchés verts'
    ],
    requirements: [
      'Adopter des pratiques agro-écologiques',
      'Participer aux audits environnementaux',
      'Respecter les normes de certification'
    ],
    contactInfo: {
      email: 'pndd@environnement.sn',
      phone: '+221 33 849 20 20',
      website: 'www.environnement.gouv.sn/pndd'
    }
  }
];

export const policyCategories: PolicyCategory[] = [
  {
    id: '1',
    name: 'Production',
    description: 'Politiques liées à la production agricole',
    icon: '🌾',
    policyCount: 8
  },
  {
    id: '2',
    name: 'Commercialisation',
    description: 'Aide à la commercialisation et exportation',
    icon: '📦',
    policyCount: 5
  },
  {
    id: '3',
    name: 'Sécurité Alimentaire',
    description: 'Programmes de sécurité alimentaire',
    icon: '🍽️',
    policyCount: 6
  },
  {
    id: '4',
    name: 'Environnement',
    description: 'Politiques environnementales et durables',
    icon: '🌱',
    policyCount: 3
  },
  {
    id: '5',
    name: 'Genre & Inclusion',
    description: 'Politiques d\'inclusion et égalité',
    icon: '👥',
    policyCount: 4
  },
  {
    id: '6',
    name: 'Financement',
    description: 'Accès au crédit et financement',
    icon: '💰',
    policyCount: 7
  }
];

export const recentUpdates: RecentUpdate[] = [
  {
    id: '1',
    title: 'Extension du PNAR jusqu\'en 2026',
    description: 'Le Programme National d\'Autosuffisance en Riz est prolongé avec un budget supplémentaire de 50 milliards FCFA.',
    date: '2024-12-01',
    type: 'extension',
    category: 'Production'
  },
  {
    id: '2',
    title: 'Nouveau programme de formation digitale',
    description: 'Lancement d\'une plateforme de formation en ligne pour les agriculteurs sur les technologies modernes.',
    date: '2024-11-28',
    type: 'new',
    category: 'Formation'
  },
  {
    id: '3',
    title: 'Mise à jour des critères d\'éligibilité ISA',
    description: 'Modification des seuils de revenus pour une meilleure inclusion des petits agriculteurs.',
    date: '2024-11-25',
    type: 'update',
    category: 'Sécurité Alimentaire'
  },
  {
    id: '4',
    title: 'Partenariat avec la BAD pour le financement agricole',
    description: 'Accord de prêt de 200 millions USD pour soutenir l\'agriculture sénégalaise.',
    date: '2024-11-20',
    type: 'new',
    category: 'Financement'
  }
];

export const importantDeadlines: ImportantDeadline[] = [
  {
    id: '1',
    title: 'Dépôt des dossiers PNAR 2024',
    description: 'Date limite pour soumettre les demandes de subvention rizicole.',
    deadline: '2024-12-15',
    daysLeft: 11,
    priority: 'high',
    category: 'Production'
  },
  {
    id: '2',
    title: 'Renouvellement des cartes professionnelles',
    description: 'Renouvellement obligatoire des cartes d\'agriculteur professionnel.',
    deadline: '2024-12-31',
    daysLeft: 27,
    priority: 'high',
    category: 'Administration'
  },
  {
    id: '3',
    title: 'Soumission des projets PAFR',
    description: 'Date limite pour les projets de femmes agricultrices.',
    deadline: '2025-01-15',
    daysLeft: 42,
    priority: 'medium',
    category: 'Genre & Inclusion'
  },
  {
    id: '4',
    title: 'Audit environnemental annuel',
    description: 'Soumission des rapports d\'audit pour les exploitations certifiées.',
    deadline: '2025-02-01',
    daysLeft: 59,
    priority: 'medium',
    category: 'Environnement'
  },
  {
    id: '5',
    title: 'Déclaration de récoltes 2024',
    description: 'Déclaration obligatoire des volumes de production pour statistiques.',
    deadline: '2025-01-31',
    daysLeft: 58,
    priority: 'low',
    category: 'Statistiques'
  }
];