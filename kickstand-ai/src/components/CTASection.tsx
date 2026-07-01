import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

const easing = [0.22, 1, 0.36, 1] as const

function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const variants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: i * 0.1, ease: easing },
    }),
  }

  return (
    <section
      id="cta-section"
      ref={ref}
      className="relative px-8 md:px-16 py-32 flex flex-col items-center text-center overflow-hidden bg-bg-primary border-b-[0.5px] border-white/10"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(167,243,208,0.05) 0%, transparent 60%)',
        }}
      />

      <motion.div
        custom={0}
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex items-center gap-3 mb-8"
      >
        <span className="w-5 h-[0.5px] bg-white/20" />
        <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-text-body">
          Ready to start
        </span>
        <span className="w-5 h-[0.5px] bg-white/20" />
      </motion.div>

      <motion.h2
        custom={1}
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="font-display text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-2px] text-text-primary mb-5 max-w-[680px]"
      >
        Your workflow is a{' '}
        <em style={{ color: '#A7F3D0' }}>solvable problem.</em>
      </motion.h2>

      <motion.p
        custom={2}
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="text-[16px] font-light text-text-body max-w-[440px] mb-12 leading-[1.75]"
      >
        We scope every engagement individually. No templates, no pre-packaged
        tiers. Tell us what's broken — we'll build around it.
      </motion.p>

      <motion.div
        custom={3}
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex flex-wrap items-center justify-center gap-4 mb-6"
      >
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3.5 text-[14px] font-medium text-bg-primary bg-text-primary rounded-md"
        >
          Schedule a Chat
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3.5 text-[14px] text-text-body border-[0.5px] border-white/20 rounded-md hover:border-white/40 hover:text-text-primary transition-all"
        >
          View case studies
        </motion.button>
      </motion.div>

      <motion.p
        custom={4}
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="text-[12px] text-text-body/40 tracking-wide"
      >
        Typically respond within one business day.
      </motion.p>
    </section>
  )
}

export default CTASection