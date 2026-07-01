import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const links = [
    { label: 'Healthcare', id: 'healthcare' },
    { label: 'Sustainability', id: 'sustainability' },
    { label: 'About', id: 'founders' },
    { label: 'Research', id: 'cta-section' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center justify-between px-6 md:px-16 transition-all duration-500 ${
          scrolled
            ? 'border-b-[0.5px] border-white/10 backdrop-blur-xl bg-bg-primary/90'
            : 'bg-transparent'
        }`}
      >
        <a href="#" className="font-display text-xl flex items-center gap-2.5 text-text-primary">
          <motion.span
            whileHover={{ scale: 1.08 }}
            className="w-7 h-7 border-[0.5px] border-accent-mint rounded-md flex items-center justify-center text-[13px] font-sans font-semibold text-accent-mint"
          >
            K
          </motion.span>
          Kickstand AI
        </a>

        <ul className="hidden md:flex items-center gap-10 list-none">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className="text-[13px] text-text-body hover:text-text-primary transition-colors tracking-wide bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ y: -1, opacity: 0.9 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('cta-section')}
            className="px-5 py-2.5 text-[13px] font-medium text-bg-primary bg-accent-mint rounded-md whitespace-nowrap"
          >
            Schedule a Chat
          </motion.button>

          <button
            className="md:hidden text-text-body"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-[0.5px] bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-[0.5px] bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[0.5px] bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] left-0 right-0 z-40 bg-bg-alt border-b-[0.5px] border-white/10 px-6 py-6 flex flex-col gap-5 md:hidden"
          >
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-base text-text-body hover:text-text-primary transition-colors bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar