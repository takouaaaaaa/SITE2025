import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import LanguageLoader from './components/LanguageLoader'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import CallForPapers from './pages/CallForPapers'
import Registration from './pages/Registration'
import RegistrationForm from './pages/RegistrationForm'
import Committees from './pages/Committees'
import Program from './pages/Program'
import ContactUs from './pages/ContactUs'
import Venue from './pages/Venue'
import SubmissionGuidelines from './pages/SubmissionGuidelines'
import ScientificCommittee from './pages/ScientificCommittee'
import OrganizingCommittee from './pages/OrganizingCommittee'
import CallForSpecialSessions from './pages/CallForSpecialSessions'
import PreviousEditions from './pages/PreviousEditions'
import Site2023 from './pages/Site2023'
import Site2024 from './pages/Site2024'
import Authors from './pages/Authors'
import HonoraryCommittee from './pages/HonoraryCommittee'
import NotFound from './pages/NotFound'
import './App.css'
import { ConfigProvider } from './contexts/ConfigContext'
import { useRealTimeUpdates } from './hooks/useRealTimeUpdates'


function App() {
  useRealTimeUpdates();
  return (
    <LanguageProvider>
      <LanguageLoader>
        <ConfigProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/venue" element={<Venue />} />
                <Route path="/call-for-papers" element={<CallForPapers />} />
                <Route path="/call-for-special-sessions" element={<CallForSpecialSessions />} />
                <Route path="/submission" element={<SubmissionGuidelines />} />
                <Route path="/submission-guidelines" element={<SubmissionGuidelines />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/registration-form" element={<RegistrationForm />} />
                <Route path="/committees" element={<Committees />} />
                <Route path="/honorary-committee" element={<HonoraryCommittee />} />
                <Route path="/scientific-committee" element={<ScientificCommittee />} />
                <Route path="/organizing-committee" element={<OrganizingCommittee />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/program" element={<Program />} />
                <Route path="/previous-editions" element={<PreviousEditions />} />
                <Route path="/site-2023" element={<Site2023 />} />
                <Route path="/site-2024" element={<Site2024 />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
        </ConfigProvider>
      </LanguageLoader>
    </LanguageProvider>
  )
}

export default App
