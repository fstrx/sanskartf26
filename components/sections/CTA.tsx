'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ctaPrompts, suggestionCategories } from '@/lib/content'
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations'
import Button from '@/components/ui/Button'
import SectionWrapper from '@/components/ui/SectionWrapper'

type FormState = {
  name: string
  email: string
  category: string
  message: string
}

type FormErrors = {
  name?: string
  message?: string
}

export default function CTA() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    category: suggestionCategories[0],
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate() {
    const nextErrors: FormErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = 'Name is required.'
    }

    if (!form.message.trim()) {
      nextErrors.message = 'A message or suggestion is required.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target

    setForm((current) => ({ ...current, [name]: value }))

    if (errors[name as keyof FormErrors]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  function handlePromptClick(prompt: string) {
    setForm((current) => ({
      ...current,
      message: current.message.trim() ? `${current.message}\n\n${prompt}` : `${prompt}\n`,
    }))

    if (errors.message) {
      setErrors((current) => ({ ...current, message: undefined }))
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) {
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <SectionWrapper id="cta" className="min-h-screen bg-[#011a12] py-28 lg:py-32">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-emerald-900/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-teal-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-20 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="eyebrow-label mb-3 text-xs font-bold text-emerald-400"
          >
            Your Move
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            Carry the <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">Story Forward</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-300">
            Peace moves when people speak. Leave one message or one suggestion that makes this experience stronger.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex flex-col justify-center gap-4 sm:flex-row sm:gap-5">
            <Button href="#interactive" variant="secondary">
              Revisit the Interactive Field
            </Button>
            <Button href="#global" variant="ghost">
              See Global Lessons Again
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="theme-surface-panel overflow-hidden rounded-[2.25rem] backdrop-blur-xl"
        >
          <div className="grid gap-0 lg:grid-cols-[0.72fr_1fr]">
            <div className="border-b border-white/8 p-9 lg:border-b-0 lg:border-r lg:p-12">
              <motion.p variants={fadeUp} className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-200/70">
                Prompt Bank
              </motion.p>
              <motion.h3 variants={fadeUp} className="font-display mt-4 text-2xl text-white sm:text-3xl">
                Need a starting point?
              </motion.h3>
              <motion.p variants={fadeUp} className="mt-5 text-sm leading-7 text-slate-300">
                Use a prompt to add a peace message, a critique, or a concrete next step.
              </motion.p>

              <div className="mt-8 space-y-4">
                {ctaPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handlePromptClick(prompt)}
                    className="theme-surface-card w-full rounded-[1.5rem] p-5 text-left text-sm leading-7 text-slate-200 transition-all duration-200 hover:border-emerald-300/30 hover:bg-emerald-400/8"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="theme-surface-overlay mt-10 rounded-[1.75rem] p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-200/70">What we are asking for</p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
                  <li>One truth people need to hear.</li>
                  <li>One idea that improves this experience.</li>
                  <li>One story we should examine next.</li>
                </ul>
              </div>
            </div>

            <div className="p-9 lg:p-12">
              <motion.h3 variants={fadeUp} className="font-display text-2xl text-white sm:text-3xl">
                Share a Message or Suggestion
              </motion.h3>
              <motion.p variants={fadeUp} className="mt-4 text-sm leading-7 text-slate-400">
                Send one message, one critique, or one next step.
              </motion.p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/35 bg-emerald-500/12 text-xl font-black text-emerald-200">
                      OK
                    </div>
                    <h4 className="mt-6 text-2xl font-bold text-white">Your contribution is in.</h4>
                    <p className="mt-3 max-w-md text-slate-300">
                      Peace moves forward because people add to it.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false)
                        setForm({ name: '', email: '', category: suggestionCategories[0], message: '' })
                      }}
                      className="mt-6 text-sm font-semibold text-emerald-300 underline underline-offset-4 transition-colors duration-200 hover:text-emerald-200"
                    >
                      Send another contribution
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-6"
                    noValidate
                  >
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-300">
                          Name <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500/40 ${
                            errors.name ? 'border-red-500/60' : 'border-white/10 focus:border-emerald-500/40'
                          }`}
                        />
                        {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-300">
                          Email <span className="font-normal text-slate-500">(optional)</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-300">Contribution Type</label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-[#071711] px-4 py-3 text-white outline-none transition-all duration-200 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/40"
                      >
                        {suggestionCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-300">
                        Your peace message or suggestion <span className="text-emerald-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={7}
                        placeholder="Write a message of peace, a project suggestion, or a story worth including..."
                        className={`w-full resize-none rounded-xl border bg-white/5 px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500/40 ${
                          errors.message ? 'border-red-500/60' : 'border-white/10 focus:border-emerald-500/40'
                        }`}
                      />
                      {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                      className="relative w-full overflow-hidden rounded-xl bg-[linear-gradient(135deg,#059669,#0d9488,#0891b2)] py-4 text-base font-bold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-2"
                          >
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="inline-block h-4 w-4 rounded-full border-2 border-white/35 border-t-white"
                            />
                            Sending...
                          </motion.span>
                        ) : (
                          <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            Send Your Contribution
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-20 text-center"
        >
          <p className="text-3xl font-light italic leading-relaxed text-slate-200 sm:text-4xl">
            &ldquo;Peace begins when a voice decides to stay human.&rdquo;
          </p>
          <div className="mx-auto mt-6 h-0.5 w-16 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
