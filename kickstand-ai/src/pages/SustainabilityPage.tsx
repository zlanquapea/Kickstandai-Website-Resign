import PageHeader from '../components/PageHeader'
import DivisionSection from '../components/DivisionSection'
import DivisionCTA from '../components/DivisionCTA'
import usePageTitle from '../hooks/usePageTitle'

function SustainabilityPage() {
  usePageTitle('Sustainability Division')

  return (
    <>
      <PageHeader
        eyebrow="Plant-Powered Innovation"
        title="Intelligent systems for a"
        titleAccent="planet in flux."
        accentColor="lavender"
        body="We bring AI into agricultural supply chains, crop intelligence, and carbon accountability — translating ecological complexity into decisions teams can act on today."
      />

      <DivisionSection
        id="crop"
        index="01"
        title="Crop health monitoring"
        description="Satellite, drone, and sensor data fused into a single view of field health — catching stress, disease, and irrigation issues before they spread."
        bullets={[
          'Multispectral imagery analysis for early stress detection',
          'Automated alerts routed to field teams by severity',
          'Historical yield modeling to guide planting decisions',
        ]}
        accentColor="lavender"
      />

      <DivisionSection
        id="supply"
        index="02"
        title="Supply chain traceability"
        description="End-to-end visibility from farm to shelf, with AI reconciling shipment, certification, and provenance data automatically."
        bullets={[
          'Automated chain-of-custody documentation',
          'Certification and compliance tracking across suppliers',
          'Anomaly detection for supply chain disruptions',
        ]}
        accentColor="lavender"
        reverse
      />

      <DivisionSection
        id="carbon"
        index="03"
        title="Carbon footprint analytics"
        description="Turn scattered emissions data into audit-ready carbon accounting — modeled at the field, facility, and portfolio level."
        bullets={[
          'Automated Scope 1–3 emissions estimation',
          'Portfolio-level carbon reporting for stakeholders',
          'Scenario modeling for reduction initiatives',
        ]}
        accentColor="lavender"
      />

      <DivisionCTA
        eyebrow="Sustainability Division"
        title="Turn ecological complexity"
        titleAccent="into action."
        body="We scope every sustainability engagement around your data and your goals — not a generic dashboard template. Let's talk about your portfolio."
        accentColor="lavender"
        secondaryLabel="See case studies"
        secondaryTo="/case-studies"
      />
    </>
  )
}

export default SustainabilityPage
