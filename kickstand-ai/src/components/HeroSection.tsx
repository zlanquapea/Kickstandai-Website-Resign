import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'

const metrics = [
  { value: '47%', label: 'Admin overhead cut' },
  { value: '3.2×', label: 'Patient throughput' },
  { value: '50+', label: 'Orgs onboarded' },
  { value: '<30d', label: 'Time to deploy' },
]

const words = ['Sustainability.', 'Healthcare.', 'The Future.']
const easing = [0.22, 1, 0.36, 1] as const

function HeroSection() {
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const wordIndex = useRef(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const rightY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    const el = wordRef.current
    if (!el) return
    const cycle = () => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(12px)'
      setTimeout(() => {
        wordIndex.current = (wordIndex.current + 1) % words.length
        el.textContent = words[wordIndex.current]
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 400)
    }
    const interval = setInterval(cycle, 2800)
    return () => clearInterval(interval)
  }, [])

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easing },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen grid md:grid-cols-2 pt-[68px] border-b-[0.5px] border-white/10"
    >
      {/* LEFT */}
      <motion.div
        style={{ y: leftY }}
        className="flex flex-col justify-center px-8 md:px-16 py-20 border-b-[0.5px] md:border-b-0 md:border-r-[0.5px] border-white/10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-6 h-[0.5px] bg-accent-mint" />
            <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-accent-mint">
              AI Infrastructure
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display text-[clamp(42px,5vw,68px)] leading-[1.06] tracking-[-1.5px] text-text-primary mb-6"
          >
            Built for
            <br />
            <span
              ref={wordRef}
              style={{
                color: '#A7F3D0',
                fontStyle: 'italic',
                display: 'inline-block',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              Sustainability.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[15px] font-light text-text-body leading-[1.8] max-w-[440px] mb-10"
          >
            Kickstand AI deploys intelligent workflow systems for healthcare
            practices and sustainability-driven organizations — giving back the
            time that admin takes, so people can focus on what matters.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 flex-wrap mb-16"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/schedule')}
              className="px-6 py-3 text-[14px] font-medium text-bg-primary bg-text-primary rounded-md"
            >
              Schedule a Chat
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document
                  .getElementById('healthcare')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-6 py-3 text-[14px] text-text-body border-[0.5px] border-white/20 rounded-md hover:border-white/40 hover:text-text-primary transition-all"
            >
              See the work
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 border-[0.5px] border-white/10 rounded-lg overflow-hidden"
          >
            {metrics.map((m, i) => (
              <div
                key={i}
                className={`px-5 py-4 ${
                  i < metrics.length - 1
                    ? 'border-r-[0.5px] border-white/10'
                    : ''
                }`}
              >
                <div className="font-display text-2xl text-text-primary leading-none mb-1">
                  {m.value}
                </div>
                <div className="text-[11px] text-text-body tracking-wide uppercase">
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        style={{ y: rightY, opacity }}
        className="relative flex items-center justify-center px-8 md:px-16 py-20 bg-bg-alt overflow-hidden"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-mint/5 blur-[80px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: easing }}
          className="w-full max-w-[520px]"
        >
          <div className="w-full aspect-video border-[0.5px] border-white/15 rounded-xl overflow-hidden relative bg-[#0d1a1e] mb-4">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
              {[
                { value: '47%', label: 'Admin reduction', accent: true },
                { value: '3.2×', label: 'Throughput gain', accent: false },
                { value: '', label: '', accent: false },
                { value: '', label: '', accent: false },
              ].map((cell, i) => (
                <div
                  key={i}
                  className={`border-[0.5px] border-white/8 flex flex-col p-4 ${
                    i % 2 === 1 ? 'border-l-[0.5px] border-white/10' : ''
                  } ${i > 1 ? 'border-t-[0.5px] border-white/10' : ''}`}
                >
                  {cell.value && (
                    <>
                      <span
                        className="font-display text-3xl leading-none mb-1"
                        style={{
                          color: cell.accent ? '#A7F3D0' : '#F8FAFC',
                        }}
                      >
                        {cell.value}
                      </span>
                      <span className="text-[11px] text-text-body uppercase tracking-wide">
                        {cell.label}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full border-[0.5px] border-accent-mint flex items-center justify-center cursor-pointer hover:bg-accent-mint/10 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#A7F3D0"
                  strokeWidth="1.5"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </motion.div>
              <span className="text-[11px] text-text-body uppercase tracking-[0.1em]">
                Watch 90-second demo
              </span>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-md border-[0.5px] border-white/10 bg-bg-primary/70 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-mint animate-pulse" />
              <span className="text-[11px] text-text-body">HIPAA compliant</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {['No-code setup', 'HIPAA ready', 'Deploy in 30 days'].map(
              (tag) => (
                <div
                  key={tag}
                  className="px-3 py-2 border-[0.5px] border-white/10 rounded-md text-center text-[11px] text-text-body"
                >
                  {tag}
                </div>
              )
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection