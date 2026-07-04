import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.png'

const links = [
  { label: 'Healthcare', to: '/healthcare' },
  { label: 'Sustainability', to: '/sustainability' },
  { label: 'About', to: '/about' },
  { label: 'Case Studies', to: '/case-studies' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const goToSchedule = () => navigate('/schedule')

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
        <Link to="/" className="font-display text-xl flex items-center gap-2.5 text-text-primary">
          <motion.img
            whileHover={{ scale: 1.08 }}
            src={logo}
            alt="Kickstand AI"
            className="w-8 h-8 object-contain"
          />
          Kickstand AI
        </Link>

        <ul className="hidden md:flex items-center gap-10 list-none">
          {links.map((link) => {
            const active = location.pathname === link.to
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`text-[13px] transition-colors tracking-wide ${
                    active ? 'text-text-primary' : 'text-text-body hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ y: -1, opacity: 0.9 }}
            whileTap={{ scale: 0.97 }}
            onClick={goToSchedule}
            className="px-5 py-2.5 text-[13px] font-medium text-bg-primary bg-accent-mint rounded-md whitespace-nowrap"
          >
            Schedule a Chat
          </motion.button>

          <button
            className="md:hidden text-text-body"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
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
              <Link
                key={link.to}
                to={link.to}
                className="text-left text-base text-text-body hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
