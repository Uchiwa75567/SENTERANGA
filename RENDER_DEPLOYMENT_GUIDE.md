# 🚀 Guide Déploiement SENTERANGA - Backend sur Render

## 📋 Résumé

Vous allez déployer le backend JSON Server sur **Render.com**, ce qui permettra à l'app Angular d'accéder à la base de données depuis n'importe où.

## 🔄 Architecture Finale

```
┌─────────────────────────────┐
│   Angular App (4200)        │ ← Frontend (Vercel, Netlify, etc.)
└──────────────┬──────────────┘
               │
               │ API Calls
               ↓
┌─────────────────────────────┐
│  SENTERANGA Backend (Render)│ ← https://votre-api.onrender.com/api
│  - JSON Server              │
│  - db.json                  │
└─────────────────────────────┘
```

## 📦 Qu'il faut mettre dans le dossier `/backend`

```
backend/
├── package.json           ✅ (créé)
├── server.js              ✅ (créé)
├── db.json                📌 À copier du root
├── .env.example           ✅ (créé)
├── .gitignore             ✅ (créé)
├── README.md              ✅ (créé)
└── node_modules/          (généré par npm install)
```

## ✅ Étapes Complètes

### 1️⃣ Copier db.json dans le backend

```bash
cp /home/bachir-uchiwa/Bureau/projet3D/db.json /home/bachir-uchiwa/Bureau/projet3D/backend/db.json
```

Ou manuellement : copier le fichier `db.json` du root vers le dossier `backend/`

### 2️⃣ Initialiser npm dans le backend

```bash
cd /home/bachir-uchiwa/Bureau/projet3D/backend
npm install
```

Cela va installer :
- `json-server` - Serveur API
- `cors` - Support CORS
- `dotenv` - Variables d'environnement
- `nodemon` (dev) - Auto-reload

### 3️⃣ Tester localement

```bash
npm start
```

Vous devriez voir :
```
✅ SENTERANGA Backend running on port 3004
📍 API available at http://localhost:3004/api
🗄️  Database: db.json
```

Testez l'API :
```bash
curl http://localhost:3004/api/users
```

### 4️⃣ Préparer pour Render

#### a) Créer un repo Git séparé (optionnel) ou utiliser le même repo

Render peut déployer :
- **Option A**: Le dossier `/backend` du repo existant
- **Option B**: Un repo Git séparé uniquement pour le backend

**Recommandation**: Créer un sous-dossier Git dans le repo existant

#### b) Configuration Render

1. Aller sur **[render.com](https://render.com)**
2. S'authentifier ou créer un compte
3. Cliquer **"New +" → "Web Service"**
4. Connecter votre repo GitHub/GitLab
5. Remplir les paramètres :

| Paramètre | Valeur |
|-----------|--------|
| **Name** | `senteranga-api` |
| **Environment** | `Node` |
| **Build Command** | `cd backend && npm install` |
| **Start Command** | `cd backend && npm start` |
| **Plan** | `Free` (ou payant selon besoins) |

6. Ajouter variables d'environnement :
   - `PORT` = `3004`
   - `NODE_ENV` = `production`

7. Cliquer **"Create Web Service"**

### 5️⃣ Après le déploiement

Une fois déployé, vous verrez :
```
Service URL: https://senteranga-api-xxxx.onrender.com
```

Testez :
```bash
curl https://senteranga-api-xxxx.onrender.com/api/users
```

### 6️⃣ Mettre à jour Angular pour utiliser l'API distante

Dans `src/app/services/data.service.ts` :

```typescript
// Avant (local)
// private apiUrl = 'http://localhost:3004';

// Maintenant : utilisez les fichiers d'environnement Angular
// `src/environments/environment.ts` et `src/environments/environment.prod.ts`
// Exemple (dev): `environment.apiUrl = 'http://localhost:3004/api'`
// Exemple (prod): `environment.apiUrl = 'https://senteranga-api-xxxx.onrender.com/api'`
```

Ou mieux, utiliser une variable d'environnement :

```typescript
import { environment } from '../../../environments/environment';

private apiUrl = environment.apiUrl;
```

## 🔐 Important : Variables d'Environnement

### `.env` local (ne pas pousser sur Git)
```
PORT=3004
NODE_ENV=development
```

### `.env.production` (ou Render Dashboard)
```
PORT=3004
NODE_ENV=production
```

## 📊 Monitorage Render

- **Logs**: Onglet "Logs" dans Render Dashboard
- **Status**: Voir si le service est "Live" ou "Suspended"
- **Metrics**: CPU, Memory, Requests

## 🔄 Workflow Futur

```
1. Faire des changements dans db.json (local)
   ↓
2. Commit et push vers GitHub
   ↓
3. Render redéploie automatiquement (auto-deploy)
   ↓
4. Angular interroge l'API distante
   ↓
5. Les données sont mises à jour
```

## ⚠️ Limitations Render (Plan Gratuit)

- ⏸️ **Inactivité**: Services arrêtés après 15 min d'inactivité
- ⌛ **Cold Start**: ~1-2 secondes au premier appel
- 💾 **Stockage**: Pas de persistance entre redémarrages (besoin DB externe)
- 📊 **Bande passante**: 100 GB/mois

## 🚀 Prochaines Étapes

1. Copier `db.json` dans `backend/`
2. Tester localement avec `npm install && npm start`
3. Pousser le code sur GitHub
4. Créer un Web Service sur Render
5. Obtenir l'URL du service
6. Me donner l'URL → Je mets à jour Angular
7. Tester les appels API

---

**Prêt ? Donne-moi l'URL Render quand tu l'auras, et je mettrai tout à jour dans Angular ! 🚀**
