import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import PartnerMarquee from './components/PartnerMarquee'
import ContentBlock from './components/ContentBlock'
import FoundersSection from './components/FoundersSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

const healthcareLinks = [
  { label: 'Patient intake automation', href: '#intake' },
  { label: 'Clinical documentation support', href: '#documentation' },
  { label: 'Billing & coding assistance', href: '#billing' },
  { label: 'KarmenHealth platform', href: '#karmen', external: true },
]

const sustainabilityLinks = [
  { label: 'Crop health monitoring', href: '#crop' },
  { label: 'Supply chain traceability', href: '#supply' },
  { label: 'Carbon footprint analytics', href: '#carbon' },
  { label: 'View sustainability portfolio', href: '#portfolio', external: true },
]

function App() {
  return (
    <div className="bg-bg-primary min-h-screen text-text-primary font-sans">
      <Navbar />
      <HeroSection />
      <PartnerMarquee />
      <ContentBlock
        id="healthcare"
        division="01"
        label="Healthcare Division"
        headline="Healthcare that runs"
        headlineAccent="without friction."
        body="KarmenHealth equips clinical teams with AI-powered workflow systems — from patient intake to billing reconciliation. Less overhead. More care. Built for the humans doing the hardest work."
        accentColor="mint"
        links={healthcareLinks}
        ctaText="Explore Healthcare Division"
        reverse={false}
      />
      <ContentBlock
        id="sustainability"
        division="02"
        label="Plant-Powered Innovation"
        headline="Intelligent systems for a"
        headlineAccent="planet in flux."
        body="Our sustainability division brings AI into agricultural supply chains, crop intelligence, and carbon accountability — translating ecological complexity into decisions teams can act on today."
        accentColor="lavender"
        links={sustainabilityLinks}
        ctaText="Explore Sustainability Division"
        reverse={true}
      />
      <FoundersSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App