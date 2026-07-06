import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

// Uploads playlist ID: same as the channel ID with "UC" swapped for "UU"
const YOUTUBE_PLAYLIST_ID = ''

const easing = [0.22, 1, 0.36, 1] as const

function PodcastSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  if (!YOUTUBE_PLAYLIST_ID) return null

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: easing },
    }),
  }

  return (
    <section
      ref={ref}
      className="px-8 md:px-16 py-24 bg-bg-alt border-b-[0.5px] border-white/10"
    >
      <motion.div
        custom={0}
        variants={itemVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex items-center gap-3 mb-6"
      >
        <span className="w-5 h-[0.5px] bg-accent-mint" />
        <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-accent-mint">
          From the podcast
        </span>
      </motion.div>

      <motion.h2
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="font-display text-[clamp(28px,3vw,42px)] leading-[1.1] tracking-[-1px] text-text-primary mb-8 max-w-[600px]"
      >
        Latest episode
      </motion.h2>

      <motion.div
        custom={2}
        variants={itemVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="border-[0.5px] border-white/10 rounded-xl overflow-hidden max-w-[820px]"
      >
        <div className="aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}`}
            title="Kickstand AI Podcast — latest episode"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default PodcastSection
