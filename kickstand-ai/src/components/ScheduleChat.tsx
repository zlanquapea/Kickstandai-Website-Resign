import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import logo from '../assets/logo.png'

const isPlaceholder = (value: string | undefined) =>
  !value || value.startsWith('your_')

const emailjsConfigured =
  !isPlaceholder(process.env.REACT_APP_EMAILJS_SERVICE_ID) &&
  !isPlaceholder(process.env.REACT_APP_EMAILJS_TEMPLATE_ID) &&
  !isPlaceholder(process.env.REACT_APP_EMAILJS_PUBLIC_KEY)

const easing = [0.22, 1, 0.36, 1] as const

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM',
]

const topics = [
  { id: 'healthcare', label: 'Healthcare Automation', icon: '+' },
  { id: 'sustainability', label: 'Plant-Powered Innovation', icon: '◆' },
  { id: 'demo', label: 'Product Demo', icon: '▶' },
  { id: 'custom', label: 'Custom Integration', icon: '✱' },
]

const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate()
const getFirstDayOfMonth = (month: number, year: number) =>
  new Date(year, month, 1).getDay()

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  role: string
  message: string
}

type Step = 'topic' | 'calendar' | 'details' | 'confirm'

export default function ScheduleChat() {
  const today = new Date()
  const [step, setStep] = useState<Step>('topic')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '',
    company: '', role: '', message: '',
  })

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)

  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
  }

  const isWeekend = (day: number) => {
    const d = new Date(currentYear, currentMonth, day).getDay()
    return d === 0 || d === 6
  }

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
    setSelectedDate(null)
  }

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
    setSelectedDate(null)
  }

  // Build Google Calendar link
  const buildGoogleCalendarLink = () => {
    const topicLabel = topics.find(t => t.id === selectedTopic)?.label || ''
    const title = encodeURIComponent(`Kickstand AI Strategy Session — ${topicLabel}`)
    const details = encodeURIComponent(
      `Session with ${form.firstName} ${form.lastName} from ${form.company}.\n\nTopic: ${topicLabel}\n\nNote: ${form.message}`
    )

    // Parse time slot into 24h
    const [timePart, meridiem] = selectedTime.split(' ')
    const [hourStr, minStr] = timePart.split(':')
    let hour = parseInt(hourStr)
    const min = parseInt(minStr)
    if (meridiem === 'PM' && hour !== 12) hour += 12
    if (meridiem === 'AM' && hour === 12) hour = 0

    const pad = (n: number) => String(n).padStart(2, '0')
    const dateStr = `${currentYear}${pad(currentMonth + 1)}${pad(selectedDate!)}T${pad(hour)}${pad(min)}00`
    const endMin = min + 30 >= 60 ? min + 30 - 60 : min + 30
    const endHourFinal = min + 30 >= 60 ? hour + 1 : hour
    const endDateStr = `${currentYear}${pad(currentMonth + 1)}${pad(selectedDate!)}T${pad(endHourFinal)}${pad(endMin)}00`

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${endDateStr}&details=${details}&sf=true&output=xml`
  }

  const handleSubmit = async () => {
    setSending(true)
    setError('')

    const topicLabel = topics.find(t => t.id === selectedTopic)?.label || ''
    const dateLabel = `${MONTHS[currentMonth]} ${selectedDate}, ${currentYear}`

    const templateParams = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      company: form.company || 'Not provided',
      role: form.role || 'Not provided',
      topic: topicLabel,
      date: dateLabel,
      time: `${selectedTime} EST`,
      message: form.message || 'No additional message',
    }

    try {
      if (emailjsConfigured) {
        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID!,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
          templateParams,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY!,
        )
      }
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSending(false)
    }
  }

  const stepIndex: Record<Step, number> = {
    topic: 0, calendar: 1, details: 2, confirm: 3,
  }
  const steps: Step[] = ['topic', 'calendar', 'details', 'confirm']
  const stepLabels = ['Topic', 'Date & Time', 'Your Info', 'Confirm']

  const slideVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: easing } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.3, ease: easing } },
  }

  // ── Success screen ────────────────────────────────────────
  if (submitted) {
    return (
      <main className="min-h-screen bg-bg-primary flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: easing }}
          className="text-center max-w-lg"
        >
          <div className="w-16 h-16 rounded-full border-[0.5px] border-accent-mint/40 flex items-center justify-center mx-auto mb-8 bg-accent-mint/5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A7F3D0" strokeWidth="1.2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h2 className="font-display text-4xl text-text-primary mb-4 tracking-tight">
            You're on the calendar.
          </h2>
          <p className="text-text-body font-light leading-relaxed mb-6">
            We've reserved{' '}
            <span className="text-text-primary">
              {MONTHS[currentMonth]} {selectedDate}, {currentYear}
            </span>{' '}
            at <span className="text-text-primary">{selectedTime}</span> for your chat.
            A confirmation has been sent to{' '}
            <span className="text-accent-mint">{form.email}</span>.
          </p>

          <div className="border-[0.5px] border-white/10 rounded-xl p-5 mb-6 text-left">
            <div className="text-[11px] uppercase tracking-[0.12em] text-text-body mb-3">
              Session summary
            </div>
            {[
              { label: 'Topic', value: topics.find(t => t.id === selectedTopic)?.label },
              { label: 'Date', value: `${MONTHS[currentMonth]} ${selectedDate}, ${currentYear}` },
              { label: 'Time', value: `${selectedTime} EST` },
              { label: 'Duration', value: '30 minutes' },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className={[
                  'flex items-center justify-between py-2.5 text-[13px]',
                  i < arr.length - 1 ? 'border-b-[0.5px] border-white/10' : '',
                ].join(' ')}
              >
                <span className="text-text-body">{row.label}</span>
                <span className="text-text-primary">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Add to Google Calendar button */}
          <a
            href={buildGoogleCalendarLink()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 mb-4 border-[0.5px] border-accent-mint/30 rounded-xl text-[14px] text-accent-mint hover:bg-accent-mint/5 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Add to Google Calendar
          </a>

          <button
            onClick={() => {
              setSubmitted(false)
              setStep('topic')
              setSelectedDate(null)
              setSelectedTime('')
              setSelectedTopic('')
              setForm({ firstName: '', lastName: '', email: '', company: '', role: '', message: '' })
            }}
            className="text-[13px] text-text-body/40 hover:text-text-body transition-colors"
          >
            Schedule another session
          </button>
        </motion.div>
      </main>
    )
  }

  // ── Main page ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans">

      {/* Top bar */}
      <div className="border-b-[0.5px] border-white/10 px-8 md:px-16 h-[68px] flex items-center justify-between">
        <Link to="/" className="font-display text-lg flex items-center gap-2.5 text-text-primary">
          <img src={logo} alt="Kickstand AI" className="w-8 h-8 object-contain" />
          Kickstand AI
        </Link>
        <span className="text-[12px] text-text-body/40 tracking-wide hidden md:block">
          No commitment required — just a conversation.
        </span>
        <Link to="/" className="text-[13px] text-text-body hover:text-text-primary transition-colors">
          Back to site
        </Link>
      </div>

      <main className="max-w-6xl mx-auto px-6 md:px-12 py-16">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          className="mb-14 max-w-xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-5 h-[0.5px] bg-accent-mint" />
            <span className="text-[11px] uppercase tracking-[0.16em] text-accent-mint">
              Let's talk
            </span>
          </div>
          <h1 className="font-display text-[clamp(36px,4vw,56px)] leading-[1.08] tracking-[-1.5px] mb-4">
            Book a 30-minute<br />
            <em style={{ color: '#A7F3D0' }}>strategy session.</em>
          </h1>
          <p className="text-[15px] font-light text-text-body leading-[1.8]">
            Tell us what's broken. We'll come prepared with ideas specific to
            your organization — no generic decks, no sales scripts.
          </p>
        </motion.div>

        {/* Step indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-0 mb-12 max-w-lg"
        >
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className={[
                  'w-7 h-7 rounded-full border-[0.5px] flex items-center justify-center text-[11px] font-medium transition-all duration-300',
                  stepIndex[step] > i ? 'border-accent-mint bg-accent-mint/10 text-accent-mint' : '',
                  stepIndex[step] === i ? 'border-text-primary text-text-primary' : '',
                  stepIndex[step] < i ? 'border-white/15 text-text-body/30' : '',
                ].join(' ')}>
                  {stepIndex[step] > i ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (i + 1)}
                </div>
                <span className={[
                  'text-[10px] uppercase tracking-[0.1em] hidden md:block',
                  stepIndex[step] === i ? 'text-text-primary' : 'text-text-body/30',
                ].join(' ')}>
                  {stepLabels[i]}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={[
                  'w-16 md:w-24 h-[0.5px] mb-4 mx-2 transition-all duration-500',
                  stepIndex[step] > i ? 'bg-accent-mint/40' : 'bg-white/10',
                ].join(' ')} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Step content + sidebar */}
        <div className="grid md:grid-cols-[1fr_320px] gap-10 items-start">
          <div className="min-h-[420px]">
            <AnimatePresence mode="wait">

              {/* STEP 1 — Topic */}
              {step === 'topic' && (
                <motion.div key="topic" variants={slideVariants} initial="enter" animate="center" exit="exit">
                  <h2 className="font-display text-2xl text-text-primary mb-2 tracking-tight">
                    What brings you here?
                  </h2>
                  <p className="text-[14px] text-text-body mb-8 font-light">
                    Choose the area you'd like to explore. This helps us prepare the right person for your session.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                    {topics.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTopic(t.id)}
                        className={[
                          'group text-left p-5 border-[0.5px] rounded-xl transition-all duration-200',
                          selectedTopic === t.id
                            ? 'border-accent-mint bg-accent-mint/5'
                            : 'border-white/10 hover:border-white/25 hover:bg-white/[0.02]',
                        ].join(' ')}
                      >
                        <div className={[
                          'w-8 h-8 rounded-md border-[0.5px] flex items-center justify-center text-sm mb-4 transition-colors',
                          selectedTopic === t.id
                            ? 'border-accent-mint text-accent-mint'
                            : 'border-white/15 text-text-body/40',
                        ].join(' ')}>
                          {t.icon}
                        </div>
                        <div className={[
                          'text-[14px] font-medium mb-1 transition-colors',
                          selectedTopic === t.id ? 'text-text-primary' : 'text-text-body',
                        ].join(' ')}>
                          {t.label}
                        </div>
                        <div className="text-[12px] text-text-body/40">
                          30 min · Video call
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => selectedTopic && setStep('calendar')}
                    disabled={!selectedTopic}
                    className={[
                      'px-8 py-3.5 text-[14px] font-medium rounded-lg transition-all',
                      selectedTopic
                        ? 'bg-text-primary text-bg-primary hover:opacity-90'
                        : 'bg-white/5 text-text-body/30 cursor-not-allowed',
                    ].join(' ')}
                  >
                    Continue →
                  </button>
                </motion.div>
              )}

              {/* STEP 2 — Calendar */}
              {step === 'calendar' && (
                <motion.div key="calendar" variants={slideVariants} initial="enter" animate="center" exit="exit">
                  <h2 className="font-display text-2xl text-text-primary mb-2 tracking-tight">
                    Pick a date and time.
                  </h2>
                  <p className="text-[14px] text-text-body mb-8 font-light">
                    All times shown in Eastern Standard Time. Weekends unavailable.
                  </p>

                  <div className="border-[0.5px] border-white/10 rounded-xl overflow-hidden mb-6">
                    <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] border-white/10">
                      <button onClick={prevMonth} aria-label="Previous month" className="w-7 h-7 flex items-center justify-center text-text-body hover:text-text-primary transition-colors rounded-md hover:bg-white/5">
                        ←
                      </button>
                      <span className="text-[14px] font-medium text-text-primary">
                        {MONTHS[currentMonth]} {currentYear}
                      </span>
                      <button onClick={nextMonth} aria-label="Next month" className="w-7 h-7 flex items-center justify-center text-text-body hover:text-text-primary transition-colors rounded-md hover:bg-white/5">
                        →
                      </button>
                    </div>
                    <div className="grid grid-cols-7 border-b-[0.5px] border-white/10">
                      {DAYS.map(d => (
                        <div key={d} className="py-2.5 text-center text-[11px] uppercase tracking-[0.08em] text-text-body/40">
                          {d}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 p-2 gap-1">
                      {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1
                        const past = isPastDate(day)
                        const weekend = isWeekend(day)
                        const disabled = past || weekend
                        const selected = selectedDate === day
                        return (
                          <button
                            key={day}
                            disabled={disabled}
                            onClick={() => !disabled && setSelectedDate(day)}
                            className={[
                              'aspect-square flex items-center justify-center text-[13px] rounded-lg transition-all duration-150',
                              disabled ? 'text-text-body/15 cursor-not-allowed' : '',
                              !disabled && !selected ? 'text-text-body hover:bg-white/5 hover:text-text-primary cursor-pointer' : '',
                              selected ? 'bg-accent-mint text-bg-primary font-medium' : '',
                            ].join(' ')}
                          >
                            {day}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: easing }}
                    >
                      <div className="text-[11px] uppercase tracking-[0.12em] text-text-body mb-3">
                        Available times — {MONTHS[currentMonth]} {selectedDate}
                      </div>
                      <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-8">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={[
                              'py-2 text-[12px] rounded-lg border-[0.5px] transition-all',
                              selectedTime === slot
                                ? 'border-accent-mint bg-accent-mint/10 text-accent-mint'
                                : 'border-white/10 text-text-body hover:border-white/25 hover:text-text-primary',
                            ].join(' ')}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('topic')}
                      className="px-6 py-3.5 text-[14px] text-text-body border-[0.5px] border-white/15 rounded-lg hover:border-white/30 hover:text-text-primary transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => selectedDate && selectedTime && setStep('details')}
                      disabled={!selectedDate || !selectedTime}
                      className={[
                        'px-8 py-3.5 text-[14px] font-medium rounded-lg transition-all',
                        selectedDate && selectedTime
                          ? 'bg-text-primary text-bg-primary hover:opacity-90'
                          : 'bg-white/5 text-text-body/30 cursor-not-allowed',
                      ].join(' ')}
                    >
                      Continue →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — Details */}
              {step === 'details' && (
                <motion.div key="details" variants={slideVariants} initial="enter" animate="center" exit="exit">
                  <h2 className="font-display text-2xl text-text-primary mb-2 tracking-tight">
                    Tell us about yourself.
                  </h2>
                  <p className="text-[14px] text-text-body mb-8 font-light">
                    We read every submission before the call. The more context you share, the more useful the session.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {[
                      { key: 'firstName', label: 'First name', placeholder: 'Jane' },
                      { key: 'lastName', label: 'Last name', placeholder: 'Doe' },
                    ].map(f => (
                      <div key={f.key}>
                        <label htmlFor={f.key} className="block text-[11px] uppercase tracking-[0.1em] text-text-body mb-2">
                          {f.label}
                        </label>
                        <input
                          id={f.key}
                          type="text"
                          placeholder={f.placeholder}
                          value={form[f.key as keyof FormData]}
                          onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                          className="w-full bg-transparent border-[0.5px] border-white/15 rounded-lg px-4 py-3 text-[14px] text-text-primary placeholder-text-body/25 focus:outline-none focus:border-white/35 transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-[11px] uppercase tracking-[0.1em] text-text-body mb-2">
                      Work email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-transparent border-[0.5px] border-white/15 rounded-lg px-4 py-3 text-[14px] text-text-primary placeholder-text-body/25 focus:outline-none focus:border-white/35 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="company" className="block text-[11px] uppercase tracking-[0.1em] text-text-body mb-2">
                        Organization
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Acme Health"
                        value={form.company}
                        onChange={e => setForm(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full bg-transparent border-[0.5px] border-white/15 rounded-lg px-4 py-3 text-[14px] text-text-primary placeholder-text-body/25 focus:outline-none focus:border-white/35 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-[11px] uppercase tracking-[0.1em] text-text-body mb-2">
                        Your role
                      </label>
                      <input
                        id="role"
                        type="text"
                        placeholder="Operations Director"
                        value={form.role}
                        onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full bg-transparent border-[0.5px] border-white/15 rounded-lg px-4 py-3 text-[14px] text-text-primary placeholder-text-body/25 focus:outline-none focus:border-white/35 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label htmlFor="message" className="block text-[11px] uppercase tracking-[0.1em] text-text-body mb-2">
                      What's the core problem you're trying to solve?
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="We're spending 3 hours a day on patient intake paperwork and our staff is burning out..."
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-transparent border-[0.5px] border-white/15 rounded-lg px-4 py-3 text-[14px] text-text-primary placeholder-text-body/25 focus:outline-none focus:border-white/35 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('calendar')}
                      className="px-6 py-3.5 text-[14px] text-text-body border-[0.5px] border-white/15 rounded-lg hover:border-white/30 hover:text-text-primary transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => form.firstName && form.email && setStep('confirm')}
                      disabled={!form.firstName || !form.email}
                      className={[
                        'px-8 py-3.5 text-[14px] font-medium rounded-lg transition-all',
                        form.firstName && form.email
                          ? 'bg-text-primary text-bg-primary hover:opacity-90'
                          : 'bg-white/5 text-text-body/30 cursor-not-allowed',
                      ].join(' ')}
                    >
                      Review booking →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 — Confirm */}
              {step === 'confirm' && (
                <motion.div key="confirm" variants={slideVariants} initial="enter" animate="center" exit="exit">
                  <h2 className="font-display text-2xl text-text-primary mb-2 tracking-tight">
                    Review your booking.
                  </h2>
                  <p className="text-[14px] text-text-body mb-8 font-light">
                    Everything look right? Hit confirm and we'll send a calendar invite to your email.
                  </p>

                  <div className="border-[0.5px] border-white/10 rounded-xl overflow-hidden mb-4">
                    <div className="px-5 py-3 border-b-[0.5px] border-white/10 text-[11px] uppercase tracking-[0.12em] text-text-body">
                      Booking summary
                    </div>
                    {[
                      { label: 'Topic', value: topics.find(t => t.id === selectedTopic)?.label },
                      { label: 'Date', value: `${MONTHS[currentMonth]} ${selectedDate}, ${currentYear}` },
                      { label: 'Time', value: `${selectedTime} EST` },
                      { label: 'Duration', value: '30 minutes' },
                      { label: 'Format', value: 'Video call (link sent via email)' },
                      { label: 'Name', value: `${form.firstName} ${form.lastName}` },
                      { label: 'Email', value: form.email },
                      { label: 'Organization', value: form.company || '—' },
                    ].map((row, i, arr) => (
                      <div
                        key={row.label}
                        className={[
                          'flex items-center justify-between px-5 py-3.5 text-[13px]',
                          i < arr.length - 1 ? 'border-b-[0.5px] border-white/10' : '',
                        ].join(' ')}
                      >
                        <span className="text-text-body">{row.label}</span>
                        <span className="text-text-primary">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  {form.message && (
                    <div className="border-[0.5px] border-white/10 rounded-xl p-5 mb-6">
                      <div className="text-[11px] uppercase tracking-[0.12em] text-text-body mb-2">Your note</div>
                      <p className="text-[13px] text-text-body/70 font-light leading-relaxed">{form.message}</p>
                    </div>
                  )}

                  {error && (
                    <div className="mb-4 px-4 py-3 border-[0.5px] border-red-500/30 rounded-lg bg-red-500/5 text-[13px] text-red-400">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('details')}
                      className="px-6 py-3.5 text-[14px] text-text-body border-[0.5px] border-white/15 rounded-lg hover:border-white/30 hover:text-text-primary transition-all"
                    >
                      Edit
                    </button>
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={sending}
                      className={[
                        'px-8 py-3.5 text-[14px] font-medium rounded-lg transition-all flex items-center gap-2',
                        sending
                          ? 'bg-accent-mint/40 text-bg-primary cursor-not-allowed'
                          : 'bg-accent-mint text-bg-primary hover:opacity-90',
                      ].join(' ')}
                    >
                      {sending ? (
                        <>
                          <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Confirm booking ✓'
                      )}
                    </motion.button>
                  </div>

                  <p className="text-[12px] text-text-body/30 mt-5">
                    By confirming, you agree to receive a calendar invite and one follow-up email. No spam, ever.
                  </p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: easing }}
            className="space-y-4 sticky top-24"
          >
            <div className="border-[0.5px] border-white/10 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b-[0.5px] border-white/10">
                <div className="text-[11px] uppercase tracking-[0.12em] text-text-body">
                  Your session
                </div>
              </div>
              <div className="px-5 py-4 space-y-3">
                {[
                  { icon: '◆', value: selectedTopic ? topics.find(t => t.id === selectedTopic)?.label : 'Topic not selected' },
                  { icon: '◆', value: selectedDate ? `${MONTHS[currentMonth]} ${selectedDate}, ${currentYear}` : 'Date not selected' },
                  { icon: '◆', value: selectedTime ? `${selectedTime} EST` : 'Time not selected' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-md border-[0.5px] border-white/10 flex items-center justify-center text-[9px] text-text-body/30 flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-[13px] text-text-body">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-[0.5px] border-white/10 rounded-xl p-5">
              <div className="text-[11px] uppercase tracking-[0.12em] text-text-body mb-4">
                What to expect
              </div>
              {[
                ['5 min', "We listen — what's the real problem?"],
                ['15 min', 'We show relevant work and approach'],
                ['10 min', 'Open Q&A, no pressure'],
              ].map(([time, desc]) => (
                <div key={time} className="flex gap-3 mb-3 last:mb-0">
                  <span className="text-[11px] text-accent-mint/70 font-medium mt-0.5 w-10 flex-shrink-0">
                    {time}
                  </span>
                  <span className="text-[12px] text-text-body/60 leading-relaxed">{desc}</span>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 border-[0.5px] border-white/10 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-mint" />
                <span className="text-[11px] uppercase tracking-[0.1em] text-text-body">
                  No commitment
                </span>
              </div>
              <p className="text-[12px] text-text-body/50 leading-relaxed">
                This is a conversation, not a sales call. If we're not the right fit, we'll tell you who is.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}