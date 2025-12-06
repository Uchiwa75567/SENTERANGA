# 🚀 Configuration des Serveurs

## 3 Serveurs doivent tourner simultanément

### 1️⃣ Dev Server Angular (port 4200)

```bash
npm start
```

**Vérifie :**
- ✅ http://localhost:4200 accessible
- ✅ Hot reloading fonctionne
- ✅ Console sans erreurs

---

### 2️⃣ JSON Server (port 3004)

Pour charger les données (users, products, seeds, etc.) :

```bash
npm run json-server
```

**Vérifie :**
- ✅ http://localhost:3004/users accessible
- ✅ http://localhost:3004/products accessible
- ✅ http://localhost:3004/seeds accessible ✨ **NEW**
- ✅ http://localhost:3004/agronomeAlerts accessible

---

### 3️⃣ Upload Server (port 4201) - Cloudinary

**Prérequis :**
1. Créer compte Cloudinary gratuit : https://cloudinary.com/
2. Créer fichier `.env` dans le root du projet :

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=4201
```

**Lancer le serveur :**

```bash
npm run upload-server
```

**Vérifie :**
- ✅ `http://localhost:4201` retourne 404 (normal, pas de route home)
- ✅ Logs affichent : `Cloudinary upload server running on http://localhost:4201`

---

## ⚠️ Erreurs Courantes & Solutions

### Erreur 1 : "seeds endpoint 404"
```
GET http://localhost:3004/seeds 404
```
**Solution :** ✅ FIXÉE - db.json contient maintenant la collection `seeds`

Relance json-server :
```bash
npm run json-server
```

---

### Erreur 2 : "Image upload failed"
```
POST http://localhost:4201/upload-images net::ERR_CONNECTION_REFUSED
```
**Solution :** Upload server n'est pas lancé

1. Crée `.env` avec credentials Cloudinary
2. Lance : `npm run upload-server`
3. Vérifie console : `Cloudinary upload server running...`

---

### Erreur 3 : "CSP violation"
```
Executing inline script violates Content-Security-Policy
```
**Solution :** ✅ FIXÉE - index.html contient maintenant CSP

Rafraîchis le navigateur (Ctrl+Shift+R)

---

### Erreur 4 : "Product form invalid controls: ['localisation']"
```
Product form invalid controls: ['localisation']
```
**Solution :** Le formulaire ne peut pas être soumis car `localisation` est vide

- Remplis le champ "Localisation" dans le formulaire
- Le champ est requis (Validators.required)

---

## 🔧 Terminal Sessions

Pour gérer les 3 serveurs facilement, ouvre **3 terminaux** :

```bash
# Terminal 1 - Dev Server
npm start

# Terminal 2 - JSON Server
npm run json-server

# Terminal 3 - Upload Server
npm run upload-server
```

---

## ✅ Checklist Avant de Tester

- [ ] JSON Server tourne sur port 3004
- [ ] Dev Server tourne sur port 4200
- [ ] Upload Server tourne sur port 4201
- [ ] `.env` contient credentials Cloudinary
- [ ] `db.json` contient collection `seeds` ✨
- [ ] `index.html` contient CSP policy ✨
- [ ] Navigateur rafraîchi (Ctrl+Shift+R)
- [ ] Console navigateur sans erreurs CSP

---

## 📱 Test du Dashboard Agriculteur

1. Navigue vers : http://localhost:4200/dashboard-agriculteur
2. Login avec :
   - Tél : 771234567
   - Pass : test123
3. Essaie de :
   - [ ] Remplir le formulaire "Publier un produit"
   - [ ] Sélectionner des images
   - [ ] Soumettre le formulaire
   - [ ] Voir les semences charger depuis `/seeds`
   - [ ] Commander une semence

---

## 🐛 Debug

### Voir les logs JSON Server
```bash
npm run json-server -- --delay 0
```

### Voir les logs Upload Server
```bash
npm run upload-server
# Logs affichent chaque upload
```

### Voir les logs Dev Server
```bash
npm start
# Logs affichent les changes et compilation
```

### Ouvrir DevTools Navigateur
- F12 → Console → Voir toutes les erreurs
- F12 → Network → Voir les requêtes HTTP

---

## 🎯 Prochaines Étapes

1. ✅ Lancer les 3 serveurs
2. ✅ Vérifier absence d'erreurs CSP
3. ✅ Tester chargement des semences
4. ✅ Tester upload d'images
5. ✅ Tester publication de produit
6. 📝 Déployer en production

