# Guide de Test - Admin Validation d'Inscriptions

## ✅ Flux Complet de Validation

### Étape 1: Connexion Admin
1. Aller à `http://localhost:4200/connexion`
2. Entrer:
   - **Téléphone:** `701234567` (ou `+221701234567` ou `221701234567`)
   - **Mot de passe:** `111111`
3. Cliquer "Se connecter"
4. **Résultat attendu:** Redirection vers `/dashboard-admin`

### Étape 2: Vérifier le Dashboard Admin
1. Une fois connecté, vous devriez voir:
   - Titre: "👨‍💼 Admin — Validation des Inscriptions"
   - Tableau avec liste des utilisateurs en attente
   - Colonne "Statut" montrant ⏳ En attente, ✓ Approuvé, ou ✗ Rejeté
   - Boutons "✓ Approuver" et "✗ Rejeter" pour chaque utilisateur

### Étape 3: Créer un Nouvel Utilisateur Agriculteur (en attente)
1. Aller à `http://localhost:4200/inscription`
2. Remplir le formulaire:
   - Rôle: **Agriculteur**
   - Prénom: `John`
   - Nom: `Doe`
   - Email: `john@example.com`
   - Téléphone: `771234567`
   - Mot de passe: `123456`
   - Région, Département, Village: À remplir
   - Accepter les conditions
3. Cliquer "S'inscrire"
4. **Résultat attendu:** Message "Inscription réussie"

### Étape 4: Vérifier que le Nouvel Utilisateur Apparaît en Attente
1. Retourner au dashboard admin (`http://localhost:4200/dashboard-admin`)
2. Vérifier que le nouvel utilisateur "John Doe" apparaît dans la liste
3. Son statut doit être "⏳ En attente"

### Étape 5: Approuver l'Utilisateur
1. Cliquer le bouton "✓ Approuver" pour John Doe
2. **Résultat attendu:** 
   - Alert: "✓ John Doe a été approuvé(e)"
   - Le statut du user change à "✓ Approuvé"
   - Une notification est créée

### Étape 6: Vérifier que l'Utilisateur Peut Se Connecter
1. Se déconnecter: Cliquer "Déconnexion" dans le header
2. Aller à `http://localhost:4200/connexion`
3. Entrer les identifiants du nouvel utilisateur:
   - **Téléphone:** `771234567`
   - **Mot de passe:** `123456`
4. Cliquer "Se connecter"
5. **Résultat attendu:** Redirection vers `/dashboard-agriculteur`
6. Header affiche: "Bonjour, John Doe" + boutons "Mon espace" et "Déconnexion"

---

## 🔍 Dépannage

### Problème: L'admin ne se connecte pas
**Solution:**
- Vérifier que le port JSON Server est bien `3004`
- Vérifier les identifiants: phone `701234567`, password `111111`
- Ouvrir la console du navigateur (F12) et vérifier les erreurs

### Problème: Le dashboard admin affiche une liste vide
**Solution:**
- Vérifier que le serveur JSON fonctionne: `http://localhost:3004/users`
- Ouvrir la console (F12) et regarder les logs
- Vérifier que des utilisateurs en attente existent dans la base

### Problème: Les boutons Approuver/Rejeter ne fonctionnent pas
**Solution:**
- Vérifier la console (F12) pour les erreurs
- Vérifier que le serveur JSON répond aux requêtes PUT
- Tester manuellement: 
  ```bash
  curl -X PUT http://localhost:3004/users/user-1234 \
    -H "Content-Type: application/json" \
    -d '{"validationStatus": "approved"}'
  ```

### Problème: Après approbation, l'utilisateur ne peut toujours pas se connecter
**Solution:**
- Vérifier que `validationStatus` a bien changé à `approved` dans db.json
- Vérifier que `isValidated` est à `true`
- Vérifier la logique du login component (ligne 44-50)

---

## 📊 Vérification Manuelle

Pour vérifier que tout fonctionne correctement, vous pouvez inspecter le db.json:

```bash
# Voir tous les utilisateurs
curl http://localhost:3004/users | jq '.'

# Voir un utilisateur spécifique
curl http://localhost:3004/users/user-1234 | jq '.'

# Voir les notifications
curl http://localhost:3004/notifications | jq '.'
```

---

## 🚀 Checklist de Validation

- [ ] Admin se connecte avec (701234567, 111111)
- [ ] Dashboard admin affiche la liste des utilisateurs
- [ ] Nouvelle inscription crée un utilisateur avec statut "pending"
- [ ] Le nouvel utilisateur apparaît dans le dashboard admin
- [ ] Cliquer "Approuver" met à jour le statut à "approved"
- [ ] Une notification est créée lors de l'approbation
- [ ] L'utilisateur approuvé peut se connecter
- [ ] Le header affiche le nom de l'utilisateur connecté
- [ ] Cliquer "Rejeter" met à jour le statut à "rejected"
- [ ] L'utilisateur rejeté ne peut pas se connecter

---

## 📁 Fichiers Clés

- `src/app/pages/login/login.component.ts` - Logique de connexion
- `src/app/pages/dashboard-admin/dashboard-admin.component.ts` - Dashboard admin
- `src/app/services/data.service.ts` - Service API
- `db.json` - Base de données test
