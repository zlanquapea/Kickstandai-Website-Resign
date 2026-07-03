import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollManager from './components/ScrollManager'
import HomePage from './pages/HomePage'
import HealthcarePage from './pages/HealthcarePage'
import SustainabilityPage from './pages/SustainabilityPage'
import AboutPage from './pages/AboutPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'
import SchedulePage from './pages/SchedulePage'

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/schedule" element={<SchedulePage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/healthcare" element={<HealthcarePage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
