import React from 'react'
import usePageTranslation from '../hooks/usePageTranslation'

const HonoraryCommittee = () => {
  const { title, getText } = usePageTranslation('honoraryCommittee')
  const honoraryMembers = [
    {
      name: "Pr. Yomna REBAI",
      affiliation: "Direction generale des etudes technologiques, Tunisia",
      image: "/yomna.jpg"
    },
    {
      name: "Pr. Khaled HAMROUNI",
      affiliation: "Direction generale des etudes technologiques, Tunisia",
      image: "/khaled.hamrouni.jpg"
    },
    {
      name: "Mr. Ramzi ZAMMALI",
      affiliation: "PCB ",
      image: "/zammali-1.jpg"
    },
    {
      name: "Pr. Hakim HAMMAMI",
      affiliation: "Ecole Nationale d'Ingénieurs de Bizerte, Tunisia",
      image: "/hakim-1.jpg"
    },
    {
      name: "Pr. Slah OUERHANI",
      affiliation: "Institut national des sciences appliquées et de technologie",
      image: "/slah-.png"
    },
    {
      name: "Pr. Khaled ELMOUEDDEB",
      affiliation: "ESIM",
      image: "/khaled.jpg"
    }
  ]

  return (
    <>
      <style jsx>{`
        
        
        .main-title {
          font-size: 3rem;
          font-weight: bold;
          background: linear-gradient(135deg, #2563eb, #1d4ed8, #1e40af);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 16px;
          display: inline-block;
        }
        .title-underline {
          width: 96px;
          height: 4px;
          background: linear-gradient(135deg, #3b82f6, #9333ea);
          margin: 0 auto;
          border-radius: 2px;
        }


        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          margin-bottom: 64px;
        }

        .member-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          text-align: center;
        }

        .member-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          border-color: #bfdbfe;
        }

        .profile-image {
          width: 150px;
          height: 150px;
          margin: 0 auto 16px;
          position: relative;
        }

        .profile-image-ring {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #60a5fa, #a855f7);
          padding: 2px;
          transition: transform 0.3s ease;
        }

        .member-card:hover .profile-image-ring {
          transform: scale(1.05);
        }

        .profile-image-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: white;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .member-name {
          font-size: 1.25rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 8px;
          transition: color 0.3s ease;
        }

        .member-card:hover .member-name {
          color: #2563eb;
        }

        .member-affiliation {
          font-size: 0.875rem;
          color: #4b5563;
          line-height: 1.4;
          padding: 0 8px;
        }


        .acknowledgment-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 32px;
        }

        .acknowledgment-card {
          background:rgb(233, 231, 246);
          border-radius: 16px;
          padding: 32px;
          color: white;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .acknowledgment-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 16px;
          text-align: center;
        }

        .acknowledgment-text {
          color:rgb(32, 66, 139);
          line-height: 1.7;
          text-align: center;
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2rem;
          }
          
          .members-grid {
            grid-template-columns: 1fr;
          }
      
          .acknowledgment-section {
            padding: 16px;
          }
          
        }
      `}</style>

      <div className="container">
        <div className="main-content">
          {/* Header Section */}
          <div >
            <h1 className="main-title">{title}</h1>
            <div className="title-underline"></div>
            <p style={{ marginTop: '20px', marginBottom: '30px', textAlign: 'center', maxWidth: '800px', margin: '20px auto 30px' }}>
              {getText('pages.honoraryCommittee.description')}
            </p>
          </div>

          {/* Members Grid */}
          <div className="members-grid">
            {honoraryMembers.map((member, index) => (
              <div key={index} className="member-card">
                <div className="profile-image">
                  <div className="profile-image-ring">
                    <div className="profile-image-inner">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="profile-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-affiliation">{member.affiliation}</p>
              </div>
            ))}
          </div>

          

          {/* Acknowledgment */}
          <div className="acknowledgment-section">
            <div className="acknowledgment-card">
              <h3 className="acknowledgment-title">{getText('acknowledgment.title')}</h3>
              <p className="acknowledgment-text">
                {getText('acknowledgment.message')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HonoraryCommittee