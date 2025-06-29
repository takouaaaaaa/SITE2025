import React from 'react'
import { FaCreditCard, FaUpload } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

const PaymentInfoSection = ({ formData, errors, onChange }) => {
  const { t } = useLanguage()
  const paymentMethods = [
    { value: 'paiement_par_virement_bancaire', label: t('pages.registrationForm.payment.bankTransfer') },
    { value: 'paiement_par_mandat_administratif', label: t('pages.registrationForm.payment.administrativeOrder') },
    { value: 'paiement_par_cheque', label: t('pages.registrationForm.payment.check') }
  ]

  return (
    <div className="form-section">
      <h3 className="section-title">
        <FaCreditCard /> {t('pages.registrationForm.payment.title')}
      </h3>

      <div className="form-group">
        <label htmlFor="paymentMethod">{t('pages.registrationForm.payment.paymentMethod')} *</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={onChange}
          className={errors.paymentMethod ? 'error' : ''}
        >
          <option value="">{t('pages.registrationForm.payment.paymentMethodPlaceholder')}</option>
          {paymentMethods.map((method) => (
            <option key={method.value} value={method.value}>
              {method.label}
            </option>
          ))}
        </select>
        {errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}
      </div>

      {/* Display calculated total for reference */}
      {formData.calculatedTotal > 0 && (
        <div className="payment-summary">
          <h4>{t('pages.registrationForm.payment.paymentSummary')}</h4>
          <div className="total-amount">
            <span>{t('pages.registrationForm.payment.totalAmountToPay')}:</span>
            <span className="amount-value">
              {formData.calculatedTotal} {formData.currency}
            </span>
          </div>
          <p className="payment-note">
            {t('pages.registrationForm.payment.paymentNote')}
          </p>
        </div>
      )}

      {formData.paymentMethod && (
        <div className="form-group">
          <label htmlFor="paymentProofPath">{t('pages.registrationForm.payment.paymentProof')} *</label>
          <div className="file-upload-container">
            <input
              type="file"
              id="paymentProofPath"
              name="paymentProofPath"
              onChange={onChange}
              accept="image/*"
              className={`file-input ${errors.paymentProofPath ? 'error' : ''}`}
            />
            <label htmlFor="paymentProofPath" className="file-upload-label">
              <FaUpload />
              {formData.paymentProofPath ? formData.paymentProofPath.name : t('pages.registrationForm.payment.chooseFile')}
            </label>
          </div>
          <p className="file-help-text">{t('pages.registrationForm.payment.fileHelpText')}</p>
          {errors.paymentProofPath && <span className="error-message">{errors.paymentProofPath}</span>}
        </div>
      )}
    </div>
  )
}

export default PaymentInfoSection
