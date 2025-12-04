# Senteranga - Plateforme Agricole Sénégalaise

## 📋 Vue d'ensemble

Senteranga est une plateforme digitale de marché agricole conçue spécifiquement pour le Sénégal. Elle connecte les agriculteurs, éleveurs, pêcheurs et autres acteurs de la chaîne agricole sénégalaise avec les acheteurs, industriels et institutions.

### 🎯 Objectif
Faciliter le commerce agricole au Sénégal en digitalisant les échanges entre producteurs et acheteurs, tout en offrant des outils d'accompagnement et une communauté d'échange.

## 🛠️ Stack Technique

### Technologies Principales
- **Framework**: Angular 17 (Standalone Components)
- **Langage**: TypeScript 5.2
- **Styling**: Tailwind CSS 3.4
- **Routing**: Angular Router
- **Forms**: Reactive Forms
- **Build Tool**: Angular CLI 17

### Dépendances Clés
- `@angular/core`: Framework Angular
- `@angular/router`: Gestion du routing
- `@angular/forms`: Gestion des formulaires réactifs
- `rxjs`: Programmation réactive
- `tailwindcss`: Framework CSS utilitaire
- `autoprefixer` & `postcss`: Traitement CSS

## 🏗️ Architecture du Projet

### Structure des Dossiers
```
src/
├── app/
│   ├── components/          # Composants réutilisables
│   │   ├── header/         # En-tête de navigation
│   │   ├── footer/         # Pied de page
│   │   ├── hero/           # Section héros
│   │   ├── marketplace-section/  # Section marchés
│   │   ├── actors-section/       # Section acteurs
│   │   ├── forum-section/        # Section forum
│   │   ├── product-card/         # Carte produit
│   │   ├── category-card/        # Carte catégorie
│   │   ├── order-card/           # Carte commande
│   │   └── jokko-chat/           # Chat IA
│   ├── pages/              # Pages principales
│   │   ├── landing/        # Page d'accueil
│   │   ├── marketplace/    # Marché agricole général
│   │   ├── marketplace-fishing/   # Marché pêche
│   │   ├── marketplace-livestock/ # Marché élevage
│   │   ├── category-vegetables/   # Catégorie légumes
│   │   ├── category-fruits/       # Catégorie fruits
│   │   ├── category-cereals/      # Catégorie céréales
│   │   ├── login/          # Connexion
│   │   └── register/       # Inscription
│   ├── data/               # Données statiques
│   │   ├── landing-page.data.ts
│   │   ├── marketplace.data.ts
│   │   ├── category-products.data.ts
│   │   ├── fishing-products.data.ts
│   │   └── livestock-products.data.ts
│   ├── models/             # Modèles de données
│   │   ├── schema.ts       # Interfaces TypeScript
│   │   └── enums.ts        # Énumérations
│   ├── app.component.ts    # Composant racine
│   ├── app.routes.ts       # Configuration des routes
│   └── styles.css          # Styles globaux
├── public/                 # Assets statiques
│   ├── icons/             # Icônes SVG
│   └── images/            # Images des produits
├── index.html             # Template HTML principal
├── main.ts               # Point d'entrée Angular
└── styles.css            # Styles globaux
```

## 📊 Modèles de Données

### Interfaces Principales

#### Utilisateur (`User`)
```typescript
interface User {
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
```

#### Produit (`Product`)
```typescript
interface Product {
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
```

#### Discussion Forum (`Discussion`)
```typescript
interface Discussion {
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
```

### Énumérations

#### Rôles Utilisateur (`UserRole`)
- `agriculteur` - Agriculteur/Producteur
- `eleveur` - Éleveur
- `pecheur` - Pêcheur
- `industriel` - Industriel/Entreprise
- `institution` - Institution étatique

#### Types de Produit (`ProductType`)
- `agricol` - Produits agricoles
- `elevage` - Produits d'élevage
- `peche` - Produits de pêche

#### Régions du Sénégal (`SenegalRegion`)
Liste complète des 14 régions administratives du Sénégal.

## 🎨 Composants

### Composants Réutilisables

#### HeaderComponent
- Navigation principale
- Logo Senteranga
- Menu responsive

#### FooterComponent
- Liens de navigation
- Informations de contact
- Liens légaux

#### ProductCardComponent
- Affichage des produits
- Prix, quantité, producteur
- Bouton d'ajout au panier

#### CategoryCardComponent
- Cartes de catégories (Légumes, Fruits, Céréales)
- Navigation vers les sous-catégories

#### JokkoChatComponent
- Chat IA intégré
- Assistance utilisateur
- Interface flottante

### Composants de Section

#### HeroComponent
- Section d'accueil avec statistiques
- Call-to-action principal

#### MarketplaceSectionComponent
- Présentation des marchés (Agricole, Élevage, Pêche)
- Navigation vers les marketplaces

#### ActorsSectionComponent
- Présentation des acteurs de la plateforme
- Rôles et descriptions

#### ForumSectionComponent
- Discussions communautaires
- Posts récents

## 📄 Pages et Routing

### Routes Principales
```typescript
const routes: Routes = [
  { path: '', component: LandingComponent },                    // /
  { path: 'marche-agricole', component: MarketplaceComponent }, // /marche-agricole
  { path: 'marche-elevage', component: MarketplaceLivestockComponent }, // /marche-elevage
  { path: 'marche-peche', component: MarketplaceFishingComponent }, // /marche-peche
  { path: 'marche-agricole/legumes', component: CategoryVegetablesComponent }, // /marche-agricole/legumes
  { path: 'marche-agricole/fruits', component: CategoryFruitsComponent }, // /marche-agricole/fruits
  { path: 'marche-agricole/cereales', component: CategoryCerealsComponent }, // /marche-agricole/cereales
  { path: 'connexion', component: LoginComponent },             // /connexion
  { path: 'inscription', component: RegisterComponent },        // /inscription
];
```

### Pages Principales

#### Landing Page (`/`)
- Page d'accueil complète
- Statistiques (500 producteurs, 1000 tonnes, 14 régions)
- Présentation des marchés et acteurs
- Section forum

#### Marketplace Pages
- **Marché Agricole**: Produits agricoles avec sous-catégories
- **Marché Élevage**: Produits d'élevage
- **Marché Pêche**: Produits halieutiques

#### Category Pages
- **Légumes**: Tomates, oignons, carottes, poivrons, etc.
- **Fruits**: Oranges, raisins, mangues, bananes, etc.
- **Céréales**: Blé, riz, maïs, mil, sorgho, fonio

#### Authentication Pages
- **Connexion** (`/connexion`): Formulaire de connexion
- **Inscription** (`/inscription`): Formulaire d'inscription multi-étapes

## ✨ Fonctionnalités

### 🛒 Marketplace
- Catalogue de produits par catégorie
- Filtres par région, prix, disponibilité
- Informations détaillées sur les produits
- Système de commandes

### 👥 Gestion des Utilisateurs
- Inscription multi-profils (Agriculteur, Client, Investisseur, Agronome)
- Validation des formulaires
- Gestion des rôles et permissions

### 💬 Communauté
- Forum de discussion
- Posts par catégorie (Agriculture, Élevage, Pêche, Divers)
- Système de votes et commentaires

### 🤖 Intelligence Artificielle
- Chat IA (Jokko) pour assistance
- Interface flottante accessible partout

### 📱 Responsive Design
- Design adaptatif mobile et desktop
- Interface optimisée pour tous les appareils

## 🚀 Installation et Configuration

### Prérequis
- Node.js (version 18+)
- npm ou yarn
- Angular CLI 17+

### Installation
```bash
# Cloner le repository
git clone <repository-url>
cd projet3d

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

### Build pour la production
```bash
# Build optimisé
npm run build

# Les fichiers de production seront dans dist/senteranga/
```

### Scripts Disponibles
```json
{
  "start": "ng serve",                    // Serveur de développement
  "build": "ng build",                    // Build de production
  "watch": "ng build --watch --configuration development", // Build en mode watch
  "test": "ng test"                       // Tests unitaires
}
```

## 🎨 Thème et Design

### Palette de Couleurs
- **Primaire**: Vert Senteranga (`#22c55e`, `#16a34a`)
- **Neutres**: Gris (`#6b7280`, `#374151`)
- **Background**: Dégradé avec overlay

### Typographie
- Police système optimisée
- Hiérarchie claire des titres
- Lisibilité maximale

### Composants UI
- Cartes avec ombres et bordures arrondies
- Boutons avec états hover et focus
- Formulaires avec validation en temps réel
- Animations fluides

## 📈 Données Statiques

Le projet utilise actuellement des données statiques pour la démonstration :

- **Produits**: Catalogue de légumes, fruits et céréales
- **Utilisateurs**: Profils d'exemple
- **Commandes**: Historique des commandes
- **Forum**: Posts de discussion

## 🔮 Évolutions Futures

### Fonctionnalités Planifiées
- API backend pour données dynamiques
- Système d'authentification réel
- Paiements intégrés
- Géolocalisation des produits
- Notifications push
- Application mobile

### Améliorations Techniques
- Tests unitaires et d'intégration
- Internationalisation (i18n)
- Performance et optimisation
- Accessibilité (WCAG)
- Progressive Web App (PWA)

## 🤝 Contribution

### Structure des Commits
- `feat:` Nouvelles fonctionnalités
- `fix:` Corrections de bugs
- `docs:` Documentation
- `style:` Formatage et style
- `refactor:` Refactorisation du code
- `test:` Tests

### Code Style
- Utilisation d'ESLint et Prettier
- Conventions Angular officielles
- TypeScript strict
- Composants standalone

## 📄 Licence

Ce projet est sous licence ISC.

## 👥 Équipe

- **Développement**: Kilo Code
- **Design**: Interface utilisateur adaptée au contexte sénégalais
- **Données**: Catalogue agricole sénégalais

---

*Plateforme développée avec ❤️ pour la communauté agricole sénégalaise*

voici un bref résumé