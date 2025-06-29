import React from 'react'
import { FaDownload, FaPaperPlane } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import './Pages.css'

const SubmissionGuidelines = () => {
  const { t } = useLanguage()
  const title = t('submissionGuidelines.title')

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>{title}</h1>
        </div>
        
        <div className="page-content">

          <div className="guidelines-content">
            <h3>{t('submissionGuidelines.language.requirement')}</h3>
             {/* Action Buttons */}
          <div className="submission-actions">
            <button
              className="action-button download-button"
              onClick={() => {
                const templateUrl = 'https://site-conf.com/wp-content/uploads/2025/06/Template_SITE2023.docx';
                const link = document.createElement('a');
                link.href = templateUrl;
                link.download = 'Template_SITE2025.docx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <FaDownload className="button-icon" />
              {t('submissionGuidelines.template.download')}
            </button>

            <button
              className="action-button submit-button"
              onClick={() => {
                window.open('https://cmt3.research.microsoft.com/User/Login?ReturnUrl=%2FConference%2FRecent', '_blank');
              }}
            >
              <FaPaperPlane className="button-icon" />
              {t('submissionGuidelines.abstract.submit')}
            </button>
          </div>


            <p>
             {t('submissionGuidelines.platform.description')}</p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmissionGuidelines
