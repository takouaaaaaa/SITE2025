import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

const FormActions = ({ isSubmitting, onSubmit }) => {
  const { t } = useLanguage()

  return (
    <div className="form-actions">
      <button
        type="submit"
        className="submit-btn"
        disabled={isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting ? (
          <>{t('pages.registrationForm.actions.submitting')}</>
        ) : (
          <>
            <FaCheck /> {t('pages.registrationForm.actions.submit')}
          </>
        )}
      </button>
    </div>
  )
}

export default FormActions
