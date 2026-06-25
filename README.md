# 📸 Mission Save Our 20s (MSO20s)

> Une application web interactive, moderne et élégante conçue pour capturer les souvenirs de nos vingt ans, planifier nos projets de vie, et centraliser nos activités partagées.

---

## 🌟 Fonctionnalités Clés

- **📖 Scrapbook & Albums (Studio)** : Création d'albums personnalisés avec drag-and-drop, mise en page asymétrique, redimensionnement dynamique de photos polaroids et de textes éditables.
- **📝 Journal Collaboratif** : Rédaction de billets riches avec pièces jointes, likes, signets, et suivi météorologique dynamique.
- **📅 Calendrier & Agenda Partagé** : Organisation d'événements, suivi de dates clés et visualisation mensuelle fluide.
- **🗺️ Carte Interactive (Cartographie)** : Localisation de souvenirs, d'activités et d'adresses favorites à l'aide de Leaflet.
- **🍿 Cinémathèque & Ludothèque** : Notation de films et sessions de jeux de société avec systèmes de notation croisés (Amani, Antoine, Global).
- **✨ Liste d'Envies (Wishlist)** : Centralisation d'idées de cadeaux, voyages et projets avec suivi d'état.
- **🌌 Carte Céleste (Étoiles)** : Une visualisation féérique de corps célestes pour marquer des dates mémorables.

---

## 🛠️ Stack Technique

### Frontend
- **Framework** : [Nuxt 4](https://nuxt.com/) (Vue 3, TypeScript, Composables)
- **Styles** : [TailwindCSS v4](https://tailwindcss.com/) & Vite CSS Nesting
- **Composants** : `@nuxt/icon`, composants réutilisables optimisés
- **Cartes** : Leaflet & `@types/leaflet`
- **Linting** : ESLint avec le module officiel `@nuxt/eslint`

### Backend
- **Framework** : [Django 5](https://www.djangoproject.com/) & [Django REST Framework (DRF)](https://www.django-rest-framework.org/)
- **Production Web Server** : `Gunicorn`
- **Database** : PostgreSQL (Neon / Render) en production, SQLite localement
- **Fichiers Statiques** : `WhiteNoise` (pour l'admin Django)
- **CDN / Stockage** : Cloudinary (pour le stockage CDN d'images) et Google Drive pour l'archivage
- **Linting & Formatage** : `Ruff` (super linter Python rapide)

---

## 🚀 Démarrage Rapide

### Option A : Avec Docker Compose (Recommandé)

Lancez l'ensemble de l'écosystème (Frontend + Backend) en une seule ligne de commande :

```bash
docker compose up --build
```

- **Frontend** disponible sur : [http://localhost:3000](http://localhost:3000)
- **Backend API** disponible sur : [http://localhost:8000](http://localhost:8000)

---

### Option B : Lancement Manuel (Développement local)

#### 1. Backend (Django)

Depuis la racine du projet :
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Sur Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### 2. Frontend (Nuxt)

Depuis la racine du projet :
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Tests, Linters & Qualité du Code

### Backend (Django & Ruff)

- **Lancer les tests unitaires** :
  ```bash
  cd backend
  .venv/bin/python manage.py test
  ```
- **Lancer le linter Ruff** :
  ```bash
  cd backend
  .venv/bin/ruff check .
  ```
- **Corriger automatiquement le code** :
  ```bash
  cd backend
  .venv/bin/ruff check --fix .
  ```

### Frontend (Nuxt & ESLint)

- **Lancer le linter ESLint** :
  ```bash
  cd frontend
  npm run lint
  ```
- **Corriger automatiquement les alertes de style** :
  ```bash
  cd frontend
  npm run lint:fix
  ```

---

## 📐 Standards de Code (Conventions GEMINI.md)

- Aucun fichier de code ne dépasse **300 lignes** pour maintenir l'architecture fractale.
- Aucune fonction ou méthode ne doit dépasser **150 lignes**.
- Toutes les signatures Python doivent posséder du **Type Hinting strict** (pas de `Any` injustifié).
- Les composants frontend réutilisables doivent être privilégiés au maximum (`BaseModal`, `ToastOverlay`, etc.).
