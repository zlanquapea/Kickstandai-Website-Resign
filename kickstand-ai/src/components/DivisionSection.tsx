import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

const easing = [0.22, 1, 0.36, 1] as const

interface DivisionSectionProps {
  id: string
  index: string
  title: string
  description: string
  bullets: string[]
  accentColor: 'mint' | 'lavender'
  reverse?: boolean
}

function DivisionSection({
  id,
  index,
  title,
  description,
  bullets,
  accentColor,
  reverse = false,
}: DivisionSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const accent = accentColor === 'mint' ? '#A7F3F0' : '#EBD5FF'
  const accentFaint =
    accentColor === 'mint' ? 'rgba(167,243,208,0.12)' : 'rgba(233,213,255,0.12)'

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: easing },
    },
  }

  const textCol = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`flex flex-col justify-center px-8 md:px-16 py-20 ${
        reverse ? 'border-l-[0.5px] border-white/10' : 'border-r-[0.5px] border-white/10'
      }`}
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
        <span
          className="text-[13px] font-display italic"
          style={{ color: accent }}
        >
          {index}
        </span>
        <span className="w-5 h-[0.5px]" style={{ background: accent }} />
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="font-display text-[clamp(26px,2.6vw,38px)] leading-[1.15] tracking-[-0.8px] text-text-primary mb-5"
      >
        {title}
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-[15px] font-light text-text-body leading-[1.8] max-w-[440px] mb-8"
      >
        {description}
      </motion.p>

      <motion.ul variants={itemVariants} className="flex flex-col gap-3">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-3 text-[13px] text-text-body">
            <span
              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
              style={{ background: accent }}
            />
            {bullet}
          </li>
        ))}
      </motion.ul>
    </motion.div>
  )

  const visualCol = (
    <motion.div
      initial={{ opacity: 0, x: reverse ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: easing }}
      className={`relative flex items-center justify-center px-8 md:px-16 py-20 overflow-hidden ${
        reverse ? 'bg-bg-primary' : 'bg-bg-alt'
      }`}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 60% 40%, ${
            accentColor === 'mint' ? 'rgba(167,243,208,0.05)' : 'rgba(233,213,255,0.05)'
          } 0%, transparent 70%)`,
        }}
      />
      <div className="w-full max-w-[380px] aspect-square border-[0.5px] border-white/15 rounded-xl overflow-hidden flex items-center justify-center">
        <div
          className="w-20 h-20 rounded-2xl border-[0.5px] flex items-center justify-center font-display text-3xl"
          style={{ borderColor: accent, color: accent, background: accentFaint }}
        >
          {index}
        </div>
      </div>
    </motion.div>
  )

  return (
    <section
      id={id}
      ref={ref}
      className={`grid md:grid-cols-2 border-b-[0.5px] border-white/10 scroll-mt-[68px] ${
        reverse ? 'bg-bg-alt' : 'bg-bg-primary'
      }`}
    >
      {reverse ? (
        <>
          {visualCol}
          {textCol}
        </>
      ) : (
        <>
          {textCol}
          {visualCol}
        </>
      )}
    </section>
  )
}

export default DivisionSection
