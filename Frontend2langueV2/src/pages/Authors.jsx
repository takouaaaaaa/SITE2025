import React from 'react'
import {
  FaFileAlt,
  FaCheckCircle,
  FaCalendarAlt,
  FaPenFancy,
  FaUsers
} from 'react-icons/fa'
import usePageTranslation from '../hooks/usePageTranslation'
import './Authors.css'

const Authors = () => {
  const { title, subtitle, getText } = usePageTranslation('authors')
  const importantDates = [
    {
      date: getText('pages.authors.dates.paperSubmission.date'),
      event: getText('pages.authors.dates.paperSubmission.event'),
      description: getText('pages.authors.dates.paperSubmission.description'),
      icon: <FaFileAlt />,
      color: '#e74c3c',
      status: 'critical'
    },
    {
      date: getText('pages.authors.dates.acceptanceNotification.date'),
      event: getText('pages.authors.dates.acceptanceNotification.event'),
      description: getText('pages.authors.dates.acceptanceNotification.description'),
      icon: <FaCheckCircle />,
      color: '#27ae60',
      status: 'success'
    },
    {
      date: getText('pages.authors.dates.registrationDeadline.date'),
      event: getText('pages.authors.dates.registrationDeadline.event'),
      description: getText('pages.authors.dates.registrationDeadline.description'),
      icon: <FaCalendarAlt />,
      color: '#2980b9',
      status: 'important'
    },
    {
      date: getText('pages.authors.dates.cameraReady.date'),
      event: getText('pages.authors.dates.cameraReady.event'),
      description: getText('pages.authors.dates.cameraReady.description'),
      icon: <FaPenFancy />,
      color: '#e67e22',
      status: 'deadline'
    },
    {
      date: getText('pages.authors.dates.conference.date'),
      event: getText('pages.authors.dates.conference.event'),
      description: getText('pages.authors.dates.conference.description'),
      icon: <FaUsers />,
      color: '#8e44ad',
      status: 'event'
    }
  ]

  return (
    <div className="page-container authors-page">
      <div className="container">
        <div className="page-header">
          <h1>{title}</h1>
          <p className="page-subtitle">
            {subtitle}
          </p>
        </div>

        <div className="page-content">
          {/* Important Dates */}
          <div className="important-dates-section">
            <h2 className="section-title">{getText('pages.authors.importantDates.title')}</h2>
            <p className="section-description">
              {getText('pages.authors.importantDates.description')}
            </p>
            <div className="dates-timeline">
              {importantDates.map((item, index) => (
                <div key={index} className={`timeline-item ${item.status}`}>
                  <div className="timeline-marker">
                    {item.icon}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-date">
                      {item.date}
                    </div>
                    <div className="timeline-event">{item.event}</div>
                    <div className="timeline-description">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authors
