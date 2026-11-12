import { useEffect, useRef, useState } from 'react'

type Language = 'es' | 'en'

const content = {
  es: {
    entry: 'Modo reclutador',
    label: 'MODO RECLUTADOR',
    time: 'Recorrido sugerido: 90 segundos',
    title: 'Tu próxima contratación Full Stack.',
    subtitle: 'Una vista rápida de mis capacidades, proyectos y resultados, con enlaces directos para profundizar.',
    close: 'Cerrar modo reclutador',
    next: 'Siguiente',
    previous: 'Anterior',
    steps: ['Perfil', 'Resultados', 'Proyectos', 'Contacto'],
    role: 'Desarrollador Full Stack · México · Remoto',
    aboutTitle: 'Desarrollo de extremo a extremo.',
    about: 'Construyo software web y de escritorio para automatizar procesos reales. Trabajo con Laravel, React, TypeScript, APIs REST y bases de datos SQL, combinando desarrollo con experiencia operativa.',
    skillsTitle: 'Tecnologías principales',
    skills: ['Laravel / PHP', 'React / TypeScript', 'MySQL / PostgreSQL', 'SQLite / Offline', 'Docker / CI/CD'],
    impactTitle: 'Resultados en contexto.',
    impact: [
      { value: '20+', label: 'Módulos académicos desarrollados' },
      { value: '500–999', label: 'Usuarios estimados de la plataforma escolar' },
      { value: '<10 s', label: 'Generación actual de listas escolares, frente a 20–40 min manualmente' },
    ],
    impactNote: 'Cifras aproximadas de la experiencia operativa, no mediciones auditadas.',
    projectsTitle: 'Software más allá del portafolio.',
    projects: [
      { name: 'Gestión Académica Moctezuma', status: 'Proyecto institucional', summary: 'Administración escolar, calificaciones, expedientes, listas y reportes automatizados.', stack: 'Laravel · Livewire · MySQL', link: '#proyectos' },
      { name: 'Nexo Alinura', status: 'Desarrollo avanzado', summary: 'Aplicación nutricional con expedientes, planes alimenticios, almacenamiento local y sincronización offline.', stack: 'React · TypeScript · Tauri · Laravel · SQLite', link: '#laboratorio' },
    ],
    caseLink: 'Explorar proyecto',
    contactTitle: '¿Hablamos de una oportunidad?',
    contact: 'Busco proyectos y puestos remotos Full Stack, con prioridad en posiciones Mid-Level y responsabilidades acordes con mi experiencia.',
    cv: 'Consultar CV',
    mail: 'Escribirme',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    education: 'Ingeniería en Desarrollo de Software · UnADM · Egresado en 2024',
    home: 'Volver al portafolio',
    progress: 'Paso',
  },
  en: {
    entry: 'Recruiter mode',
    label: 'RECRUITER MODE',
    time: 'Suggested walkthrough: 90 seconds',
    title: 'Your next Full Stack hire.',
    subtitle: 'A quick view of my capabilities, projects and results, with direct links to explore more.',
    close: 'Close recruiter mode',
    next: 'Next',
    previous: 'Previous',
    steps: ['Profile', 'Impact', 'Projects', 'Contact'],
    role: 'Full Stack Developer · Mexico · Remote',
    aboutTitle: 'End-to-end software development.',
    about: 'I build web and desktop software to automate real workflows. My tools include Laravel, React, TypeScript, REST APIs and SQL databases, backed by hands-on operational experience.',
    skillsTitle: 'Core technologies',
    skills: ['Laravel / PHP', 'React / TypeScript', 'MySQL / PostgreSQL', 'SQLite / Offline', 'Docker / CI/CD'],
    impactTitle: 'Results in context.',
    impact: [
      { value: '20+', label: 'Academic modules developed' },
      { value: '500–999', label: 'Estimated users of the school platform' },
      { value: '<10 s', label: 'Current student list generation, compared with 20–40 min manually' },
    ],
    impactNote: 'Approximate figures from direct operational experience, not audited benchmarks.',
    projectsTitle: 'Software beyond this portfolio.',
    projects: [
      { name: 'Moctezuma Academic Management', status: 'Institutional project', summary: 'School administration, grades, records, lists and automated reporting.', stack: 'Laravel · Livewire · MySQL', link: '#proyectos' },
      { name: 'Nexo Alinura', status: 'Advanced development', summary: 'Nutrition management app with patient records, meal plans, local storage and offline synchronization.', stack: 'React · TypeScript · Tauri · Laravel · SQLite', link: '#laboratorio' },
    ],
    caseLink: 'Explore project',
    contactTitle: 'Let’s talk about an opportunity.',
    contact: 'I’m open to remote Full Stack roles and projects, prioritizing Mid-Level opportunities aligned with my practical experience.',
    cv: 'View résumé',
    mail: 'Email me',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    education: 'Software Development Engineering · UnADM · Graduated in 2024',
    home: 'Back to portfolio',
    progress: 'Step',
  },
} as const

export default function RecruiterMode({ language, open, onClose }: { language: Language; open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const t = content[language]

  useEffect(() => {
    if (!open) return
    const lastFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key !== 'Tab') return
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
      ) ?? []).filter(el => el.getClientRects().length > 0)
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      lastFocused?.focus()
    }
  }, [open, onClose])

  if (!open) return null
  const closeThenNavigate = () => onClose()
  const moveTo = (next: number) => {
    setStep(next)
    dialogRef.current?.querySelector<HTMLElement>('.recruiter-main')?.scrollTo({ top: 0, behavior: 'auto' })
  }

  return <div className="recruiter-backdrop" role="presentation">
    <div className="recruiter-dialog" role="dialog" aria-modal="true" aria-labelledby="recruiter-title" ref={dialogRef}>
      <header className="recruiter-topbar">
        <div className="recruiter-identity"><span className="recruiter-monogram" aria-hidden="true">CN<span>.</span></span><span>{t.label}<small>{t.time}</small></span></div>
        <button type="button" className="recruiter-close" onClick={onClose} ref={closeRef} aria-label={t.close}>× <span>{t.close}</span></button>
      </header>

      <div className="recruiter-layout">
        <nav aria-label={language === 'es' ? 'Etapas del recorrido' : 'Walkthrough steps'} className="recruiter-steps">
          {t.steps.map((label, i) => <button type="button" key={label} className={'recruiter-step ' + (step===i?'is-active':'')} aria-current={step===i?'step':undefined} onClick={()=>moveTo(i)}><span>{String(i+1).padStart(2,'0')}</span>{label}</button>)}
          <p>{t.education}</p>
        </nav>
        <div className="recruiter-main" key={step}>
          <div className="recruiter-progress"><span>{t.progress} {step+1} / 4</span><div className="recruiter-progress-track"><div style={{ width: (step+1)*25+'%' }}/></div></div>
          {step===0 && <section className="recruiter-pane">
            <p className="recruiter-eyebrow">{t.role}</p>
            <h2 id="recruiter-title">{t.title}</h2>
            <p className="recruiter-summary">{t.subtitle}</p>
            <h3>{t.aboutTitle}</h3><p>{t.about}</p>
            <h3>{t.skillsTitle}</h3>
            <div className="recruiter-tags">{t.skills.map(skill=><span key={skill}>{skill}</span>)}</div>
          </section>}
          {step===1 && <section className="recruiter-pane">
            <p className="recruiter-eyebrow">{t.steps[1]}</p><h2 id="recruiter-title">{t.impactTitle}</h2>
            <div className="recruiter-impact">{t.impact.map(item=><div key={item.value}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
            <p className="recruiter-muted">{t.impactNote}</p>
          </section>}
          {step===2 && <section className="recruiter-pane">
            <p className="recruiter-eyebrow">{t.steps[2]}</p><h2 id="recruiter-title">{t.projectsTitle}</h2>
            <div className="recruiter-projects">{t.projects.map(item=><article key={item.name}><small>{item.status}</small><h3>{item.name}</h3><p>{item.summary}</p><p className="recruiter-stack">{item.stack}</p><a href={item.link} onClick={closeThenNavigate}>{t.caseLink} ↗</a></article>)}</div>
          </section>}
          {step===3 && <section className="recruiter-pane">
            <p className="recruiter-eyebrow">{t.steps[3]}</p><h2 id="recruiter-title">{t.contactTitle}</h2><p className="recruiter-summary">{t.contact}</p>
            <div className="recruiter-links">
              <a className="recruiter-action-primary" target="_blank" rel="noopener noreferrer" href={language==='es'?'./cv.html':'./cv-en.html'}>{t.cv} ↗</a>
              <a href="mailto:ingcanp@gmail.com?subject=Full%20Stack%20Opportunity">{t.mail} ↗</a>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/xxRevenantx">{t.github} ↗</a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/carlos-nunez-559781232/">{t.linkedin} ↗</a>
            </div>
          </section>}
          <footer className="recruiter-footer">
            {step>0?<button type="button" className="recruiter-back" onClick={()=>moveTo(step-1)}>{t.previous}</button>:<button type="button" className="recruiter-back" onClick={onClose}>{t.home}</button>}
            {step<3?<button type="button" className="recruiter-next" onClick={()=>moveTo(step+1)}>{t.next} →</button>:<button type="button" className="recruiter-next" onClick={onClose}>{t.close}</button>}
          </footer>
        </div>
      </div>
    </div>
  </div>
}
