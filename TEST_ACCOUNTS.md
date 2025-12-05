# Comptes de Test Senteranga

Ce fichier contient les informations de connexion pour tester l'application Senteranga avec différents types d'utilisateurs.

## 📋 Comptes Disponibles

### 🌾 **Agriculteur/Producteur**
- **Email**: `agriculteur@senteranga.sn`
- **Mot de passe**: `test123`
- **Description**: Modou Fall, agriculteur de Fatick spécialisé en légumes et céréales

### 🛒 **Client Acheteur**
- **Email**: `client@senteranga.sn`
- **Mot de passe**: `test123`
- **Description**: Aminata Diop, propriétaire de boutique à Dakar

### 👑 **Administrateur**
- **Email**: `admin@senteranga.sn`
- **Mot de passe**: `admin123`
- **Description**: Mamadou Sarr, administrateur système avec code ADM001

### 💰 **Investisseur Agricole**
- **Email**: `investisseur@senteranga.sn`
- **Mot de passe**: `test123`
- **Description**: Cheikh Ndiaye, investisseur particulier avec 5 millions FCFA

### 👨‍🔬 **Agronome/Conseiller**
- **Email**: `agronome@senteranga.sn`
- **Mot de passe**: `test123`
- **Description**: Fatou Sy, agronome travaillant pour l'ANCAR

### 🔍 **Agent Terrain**
- **Email**: `agent@senteranga.sn`
- **Mot de passe**: `test123`
- **Description**: Ibrahima Ba, agent de terrain dans la région de Kaolack

### 🏛️ **État (Gouvernement)**
- **Email**: `etat@senteranga.sn`
- **Mot de passe**: `test123`
- **Description**: Marie Koulibaly, représentante du Ministère de l'Agriculture

## 🚀 Comment Tester

1. **Démarrer l'application**:
   ```bash
   npm start
   ```

2. **Accéder à la page de connexion**:
   - Ouvrir `http://localhost:4200/connexion`

3. **Utiliser les comptes de test**:
   - Sélectionner un email et mot de passe dans la liste ci-dessus
   - Cliquer sur "Se connecter"

4. **Navigation automatique**:
   - Chaque type d'utilisateur sera automatiquement redirigé vers son tableau de bord approprié

## 📝 Notes Importantes

- **Sécurité**: Ces comptes sont uniquement pour les tests de développement
- **Données**: Les informations sont stockées dans `public/assets/data/senteranga-data.json`
- **Authentification**: Utilise un système d'authentification simulé basé sur les données JSON
- **Routes**: Chaque type d'utilisateur a sa propre route de tableau de bord

## 🔧 Ajouter de Nouveaux Comptes

Pour ajouter de nouveaux comptes de test, modifier le fichier `public/assets/data/senteranga-data.json` dans la section `testUsers`.

Format requis:
```json
{
  "id": "unique-id",
  "email": "user@senteranga.sn",
  "password": "password123",
  "userType": "agriculteur|client|admin|investisseur|agronome|agent-terrain|etat",
  "firstName": "Prénom",
  "lastName": "Nom",
  "phone": "+221XXXXXXXXX",
  // Autres champs selon le type d'utilisateur...
}
```

## 🐛 Signaler des Problèmes

Si vous rencontrez des problèmes avec la connexion:
1. Vérifier que l'application est démarrée (`npm start`)
2. Vérifier que les données JSON sont correctement chargées
3. Consulter la console du navigateur pour les erreurs
4. Vérifier que l'email et le mot de passe correspondent exactement

---

*Document mis à jour le: 04 décembre 2024*