'use client';

import { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  CONTENT CONFIG — edit questions, options, and copy here           */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    id: 'veteran',
    type: 'single',
    eyebrow: 'Eligibility',
    question: 'Are you a U.S. veteran?',
    options: ['Yes', 'No'],
  },
  {
    id: 'branch',
    type: 'single',
    eyebrow: 'Service',
    question: 'What branch did you serve in?',
    options: ['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force', 'Other'],
  },
  {
    id: 'dob',
    type: 'date',
    eyebrow: 'About you',
    question: 'What is your date of birth?',
    help: 'Your age helps us match you with the right carriers.',
  },
  {
    id: 'state',
    type: 'state',
    eyebrow: 'About you',
    question: 'What state do you live in?',
    help: 'Coverage and pricing vary by state.',
  },
  {
    id: 'hasInsurance',
    type: 'single',
    eyebrow: 'Coverage',
    question: 'Do you currently have life insurance?',
    options: ['Yes', 'No', 'Not sure'],
  },
  {
    id: 'coverageType',
    type: 'single',
    eyebrow: 'Coverage',
    question: 'What type of coverage are you interested in?',
    options: ['Final expense', 'Whole life', 'Term life', 'Mortgage protection', 'Not sure'],
  },
  {
    id: 'health',
    type: 'health',
    eyebrow: 'Health',
    question: 'A few quick health questions',
    help: 'Answer honestly — this only affects which plans we show you.',
    subQuestions: [
      {
        id: 'seriousCondition',
        label:
          'Have you been diagnosed with cancer, heart attack, stroke, COPD, diabetes, kidney disease, or any serious medical condition?',
        options: ['Yes', 'No'],
      },
      {
        id: 'careStatus',
        label: 'Are you currently hospitalized, in a nursing home, or receiving hospice care?',
        options: ['Yes', 'No'],
      },
      {
        id: 'tobacco',
        label: 'Do you use tobacco?',
        options: ['Yes', 'No'],
      },
      {
        id: 'medications',
        label: 'Are you currently taking prescription medications?',
        options: ['Yes', 'No'],
      },
    ],
  },
  {
    id: 'coverageAmount',
    type: 'single',
    eyebrow: 'Coverage',
    question: 'What is your desired coverage amount?',
    options: ['$5,000', '$10,000', '$15,000', '$25,000', '$50,000+'],
  },
  {
    id: 'contact',
    type: 'contact',
    eyebrow: 'Almost done',
    question: 'Where should your agent reach you?',
    help: 'A licensed agent will use this to share your options. No spam.',
  },
];

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
  'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

const DISCLAIMER =
  'Coverage options and eligibility vary by state, age, health, and carrier underwriting guidelines. This is not affiliated with or endorsed by the VA or any government agency.';

const THANK_YOU = 'Thank you. A licensed agent will review your information and contact you shortly.';

/* ------------------------------------------------------------------ */
/*  INITIAL STATE                                                      */
/* ------------------------------------------------------------------ */

const initialData = {
  veteran: '',
  branch: '',
  dob: '',
  state: '',
  hasInsurance: '',
  coverageType: '',
  health: { seriousCondition: '', careStatus: '', tobacco: '', medications: '' },
  coverageAmount: '',
  contact: { firstName: '', lastName: '', phone: '', email: '' },
};

/* ------------------------------------------------------------------ */
/*  ICONS                                                              */
/* ------------------------------------------------------------------ */

function Chevron({ className = '' }) {
  return (
    <svg viewBox="0 0 24 14" fill="none" className={className} aria-hidden="true">
      <path d="M2 12 L12 3 L22 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check({ className = '' }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M4 10.5 L8.5 15 L16 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeft({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  PROGRESS — rank chevrons (signature element)                      */
/* ------------------------------------------------------------------ */

function RankProgress({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-navy">
          Step {Math.min(current + 1, total)} of {total}
        </span>
        <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {pct}% complete
        </span>
      </div>

      {/* Chevron rank ticks */}
      <div className="flex items-end gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <Chevron
              key={i}
              className={`h-3 flex-1 transition-colors duration-300 ${
                done ? 'text-honor' : active ? 'text-navy' : 'text-slate-300'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  REUSABLE INPUTS                                                    */
/* ------------------------------------------------------------------ */

function OptionButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex min-h-[60px] w-full items-center justify-between rounded-xl border-2 px-5 py-4 text-left text-lg font-medium transition-all duration-200
        ${
          selected
            ? 'border-navy bg-navy text-white shadow-md'
            : 'border-slate-200 bg-white text-ink hover:border-navy/40 hover:bg-navy/[0.03]'
        }`}
    >
      <span>{label}</span>
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors
          ${selected ? 'border-honor bg-honor text-navy' : 'border-slate-300 text-transparent'}`}
      >
        <Check className="h-4 w-4" />
      </span>
    </button>
  );
}

function TextField({ label, type = 'text', value, onChange, placeholder, autoComplete, inputMode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy">
        {label}
      </span>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 text-lg text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-navy"
      />
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  VALIDATION                                                         */
/* ------------------------------------------------------------------ */

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStep(step, data) {
  switch (step.type) {
    case 'single':
      return data[step.id] ? null : 'Please choose an option to continue.';

    case 'state':
      return data.state ? null : 'Please select your state.';

    case 'date': {
      if (!data.dob) return 'Please enter your date of birth.';
      const dob = new Date(data.dob);
      if (Number.isNaN(dob.getTime())) return 'Please enter a valid date.';
      const today = new Date();
      if (dob > today) return 'Date of birth cannot be in the future.';
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      if (age < 18) return 'You must be at least 18 years old.';
      if (age > 120) return 'Please enter a valid date of birth.';
      return null;
    }

    case 'health': {
      const allAnswered = step.subQuestions.every((q) => data.health[q.id]);
      return allAnswered ? null : 'Please answer every health question.';
    }

    case 'contact': {
      const c = data.contact;
      if (!c.firstName.trim()) return 'Please enter your first name.';
      if (!c.lastName.trim()) return 'Please enter your last name.';
      const digits = c.phone.replace(/\D/g, '');
      if (digits.length < 10) return 'Please enter a valid 10-digit phone number.';
      if (!emailRe.test(c.email)) return 'Please enter a valid email address.';
      return null;
    }

    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function LeadForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const total = STEPS.length;
  const step = STEPS[stepIndex];
  const isLast = stepIndex === total - 1;

  /* --- updaters --- */
  const setSingle = (id, value) => {
    setData((d) => ({ ...d, [id]: value }));
    setError(null);
  };
  const setHealth = (id, value) => {
    setData((d) => ({ ...d, health: { ...d.health, [id]: value } }));
    setError(null);
  };
  const setContact = (id, value) => {
    setData((d) => ({ ...d, contact: { ...d.contact, [id]: value } }));
    setError(null);
  };

  /* --- navigation --- */
  const goNext = () => {
    const err = validateStep(step, data);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    if (isLast) {
      handleSubmit();
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const goBack = () => {
    setError(null);
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const handleSubmit = async () => {
  try {
    await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Lead submitted:", data);

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead");
    }

    setSubmitted(true);
  } catch (error) {
    console.error(error);
    alert("Submission failed");
  }
};

  /* ---------------------------------------------------------------- */
  /*  THANK-YOU SCREEN                                                 */
  /* ---------------------------------------------------------------- */
  if (submitted) {
    return (
      <Shell>
        <div key="thanks" className="animate-stepIn text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-honor">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="font-display text-3xl font-semibold uppercase tracking-wide text-navy">
            Received
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink">{THANK_YOU}</p>
          <div className="mt-8 flex items-center justify-center gap-1.5 text-honor">
            <Chevron className="h-3 w-8" />
            <Chevron className="h-3 w-8" />
            <Chevron className="h-3 w-8" />
          </div>
        </div>
      </Shell>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  QUESTION SCREENS                                                 */
  /* ---------------------------------------------------------------- */
  return (
    <Shell>
      <RankProgress current={stepIndex} total={total} />

      {/* key forces re-mount so the enter animation replays each step */}
      <div key={stepIndex} className="animate-stepIn mt-8">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-honor">
          {step.eyebrow}
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold leading-tight text-navy sm:text-3xl">
          {step.question}
        </h1>
        {step.help && <p className="mt-2 text-base text-muted">{step.help}</p>}

        <div className="mt-7">
          {/* --- single choice --- */}
          {step.type === 'single' && (
            <div className="space-y-3">
              {step.options.map((opt) => (
                <OptionButton
                  key={opt}
                  label={opt}
                  selected={data[step.id] === opt}
                  onClick={() => setSingle(step.id, opt)}
                />
              ))}
            </div>
          )}

          {/* --- date of birth --- */}
          {step.type === 'date' && (
            <input
              type="date"
              value={data.dob}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSingle('dob', e.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 text-lg text-ink outline-none transition-colors focus:border-navy"
            />
          )}

          {/* --- state --- */}
          {step.type === 'state' && (
            <select
              value={data.state}
              onChange={(e) => setSingle('state', e.target.value)}
              className="w-full appearance-none rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 text-lg text-ink outline-none transition-colors focus:border-navy"
            >
              <option value="" disabled>
                Select your state
              </option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}

          {/* --- health questions --- */}
          {step.type === 'health' && (
            <div className="space-y-6">
              {step.subQuestions.map((q) => (
                <div key={q.id}>
                  <p className="mb-3 text-base font-medium leading-snug text-ink">{q.label}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {q.options.map((opt) => (
                      <OptionButton
                        key={opt}
                        label={opt}
                        selected={data.health[q.id] === opt}
                        onClick={() => setHealth(q.id, opt)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* --- contact info --- */}
          {step.type === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  label="First name"
                  value={data.contact.firstName}
                  onChange={(v) => setContact('firstName', v)}
                  placeholder="John"
                  autoComplete="given-name"
                />
                <TextField
                  label="Last name"
                  value={data.contact.lastName}
                  onChange={(v) => setContact('lastName', v)}
                  placeholder="Doe"
                  autoComplete="family-name"
                />
              </div>
              <TextField
                label="Phone number"
                type="tel"
                inputMode="tel"
                value={data.contact.phone}
                onChange={(v) => setContact('phone', v)}
                placeholder="(555) 555-5555"
                autoComplete="tel"
              />
              <TextField
                label="Email"
                type="email"
                inputMode="email"
                value={data.contact.email}
                onChange={(v) => setContact('email', v)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          )}
        </div>

        {/* --- error --- */}
        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-flagred/10 px-4 py-3 text-sm font-medium text-flagred">
            {error}
          </p>
        )}

        {/* --- nav buttons --- */}
        <div className="mt-8 flex items-center gap-3">
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="flex min-h-[56px] items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 text-base font-semibold text-navy transition-colors hover:border-navy/40"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>
          )}
          <button
            type="button"
            onClick={goNext}
            className="flex min-h-[56px] flex-1 items-center justify-center gap-2 rounded-xl bg-navy px-6 text-lg font-semibold text-white shadow-sm transition-all hover:bg-navy-light active:scale-[0.99]"
          >
            {isLast ? 'Submit' : 'Next'}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE SHELL — header, card, footer disclaimer                      */
/* ------------------------------------------------------------------ */

function Shell({ children }) {
  return (
    <main className="flex min-h-screen flex-col bg-parchment">
      {/* Top navy band with wordmark */}
<header className="border-b-2 border-honor/60 bg-navy">
  <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
    <div className="flex items-center gap-2.5">
      <Chevron className="h-4 w-6 text-honor" />

      <div>
        <span className="font-display text-lg font-semibold uppercase tracking-[0.18em] text-white">
          Empire Financial
        </span>
        <p className="text-xs text-slate-300">
          Licensed Insurance Agent
        </p>
      </div>
    </div>

    <a
      href="tel:+12623287608"
      className="text-white text-sm font-semibold hover:text-yellow-300"
    >
      (262) 328-7608
    </a>
  </div>
</header>      {/* Card */}
      <div className="flex flex-1 items-start justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          {children}
        </div>
      </div>

      {/* Disclaimer */}
      <footer className="px-5 pb-8">
  <p className="mx-auto max-w-xl text-center text-xs leading-relaxed text-muted">
    {DISCLAIMER}
  </p>

  <div className="mt-4 flex justify-center gap-6 text-sm">
    <a href="/privacy" className="text-navy hover:underline">
      Privacy Policy
    </a>

    <a href="/terms" className="text-navy hover:underline">
      Terms of Service
    </a>

    <a href="/about" className="text-navy hover:underline">
      About Us
    </a>
  </div>
</footer>
    </main>
  );
}
