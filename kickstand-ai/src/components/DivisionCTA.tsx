import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, Variants } from 'framer-motion'

const easing = [0.22, 1, 0.36, 1] as const

interface DivisionCTAProps {
  eyebrow: string
  title: string
  titleAccent: string
  body: string
  accentColor: 'mint' | 'lavender'
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}

function DivisionCTA({
  eyebrow,
  title,
  titleAccent,
  body,
  accentColor,
  primaryLabel = 'Schedule a Chat',
  primaryTo = '/schedule',
  secondaryLabel,
  secondaryTo,
}: DivisionCTAProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const accent = accentColor === 'mint' ? '#A7F3F0' : '#EBD5FF'

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
      ref={ref}
      className="relative px-8 md:px-16 py-28 flex flex-col items-center text-center overflow-hidden bg-bg-primary"
    >
      <motion.div
        custom={0}
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex items-center gap-3 mb-7"
      >
        <span className="w-5 h-[0.5px] bg-white/20" />
        <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-text-body">
          {eyebrow}
        </span>
        <span className="w-5 h-[0.5px] bg-white/20" />
      </motion.div>

      <motion.h2
        custom={1}
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="font-display text-[clamp(32px,4vw,54px)] leading-[1.1] tracking-[-1.5px] text-text-primary mb-5 max-w-[620px]"
      >
        {title} <em style={{ color: accent }}>{titleAccent}</em>
      </motion.h2>

      <motion.p
        custom={2}
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="text-[15px] font-light text-text-body max-w-[440px] mb-10 leading-[1.75]"
      >
        {body}
      </motion.p>

      <motion.div
        custom={3}
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          to={primaryTo}
          className="px-8 py-3.5 text-[14px] font-medium text-bg-primary bg-text-primary rounded-md hover:opacity-90 transition-all"
        >
          {primaryLabel}
        </Link>
        {secondaryLabel && secondaryTo && (
          <Link
            to={secondaryTo}
            className="px-8 py-3.5 text-[14px] text-text-body border-[0.5px] border-white/20 rounded-md hover:border-white/40 hover:text-text-primary transition-all"
          >
            {secondaryLabel}
          </Link>
        )}
      </motion.div>
    </section>
  )
}

export default DivisionCTA
