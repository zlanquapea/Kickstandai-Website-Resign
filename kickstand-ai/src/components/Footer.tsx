import { Link } from 'react-router-dom'

const links = [
  { label: 'Healthcare', to: '/healthcare' },
  { label: 'Sustainability', to: '/sustainability' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About', to: '/about' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/kickstandai/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@KickstandAi',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
]

function Footer() {
  return (
    <footer className="bg-bg-alt border-t-[0.5px] border-white/10 px-8 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <Link to="/" className="font-display text-[16px] text-text-body flex items-center gap-2">
        <span className="w-[22px] h-[22px] border-[0.5px] border-accent-mint/50 rounded flex items-center justify-center text-[11px] font-sans font-semibold text-accent-mint">
          K
        </span>
        Kickstand AI
      </Link>

      <ul className="flex flex-wrap justify-center gap-6 list-none">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-[12px] text-text-body/40 hover:text-text-body/80 transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="w-8 h-8 rounded-md border-[0.5px] border-white/10 flex items-center justify-center text-text-body/40 hover:text-text-primary hover:border-white/25 transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>
        <div className="text-[12px] text-text-body/30 whitespace-nowrap">
          © 2026 Kickstand AI, Inc.
        </div>
      </div>
    </footer>
  )
}

export default Footer
