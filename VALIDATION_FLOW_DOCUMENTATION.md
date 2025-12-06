# Flux de Validation Utilisateur - Documentation Complète

## Vue d'ensemble du flux
Quand un administrateur valide l'inscription d'un utilisateur agriculteur, celui-ci peut maintenant se connecter. Voici le flux complet:

```
1. INSCRIPTION (Register)
   ↓
2. Utilisateur créé avec status: 'pending' (En attente)
   ↓
3. Admin accède au Dashboard Admin
   ↓
4. Admin voit la liste des utilisateurs en attente
   ↓
5. Admin clique "Approuver"
   ↓
6. Status mis à jour: 'approved' (Approuvé)
   ↓
7. Notification envoyée à l'utilisateur
   ↓
8. Utilisateur peut se connecter
   ↓
9. Login vérifie le status
   ↓
10. Redirection vers Dashboard Agriculteur
```

## 1. Phase d'Inscription

**Fichier:** `src/app/pages/register/register.component.ts`

Quand un nouvel utilisateur s'inscrit (particulièrement un agriculteur), le service crée un compte avec:
```typescript
{
  id: 'user-{timestamp}',
  email: userData.email,
  password: userData.password,
  userType: 'agriculteur',
  firstName: userData.prenom,
  lastName: userData.nom,
  phone: userData.telephone,
  // ... autres champs
  
  // IMPORTANT: Les nouveaux comptes agriculteurs commencent en attente
  isValidated: false,
  validationStatus: 'pending'  // ← Status initial
}
```

**Service:** `DataService.registerUser()`
- Vérifie si l'utilisateur existe déjà
- Crée le nouvel utilisateur avec `validationStatus: 'pending'`
- Enregistre dans la base de données JSON Server

## 2. Phase Admin - Visualisation et Approbation

**Fichier:** `src/app/pages/dashboard-admin/dashboard-admin.component.ts`

L'admin voit tous les utilisateurs:
```typescript
// Charge la liste des utilisateurs
loadUsers() {
  this.dataService.getTestUsers().subscribe(users => {
    this.users = users;  // Affiche tous les utilisateurs (pending, approved, rejected)
  });
}
```

### Approuver un utilisateur

Quand l'admin clique le bouton "Approuver":

```typescript
approve(user: TestUser) {
  // 1. Mettre à jour l'utilisateur
  const updated = { 
    ...user, 
    isValidated: true, 
    validationStatus: 'approved'  // ← Status changé
  };
  
  // 2. Sauvegarder les changements
  this.dataService.updateUser(updated).subscribe(() => {
    
    // 3. Créer une notification
    this.dataService.createNotification({
      id: `notif-${Date.now()}`,
      userId: updated.id,
      type: 'validation',
      title: 'Compte approuvé',
      message: 'Votre compte a été approuvé par l\'administration SENTERANGA.',
      date: new Date().toISOString(),
      read: false
    }).subscribe(() => {
      
      // 4. Recharger la liste
      this.loadUsers();
    });
  });
}
```

**Service:** `DataService.updateUser()` et `DataService.createNotification()`

## 3. Phase Connexion - Vérification du Status

**Fichier:** `src/app/pages/login/login.component.ts`

Quand l'utilisateur tente de se connecter:

```typescript
onSubmit() {
  const { telephone, password } = this.loginForm.value;
  
  // 1. Authentifier l'utilisateur
  this.dataService.authenticateUser(telephone, password).subscribe(user => {
    if (user) {
      
      // 2. Vérifier si l'utilisateur est agriculteur
      const requiresValidation = user.userType === 'agriculteur';
      
      // 3. Vérifier s'il est approuvé
      const isApproved = user.validationStatus === 'approved' || user.isValidated === true;
      
      // 4. Si agriculteur ET non approuvé → BLOQUER
      if (requiresValidation && !isApproved) {
        if (user.validationStatus === 'rejected') {
          alert('Votre inscription a été rejetée...');
        } else {
          alert('Votre compte est en attente de validation...');
        }
        return;  // ← Connexion refusée
      }
      
      // 5. Si approuvé OU pas agriculteur → AUTORISER
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // 6. Rediriger vers le dashboard approprié
      this.router.navigate(['/dashboard-agriculteur']);
    }
  });
}
```

## 4. Affichage en Header

**Fichier:** `src/app/components/header/header.component.ts`

L'en-tête affiche l'utilisateur connecté:
```typescript
loadCurrentUser() {
  const stored = localStorage.getItem('currentUser');
  if (stored) {
    this.currentUser = JSON.parse(stored);
  }
}

isLoggedIn(): boolean {
  return this.currentUser !== null;
}
```

## Statuts Possibles

| Status | Description | Peut se connecter? |
|--------|-------------|--------------------|
| `pending` | En attente de validation admin | ❌ Non |
| `approved` | Approuvé par l'admin | ✅ Oui |
| `rejected` | Rejeté par l'admin | ❌ Non |

## Données de Test

### Compte Admin (pré-approuvé)
```json
{
  "id": "user-admin-1",
  "email": "admin@senteranga.local",
  "password": "111111",
  "phone": "701234567",
  "userType": "admin",
  "firstName": "Mamadou",
  "lastName": "Sarr",
  "isValidated": true,
  "validationStatus": "approved"
}
```

### Nouveau Compte Agriculteur (exemple)
```json
{
  "id": "user-1700000000000",
  "email": "agriculteur@example.com",
  "password": "123456",
  "phone": "781234567",
  "userType": "agriculteur",
  "firstName": "Sitor",
  "lastName": "Ba",
  "isValidated": false,
  "validationStatus": "pending"  // ← En attente au départ
}
```

Après approbation par admin:
```json
{
  "id": "user-1700000000000",
  "email": "agriculteur@example.com",
  "password": "123456",
  "phone": "781234567",
  "userType": "agriculteur",
  "firstName": "Sitor",
  "lastName": "Ba",
  "isValidated": true,
  "validationStatus": "approved"  // ← Maintenant approuvé
}
```

## Scénarios de Test

### Scénario 1: Nouvel agriculteur (Status Pending)
1. Aller à `/inscription`
2. Remplir le formulaire avec userType = "Agriculteur"
3. Soumettre
4. Essayer de se connecter
5. **Résultat attendu:** Message d'erreur "Votre compte est en attente de validation..."

### Scénario 2: Admin approuve l'agriculteur
1. Se connecter en tant qu'admin (phone: 701234567, password: 111111)
2. Aller à `/dashboard-admin`
3. Trouver l'agriculteur dans la liste
4. Cliquer "Approuver"
5. Vérifier que l'utilisateur a été mis à jour

### Scénario 3: Agriculteur se connecte après approbation
1. Retourner à `/connexion`
2. Entrer le même numéro de téléphone et mot de passe
3. **Résultat attendu:** Redirection vers `/dashboard-agriculteur`
4. Header affiche: "Bonjour, [Prénom Nom]" + "Mon espace" + "Déconnexion"

### Scénario 4: Admin rejette l'agriculteur
1. Se connecter en tant qu'admin
2. Aller à `/dashboard-admin`
3. Trouver l'agriculteur
4. Cliquer "Rejeter"
5. Essayer de se connecter avec ce compte
6. **Résultat attendu:** Message d'erreur "Votre inscription a été rejetée..."

## Fichiers Impliqués

1. **data.service.ts**
   - `registerUser()` - Crée un utilisateur avec status 'pending'
   - `updateUser()` - Met à jour le status à 'approved' ou 'rejected'
   - `createNotification()` - Crée une notification pour l'utilisateur

2. **register.component.ts**
   - Formulaire d'inscription
   - Appelle `registerUser()` du service

3. **login.component.ts**
   - Vérification de `validationStatus` pour agriculteurs
   - Bloque si status !== 'approved'

4. **dashboard-admin.component.ts**
   - Affiche la liste des utilisateurs
   - Boutons "Approuver" et "Rejeter"
   - Mise à jour via `updateUser()`

5. **header.component.ts/html**
   - Affiche le statut de connexion
   - Affiche le nom de l'utilisateur connecté
   - Bouton de déconnexion

6. **db.json**
   - Collections: users, notifications
   - Admin pré-approuvé pour permettre l'accès initial

## API Endpoints (JSON Server)

- `GET /users` - Lister tous les utilisateurs
- `PUT /users/{id}` - Mettre à jour un utilisateur
- `POST /notifications` - Créer une notification
- `GET /notifications` - Lister les notifications

## Configuration

**Port JSON Server:** `localhost:3004`
(Configuré dans `data.service.ts`)

## Résumé

✅ **Quand l'admin valide l'inscription d'un utilisateur agriculteur, celui-ci peut maintenant se connecter:**
- Nouvel inscrit commence avec `validationStatus: 'pending'`
- Login bloque l'accès pour les agriculteurs non approuvés
- Admin approuve via le dashboard → `validationStatus: 'approved'`
- Utilisateur peut se connecter et accéder au dashboard
- Header affiche le statut de connexion et navigation par rôle
