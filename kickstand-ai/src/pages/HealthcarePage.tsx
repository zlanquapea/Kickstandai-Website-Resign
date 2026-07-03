import PageHeader from '../components/PageHeader'
import DivisionSection from '../components/DivisionSection'
import DivisionCTA from '../components/DivisionCTA'
import usePageTitle from '../hooks/usePageTitle'

function HealthcarePage() {
  usePageTitle('Healthcare Division · KarmenHealth')

  return (
    <>
      <PageHeader
        eyebrow="Healthcare Division"
        title="KarmenHealth runs the"
        titleAccent="paperwork so your team doesn't have to."
        accentColor="mint"
        body="An AI-powered workflow platform built for clinical teams — from the moment a patient walks in to the moment the claim is paid. Less admin overhead, more time with patients."
      />

      <DivisionSection
        id="intake"
        index="01"
        title="Patient intake automation"
        description="Digitize and streamline the intake process end to end — insurance verification, forms, and scheduling handled before the patient sits down."
        bullets={[
          'Automated insurance eligibility checks in real time',
          'Digital intake forms that sync straight into your EHR',
          'Smart scheduling that reduces no-shows and double-booking',
        ]}
        accentColor="mint"
      />

      <DivisionSection
        id="documentation"
        index="02"
        title="Clinical documentation support"
        description="Ambient, AI-assisted note-taking that drafts structured clinical documentation during and after visits — reviewed and signed off by your providers."
        bullets={[
          'Ambient visit summarization with speaker-aware transcripts',
          'Auto-structured SOAP notes ready for provider review',
          'Built-in HIPAA-compliant storage and audit trails',
        ]}
        accentColor="mint"
        reverse
      />

      <DivisionSection
        id="billing"
        index="03"
        title="Billing & coding assistance"
        description="Reduce claim denials and days-in-A/R with AI that suggests accurate codes, flags missing documentation, and reconciles remittances automatically."
        bullets={[
          'AI-suggested CPT/ICD-10 coding from clinical notes',
          'Pre-submission claim scrubbing to cut denial rates',
          'Automated remittance reconciliation and reporting',
        ]}
        accentColor="mint"
      />

      <DivisionCTA
        eyebrow="KarmenHealth"
        title="Give your clinical team"
        titleAccent="the time back."
        body="Every engagement is scoped to your practice's actual workflow — no off-the-shelf template. Let's talk about what's slowing your team down."
        accentColor="mint"
        secondaryLabel="See case studies"
        secondaryTo="/case-studies"
      />
    </>
  )
}

export default HealthcarePage
