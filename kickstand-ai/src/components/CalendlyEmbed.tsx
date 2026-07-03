import { useEffect } from 'react'

const SCRIPT_ID = 'calendly-widget-script'
const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js'

interface CalendlyEmbedProps {
  url: string
  height?: number
}

function CalendlyEmbed({ url, height = 760 }: CalendlyEmbedProps) {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = SCRIPT_SRC
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{ minWidth: '320px', height: `${height}px` }}
    />
  )
}

export default CalendlyEmbed
