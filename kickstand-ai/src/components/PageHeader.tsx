import { useRef, ReactNode } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

const easing = [0.22, 1, 0.36, 1] as const

interface PageHeaderProps {
  eyebrow: string
  title: string
  titleAccent?: string
  accentColor?: 'mint' | 'lavender'
  body?: ReactNode
}

function PageHeader({
  eyebrow,
  title,
  titleAccent,
  accentColor = 'mint',
  body,
}: PageHeaderProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const accent = accentColor === 'mint' ? '#A7F3D0' : '#E9D5FF'
  const accentClass = accentColor === 'mint' ? 'text-accent-mint' : 'text-accent-lav'
  const accentBg = accentColor === 'mint' ? 'bg-accent-mint' : 'bg-accent-lav'

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: i * 0.08, ease: easing },
    }),
  }

  return (
    <section
      ref={ref}
      className="relative px-8 md:px-16 pt-[calc(68px+72px)] pb-20 border-b-[0.5px] border-white/10 overflow-hidden bg-bg-primary"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 20% 0%, ${
            accentColor === 'mint' ? 'rgba(167,243,208,0.06)' : 'rgba(233,213,255,0.06)'
          } 0%, transparent 60%)`,
        }}
      />

      <motion.div
        custom={0}
        variants={itemVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex items-center gap-3 mb-6"
      >
        <span className={`w-5 h-[0.5px] ${accentBg}`} />
        <span className={`text-[11px] font-medium tracking-[0.16em] uppercase ${accentClass}`}>
          {eyebrow}
        </span>
      </motion.div>

      <motion.h1
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="font-display text-[clamp(36px,5vw,64px)] leading-[1.08] tracking-[-1.5px] text-text-primary mb-6 max-w-[720px]"
      >
        {title}
        {titleAccent && (
          <>
            <br />
            <em style={{ color: accent }}>{titleAccent}</em>
          </>
        )}
      </motion.h1>

      {body && (
        <motion.div
          custom={2}
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-[15px] font-light text-text-body leading-[1.8] max-w-[560px]"
        >
          {body}
        </motion.div>
      )}
    </section>
  )
}

export default PageHeader
