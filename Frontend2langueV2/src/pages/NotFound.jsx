import React from 'react'
import { Link } from 'react-router-dom'
import usePageTranslation from '../hooks/usePageTranslation'
import './Pages.css'

const NotFound = () => {
  const { title, subtitle, getPageText } = usePageTranslation('notFound')

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>{title}</h1>
        </div>

        <div className="page-content">
          <p>{subtitle}</p>
          <Link to="/" className="btn btn-primary">
            {getPageText('backHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
