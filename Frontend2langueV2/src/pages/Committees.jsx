import React from 'react'
import { Link } from 'react-router-dom'
import usePageTranslation from '../hooks/usePageTranslation'
import './Pages.css'

const Committees = () => {
  const { title, getText } = usePageTranslation('committees')

  const committees = [
    {
      title: getText('pages.honoraryCommittee.title'),
      description: getText('pages.honoraryCommittee.subtitle'),
      link: "/honorary-committee",
      members: getText('honorary.members'),
      role: getText('honorary.role')
    },
    {
      title: getText('pages.scientificCommittee.title'),
      description: getText('pages.scientificCommittee.subtitle'),
      link: "/scientific-committee",
      members: getText('scientific.members'),
      role: getText('scientific.role')
    },
    {
      title: getText('pages.organizingCommittee.title'),
      description: getText('pages.organizingCommittee.subtitle'),
      link: "/organizing-committee",
      members: getText('organizing.members'),
      role: getText('organizing.role')
    }
  ]

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>{title}</h1>
        </div>

        <div className="page-content">
          <div className="committees-intro">
            <p>
              {getText('description')}
            </p>
          </div>

          <div className="committees-grid">
            {committees.map((committee, index) => (
              <div key={index} className="committee-overview-card">
                <h3>
                  <Link to={committee.link} className="committee-link">
                    {committee.title}
                  </Link>
                </h3>
                <p className="committee-description">{committee.description}</p>
                <div className="committee-stats">
                  <div className="stat-item">
                    <strong>{getText('membersLabel')}:</strong> {committee.members}
                  </div>
                  <div className="stat-item">
                    <strong>{getText('roleLabel')}:</strong> {committee.role}
                  </div>
                </div>
                <Link to={committee.link} className="btn btn-primary committee-btn">
                  {getText('viewCommittee')}
                </Link>
              </div>
            ))}
          </div>

          <div className="committees-collaboration">
            <h3>{getText('collaboration.title')}</h3>
            <p>
              {getText('collaboration.description')}
            </p>
          </div>

          <div className="join-committee">
            <h3>{getText('join.title')}</h3>
            <p>
              {getText('join.description')}
            </p>
            <a href="mailto:contact@site-conf.com" className="btn btn-secondary">
              {getText('join.contactUs')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Committees
