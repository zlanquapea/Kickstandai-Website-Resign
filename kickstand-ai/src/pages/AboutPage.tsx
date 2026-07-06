import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import DivisionCTA from '../components/DivisionCTA'
import PodcastSection from '../components/PodcastSection'
import usePageTitle from '../hooks/usePageTitle'

const easing = [0.22, 1, 0.36, 1] as const

const values = [
  {
    title: 'Scope to the real problem',
    body: 'No pre-packaged tiers. We start by understanding the actual workflow that is broken before proposing anything.',
  },
  {
    title: 'Ship in weeks, not quarters',
    body: 'Most engagements go from kickoff to a working deployment in under 30 days.',
  },
  {
    title: 'Built for the humans doing the work',
    body: 'Every system we build is judged by whether it gives time back to the people using it daily.',
  },
  {
    title: 'Compliance is not an afterthought',
    body: 'HIPAA-ready infrastructure and auditable data handling from day one, not bolted on later.',
  },
]

const timeline = [
  { year: '2022', label: 'Kickstand AI founded, US-based and remote-first' },
  { year: '2023', label: 'KarmenHealth platform launched for clinical workflow automation' },
  { year: '2024', label: 'Sustainability division launched for agricultural AI' },
  { year: '2025', label: '50+ organizations onboarded across both divisions' },
]

function AboutPage() {
  usePageTitle('About')
  const valuesRef = useRef(null)
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' })
  const timelineRef = useRef(null)
  const timelineInView = useInView(timelineRef, { once: true, margin: '-80px' })

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.08, ease: easing },
    }),
  }

  return (
    <>
      <PageHeader
        eyebrow="The people behind the work"
        title="We build infrastructure"
        titleAccent="that gives people their time back."
        accentColor="mint"
        body="Kickstand AI started because we watched overworked clinical teams spend more time on paperwork than on patients — and saw the same pattern in sustainability organizations drowning in data they couldn't act on."
      />

      <section
        ref={valuesRef}
        className="px-8 md:px-16 py-24 border-b-[0.5px] border-white/10 bg-bg-alt"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={valuesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easing }}
          className="mb-12"
        >
          <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-text-body">
            What we believe
          </span>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-px bg-white/10 border-[0.5px] border-white/10 rounded-lg overflow-hidden">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={valuesInView ? 'visible' : 'hidden'}
              className="bg-bg-alt p-8"
            >
              <h2 className="font-display text-xl text-text-primary mb-3 tracking-tight">
                {v.title}
              </h2>
              <p className="text-[14px] font-light text-text-body leading-[1.75]">
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        ref={timelineRef}
        className="px-8 md:px-16 py-24 border-b-[0.5px] border-white/10 bg-bg-primary"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easing }}
          className="mb-12"
        >
          <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-text-body">
            Our timeline
          </span>
        </motion.div>
        <div className="max-w-[640px] flex flex-col">
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={timelineInView ? 'visible' : 'hidden'}
              className={`flex gap-6 py-6 ${
                i < timeline.length - 1 ? 'border-b-[0.5px] border-white/10' : ''
              }`}
            >
              <span className="font-display text-2xl text-accent-mint w-20 flex-shrink-0">
                {t.year}
              </span>
              <span className="text-[14px] text-text-body font-light leading-relaxed pt-1.5">
                {t.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <PodcastSection />

      <DivisionCTA
        eyebrow="Join the work"
        title="Want to work with"
        titleAccent="a team like this?"
        body="We're always talking to healthcare and sustainability teams about what's next. Reach out and tell us what's broken."
        accentColor="mint"
        secondaryLabel="See case studies"
        secondaryTo="/case-studies"
      />
    </>
  )
}

export default AboutPage
