import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, Variants } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import DivisionCTA from '../components/DivisionCTA'
import usePageTitle from '../hooks/usePageTitle'

const easing = [0.22, 1, 0.36, 1] as const

const caseStudies = [
  {
    org: 'Riverpoint Health',
    division: 'Healthcare',
    accentColor: 'mint' as const,
    headline: 'Cutting intake time from 22 minutes to 6',
    body: 'A multi-site clinic network replaced paper intake with automated eligibility checks and digital forms synced directly to their EHR.',
    stats: [
      { value: '73%', label: 'Faster intake' },
      { value: '4wk', label: 'Time to deploy' },
    ],
    href: '/healthcare',
  },
  {
    org: 'PrimeCare Medical',
    division: 'Healthcare',
    accentColor: 'mint' as const,
    headline: 'Reducing claim denials by nearly half',
    body: 'AI-assisted coding and pre-submission claim scrubbing brought denial rates down and shortened days-in-A/R across three departments.',
    stats: [
      { value: '46%', label: 'Fewer denials' },
      { value: '12d', label: 'Faster A/R cycle' },
    ],
    href: '/healthcare',
  },
  {
    org: 'TerraGrow Network',
    division: 'Sustainability',
    accentColor: 'lavender' as const,
    headline: 'Catching crop stress three weeks earlier',
    body: 'Multispectral imagery and automated field alerts let agronomy teams intervene well before yield loss became visible on the ground.',
    stats: [
      { value: '3wk', label: 'Earlier detection' },
      { value: '18%', label: 'Yield protected' },
    ],
    href: '/sustainability',
  },
  {
    org: 'SoilForward',
    division: 'Sustainability',
    accentColor: 'lavender' as const,
    headline: 'Audit-ready carbon reporting in one dashboard',
    body: 'Scattered emissions spreadsheets became a single portfolio-level Scope 1-3 model, ready for stakeholder reporting each quarter.',
    stats: [
      { value: '30+', label: 'Sites unified' },
      { value: '1', label: 'Reporting workflow' },
    ],
    href: '/sustainability',
  },
]

function CaseStudiesPage() {
  usePageTitle('Case Studies')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: (i % 2) * 0.08, ease: easing },
    }),
  }

  return (
    <>
      <PageHeader
        eyebrow="Proof, not promises"
        title="Real teams,"
        titleAccent="real workflow gains."
        accentColor="mint"
        body="A sample of the engagements behind the numbers on our homepage — scoped individually, deployed fast, measured honestly."
      />

      <section ref={ref} className="px-8 md:px-16 py-20 bg-bg-primary border-b-[0.5px] border-white/10">
        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((cs, i) => {
            const accent = cs.accentColor === 'mint' ? '#A7F3F0' : '#EBD5FF'
            return (
              <motion.div
                key={cs.org}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="border-[0.5px] border-white/10 rounded-xl p-8 flex flex-col hover:border-white/25 transition-colors"
              >
                <span
                  className="text-[11px] font-medium tracking-[0.14em] uppercase mb-4"
                  style={{ color: accent }}
                >
                  {cs.division} · {cs.org}
                </span>
                <h2 className="font-display text-2xl text-text-primary mb-3 tracking-tight leading-snug">
                  {cs.headline}
                </h2>
                <p className="text-[14px] font-light text-text-body leading-[1.75] mb-6 flex-1">
                  {cs.body}
                </p>
                <div className="grid grid-cols-2 border-[0.5px] border-white/10 rounded-lg overflow-hidden mb-6">
                  {cs.stats.map((s, si) => (
                    <div
                      key={s.label}
                      className={`px-5 py-4 ${si === 0 ? 'border-r-[0.5px] border-white/10' : ''}`}
                    >
                      <div className="font-display text-2xl text-text-primary leading-none mb-1">
                        {s.value}
                      </div>
                      <div className="text-[11px] text-text-body tracking-wide uppercase">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to={cs.href}
                  className="self-start flex items-center gap-2 text-[13px] font-medium hover:gap-3 transition-all"
                  style={{ color: accent }}
                >
                  Explore {cs.division} Division →
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      <DivisionCTA
        eyebrow="Your organization could be next"
        title="Tell us what's"
        titleAccent="broken."
        body="We scope every engagement individually. No templates, no pre-packaged tiers."
        accentColor="mint"
      />
    </>
  )
}

export default CaseStudiesPage
