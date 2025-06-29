import { useLanguage } from '../contexts/LanguageContext'

/**
 * Hook simple pour traduire automatiquement les pages
 * @param {string} pageName - Nom de la page (ex: 'home', 'program', etc.)
 * @returns {object} - Objet avec les traductions de la page
 */
export const usePageTranslation = (pageName) => {
  const { t } = useLanguage()
  
  return {
    // Traductions de base pour toutes les pages
    title: t(`pages.${pageName}.title`),
    subtitle: t(`pages.${pageName}.subtitle`),
    description: t(`pages.${pageName}.description`),
    
    // Navigation
    nav: {
      home: t('header.navigation.home'),
      venue: t('header.navigation.venue'),
      committees: t('header.navigation.committees'),
      program: t('header.navigation.program'),
      authors: t('header.navigation.authors'),
      registration: t('header.navigation.registration'),
      previousEditions: t('header.navigation.previousEditions'),
      contactUs: t('header.navigation.contactUs')
    },
    
    // Boutons communs
    buttons: {
      learnMore: t('common.viewMore'),
      back: t('common.back'),
      next: t('common.next'),
      submit: t('common.submit'),
      cancel: t('common.cancel'),
      save: t('common.save')
    },
    
    // Fonction pour obtenir n'importe quelle traduction
    getText: (key) => t(key),
    
    // Fonction pour obtenir une traduction spécifique à la page
    getPageText: (key) => t(`pages.${pageName}.${key}`)
  }
}

export default usePageTranslation
