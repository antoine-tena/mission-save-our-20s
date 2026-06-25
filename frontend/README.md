# 🎨 Mission Save Our 20s - Frontend Application (Nuxt 4)

Cette application est l'interface utilisateur de **Mission Save Our 20s**, développée sous **Nuxt 4** (Vue 3, TypeScript, TailwindCSS v4, Leaflet et Vite CSS Nesting).

---

## 🛠️ Installation et Lancement Local

### 1. Prérequis
- [Node.js](https://nodejs.org/) v18.0 ou supérieur
- `npm` (installé par défaut avec Node.js)

### 2. Installation des dépendances
Depuis ce dossier `frontend/` :
```bash
npm install
```

### 3. Fichier d'environnement `.env`
Copiez le fichier d'exemple pour configurer l'URL de votre backend :
```bash
cp .env.example .env
```
Par défaut, le client cherche l'API backend sur `http://localhost:8000/api`.

### 4. Lancement du serveur de développement
```bash
npm run dev
```
L'interface sera accessible sur [http://localhost:3000](http://localhost:3000).

---

## 🚀 Scripts Disponibles (NPM)

- `npm run dev` : Lance le serveur de développement avec rechargement à chaud (hot reload).
- `npm run build` : Compile et prépare l'application pour la mise en production.
- `npm run generate` : Génère le site en version statique (SSG).
- `npm run preview` : Lance une prévisualisation locale de la version de production déjà compilée.
- `npm run lint` : Analyse le codebase avec **ESLint** (vue, typescript, @nuxt/eslint) pour déceler les erreurs.
- `npm run lint:fix` : Corrige automatiquement toutes les alertes de style ou de syntaxe admissibles.

---

## 📐 Règles de Développement et Réutilisation (Rappels de GEMINI.md)

### Réutilisation Prioritaire
Avant de créer un nouveau composant, composable ou style, vous **devez faire une recherche exhaustive** dans le codebase. Privilégiez l'utilisation directe ou l'extension intelligente de :
- **Composants d'infrastructure** : `BaseModal`, `ToastOverlay`, `Sidebar`, `Header`, `LocationAutocomplete`, `ProfileAvatar`...
- **Composables d'intégration** : `useApi`, `useAuth`, `useToast`...

### Styles
- **Veuillez utiliser TailwindCSS v4** de manière idiomatique.
- **Évitez la duplication de feuilles CSS** ; toute personnalisation avancée globale ou partagée doit être déclarée dans `assets/css/global.css` ou via la composition Tailwind.
