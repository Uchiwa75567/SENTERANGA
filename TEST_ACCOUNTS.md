# Comptes de Test - SENTERANGA

## Comment utiliser

### Pour les nouveaux utilisateurs
1. Allez sur la page d'inscription (`/inscription`)
2. Choisissez votre profil
3. Remplissez le formulaire en 2-3 étapes
4. Vos informations seront sauvegardées dans le navigateur (localStorage)
5. Connectez-vous avec votre numéro de téléphone et mot de passe

### Pour tester avec des comptes pré-configurés
Utilisez les comptes ci-dessous sur la page de connexion (`/connexion`)

---

## Comptes de Test Disponibles

### 🌾 Agriculteur/Producteur
- **Téléphone**: `771234567` ou `+221771234567`
- **Mot de passe**: `123456`
- **Nom**: Modou Fall
- **Région**: Fatick

### 🛒 Client Acheteur
- **Téléphone**: `781234567` ou `+221781234567`
- **Mot de passe**: `123456`
- **Nom**: Aminata Diop
- **Type**: Boutique

### 👑 Administrateur
- **Téléphone**: `701234567` ou `+221701234567`
- **Mot de passe**: `111111`
- **Nom**: Mamadou Sarr
- **Code Admin**: ADM001

### 💰 Investisseur Agricole
- **Téléphone**: `761234567` ou `+221761234567`
- **Mot de passe**: `123456`
- **Nom**: Cheikh Ndiaye
- **Type**: Particulier

### 👨‍🔬 Agronome/Conseiller
- **Téléphone**: `751234567` ou `+221751234567`
- **Mot de passe**: `123456`
- **Nom**: Fatou Sy
- **Structure**: ANCAR

### 🔍 Agent de Terrain
- **Téléphone**: `701234568` ou `+221701234568`
- **Mot de passe**: `123456`
- **Nom**: Ibrahima Ba
- **Code Agent**: AGT001

### 🏛️ État (Gouvernement)
- **Téléphone**: `701234569` ou `+221701234569`
- **Mot de passe**: `999999`
- **Nom**: Marie Koulibaly
- **Ministère**: Agriculture

---

## Format des Identifiants

### Numéro de téléphone
- Commence par: `77`, `76`, `78`, `75`, ou `70`
- Suivi de 7 chiffres
- Formats acceptés:
  - `771234567` (9 chiffres)
  - `+221771234567` (avec indicatif)
  - `221771234567` (avec indicatif sans +)

### Mot de passe
- Exactement **6 chiffres** (0-9)
- Exemples: `123456`, `111111`, `999999`

---

## Notes Importantes

1. **Stockage Local**: Les nouvelles inscriptions sont sauvegardées dans le localStorage du navigateur
2. **Données de Test**: Les comptes ci-dessus sont pré-configurés dans le fichier JSON
3. **Connexion**: Utilisez le numéro de téléphone (avec ou sans indicatif) et le mot de passe à 6 chiffres
4. **Inscription**: Admin et État ne peuvent pas s'inscrire - ils ont des comptes pré-configurés

---

## Dépannage

### "Numéro de téléphone ou mot de passe incorrect"
- Vérifiez que le numéro commence par 77, 76, 78, 75 ou 70
- Vérifiez que le mot de passe contient exactement 6 chiffres
- Essayez avec ou sans l'indicatif +221

### Après inscription, impossible de se connecter
- Vérifiez que vous utilisez exactement le même numéro de téléphone
- Le localStorage doit être activé dans votre navigateur
- Essayez de vider le cache si nécessaire