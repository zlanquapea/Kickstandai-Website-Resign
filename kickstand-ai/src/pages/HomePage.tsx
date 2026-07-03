import HeroSection from '../components/HeroSection'
import PartnerMarquee from '../components/PartnerMarquee'
import ContentBlock from '../components/ContentBlock'
import FoundersSection from '../components/FoundersSection'
import CTASection from '../components/CTASection'
import usePageTitle from '../hooks/usePageTitle'

const healthcareLinks = [
  { label: 'Patient intake automation', href: '/healthcare#intake' },
  { label: 'Clinical documentation support', href: '/healthcare#documentation' },
  { label: 'Billing & coding assistance', href: '/healthcare#billing' },
  { label: 'KarmenHealth platform', href: '/healthcare', external: true },
]

const sustainabilityLinks = [
  { label: 'Crop health monitoring', href: '/sustainability#crop' },
  { label: 'Supply chain traceability', href: '/sustainability#supply' },
  { label: 'Carbon footprint analytics', href: '/sustainability#carbon' },
  { label: 'View sustainability portfolio', href: '/sustainability', external: true },
]

function HomePage() {
  usePageTitle('AI Infrastructure for Healthcare & Sustainability')

  return (
    <>
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
        ctaHref="/healthcare"
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
        ctaHref="/sustainability"
        reverse={true}
      />
      <FoundersSection />
      <CTASection />
    </>
  )
}

export default HomePage
