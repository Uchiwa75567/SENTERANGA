import { ProductType, UserRole, ForumCategory, SenegalRegion, CertificationType } from './enums';

// Props types (data passed to components)
export interface HeroStats {
  producers: number;
  tonnage: number;
  regions: number;
}

export interface MarketplaceCategory {
  id: string;
  name: string;
  type: ProductType;
  imageUrl: string;
}

export interface ActorCard {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
}

export interface ForumPost {
  id: string;
  author: {
    name: string;
    role: string;
    location?: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: Date;
  stats: {
    views: number;
    comments: number;
    upvotes: number;
  };
}

export interface ForumSidebarCategory {
  name: string;
  subcategories: string[];
}

// Query types (API response data)
export interface Product {
  id: string;
  nom: string;
  categorie: string;
  type: ProductType;
  prix: number;
  unite: string;
  quantiteDisponible: number;
  producteur: {
    nom: string;
    region: SenegalRegion;
  };
  certification?: CertificationType[];
  imageUrl: string;
}

export interface Discussion {
  id: string;
  titre: string;
  categorie: ForumCategory;
  auteur: {
    id: string;
    nom: string;
    role: UserRole;
  };
  contenu: string;
  dateCreation: Date;
  tags: string[];
  stats: {
    vues: number;
    reponses: number;
    votes: number;
  };
}

export interface User {
  id: string;
  nom: string;
  prenom: string;
  role: UserRole;
  region: SenegalRegion;
  email: string;
  telephone: string;
  verified: boolean;
  dateInscription: Date;
}