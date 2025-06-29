import React from 'react'
import usePageTranslation from '../hooks/usePageTranslation'
import './OrganizingCommittee.css'

const OrganizingCommittee = () => {
  const { title, getText } = usePageTranslation('organizingCommittee')
  const members = [
    "Abdelbacet MHAMDI",
    "Ali BEJAOUI",
    "Ali TRABELSI",
    "Aymen ELAMRAOUI",
    "Badreddine LARBI",
    "Bilel ZEMZEM",
    "Boudour BARATLI",
    "Dalila AMARA",
    "Faten SAIDANE",
    "Hajer BEN HAMMOUDA",
    "Hmaied HMIDA",
    "Houda KHATERCHI",
    "Imen FARHAT",
    "Imen JAMMALI",
    "Jihed ZGHAL",
    "Jihen BOKRI",
    "Kamel KAROUI",
    "Latifa TRABELSI",
    "Ltaief LAMMARI",
    "Malek KHADHRAOUI",
    "Mohamed Ali REZGUI",
    "Mohamed Radhouene MEJRI",
    "Mohamed GHARBI",
    "Mohamed Toumi NASRI",
    "Mounir BEN MUSTAPHA",
    "Naoufel FARES",
    "Nourallah AOUINA",
    "Ramzi BEN CHEHIDA",
    "Salah BEJAOUI",
    "Samira BOUMOUS",
    "Sana DILOU",
    "Souhaib AMDOUNI",
    "Yamna BEN JEMAA",
    "Yosr Zina ABDELKRIM",
    "Zouhir BOUMOUS",
  ]

  return (
    <>

      <div className="container">
        <div className="main-content">
          {/* Header Section */}
          <div >
            <h1 className="main-title">{title}</h1>
            <div className="title-underline"></div>
          </div>


          {/* Committee Members */}
          <div className="members-section">
            <div className="section-container">
              <h2 className="section-title">{getText('organizingCommittee.membersTitle')}</h2>
              <div className="members-grid">
                {members.map((member, index) => (
                  <div key={index} className="member-card">
                    <div className="member-content">
                      <div className="member-icon">
                        <div className="member-dot"></div>
                      </div>
                      <p className="member-name">{member}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrganizingCommittee