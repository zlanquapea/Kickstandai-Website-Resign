import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const scrollToTarget = () => {
        const el = document.getElementById(id)
        if (el) {
          try {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          } catch {
            // jsdom in tests does not implement scrollIntoView; safe to ignore
          }
          return true
        }
        return false
      }
      if (!scrollToTarget()) {
        const timeout = setTimeout(scrollToTarget, 100)
        return () => clearTimeout(timeout)
      }
      return
    }
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    } catch {
      // jsdom in tests does not implement scrollTo; safe to ignore
    }
  }, [pathname, hash])

  return null
}

export default ScrollManager
