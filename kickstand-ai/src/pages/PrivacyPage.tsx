import LegalPage from '../components/LegalPage'
import usePageTitle from '../hooks/usePageTitle'

function PrivacyPage() {
  usePageTitle('Privacy Policy')

  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="July 3, 2026"
      sections={[
        {
          heading: 'Information we collect',
          body: 'When you schedule a chat or contact us, we collect the information you provide directly — name, work email, organization, role, and any message you share. We also collect basic usage analytics (pages visited, referring source) to understand how visitors use this site.',
        },
        {
          heading: 'How we use your information',
          body: 'We use the information you provide to respond to inquiries, schedule and prepare for calls, and improve our products. We do not sell your personal information to third parties.',
        },
        {
          heading: 'Healthcare data (KarmenHealth)',
          body: 'For clients using the KarmenHealth platform, patient health information is handled under a signed Business Associate Agreement and stored in compliance with HIPAA. This marketing site does not collect or store patient health information.',
        },
        {
          heading: 'Data retention',
          body: 'We retain contact and scheduling information for as long as necessary to maintain our business relationship with you, or until you request deletion.',
        },
        {
          heading: 'Your rights',
          body: 'You may request access to, correction of, or deletion of your personal information at any time by contacting us through the scheduling form on this site.',
        },
        {
          heading: 'Contact',
          body: 'Questions about this policy can be directed to us via the Schedule a Chat form — select "Custom Integration" or leave a note describing your request.',
        },
      ]}
    />
  )
}

export default PrivacyPage
