import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CalendlyEmbed from '../components/CalendlyEmbed'
import usePageTitle from '../hooks/usePageTitle'

const easing = [0.22, 1, 0.36, 1] as const

const CALENDLY_URL =
  'https://calendly.com/travis-gokickstandai/discovery-25?background_color=121216&text_color=f8fafc&primary_color=a7f3d0'

function SchedulePage() {
  usePageTitle('Schedule a Chat')

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans">
      <div className="border-b-[0.5px] border-white/10 px-8 md:px-16 h-[68px] flex items-center justify-between">
        <Link to="/" className="font-display text-lg flex items-center gap-2.5 text-text-primary">
          <span className="w-7 h-7 border-[0.5px] border-accent-mint rounded-md flex items-center justify-center text-[13px] font-sans font-semibold text-accent-mint">
            K
          </span>
          Kickstand AI
        </Link>
        <span className="text-[12px] text-text-body/40 tracking-wide hidden md:block">
          No commitment required — just a conversation.
        </span>
        <Link to="/" className="text-[13px] text-text-body hover:text-text-primary transition-colors">
          Back to site
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          className="mb-10 max-w-xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-5 h-[0.5px] bg-accent-mint" />
            <span className="text-[11px] uppercase tracking-[0.16em] text-accent-mint">
              Let's talk
            </span>
          </div>
          <h1 className="font-display text-[clamp(32px,4vw,52px)] leading-[1.08] tracking-[-1.5px] mb-4">
            Book a 30-minute
            <br />
            <em style={{ color: '#A7F3D0' }}>strategy session.</em>
          </h1>
          <p className="text-[15px] font-light text-text-body leading-[1.8]">
            Tell us what's broken. We'll come prepared with ideas specific to
            your organization — no generic decks, no sales scripts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: easing }}
          className="border-[0.5px] border-white/10 rounded-xl overflow-hidden bg-bg-alt"
        >
          <CalendlyEmbed url={CALENDLY_URL} />
        </motion.div>

        <p className="text-center text-[12px] text-text-body/30 mt-6">
          Calendar not loading?{' '}
          <a
            href="https://calendly.com/travis-gokickstandai/discovery-25"
            target="_blank"
            rel="noreferrer"
            className="text-text-body/50 hover:text-text-body underline underline-offset-2"
          >
            Open it directly
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default SchedulePage
