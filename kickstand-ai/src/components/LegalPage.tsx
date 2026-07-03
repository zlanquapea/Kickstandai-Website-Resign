import { ReactNode } from 'react'

interface Section {
  heading: string
  body: ReactNode
}

interface LegalPageProps {
  title: string
  lastUpdated: string
  sections: Section[]
}

function LegalPage({ title, lastUpdated, sections }: LegalPageProps) {
  return (
    <section className="px-8 md:px-16 pt-[calc(68px+72px)] pb-28 bg-bg-primary">
      <div className="max-w-[720px]">
        <h1 className="font-display text-[clamp(32px,4vw,48px)] tracking-[-1px] text-text-primary mb-3">
          {title}
        </h1>
        <p className="text-[13px] text-text-body/50 mb-14">Last updated {lastUpdated}</p>

        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-xl text-text-primary mb-3 tracking-tight">
                {s.heading}
              </h2>
              <div className="text-[14px] font-light text-text-body leading-[1.8]">
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LegalPage
