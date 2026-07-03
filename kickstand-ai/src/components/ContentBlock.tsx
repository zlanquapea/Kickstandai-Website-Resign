import { useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { motion, useInView, Variants } from 'framer-motion'

interface Link {
  label: string
  href: string
  external?: boolean
}

interface ContentBlockProps {
  id: string
  division: string
  label: string
  headline: string
  headlineAccent: string
  body: string
  accentColor: 'mint' | 'lavender'
  links: Link[]
  ctaText: string
  ctaHref: string
  reverse: boolean
}

const barHeights = [40, 65, 50, 80, 55, 90, 70]
const easing = [0.22, 1, 0.36, 1] as const

function VisualMockup({ accentColor }: { accentColor: 'mint' | 'lavender' }) {
  const accent = accentColor === 'mint' ? '#A7F3D0' : '#E9D5FF'
  const accentFaint =
    accentColor === 'mint'
      ? 'rgba(167,243,208,0.12)'
      : 'rgba(233,213,255,0.12)'

  return (
    <div className="w-full max-w-[400px] aspect-[4/3] border-[0.5px] border-white/15 rounded-xl overflow-hidden">
      <div className="p-4 border-b-[0.5px] border-white/10 flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: accent, opacity: 0.7 }}
        />
        <span className="text-[12px] text-text-body">
          {accentColor === 'mint'
            ? 'KarmenHealth — Live Dashboard'
            : 'Field Intelligence — Live Feed'}
        </span>
      </div>
      <div className="p-5">
        {[75, 55, 88, 40, 65].map((w, i) => (
          <div
            key={i}
            className="h-2 rounded-sm mb-2.5"
            style={{
              width: `${w}%`,
              background:
                i % 2 === 1 ? accentFaint : 'rgba(255,255,255,0.06)',
            }}
          />
        ))}
        <div className="flex items-end gap-1.5 h-16 mt-4">
          {barHeights.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background:
                  i % 2 === 1 ? accentFaint : 'rgba(255,255,255,0.06)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ContentBlock({
  id,
  division,
  label,
  headline,
  headlineAccent,
  body,
  accentColor,
  links,
  ctaText,
  ctaHref,
  reverse,
}: ContentBlockProps) {
  // Added <HTMLElement> typing to the ref for hook stability
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const accent = accentColor === 'mint' ? '#A7F3D0' : '#E9D5FF'
  const isAlt = reverse

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

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: reverse ? -40 : 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: easing },
    },
  }

  const textCol = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`flex flex-col justify-center px-8 md:px-16 py-20 ${
        reverse
          ? 'border-l-[0.5px] border-white/10'
          : 'border-r-[0.5px] border-white/10'
      }`}
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 mb-5"
      >
        <span className="w-5 h-[0.5px]" style={{ background: accent }} />
        <span
          className="text-[11px] font-medium tracking-[0.16em] uppercase"
          style={{ color: accent }}
        >
          Division {division} — {label}
        </span>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="font-display text-[clamp(30px,3vw,46px)] leading-[1.1] tracking-[-1px] text-text-primary mb-5"
      >
        {headline}
        <br />
        <em style={{ color: accent }}>{headlineAccent}</em>
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-[15px] font-light text-text-body leading-[1.8] max-w-[420px] mb-8"
      >
        {body}
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="border-[0.5px] border-white/10 rounded-lg overflow-hidden mb-8"
      >
        {links.map((link, i) => {
          const borderClass =
            i < links.length - 1 ? 'border-b-[0.5px] border-white/10' : ''
          const className = `flex items-center justify-between px-5 py-3.5 text-[13px] text-text-body hover:text-text-primary hover:bg-white/[0.03] transition-all group ${borderClass}`
          const content = (
            <>
              <span>{link.label}</span>
              <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                {link.external ? '↗' : '→'}
              </span>
            </>
          )
          return link.href.startsWith('/') ? (
            <RouterLink key={i} to={link.href} className={className}>
              {content}
            </RouterLink>
          ) : (
            <a key={i} href={link.href} className={className}>
              {content}
            </a>
          )
        })}
      </motion.div>

      <motion.div variants={itemVariants} className="self-start">
        <RouterLink
          to={ctaHref}
          className="flex items-center gap-2 text-[14px] font-medium transition-all hover:gap-3"
          style={{ color: accent }}
        >
          {ctaText} →
        </RouterLink>
      </motion.div>
    </motion.div>
  )

  const imageCol = (
    <motion.div
      variants={imageVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`relative flex items-center justify-center px-8 md:px-16 py-20 overflow-hidden ${
        isAlt ? 'bg-bg-primary' : 'bg-bg-alt'
      }`}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 60% 40%, ${
            accentColor === 'mint'
              ? 'rgba(167,243,208,0.04)'
              : 'rgba(233,213,255,0.04)'
          } 0%, transparent 70%)`,
        }}
      />
      <VisualMockup accentColor={accentColor} />
    </motion.div>
  )

  return (
    <section
      id={id}
      ref={ref}
      className={`grid md:grid-cols-2 border-b-[0.5px] border-white/10 ${
        isAlt ? 'bg-bg-alt' : 'bg-bg-primary'
      }`}
    >
      {reverse ? (
        <>
          {imageCol}
          {textCol}
        </>
      ) : (
        <>
          {textCol}
          {imageCol}
        </>
      )}
    </section>
  )
}

export default ContentBlock