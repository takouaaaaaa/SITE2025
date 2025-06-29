import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaMicrophone, FaUsers, FaStar } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import './Program_Premium.css';

const Program = () => {
  const { t } = useLanguage()
  const speakersData = t('program.speakers.list', { returnObjects: true }) || [
    {
      name: 'Speaker',
      title: 'CEO',
      topic: 'Smart Factory'
    },
    {
      name: 'Speaker',
      title: 'Professor',
      topic: 'Mechanical Engineering'
    },
    {
      name: 'Speaker',
      title: 'Professor',
      topic: 'Big Data & Security'
    },
    {
      name: 'Speaker',
      title: 'Digital Marketing',
      topic: 'Marketing'
    }
  ];

  const scheduleData = {
    [t('program.schedule.days.march15')]: [
      { time: '08:30-09:00', event: t('program.schedule.events.registration') },
      { time: '09:00-09:30', event: t('program.schedule.events.opening') },
      { time: '09:30-10:30', event: t('program.schedule.events.keynote1') },
      { time: '10:30-11:00', event: t('program.schedule.events.coffeeBreak') },
      { time: '11:00-12:30', event: t('program.schedule.events.session1') },
      { time: '12:30-14:00', event: t('program.schedule.events.lunch') },
      { time: '14:00-15:30', event: t('program.schedule.events.session2') },
      { time: '15:30-16:00', event: t('program.schedule.events.coffeeBreak') },
      { time: '16:00-17:30', event: t('program.schedule.events.panel') },
    ],
    [t('program.schedule.days.march16')]: [
      { time: '09:00-10:00', event: t('program.schedule.events.keynote2') },
      { time: '10:00-10:30', event: t('program.schedule.events.coffeeBreak') },
      { time: '10:30-12:00', event: t('program.schedule.events.session3') },
      { time: '12:00-13:30', event: t('program.schedule.events.lunch') },
      { time: '13:30-15:00', event: t('program.schedule.events.session4') },
      { time: '15:00-15:30', event: t('program.schedule.events.coffeeBreak') },
      { time: '15:30-17:00', event: t('program.schedule.events.workshop') },
      { time: '17:00-18:00', event: t('program.schedule.events.poster') },
    ],
    [t('program.schedule.days.march17')]: [
      { time: '09:00-10:00', event: t('program.schedule.events.keynote3') },
      { time: '10:00-10:30', event: t('program.schedule.events.coffeeBreak') },
      { time: '10:30-12:00', event: t('program.schedule.events.session5') },
      { time: '12:00-13:30', event: t('program.schedule.events.lunch') },
      { time: '13:30-15:00', event: t('program.schedule.events.session6') },
      { time: '15:00-15:30', event: t('program.schedule.events.coffeeBreak') },
      { time: '15:30-16:30', event: t('program.schedule.events.closing') },
    ],
    [t('program.schedule.days.specialSessions')]: [
      { time: 'soon', event: t('program.schedule.events.toBeAnnounced') },
    ],
  };

  const [activeTab, setActiveTab] = useState(t('program.schedule.days.march15'));
  const activeSessions = scheduleData[activeTab] || [];

  return (
    <div className="program-page">
      <div className="page-container">
        <div className="program-hero">
          <h1 className="hero-title">{t('program.title')}</h1>
          <p className="hero-subtitle">{t('program.subtitle')}</p>
          <div className="hero-stats">
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <span className="stat-number">4</span>
              <span className="stat-label">{t('program.stats.speakers')}</span>
            </div>
            <div className="stat-item">
              <FaCalendarAlt className="stat-icon" />
              <span className="stat-number">3</span>
              <span className="stat-label">{t('program.stats.days')}</span>
            </div>
            <div className="stat-item">
              <FaMicrophone className="stat-icon" />
              <span className="stat-number">10+</span>
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
            {speakersData.map((speaker, index) => (
              <div key={index} className="speaker-card">
                <div className="speaker-image-container">
                  <img
                    src="/site 2025 (5).png"
                    alt="SITE 2025 Conference Logo"
                    className="speaker-logo"
                  />
                </div>
                <div className="speaker-info">
                  <h3>{speaker.name}</h3>
                  <p className="speaker-title">{speaker.title}</p>
                  <p className="speaker-company">{speaker.affiliation}</p>
                  <div className="speaker-topic">
                    <FaMicrophone className="topic-icon" />
                    {speaker.topic}
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