import LegalPage from '../components/LegalPage'
import usePageTitle from '../hooks/usePageTitle'

function TermsPage() {
  usePageTitle('Terms of Service')

  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="July 3, 2026"
      sections={[
        {
          heading: 'Acceptance of terms',
          body: 'By accessing this website or scheduling a session with Kickstand AI, you agree to these terms. If you do not agree, please do not use this site.',
        },
        {
          heading: 'Scope of services',
          body: 'Kickstand AI provides AI-powered workflow infrastructure for healthcare and sustainability organizations. Specific deliverables, timelines, and pricing for any engagement are defined in a separate signed agreement, not on this website.',
        },
        {
          heading: 'No professional advice',
          body: 'Content on this site is provided for informational purposes only and does not constitute medical, legal, or financial advice.',
        },
        {
          heading: 'Intellectual property',
          body: 'All content on this site — including text, graphics, and the KarmenHealth name and mark — is the property of Kickstand AI, Inc. and may not be reproduced without permission.',
        },
        {
          heading: 'Limitation of liability',
          body: 'Kickstand AI is not liable for any indirect, incidental, or consequential damages arising from use of this website. Liability for delivered services is governed exclusively by the applicable signed service agreement.',
        },
        {
          heading: 'Changes to these terms',
          body: 'We may update these terms from time to time. Continued use of this site after changes are posted constitutes acceptance of the updated terms.',
        },
      ]}
    />
  )
}

export default TermsPage
