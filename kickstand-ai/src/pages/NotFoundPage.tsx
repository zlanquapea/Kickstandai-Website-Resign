import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import usePageTitle from '../hooks/usePageTitle'

const easing = [0.22, 1, 0.36, 1] as const

function NotFoundPage() {
  usePageTitle('Page not found')

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 bg-bg-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing }}
      >
        <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-accent-mint mb-6 block">
          404
        </span>
        <h1 className="font-display text-[clamp(36px,5vw,64px)] tracking-[-1.5px] text-text-primary mb-5">
          This page took a{' '}
          <em style={{ color: '#A7F3F0' }}>wrong turn.</em>
        </h1>
        <p className="text-[15px] font-light text-text-body max-w-[420px] mx-auto mb-10 leading-[1.8]">
          The page you're looking for doesn't exist or may have moved. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 text-[14px] font-medium text-bg-primary bg-text-primary rounded-md hover:opacity-90 transition-all"
        >
          Back to home
        </Link>
      </motion.div>
    </section>
  )
}

export default NotFoundPage
