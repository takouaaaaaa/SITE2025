import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaGraduationCap, FaUserTie } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import mainApi from '../services/mainApi'; // <-- Double-check this path is correct!
import './Pages.css';

const Registration = () => {
  const { t, currentLanguage } = useLanguage();
  const navigate = useNavigate();
  
  // State to hold the configuration from the backend
  const [config, setConfig] = useState(null);
  const [error, setError] = useState('');

  // Fetch the configuration data when the component loads
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await mainApi.getSiteConfig();
        setConfig(data);
      } catch (err) {
        console.error("Failed to fetch site configuration:", err);
        setError('Could not load registration information. Please try again later.');
      }
    };

    loadConfig();
  }, []); // The empty array ensures this runs only once

  // Helper variables from the fetched config data.
  // We use `?.` (optional chaining) to prevent errors before the data has loaded.
  const registrationOpenDate = config ? new Date(config.registrationOpenDate) : null;
  const registrationCloseDate = config ? new Date(config.registrationCloseDate) : null;

  const isRegistrationOpen = () => {
    if (!registrationOpenDate || !registrationCloseDate) return false;
    const currentDate = new Date();
    return currentDate >= registrationOpenDate && currentDate <= registrationCloseDate;
  };

  const isRegistrationClosed = () => {
    if (!registrationCloseDate) return false;
    const currentDate = new Date();
    return currentDate > registrationCloseDate;
  };

  const formatRegistrationDate = (date) => {
    if (!date) return '';
    const locale = currentLanguage === 'fr' ? 'fr-FR' : 'en-US';
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const handleRegisterNow = () => {
    if (isRegistrationOpen()) {
      navigate('/registration-form');
    }
  };
  
  // Add loading and error states for a better user experience
  if (error) {
    return <div className="page-container"><div className="container"><p className="error-message">{error}</p></div></div>;
  }
  
  if (!config) {
    return <div className="page-container"><div className="container"><p>{t('loading') || 'Loading...'}</p></div></div>;
  }
  
  // Registration fee data
  const registrationWithAccommodation = [
    {
      category: "Academic",
      tunisia: "700 TND",
      international: "450 €",
      icon: <FaGraduationCap />
    },
    {
      category: "Student",
      tunisia: "650 TND",
      international: "400 €",
      icon: <FaUsers />
    },
    {
      category: "Professional",
      tunisia: "750 TND",
      international: "500 €",
      icon: <FaUserTie />
    }
  ];

  const additionalFees = [
    {
      type: "Adult accompanying person",
      tunisia: "120 TND / night",
      international: "80 € / night"
    },
    {
      type: "Single supplement",
      tunisia: "25 TND / night",
      international: "25 € / night"
    },
    {
      type: "Children < 2 years",
      tunisia: "Free",
      international: "Free"
    },
    {
      type: "Child < 12 years with 2 adults",
      tunisia: "50% discount",
      international: "50% discount"
    },
    {
      type: "Child < 12 years in separate room or with single adult",
      tunisia: "30% discount",
      international: "30% discount"
    }
  ];

  const bankDetails = {
    bank: "Union Internationale des Banques",
    address: "Menzel Jemil",
    purpose: "Registration to SITE 2025",
    accountName: "Association de développement technologique de Bizerte",
    accountNumber: "12202000009030939395",
    iban: "TN591220200009030939395",
    swift: "UIBKTNTT",
    tin: "1343117/A",
    email: "contact@site-conf.com"
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>{t('pages.registration.title')}</h1>
          <p className="page-subtitle">{t('pages.registration.subtitle')}</p>
        </div>

        <div className="page-content">
          {/* Registration Overview */}
          <section className="registration-section">
            <h3>{t('registration.requirements.title')}</h3>
            <p>
              {t('registration.requirements.description')}
            </p>

            <h4>{t('registration.requirements.covers')}</h4>
            <ul>
              <li>{t('registration.requirements.materials')}</li>
              <li>{t('registration.requirements.accommodation')}</li>
            </ul>

            <p>{t('registration.requirements.options')}</p>
            <ul>
              <li><strong>{t('registration.requirements.present')}</strong></li>
              <li><strong>{t('registration.requirements.audience')}</strong></li>
            </ul>
            <p>{t('registration.requirements.withWithout')}</p>
          </section>

          {/* Check-in/Check-out Information */}
          <section className="registration-section">
            <h3>{t('registration.schedule.title')}</h3>
            <p><strong>{t('registration.schedule.arrival')}</strong></p>
            <p><strong>{t('registration.schedule.departure')}</strong></p>
            <p><strong>{t('registration.schedule.duration')}</strong></p>
            <p><strong>{t('registration.schedule.location')}</strong></p>
          </section>

          {/* Registration Fees - With Accommodation */}
          <section className="registration-section">
            <h3>{t('registration.fees.withAccommodation')}</h3>
            <table className="registration-table">
              <thead>
                <tr>
                  <th>{t('registration.fees.category')}</th>
                  <th>{t('registration.fees.fromTunisia')}</th>
                  <th>{t('registration.fees.fromOtherCountries')}</th>
                </tr>
              </thead>
              <tbody>
                {registrationWithAccommodation.map((fee, index) => (
                  <tr key={index}>
                    <td>{fee.category}</td>
                    <td>{fee.tunisia}</td>
                    <td>{fee.international}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Registration Fees - Without Accommodation */}
          <section className="registration-section">
            <h3>{t('registration.fees.withoutAccommodation')}</h3>
            <p>{t('registration.fees.withoutAccommodationDescription')}</p>
            <div className="price-highlight">
              <strong>{t('registration.fees.withoutAccommodationPrice')}</strong>
            </div>
            <p>{t('registration.fees.venueInfo')}</p>

            <div className="fees-includes">
              <h4>{t('registration.fees.includes.title')}</h4>
              <ul>
                <li>{t('registration.fees.includes.materials')}</li>
                <li>{t('registration.fees.includes.meals')}</li>
                <li>{t('registration.fees.includes.certificate')}</li>
                <li>{t('registration.fees.includes.proceedings')}</li>
                <li>{t('registration.fees.includes.networking')}</li>
                <li>{t('registration.fees.includes.wifi')}</li>
              </ul>
            </div>
          </section>

          {/* Payment Methods */}
          <section className="registration-section">
            <h3>{t('registration.payment.title')}</h3>
            <p>{t('registration.payment.instructions')}</p>
            <p><strong>{t('registration.payment.deadline')}</strong></p>

            <h4>{t('registration.payment.bankTransfer')}</h4>
            <ul>
              {t('registration.payment.bankTransferRules', { returnObjects: true }).map((rule, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: rule }} />
              ))}
            </ul>

            <h4>{t('registration.payment.bonCommande')}</h4>
            <p>{t('registration.payment.bonCommandeNote')}</p>
          </section>

          {/* Bank Account Details */}
          <section className="registration-section">
            <h3>{t('registration.bankDetails.title')}</h3>

            <h4>{t('registration.bankDetails.bankInfo')}</h4>
            <p><strong>{t('registration.bankDetails.bank')}:</strong> {bankDetails.bank} <a href="#">{t('registration.bankDetails.downloadBankId')}</a></p>
            <p><strong>{t('registration.bankDetails.address')}:</strong> {bankDetails.address}</p>
            <p><strong>{t('registration.bankDetails.purpose')}:</strong> {t('registration.bankDetails.purpose')}</p>
            <p><strong>{t('registration.bankDetails.accountName')}:</strong> {bankDetails.accountName}</p>

            <h4>{t('registration.bankDetails.paymentTo')}:</h4>
            <p><strong>{t('registration.bankDetails.accountNumber')}</strong></p>
            <p><strong>{t('registration.bankDetails.iban')}</strong></p>
            <p><strong>{t('registration.bankDetails.swift')}</strong></p>
            <p><strong>{t('registration.bankDetails.taxId')}</strong> <a href="#">{t('registration.bankDetails.downloadTaxId')}</a></p>
            <p><strong>{t('registration.bankDetails.rne')}</strong> <a href="#">{t('registration.bankDetails.downloadRne')}</a></p>
          </section>

          {/* Additional Fees */}
          <section className="registration-section">
            <h3>{t('registration.additionalFees.title')}</h3>
            <table className="registration-table">
              <thead>
                <tr>
                  <th>{t('registration.additionalFees.feeType')}</th>
                  <th>{t('registration.additionalFees.fromTunisia')}</th>
                  <th>{t('registration.additionalFees.fromOtherCountries')}</th>
                </tr>
              </thead>
              <tbody>
                {additionalFees.map((fee, index) => (
                  <tr key={index}>
                    <td>{fee.type}</td>
                    <td>{fee.tunisia}</td>
                    <td>{fee.international}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h4>{t('registration.additionalFees.additionalServices')}</h4>
            <p>{t('registration.additionalFees.airportTransfer')}</p>
            <p>{t('registration.additionalFees.socialEvent')}</p>
          </section>

          {/* Registration Access */}
          <section className="registration-access">
            {isRegistrationClosed() ? (
              <div className="access-card closed">
                <h3>{t('registration.access.registrationClosed')}</h3>
                <p>{t('registration.access.registrationClosedOn', { date: formatRegistrationDate(registrationCloseDate) })}</p>
                <p>{t('registration.access.registrationNoLongerAvailable')}</p>
              </div>
            ) : isRegistrationOpen() ? (
              <div className="access-card open">
                <h3>{t('registration.access.registrationOpen')}</h3>
                <p>{t('registration.access.dontMissOut')}</p>
                <p className="deadline">{t('registration.access.registrationCloses', { date: formatRegistrationDate(registrationCloseDate) })}</p>
                <button
                  className="access-btn primary"
                  onClick={handleRegisterNow}
                >
                  {t('registration.access.startRegistration')}
                </button>
              </div>
            ) : (
              <div className="access-card upcoming">
                <h3>{t('registration.access.registrationOpeningSoon')}</h3>
                <p>{t('registration.access.registrationWillOpen', { date: formatRegistrationDate(registrationOpenDate) })}</p>
                <p>{t('registration.access.getReady')}</p>
                <button
                  className="access-btn disabled"
                  disabled
                >
                  {t('registration.access.comingSoon')}
                </button>
              </div>
            )}
          </section>

          {/* Contact Information */}
          <section className="registration-section">
            <h3>{t('registration.contact.title')}</h3>
            <p><a href="mailto:contact@site-conf.com">{t('registration.contact.email')}</a></p>
            <p>{t('registration.contact.moreInfo')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Registration;