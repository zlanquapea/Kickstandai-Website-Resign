import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, Variants } from 'framer-motion'
import founderPhoto from '../assets/founder-travis.jpg'

const stats = [
  { value: '50%', label: 'Admin overhead cut, avg. client' },
  { value: '30+', label: 'Healthcare orgs onboarded' },
  { value: '2022', label: 'Founded, US-based' },
]

const easing = [0.22, 1, 0.36, 1] as const

function FoundersSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: i * 0.1, ease: easing },
    }),
  }

  return (
    <section
      id="founders"
      ref={ref}
      className="bg-bg-alt border-b-[0.5px] border-white/10"
    >
      <div className="grid md:grid-cols-[420px_1fr]">
        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: easing }}
          className="relative border-b-[0.5px] md:border-b-0 md:border-r-[0.5px] border-white/10 bg-[#0d1a1e] flex flex-col items-center justify-center min-h-[480px] p-12"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 30%, rgba(167,243,208,0.05) 0%, transparent 65%)',
            }}
          />
          <img
            src={founderPhoto}
            alt="Travis Garland, Founder & CEO of Kickstand AI"
            className="w-32 h-32 rounded-full border-[0.5px] border-accent-mint/30 object-cover mb-4"
          />
          <div className="text-[15px] text-text-primary text-center mb-1">
            Travis Garland
          </div>
          <div className="text-[13px] text-text-body/50 text-center mb-2">
            Founder & CEO
          </div>
          <div className="text-[11px] text-text-body/30 text-center mb-4">
            Kickstand AI · Est. 2022
          </div>
          <a
            href="https://www.linkedin.com/in/travis-garland/"
            target="_blank"
            rel="noreferrer"
            aria-label="Travis Garland on LinkedIn"
            className="w-8 h-8 rounded-md border-[0.5px] border-white/10 flex items-center justify-center text-text-body/40 hover:text-text-primary hover:border-white/25 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <div className="absolute bottom-0 left-0 right-0 border-t-[0.5px] border-white/10 px-6 py-4">
            <p className="text-[11px] text-text-body/40 text-center tracking-wide">
              Remote-first · US-based · HIPAA certified
            </p>
          </div>
        </motion.div>

        {/* Content column */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-20">
          <motion.div
            custom={0}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-5 h-[0.5px] bg-white/20" />
            <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-text-body">
              The people behind the work
            </span>
          </motion.div>

          <motion.blockquote
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="font-display text-[clamp(26px,2.8vw,40px)] leading-[1.2] tracking-[-0.8px] text-text-primary mb-8"
          >
            "I protect human data from{' '}
            <em style={{ color: '#A7F3F0' }}>badly behaving AI agents.</em>"
          </motion.blockquote>

          <motion.p
            custom={2}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-[15px] font-light text-text-body leading-[1.8] max-w-[520px] mb-10"
          >
            Travis Garland leads Kickstand AI with a simple mission: automate
            what's manual, personalize what's generic, and scale what's
            working — without adding headcount or losing the human touch. He's
            also the co-founder of My-CC.io, the compliance layer that lets AI
            operate in regulated industries without breaking the rules.
          </motion.p>

          <motion.div
            custom={3}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-3 border-[0.5px] border-white/10 rounded-lg overflow-hidden"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className={`px-6 py-5 ${
                  i < stats.length - 1
                    ? 'border-r-[0.5px] border-white/10'
                    : ''
                }`}
              >
                <div className="font-display text-3xl text-text-primary leading-none mb-1.5">
                  {s.value}
                </div>
                <div className="text-[11px] text-text-body tracking-wide leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            custom={4}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="mt-6"
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-accent-mint hover:gap-3 transition-all"
            >
              More about our story →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FoundersSection