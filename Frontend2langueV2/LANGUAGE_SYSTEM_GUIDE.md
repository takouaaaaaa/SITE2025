# Guide du Système de Traduction SITE 2025

## 🌐 Vue d'ensemble

Le site SITE 2025 dispose maintenant d'un système de traduction complet qui permet aux utilisateurs de basculer entre le français et l'anglais. Le système utilise React Context pour gérer l'état global des langues et localStorage pour la persistance.

## 🏗️ Architecture

### Composants principaux

1. **LanguageContext** (`src/contexts/LanguageContext.jsx`)
   - Gère l'état global de la langue
   - Fournit les fonctions de traduction
   - Gère le chargement des fichiers de traduction

2. **LanguageSelector** (`src/components/LanguageSelector.jsx`)
   - Bouton de sélection de langue dans le header
   - Interface utilisateur pour changer de langue
   - Indicateur visuel de la langue actuelle

3. **LanguageLoader** (`src/components/LanguageLoader.jsx`)
   - Écran de chargement pendant le changement de langue
   - Améliore l'expérience utilisateur

### Fichiers de traduction

- `src/translations/fr.json` - Traductions françaises
- `src/translations/en.json` - Traductions anglaises

## 🚀 Utilisation

### Dans un composant React

```jsx
import { useLanguage } from '../contexts/LanguageContext'

const MonComposant = () => {
  const { t, currentLanguage, changeLanguage } = useLanguage()
  
  return (
    <div>
      <h1>{t('header.navigation.home')}</h1>
      <p>{t('footer.description')}</p>
      <button onClick={() => changeLanguage('en')}>
        Switch to English
      </button>
    </div>
  )
}
```

### Fonctions disponibles

- `t(key, params)` - Traduit une clé avec paramètres optionnels
- `changeLanguage(code)` - Change la langue ('fr' ou 'en')
- `currentLanguage` - Code de la langue actuelle
- `isLoading` - État de chargement des traductions
- `getCurrentLanguage()` - Objet de la langue actuelle avec métadonnées

### Traduction avec paramètres

```jsx
// Dans le fichier de traduction
{
  "welcome": "Bienvenue {{name}} à {{event}}"
}

// Dans le composant
{t('welcome', { name: 'John', event: 'SITE 2025' })}
// Résultat: "Bienvenue John à SITE 2025"
```

## 📝 Ajouter de nouvelles traductions

### 1. Ajouter dans fr.json

```json
{
  "nouvellePage": {
    "titre": "Mon nouveau titre",
    "description": "Ma nouvelle description",
    "boutons": {
      "sauvegarder": "Enregistrer",
      "annuler": "Annuler"
    }
  }
}
```

### 2. Ajouter dans en.json

```json
{
  "nouvellePage": {
    "titre": "My new title",
    "description": "My new description",
    "boutons": {
      "sauvegarder": "Save",
      "annuler": "Cancel"
    }
  }
}
```

### 3. Utiliser dans le composant

```jsx
const { t } = useLanguage()

return (
  <div>
    <h1>{t('nouvellePage.titre')}</h1>
    <p>{t('nouvellePage.description')}</p>
    <button>{t('nouvellePage.boutons.sauvegarder')}</button>
    <button>{t('nouvellePage.boutons.annuler')}</button>
  </div>
)
```

## 🎨 Personnalisation du sélecteur de langue

Le sélecteur de langue peut être personnalisé via CSS :

```css
.language-selector {
  /* Personnaliser la position */
}

.language-button {
  /* Personnaliser l'apparence du bouton */
}

.language-dropdown {
  /* Personnaliser le menu déroulant */
}
```

## 🔧 Configuration

### Ajouter une nouvelle langue

1. Créer un nouveau fichier de traduction (ex: `src/translations/es.json`)
2. Ajouter la langue dans `SUPPORTED_LANGUAGES` :

```jsx
export const SUPPORTED_LANGUAGES = {
  fr: { code: 'fr', name: 'Français', flag: '🇫🇷' },
  en: { code: 'en', name: 'English', flag: '🇺🇸' },
  es: { code: 'es', name: 'Español', flag: '🇪🇸' }
}
```

### Changer la langue par défaut

```jsx
const DEFAULT_LANGUAGE = 'en' // Changer de 'fr' à 'en'
```

## 📱 Fonctionnalités

### ✅ Implémentées

- [x] Sélecteur de langue dans le header
- [x] Traduction du header et footer
- [x] Traduction du hero slider
- [x] Traduction de la page programme
- [x] Persistance de la langue dans localStorage
- [x] Écran de chargement pendant les changements
- [x] Support responsive
- [x] Gestion d'erreurs

### 🔄 À implémenter (si nécessaire)

- [ ] Traduction de toutes les pages restantes
- [ ] Traduction des formulaires
- [ ] Traduction des messages d'erreur
- [ ] Support RTL pour d'autres langues
- [ ] Détection automatique de la langue du navigateur

## 🐛 Dépannage

### Clé de traduction manquante

Si une clé n'est pas trouvée, le système :
1. Affiche un warning dans la console
2. Retourne la clé elle-même comme fallback

### Fichier de traduction non trouvé

Le système charge automatiquement le français comme fallback.

### Performance

Les traductions sont chargées de manière asynchrone et mises en cache pour éviter les rechargements inutiles.

## 🎯 Bonnes pratiques

1. **Organisation des clés** : Utilisez une structure hiérarchique claire
2. **Nommage** : Utilisez des noms descriptifs (ex: `header.navigation.home`)
3. **Cohérence** : Gardez la même structure dans tous les fichiers de langue
4. **Paramètres** : Utilisez `{{param}}` pour les valeurs dynamiques
5. **Fallbacks** : Toujours fournir une traduction par défaut

## 📊 Statistiques actuelles

- **Langues supportées** : 2 (Français, Anglais)
- **Composants traduits** : Header, Footer, HeroSlider, Program
- **Clés de traduction** : ~100+
- **Taille des fichiers** : ~15KB total

Le système est maintenant prêt à être étendu pour couvrir l'ensemble du site !
