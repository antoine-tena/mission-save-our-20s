# RULES.md — AnnSki Backend (Thales)

## Architecture Fractale

- Aucun fichier ne dépasse **300 lignes**.
- Si un module grossit, il est éclaté en sous-modules avec un `__init__.py` d'agrégation.

## Règle des 30 Lignes

- Une fonction / méthode = une seule responsabilité.
- Maximum **30 lignes** par fonction.

## Nommage Sémantique

- Interdiction des noms génériques : `data`, `res`, `val`, `tmp`, `info`.
- Booléens préfixés par `is_`, `has_`, `should_`.
- Classes en PascalCase, fonctions et variables en snake_case.

## Zéro Magie

- Pas de valeurs littérales magiques.
- Utilisation systématique de **constantes** ou de **TextChoices / IntegerChoices** Django.

## Asynchronie

- `async/await` quand applicable (Django 4.1+ async views).
- Sinon synchrone standard avec gestion d'exceptions explicite.

## Typage Strict

- Type Hinting Python obligatoire sur toutes les signatures de fonctions et méthodes.
- Zéro `Any` non justifié. Utiliser `Union`, `Optional`, ou `Protocol`.

## Django Conventions

- Vues basées sur DRF `APIView` ou `ViewSet`.
- Sérialiseurs explicites, pas de `ModelSerializer` sans champs déclarés.
- Permissions déclarées par vue, jamais de `AllowAny` en production.
