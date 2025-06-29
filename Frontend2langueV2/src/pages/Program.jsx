import React, { useState, useMemo } from 'react';
import { FaCalendarAlt, FaClock, FaMicrophone, FaUsers, FaStar } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { useConfig } from '../contexts/ConfigContext'; // Import the main config context
import './Program_Premium.css';

const Program = () => {
  const { t } = useLanguage();
  // Fetch DYNAMIC data from our context instead of hardcoding
  const { speakers, sessions, loading } = useConfig();

  // Process the flat list of sessions into an object grouped by date
  // This logic correctly uses the ProgramSession data you provided
  const scheduleData = useMemo(() => {
    if (!sessions || sessions.length === 0) return {};

    const grouped = sessions.reduce((acc, session) => {
      const date = session.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        time: `${session.startTime.slice(0, 5)}-${session.endTime.slice(0, 5)}`,
        event: session.title,
        description: session.description,
      });
      return acc;
    }, {});

    for (const date in grouped) {
      grouped[date].sort((a, b) => a.time.localeCompare(b.time));
    }
    return grouped;
  }, [sessions]);

  const initialTab = Object.keys(scheduleData)[0] || '';
  const [activeTab, setActiveTab] = useState(initialTab);
  
  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  const activeSessions = scheduleData[activeTab] || [];

  if (loading) {
    return <div className="program-page-loading">{t('program.loading')}</div>;
  }

  return (
    <div className="program-page">
      <div className="page-container">
        <div className="program-hero">
          <h1 className="hero-title">{t('program.title')}</h1>
          <p className="hero-subtitle">{t('program.subtitle')}</p>
          <div className="hero-stats">
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <span className="stat-number">{speakers.length}</span>
              <span className="stat-label">{t('program.stats.speakers')}</span>
            </div>
            <div className="stat-item">
              <FaCalendarAlt className="stat-icon" />
              <span className="stat-number">{Object.keys(scheduleData).length}</span>
              <span className="stat-label">{t('program.stats.days')}</span>
            </div>
            <div className="stat-item">
              <FaMicrophone className="stat-icon" />
              <span className="stat-number">{sessions.length}+</span>
              <span className="stat-label">{t('program.stats.sessions')}</span>
            </div>
          </div>
        </div>

        <div className="speakers-section">
          <div className="section-header">
            <h2 className="section-title">
              <FaStar className="title-icon" />
              {t('program.speakers.title')}
            </h2>
            <p className="section-subtitle">{t('program.speakers.subtitle')}</p>
          </div>
          <div className="speakers-grid">
            {/* Map over the REAL speakers data from the context */}
            {speakers.map((speaker) => (
              <div key={speaker.id} className="speaker-card">
                <div className="speaker-image-container">
                  <img
                    // Use a placeholder since there is no photo in the DB
                    src="/site 2025 (5).png"
                    alt={speaker.name}
                    className="speaker-logo"
                  />
                </div>
                <div className="speaker-info">
                  {/* Use the fields from your Speaker entity */}
                  <h3>{speaker.name}</h3>
                  <p className="speaker-title">{speaker.title}</p>
                  <div className="speaker-topic">
                    <FaMicrophone className="topic-icon" />
                    {speaker.expertise} {/* Use 'expertise' field */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="schedule-section">
          <div className="section-header">
            <h2 className="section-title">
              <FaCalendarAlt className="title-icon" />
              {t('program.schedule.title')}
            </h2>
            <p className="section-subtitle">{t('program.schedule.subtitle')}</p>
          </div>

          <div className="schedule-container">
            <div className="schedule-tabs">
              {Object.keys(scheduleData).map((day) => (
                <button
                  key={day}
                  className={`tab-item ${activeTab === day ? 'active' : ''}`}
                  onClick={() => setActiveTab(day)}
                >
                  <FaCalendarAlt className="tab-icon" />
                  {day}
                </button>
              ))}
            </div>

            <div className="schedule-content">
              {activeSessions.map((session, index) => (
                <div key={index} className="session-item">
                  <div className="session-time">
                    <FaClock /> {session.time}
                  </div>
                  <div className="session-event">
                    <FaMicrophone /> {session.event}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Program;