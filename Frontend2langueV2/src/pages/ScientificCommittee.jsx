import React from 'react'
import usePageTranslation from '../hooks/usePageTranslation'
import { useLanguage } from '../contexts/LanguageContext'
import './ScientificCommittee.css'

const ScientificCommittee = () => {
  const { title } = usePageTranslation('scientificCommittee')
  const { t } = useLanguage()
  const chairs = [
    {
      titleKey: "pages.scientificCommittee.chairs.generalChair",
      name: "Mrs. Manel KHATERCHI",
      image: "/manel.jpg"
    },
    {
      titleKey: "pages.scientificCommittee.chairs.scientificChair",
      name: "Pr. Hassene SEDDIK",
      image: "/hassene.png"
    },
    {
      titleKey: "pages.scientificCommittee.chairs.scientificCoChair",
      name: "Pr. Mohamed Ali REZGUI",
      image: "/ali.png"
    },
    {
      titleKey: "pages.scientificCommittee.chairs.scientificCoChair",
      name: "Pr. Isabelle Bruant-Ricciardi",
      image: "/Isabelle.png"
    }
  ]

  const proceedingCommittee = [
    {
      name: "Mohamed SOULA (ENIT)",
      image: "/soula.jpg"
    },
    {
      name: "Ali TRABELSI (ENSIT)",
      image: "/Ali TRABELSI.jpg"
    },
    {
      name: "Jamel BELHADJ (HIDE – ENSIT)",
      image: "/jamelBelhadj.jpg"
    },
    {
      name: "Mohamedali SHIRINBAYAN (ENSAM Paris)",
      image: "/Mohammadali SHIRINBAYAN.jpg"
    },
  ]

  const members = [
    "Abdallah NASSOUR (Rostock University, Germany)",
    "Abdelaziz SAHBANI (FSB, Tunisia)",
    "Adel BECHIKH (ISET Rades, Tunisia)",
    "Afef ABDELKRIM (ENICarthage, Tunisia)",
    "Anis HAMROUNI (UVT, Tunisia)",
    "Atef BOULILA (INSAT, Tunisia)",
    "Badreddine RATNI (Université Paris Nanterre, France)",
    "Basma LAMOUCHI (ENSIT, Tunisia)",
    "Bechir ALLOUCH (UVT, Tunisia)",
    "Besma BEN SALAH (ISET Sousse, Tunisia)",
    "Chiraz GHARBI (ISET Bizerte, Tunisia)",
    "Faouzi BACHA (ENSIT, Tunisia)",
    "Faouzi BOUANI (ENIT, Tunisia)",
    "Ferid KOURDA (ENIT, Tunisia)",
    "Foued LANDOLSI (ISET Nabeul, Tunisia)",
    "Habib SMEI (ISET Rades, Tunisia)",
    "Hamdi JMAL (IUT de Haguenau, France)",
    "Hassen KHARROUBI (ESIM, Tunisia)",
    "Hechmi KHATERCHI (UVT, Tunisia)",
    "Houria GHODBANE (Souk Ahras University, Algeria)",
    "Houyem ABDERRAZEK (INRAP, Tunisia)",
    "Jamel MEJRI (ESIM, Tunisia)",
    "Jihed ZGHAL (IUT Paris Nanterre, France)",
    "Jihen ARBI ZIANI (ParisTech, France)",
    "Kamel BEN SAAD (ENIT, Tunisia)",
    "Kamel MESSAOUDI (Souk Ahras University, Algeria)",
    "Khaled BOUGHZALA (ISET Ksar Hellal, Tunisia)",
    "Khaled EL MOUEDDEB (ENSIM, Tunisia)",
    "Kaouther GHOZZI (ISET Radès, Tunisia)",
    "Kerstin KUCHTA (TUHH, Germany)",
    "Latifa RABAI (ISG, Tunisia)",
    "Malek KHADRAOUI (ISET Kasserine, Tunisia)",
    "Mahfoudh AYADI (ENIB, Tunisia)",
    "Mehdi TURKI (ESIM, Tunisia)",
    "Mehrez ROMDHANE (ENIG, Tunisia)",
    "Mohamed Fadhel SAAD (ISET Gafsa, Tunisia)",
    "Mohamed Habib SELLAMI (ESIM, Tunisia)",
    "Mohamed Toumi NASRI (ENIB, Tunisia)",
    "Monia GUIZA (ENIG, Tunisia)",
    "Mounir BEN MUSTAPHA (ISET Bizerte, Tunisia)",
    "Mounir FRIJA (ISSAT Sousse, Tunisia)",
    "Moktar HAMDI (INSAT, Tunisia)",
    "Moncef BEN SMIDA (INSAT, Tunisia)",
    "Noureddine BEN YAHYA (ENSIT, Tunisia)",
    "Noureddine HAJJAJI (ENIG, Tunisia)",
    "Rached GHARBI (ENSIT, Tunisia)",
    "Rachid NASRI (ENIT, Tunisia)",
    "Rainer STEGMANN (TUHH, Germany)",
    "Riad TOUFOUTI (Souk Ahras University, Algeria)",
    "Ridha AZIZI (ISET Sousse, Tunisia)",
    "Ridha KHEDRI (McMaster University, Canada)",
    "Rima ABBASSI (ISETCom, Tunisia)",
    "Sabri MESAOUDI (Qassim University, KSA)",
    "Salah BEJAOUI (ISET Bizerte, Tunisia)",
    "Sami BELLALAH (ISET Nabeul, Tunisia)",
    "Samira BOUMOUS (Souk Ahras University, Algeria)",
    "Samuel BERTHE (IUT de Schiltigheim, France)",
    "Sana BENKHLIFA (ESIM, Tunisia)",
    "Sawssen EL EUCH (ISET Rades, Tunisia)",
    "Sherien EL AGROUDY (Ain Shems University, Egypt)",
    "Sina OUERIMI (ISET Gabès, Tunisia)",
    "Skander REJEB (ENIG Gabès, Tunisia)",
    "Slaheddine KHELIFI (ISET Bizerte, Tunisia)",
    "Taoufik MHAMDI (ISET Kasserine, Tunisia)",
    "Tarek HAMROUNI (ISAMM, Tunisia)",
    "Toufik THELLAIDJIA (Souk Ahras University, Algeria)",
    "Walid BARHOUMI (ENICarthage, Tunisia)",
    "Yacine SAHRAOUI (University Soukahras, Algeria)",
    "Yahia KOURD (University Soukahras, Algeria)",
    "Youssef AGUERBI ZORGANI (ISET Sfax, Tunisia)",
    "Zouhir BOUMOUS (Souk Ahras University, Algeria)",
  ]

  return (
    <>

      <div className="container">
        <div className="main-content">
        {/* Header Section */}
          <div >
            <h1 className="main-title">{title}</h1>
          </div>
          {/* Committee Chairs */}
          <div className="section">
            <h2 className="section-title">{t('pages.scientificCommittee.chairsTitle')}</h2>
            <div className="chairs-grid">
              {chairs.map((chair, index) => (
                <div key={index} className="chair-card">
                  <div className="profile-image">
                    <div className="profile-image-ring">
                      <div className="profile-image-inner">
                        <img
                          src={chair.image}
                          alt={chair.name}
                          className="profile-img"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="chair-title">{t(chair.titleKey)}</div>
                  <h3 className="chair-name">{chair.name}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Proceeding Committee */}
          <div className="section">
            <div className="section-container">
              <h2 className="section-title">{t('pages.scientificCommittee.proceedingTitle')}</h2>
              <div className="proceeding-grid">
                {proceedingCommittee.map((member, index) => (
                  <div key={index} className="proceeding-card">
                    <div className="proceeding-image">
                      <div className="proceeding-image-ring">
                        <div className="proceeding-image-inner">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="profile-img"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="proceeding-name">{member.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scientific Committee Members */}
          <div className="section">
            <div className="section-container">
              <h2 className="section-title">{t('pages.scientificCommittee.membersTitle')}</h2>
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

export default ScientificCommittee