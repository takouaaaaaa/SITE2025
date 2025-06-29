/**
 * Utilitaire pour valider les fichiers de traduction
 * Vérifie que toutes les clés existent dans toutes les langues
 */

import frTranslations from '../translations/fr.json'
import enTranslations from '../translations/en.json'

/**
 * Récupère toutes les clés d'un objet de traduction de manière récursive
 * @param {Object} obj - Objet de traduction
 * @param {string} prefix - Préfixe pour les clés imbriquées
 * @returns {Array} - Tableau de toutes les clés
 */
function getAllKeys(obj, prefix = '') {
  let keys = []
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys = keys.concat(getAllKeys(obj[key], fullKey))
      } else {
        keys.push(fullKey)
      }
    }
  }
  
  return keys
}

/**
 * Valide que toutes les clés existent dans toutes les langues
 * @returns {Object} - Résultat de la validation
 */
export function validateTranslations() {
  const frKeys = getAllKeys(frTranslations)
  const enKeys = getAllKeys(enTranslations)
  
  const missingInFr = enKeys.filter(key => !frKeys.includes(key))
  const missingInEn = frKeys.filter(key => !enKeys.includes(key))
  
  const isValid = missingInFr.length === 0 && missingInEn.length === 0
  
  return {
    isValid,
    totalKeys: {
      fr: frKeys.length,
      en: enKeys.length
    },
    missingKeys: {
      fr: missingInFr,
      en: missingInEn
    },
    summary: {
      totalFrenchKeys: frKeys.length,
      totalEnglishKeys: enKeys.length,
      missingInFrench: missingInFr.length,
      missingInEnglish: missingInEn.length
    }
  }
}

/**
 * Affiche un rapport de validation dans la console
 */
export function logValidationReport() {
  const validation = validateTranslations()
  
  console.group('🌐 Translation Validation Report')
  
  if (validation.isValid) {
    console.log('✅ All translations are valid!')
    console.log(`📊 Total keys: ${validation.totalKeys.fr}`)
  } else {
    console.warn('⚠️ Translation issues found:')
    
    if (validation.missingKeys.fr.length > 0) {
      console.group('🇫🇷 Missing in French:')
      validation.missingKeys.fr.forEach(key => console.log(`- ${key}`))
      console.groupEnd()
    }
    
    if (validation.missingKeys.en.length > 0) {
      console.group('🇺🇸 Missing in English:')
      validation.missingKeys.en.forEach(key => console.log(`- ${key}`))
      console.groupEnd()
    }
  }
  
  console.table(validation.summary)
  console.groupEnd()
  
  return validation
}

/**
 * Teste une clé de traduction spécifique
 * @param {string} key - Clé à tester
 * @returns {Object} - Résultat du test
 */
export function testTranslationKey(key) {
  const frValue = getNestedValue(frTranslations, key)
  const enValue = getNestedValue(enTranslations, key)
  
  return {
    key,
    exists: {
      fr: frValue !== undefined,
      en: enValue !== undefined
    },
    values: {
      fr: frValue,
      en: enValue
    },
    isValid: frValue !== undefined && enValue !== undefined
  }
}

/**
 * Récupère une valeur imbriquée d'un objet
 * @param {Object} obj - Objet source
 * @param {string} key - Clé avec notation pointée
 * @returns {*} - Valeur trouvée ou undefined
 */
function getNestedValue(obj, key) {
  return key.split('.').reduce((current, keyPart) => {
    return current && current[keyPart] !== undefined ? current[keyPart] : undefined
  }, obj)
}

/**
 * Trouve les clés de traduction utilisées dans un fichier
 * @param {string} fileContent - Contenu du fichier
 * @returns {Array} - Clés trouvées
 */
export function findTranslationKeysInFile(fileContent) {
  // Regex pour trouver les appels à t('key') ou t("key")
  const regex = /t\(['"`]([^'"`]+)['"`]\)/g
  const keys = []
  let match
  
  while ((match = regex.exec(fileContent)) !== null) {
    keys.push(match[1])
  }
  
  return [...new Set(keys)] // Supprimer les doublons
}

// Exécuter la validation automatiquement en mode développement
if (process.env.NODE_ENV === 'development') {
  // Attendre que le DOM soit chargé
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      setTimeout(() => {
        logValidationReport()
      }, 1000)
    })
  }
}
