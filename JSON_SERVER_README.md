# Configuration JSON Server - Senteranga

## 📊 Vue d'ensemble

Le projet Senteranga utilise maintenant **JSON Server** comme backend de données pour le développement. Toutes les données sont stockées dans un fichier `db.json` structuré et accessibles via des endpoints RESTful.

## 🚀 Démarrage rapide

### 1. Installation des dépendances
```bash
npm install
```

### 2. Lancer JSON Server
```bash
npm run json-server
```
JSON Server démarrera sur `http://localhost:3002`

### 3. Lancer l'application Angular
```bash
npm start
```
L'application sera disponible sur `http://localhost:4200`

### 4. Lancer les deux serveurs simultanément
```bash
npm run dev
```

## 📁 Structure de la base de données

Le fichier `db.json` contient toutes les données organisées en collections RESTful :

### Collections principales

#### `regions` - Régions du Sénégal
```json
{
  "id": "dakar",
  "name": "Dakar",
  "departements": ["Dakar", "Guédiawaye", "Keur Massar", "Pikine", "Rufisque"]
}
```

#### `userTypes` - Types d'utilisateurs
```json
{
  "id": "agriculteur",
  "name": "Agriculteur/Producteur",
  "description": "Producteurs agricoles, éleveurs, pêcheurs",
  "icon": "🌾",
  "requiredFields": ["region", "departement", "village", "idCard"],
  "dashboard": "/dashboard-agriculteur"
}
```

#### `users` - Utilisateurs enregistrés
Collection vide initialement, remplie lors des inscriptions :
```json
{
  "id": "user-1234567890",
  "firstName": "Modou",
  "lastName": "Fall",
  "phone": "+221771234567",
  "userType": "agriculteur",
  "region": "Fatick",
  "department": "Fatick",
  "village": "Keur Massar",
  "email": "",
  "password": "123456"
}
```

#### `products` - Produits agricoles
```json
{
  "id": "1",
  "name": "Tomates Précoces",
  "category": "Légumes",
  "type": "agricol",
  "price": 300,
  "unit": "kg",
  "quantity": 500,
  "producer": {
    "id": "prod-1",
    "name": "Modou Fall",
    "region": "Fatick",
    "rating": 4.5
  },
  "certifications": ["bio"],
  "images": ["/images/products/tomatoes-fresh.jpg"],
  "description": "Tomates fraîches de saison, cultivées sans pesticides",
  "harvestDate": "2024-12-15",
  "location": "Fatick, Sénégal",
  "createdAt": "2024-12-01T10:00:00.000Z",
  "updatedAt": "2024-12-01T10:00:00.000Z"
}
```

#### Autres collections
- `clientTypes` - Types de clients
- `investorTypes` - Types d'investisseurs
- `ministries` - Ministères
- `structures` - Structures professionnelles
- `certifications` - Certifications agricoles
- `officialPrices` - Prix officiels
- `subventions` - Subventions disponibles
- `investmentOpportunities` - Opportunités d'investissement
- `agronomeAlerts` - Alertes agronomes
- `policies` - Politiques agricoles
- `notifications` - Notifications utilisateurs
- `orders` - Commandes
- `reports` - Rapports statistiques

## 🔗 Endpoints disponibles

Une fois JSON Server lancé, les endpoints suivants sont disponibles :

### GET - Récupération de données
```
GET /regions           # Toutes les régions
GET /regions/1         # Région spécifique
GET /userTypes         # Tous les types d'utilisateurs
GET /users             # Tous les utilisateurs
GET /products          # Tous les produits
GET /products?type=agricol  # Produits filtrés
```

### POST - Création de données
```
POST /users            # Créer un nouvel utilisateur
POST /products         # Ajouter un produit
POST /orders           # Créer une commande
```

### PUT/PATCH - Mise à jour
```
PUT /users/1           # Modifier un utilisateur
PATCH /products/1      # Modifier partiellement un produit
```

### DELETE - Suppression
```
DELETE /users/1        # Supprimer un utilisateur
```

## 🔧 Scripts npm

```json
{
  "json-server": "json-server --watch db.json --port 3002",
  "server": "json-server --watch db.json --port 3002 --host 0.0.0.0",
  "dev": "concurrently \"npm run json-server\" \"npm start\""
}
```

## 📝 Fonctionnalités implémentées

### ✅ Inscription utilisateur
- Les nouvelles inscriptions sont automatiquement sauvegardées dans `/users`
- Vérification des doublons par numéro de téléphone
- Support de tous les types d'utilisateurs (agriculteurs, clients, investisseurs, etc.)

### ✅ Authentification
- Recherche d'utilisateurs dans la collection `/users`
- Support des utilisateurs de test existants

### ✅ Catalogue produits
- Lecture depuis `/products`
- Support des filtres et recherches

## 🔄 Migration des données

Toutes les données statiques ont été migrées depuis `src/app/data/senteranga-data.json` vers `db.json` avec une structure optimisée pour JSON Server.

### Changements principaux :
1. **Structures** : Converties de chaînes simples vers objets avec `id` et `name`
2. **IDs automatiques** : JSON Server génère automatiquement des IDs pour les nouvelles entrées
3. **Timestamps** : Ajout de `createdAt` et `updatedAt` pour le versioning
4. **Collections séparées** : Chaque type de données dans sa propre collection

## 🧪 Tests

### Tester l'inscription
1. Lancer JSON Server : `npm run json-server`
2. Ouvrir l'application Angular
3. Aller à `/inscription`
4. Remplir le formulaire d'inscription
5. Vérifier que l'utilisateur apparaît dans `http://localhost:3002/users`

### Tester l'authentification
1. Créer un compte via l'inscription
2. Aller à `/connexion`
3. Se connecter avec les mêmes identifiants
4. Vérifier l'accès au dashboard

## 🚨 Dépannage

### JSON Server ne démarre pas
- Vérifier que le port 3002 n'est pas utilisé
- Vérifier la syntaxe du fichier `db.json`

### Erreur CORS
- JSON Server gère automatiquement CORS pour le développement
- Si problème, ajouter `--host 0.0.0.0` aux options

### Données non persistées
- JSON Server sauvegarde automatiquement les modifications dans `db.json`
- Vérifier les permissions d'écriture du fichier

## 📚 Documentation complémentaire

- [JSON Server Documentation](https://github.com/typicode/json-server)
- [Faker.js](https://fakerjs.dev/) pour générer des données de test
- [Postman](https://www.postman.com/) pour tester les endpoints

---

*Configuration JSON Server pour Senteranga - Plateforme Agricole Sénégalaise*