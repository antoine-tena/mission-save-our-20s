# Mission Save Our 20s - Backend API (Django & DRF)

Bienvenue dans le backend de **Mission Save Our 20s**. Cette application est propulsée par **Django 5.0** et **Django REST Framework (DRF)**.

---

## 🛠️ Installation et Configuration Locale

### 1. Prérequis
- Python 3.10+
- `pip` (gestionnaire de paquets Python)

### 2. Création et activation de l'environnement virtuel
Depuis le dossier `backend/` :
```bash
# Créer l'environnement virtuel
python -m venv .venv

# Activer l'environnement virtuel
# Sur Linux / macOS :
source .venv/bin/activate

# Sur Windows (PowerShell) :
.venv\Scripts\Activate.ps1
```

### 3. Installation des dépendances
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Configuration des variables d'environnement
Copiez le fichier d'exemple et configurez vos variables :
```bash
cp .env.example .env
```
Éditez le fichier `.env` nouvellement créé pour définir votre `SECRET_KEY` et ajuster le mode `DEBUG`.

---

## 🚀 Lancement de l'Application

### 1. Migrations de la Base de Données (SQLite)
Appliquez les migrations initiales pour créer les tables de la base de données :
```bash
python manage.py migrate
```

### 2. Lancement du serveur de développement
```bash
python manage.py runserver
```
Le serveur sera disponible sur [http://localhost:8000/](http://localhost:8000/).

---

## 🧪 Tests Unitaires

Pour lancer la suite de tests unitaires :
```bash
python manage.py test
```

---

## 📐 Règles Architecturales (Rappels de GEMINI.md)

Ce backend suit des règles strictes définies dans la charte de développement :
* **Architecture Fractale :** Aucun fichier de code ne doit dépasser **300 lignes**. Si un module grossit, il doit être découpé en sous-modules.
* **Règle des 150 Lignes :** Une fonction / méthode ne doit pas dépasser **150 lignes** et doit avoir une seule et unique responsabilité.
* **Nommage Sémantique :** Interdiction d'utiliser des noms de variables génériques (`data`, `res`, `tmp`). Les booléens doivent être préfixés par `is_`, `has_`, ou `should_`.
* **Typage Strict :** Le *Type Hinting* Python est obligatoire sur toutes les signatures de fonctions et de méthodes (pas de `Any` injustifié).
* **Django & DRF :** Utilisation de sérialiseurs explicites (pas de `ModelSerializer` générique sans déclaration de champs) et permissions déclarées par vue.
