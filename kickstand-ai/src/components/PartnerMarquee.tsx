import { motion } from 'framer-motion'

const partners = [
  'HealthFirst Systems',
  'ClearBio Analytics',
  'TerraGrow Network',
  'PrimeCare Medical',
  'EcoSense Labs',
  'Riverpoint Health',
  'SoilForward',
  'NexaClinics',
  'GreenRoot Co',
  'MedFlow AI',
]

function PartnerMarquee() {
  const doubled = [...partners, ...partners]

  return (
    <section className="bg-bg-alt border-b-[0.5px] border-white/10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-8 md:px-16 py-6 border-b-[0.5px] border-white/10"
      >
        <span className="text-[11px] uppercase tracking-[0.14em] text-text-body">
          Trusted by teams across healthcare, research & sustainability
        </span>
      </motion.div>

      <div className="relative py-7">
        <div
          className="flex gap-16 w-max"
          style={{
            animation: 'marquee 30s linear infinite',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')}
        >
          {doubled.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.06em] text-text-body/30 hover:text-text-body/70 transition-colors cursor-default whitespace-nowrap"
            >
              <span className="w-5 h-5 border-[0.5px] border-white/10 rounded flex items-center justify-center text-[9px] text-text-body/40">
                {name.charAt(0)}
              </span>
              {name}
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-alt to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-alt to-transparent pointer-events-none" />
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

export default PartnerMarquee