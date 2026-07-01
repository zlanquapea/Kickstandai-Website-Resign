const links = ['Healthcare', 'Sustainability', 'Research', 'Privacy', 'Terms']

function Footer() {
  return (
    <footer className="bg-bg-alt border-t-[0.5px] border-white/10 px-8 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="font-display text-[16px] text-text-body flex items-center gap-2">
        <span className="w-[22px] h-[22px] border-[0.5px] border-accent-mint/50 rounded flex items-center justify-center text-[11px] font-sans font-semibold text-accent-mint">
          K
        </span>
        Kickstand AI
      </div>

      <ul className="flex flex-wrap justify-center gap-6 list-none">
        {links.map((link) => (
          <li key={link}>
            {/* Fixed the missing <a> tag name below */}
            <a
              href="#"
              className="text-[12px] text-text-body/40 hover:text-text-body/80 transition-colors tracking-wide"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <div className="text-[12px] text-text-body/30">
        © 2024 Kickstand AI, Inc.
      </div>
    </footer>
  )
}

export default Footer