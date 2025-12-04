import { HeroStats, MarketplaceCategory, ActorCard, ForumPost, ForumSidebarCategory } from '../models/schema';

export const heroStats: HeroStats = {
  producers: 500,
  tonnage: 1000,
  regions: 14
};

export const marketplaceCategories: MarketplaceCategory[] = [
  {
    id: '1',
    name: 'Marché Agricol',
    type: 'agricol',
    imageUrl: '/images/marche-agricol.png',
    link: '/marche-agricole'
  },
  {
    id: '2',
    name: 'Marché Élevage',
    type: 'elevage',
    imageUrl: '/images/marche-elevage.png',
    link: '/marche-elevage'
  },
  {
    id: '3',
    name: 'Marché Pêche',
    type: 'peche',
    imageUrl: '/images/marche-peche.png',
    link: '/marche-peche'
  }
];

export const actorCards: ActorCard[] = [
  {
    id: '1',
    title: 'Agriculteurs & Éleveurs',
    description: 'Optimisez vos rendements, accédez aux marchés et bénéficiez de conseils personnalisés pour vos cultures et votre bétail',
    iconUrl: '/icons/agriculteurs-icon.svg'
  },
  {
    id: '2',
    title: 'Pêcheurs',
    description: 'Gérez vos activités de pêche, accédez aux prévisions marines et commercialisez vos produits halieutiques',
    iconUrl: '/icons/pecheurs-icon.svg'
  },
  {
    id: '3',
    title: 'Institutions Étatiques',
    description: 'Pilotez les politiques agricoles, suivez la production nationale et distribuez efficacement les subventions',
    iconUrl: '/icons/institutions-icon.svg'
  },
  {
    id: '4',
    title: 'Industriels & Entreprises',
    description: 'Grandes entreprises, GIE, grossistes et transformateurs : sécurisez vos approvisionnements et développez vos partenariats',
    iconUrl: '/icons/industriels-icon.svg'
  }
];

export const forumCategories: ForumSidebarCategory[] = [
  {
    name: 'Agriculture',
    subcategories: ['Légumes', 'Fruits', 'Céréales']
  },
  {
    name: 'Elevages',
    subcategories: ['Lorem', 'Lorem', 'Lorem']
  },
  {
    name: 'Peche',
    subcategories: ['Lorem', 'Lorem', 'Lorem']
  },
  {
    name: 'Divers',
    subcategories: []
  }
];

export const recentPosts: ForumPost[] = [
  {
    id: '1',
    author: {
      name: 'Modou Fall',
      role: 'Agriculteur',
      location: 'Kaolack',
      avatarUrl: '/images/avatar-1.png'
    },
    content: 'Je viens de rejoindre ce forum et j\'aimerais partager mon expérience. Depuis que j\'utilise une application de marché digital agricole, je vends mes légumes sans passer par les intermédiaires. Les clients commandent directement et je livre dans les zones proches.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    stats: {
      views: 125,
      comments: 15,
      upvotes: 155
    }
  },
  {
    id: '2',
    author: {
      name: 'Ibrahima Ba',
      role: 'Pêcheur',
      avatarUrl: '/images/avatar-2.png'
    },
    content: 'Bonjour à tous,  Dans la pêche, c\'est pareil 🎣. Grâce au numérique, je trouve des acheteurs avant même d\'accoster.  Le seul problème, c\'est la connexion internet. En mer, on perd souvent le réseau, donc impossible d\'actualiser les stocks en temps réel.',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    stats: {
      views: 125,
      comments: 15,
      upvotes: 155
    }
  },
  {
    id: '3',
    author: {
      name: 'Ibrahima Ba',
      role: 'Pêcheur',
      avatarUrl: '/images/avatar-2.png'
    },
    content: '',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    stats: {
      views: 125,
      comments: 15,
      upvotes: 155
    }
  }
];