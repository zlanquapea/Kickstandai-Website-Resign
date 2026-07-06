import { useEffect, useRef, useState } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

const YOUTUBE_HANDLE = 'KickstandAi'
const CACHE_KEY = 'kickstand_latest_episode_cache_v1'
const CACHE_TTL_MS = 60 * 60 * 1000

const easing = [0.22, 1, 0.36, 1] as const

interface LatestVideo {
  videoId: string
  title: string
  thumbnail: string
  publishedAt: string
}

async function fetchLatestVideo(apiKey: string): Promise<LatestVideo | null> {
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${YOUTUBE_HANDLE}&key=${apiKey}`
  )
  if (!channelRes.ok) return null
  const channelData = await channelRes.json()
  const channelId = channelData.items?.[0]?.id
  if (!channelId) return null

  const searchRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=1&key=${apiKey}`
  )
  if (!searchRes.ok) return null
  const searchData = await searchRes.json()
  const item = searchData.items?.[0]
  if (!item?.id?.videoId) return null

  return {
    videoId: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.high?.url ?? item.snippet.thumbnails?.default?.url ?? '',
    publishedAt: item.snippet.publishedAt,
  }
}

function PodcastSection() {
  const [video, setVideo] = useState<LatestVideo | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY
    if (!apiKey || apiKey.startsWith('your_')) return

    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const { data, ts } = JSON.parse(cached)
        if (Date.now() - ts < CACHE_TTL_MS) {
          setVideo(data)
          return
        }
      } catch {
        // ignore malformed cache entry
      }
    }

    fetchLatestVideo(apiKey)
      .then((data) => {
        if (!data) return
        setVideo(data)
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }))
      })
      .catch(() => {})
  }, [])

  if (!video) return null

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: easing },
    }),
  }

  const publishedLabel = new Date(video.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

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

      <motion.a
        href={`https://www.youtube.com/watch?v=${video.videoId}`}
        target="_blank"
        rel="noreferrer"
        custom={2}
        variants={itemVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="group flex flex-col md:flex-row gap-6 border-[0.5px] border-white/10 rounded-xl overflow-hidden max-w-[820px] hover:border-white/25 transition-colors"
      >
        <div className="relative md:w-[320px] flex-shrink-0 aspect-video overflow-hidden bg-bg-primary">
          {video.thumbnail && (
            <img
              src={video.thumbnail}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
            <div className="w-12 h-12 rounded-full border-[0.5px] border-white/40 bg-black/40 flex items-center justify-center backdrop-blur-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#F8FAFC">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center py-6 pr-6 md:py-0">
          <span className="text-[11px] text-text-body/40 uppercase tracking-wide mb-2">
            {publishedLabel}
          </span>
          <h3 className="font-display text-xl text-text-primary mb-3 leading-snug">
            {video.title}
          </h3>
          <span className="inline-flex items-center gap-2 text-[13px] font-medium text-accent-mint group-hover:gap-3 transition-all">
            Watch on YouTube →
          </span>
        </div>
      </motion.a>
    </section>
  )
}

export default PodcastSection
