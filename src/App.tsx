import { useEffect, useState } from 'react'

type Language = 'es' | 'en'
type Theme = 'dark' | 'light'

const translations = {
  es: {
    nav: { about: 'Sobre mí', projects: 'Proyectos', skills: 'Tecnologías', journey: 'Trayectoria', contact: 'Contacto' },
    available: 'Abierto a oportunidades remotas',
    heroKicker: 'Desarrollador Full Stack · México',
    heroHeadline: 'Software que resuelve',
    heroAccent: 'problemas reales.',
    heroIntro: 'Diseño y desarrollo aplicaciones completas con Laravel, React y TypeScript. Me enfoco en procesos útiles, arquitectura mantenible y experiencias claras para las personas.',
    seeProjects: 'Explorar proyectos',
    getInTouch: 'Contactar',
    seeResume: 'Consultar CV',
    summaryTitle: 'Más allá de una interfaz.',
    summaryText: 'He participado en la digitalización de procesos educativos y desarrollo una plataforma nutricional multiplataforma. Busco colaborar de forma remota en equipos que valoren el código legible, la mejora continua y el impacto real.',
    stats: [
      { value: '20+', label: 'Módulos académicos desarrollados' },
      { value: '500–999', label: 'Usuarios estimados de la plataforma' },
      { value: 'B1', label: 'Inglés intermedio' },
    ],
    sectionProjects: 'Proyectos destacados',
    projectsTitle: 'Del problema al producto.',
    projectsLead: 'Soluciones desarrolladas para procesos académicos y gestión nutricional, desde la arquitectura hasta la experiencia de usuario.',
    viewCase: 'Ver caso de estudio',
    closeCase: 'Ocultar caso',
    labelChallenge: 'El reto',
    labelApproach: 'La solución',
    labelArchitecture: 'Enfoque técnico',
    labelResults: 'Resultados y alcance',
    labelStack: 'Tecnologías',
    projects: [
      {
        id: 'moctezuma',
        eyebrow: 'EDTECH · PLATAFORMA WEB',
        name: 'Gestión Académica Moctezuma',
        status: 'Proyecto institucional · evolución continua',
        summary: 'Una plataforma modular para centralizar inscripciones, grupos, docentes, calificaciones, expedientes y documentos escolares.',
        challenge: 'Diversas tareas académicas se realizaban manualmente en hojas de cálculo y documentos separados; los reportes consumían tiempo y requerían múltiples verificaciones.',
        approach: 'Diseñé e implementé más de 20 módulos para organizar la información y automatizar procesos como listas, boletas, consultas y exportaciones de documentos.',
        architecture: 'Aplicación web modular con Laravel, Livewire, MySQL y vistas responsivas. Autenticación, validaciones, controles de acceso y generación de archivos.',
        results: [
          'Generación de listas generales: de aproximadamente 20–40 minutos manualmente a menos de 10 segundos mediante la plataforma.',
          'Uso estimado por una comunidad de 500–999 personas.',
          'Centralización de procesos académicos y reducción de tareas repetitivas.',
        ],
        stack: ['Laravel', 'PHP', 'Livewire', 'MySQL', 'Tailwind CSS', 'PDF / Word / Excel'],
      },
      {
        id: 'alinura',
        eyebrow: 'HEALTHTECH · ESCRITORIO + BACKEND',
        name: 'Nexo Alinura',
        status: 'Proyecto propio · desarrollo avanzado, sin lanzamiento público',
        summary: 'Software de gestión nutricional con expedientes, seguimiento, planes alimenticios, almacenamiento local y sincronización offline.',
        challenge: 'Los consultorios necesitan organizar información clínica y continuar trabajando cuando la conectividad es inestable, sin perder los cambios pendientes.',
        approach: 'Implementé flujos de pacientes, evaluaciones, planes, documentos y permisos, junto con persistencia local y sincronización automática al recuperar la conexión.',
        architecture: 'Frontend con React y TypeScript; integración de escritorio mediante Tauri y Rust. Servicios con Laravel y PostgreSQL, almacenamiento local con SQLite.',
        results: [
          'Siete áreas funcionales implementadas.',
          'Trabajo sin conexión y envío automático de cambios pendientes al restablecer internet.',
          'Producto en desarrollo avanzado: no se presenta como servicio publicado ni con clientes activos.',
        ],
        stack: ['React', 'TypeScript', 'Tauri', 'Rust', 'SQLite', 'PostgreSQL', 'Laravel'],
      },
    ],
    skillsKicker: 'COMPETENCIAS',
    skillsTitle: 'Mi caja de herramientas.',
    skillsLead: 'Tecnologías utilizadas en mis proyectos. Mi nivel general es intermedio y continúo profundizando en buenas prácticas y pruebas.',
    skills: [
      { title: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Livewire', 'Accesibilidad'] },
      { title: 'Backend & APIs', items: ['PHP', 'Laravel', 'REST APIs', 'MVC', 'Autenticación', 'Roles y permisos'] },
      { title: 'Datos & offline', items: ['MySQL / MariaDB', 'PostgreSQL', 'SQLite', 'SQL', 'Eloquent ORM', 'Sincronización'] },
      { title: 'Entrega & calidad', items: ['Git / GitHub', 'Docker Compose', 'CI/CD', 'Pruebas funcionales', 'Depuración', 'Despliegues'] },
    ],
    journeyKicker: 'TRAYECTORIA',
    journeyTitle: 'Experiencia que conecta tecnología y operación.',
    journeyLead: 'Combino desarrollo de productos propios con experiencia en procesos educativos y soluciones digitales.',
    timeline: [
      { date: '2026 · Actualidad', title: 'Nexo Alinura', type: 'Producto propio', description: 'Desarrollo de una aplicación de gestión nutricional con React, Tauri, Laravel y funcionamiento offline.' },
      { date: '2020 · Actualidad', title: 'Plataforma académica Moctezuma', type: 'Proyecto de software', description: 'Desarrollo y evolución de módulos de gestión académica y automatización documental.' },
      { date: '2016–2018', title: 'ApprendUP y Padrón de Agua Potable', type: 'Proyectos anteriores', description: 'Desarrollo web, plataforma de cursos y sistema de apoyo a gestión de información y pagos.' },
    ],
    educationTitle: 'Formación académica',
    education: 'Ingeniería en Desarrollo de Software · UnADM · Egresado en 2024.',
    contactKicker: 'CONTACTO',
    contactTitle: '¿Construimos algo útil?',
    contactLead: 'Me interesan oportunidades remotas Full Stack y equipos donde pueda aportar en frontend, backend y evolución de productos.',
    mailAction: 'Escribirme por correo',
    linkedinAction: 'Ver LinkedIn',
    githubAction: 'Explorar GitHub',
    location: 'México · Remoto',
    footer: 'Desarrollado por Carlos Núñez',
    menuButton: 'Abrir menú',
  },
  en: {
    nav: { about: 'About', projects: 'Projects', skills: 'Tech stack', journey: 'Experience', contact: 'Contact' },
    available: 'Open to remote opportunities',
    heroKicker: 'Full Stack Developer · Mexico',
    heroHeadline: 'Building software that solves',
    heroAccent: 'real problems.',
    heroIntro: 'I design and develop end-to-end applications with Laravel, React and TypeScript. I focus on useful workflows, maintainable architecture and clear user experiences.',
    seeProjects: 'Explore projects',
    getInTouch: 'Get in touch',
    seeResume: 'View résumé',
    summaryTitle: 'More than a user interface.',
    summaryText: 'I have helped digitize educational workflows and I am building a cross-platform nutrition management application. I am looking for a remote team that values readable code, continuous improvement and meaningful results.',
    stats: [
      { value: '20+', label: 'Academic modules developed' },
      { value: '500–999', label: 'Estimated platform users' },
      { value: 'B1', label: 'Intermediate English' },
    ],
    sectionProjects: 'Featured projects',
    projectsTitle: 'From problem to product.',
    projectsLead: 'Solutions designed for academic workflows and nutrition management, from architecture to user experience.',
    viewCase: 'Read case study',
    closeCase: 'Close case study',
    labelChallenge: 'The challenge',
    labelApproach: 'The solution',
    labelArchitecture: 'Technical approach',
    labelResults: 'Results and scope',
    labelStack: 'Tech stack',
    projects: [
      {
        id: 'moctezuma',
        eyebrow: 'EDTECH · WEB PLATFORM',
        name: 'Moctezuma Academic Management',
        status: 'Institutional project · ongoing improvements',
        summary: 'A modular platform for enrollment, classes, teachers, grades, student records and school documents.',
        challenge: 'Academic processes previously involved spreadsheets and separate documents. Reporting was time-consuming and required repetitive verification.',
        approach: 'I developed over 20 modules to centralize information and automate attendance lists, grades, queries and document exports.',
        architecture: 'A modular web application built with Laravel, Livewire, MySQL and responsive interfaces. Authentication, validation, access control and file exports.',
        results: [
          'General-list preparation: approximately 20–40 minutes manually versus less than 10 seconds in the system.',
          'Estimated usage across 500–999 people.',
          'Centralized academic workflows and fewer repetitive administrative tasks.',
        ],
        stack: ['Laravel', 'PHP', 'Livewire', 'MySQL', 'Tailwind CSS', 'PDF / Word / Excel'],
      },
      {
        id: 'alinura',
        eyebrow: 'HEALTHTECH · DESKTOP + BACKEND',
        name: 'Nexo Alinura',
        status: 'Personal project · advanced development, not publicly launched',
        summary: 'Nutrition management software with patient records, progress tracking, meal plans, local storage and offline synchronization.',
        challenge: 'Clinics need to manage sensitive information and keep working through unstable connectivity without losing pending changes.',
        approach: 'I implemented patient, assessment, planning, document and access flows, plus local persistence and automatic synchronization after reconnecting.',
        architecture: 'React and TypeScript frontend, desktop integration through Tauri and Rust, Laravel and PostgreSQL services, and SQLite local storage.',
        results: [
          'Seven functional areas implemented.',
          'Offline operations and automatic upload of pending changes once connectivity is restored.',
          'Continuing development and integration of core modules.',
        ],
        stack: ['React', 'TypeScript', 'Tauri', 'Rust', 'SQLite', 'PostgreSQL', 'Laravel'],
      },
    ],
    skillsKicker: 'CAPABILITIES',
    skillsTitle: 'The tools I use.',
    skillsLead: 'Technologies used in my projects. My overall proficiency is intermediate and I keep improving testing and software design practices.',
    skills: [
      { title: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Livewire', 'Accessibility'] },
      { title: 'Backend & APIs', items: ['PHP', 'Laravel', 'REST APIs', 'MVC', 'Authentication', 'Roles & permissions'] },
      { title: 'Data & offline', items: ['MySQL / MariaDB', 'PostgreSQL', 'SQLite', 'SQL', 'Eloquent ORM', 'Synchronization'] },
      { title: 'Delivery & quality', items: ['Git / GitHub', 'Docker Compose', 'CI/CD', 'Functional tests', 'Debugging', 'Deployments'] },
    ],
    journeyKicker: 'BACKGROUND',
    journeyTitle: 'Experience connecting software and operations.',
    journeyLead: 'I combine product development with a background in education administration and digital solutions.',
    timeline: [
      { date: '2026 · Present', title: 'Nexo Alinura', type: 'Personal product', description: 'Developing nutrition management software with React, Tauri, Laravel and offline capabilities.' },
      { date: '2020 · Present', title: 'Moctezuma academic platform', type: 'Software project', description: 'Building and improving academic workflows and document automation modules.' },
      { date: '2016–2018', title: 'ApprendUP and Water Registry', type: 'Earlier projects', description: 'Web development, e-learning tools and software supporting information and payment administration.' },
    ],
    educationTitle: 'Education',
    education: 'Software Development Engineering · UnADM · Graduated in 2024.',
    contactKicker: 'CONTACT',
    contactTitle: 'Let’s build something useful.',
    contactLead: 'I am interested in remote Full Stack opportunities and teams where I can contribute across frontend, backend and product development.',
    mailAction: 'Send an email',
    linkedinAction: 'View LinkedIn',
    githubAction: 'Explore GitHub',
    location: 'Mexico · Remote',
    footer: 'Developed by Carlos Núñez',
    menuButton: 'Open menu',
  },
} as const

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {diagonal ? <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></> : <><path d="M4 12h16" /><path d="m13 5 7 7-7 7" /></>}
    </svg>
  )
}

function ProjectIllustration({ id }: { id: string }) {
  return (
    <div className={'project-visual project-visual--' + id} aria-label={id === 'alinura' ? 'Interfaz conceptual de gestión nutricional' : 'Interfaz conceptual de gestión académica'}>
      <div className="visual-window" aria-hidden="true">
        <div className="window-top"><i /><i /><i /><span>{id === 'alinura' ? 'alinura.app' : 'academic.dashboard'}</span></div>
        <div className="window-layout">
          <div className="window-sidebar"><span /><span /><span /><span /><span /></div>
          <div className="window-content">
            <div className="window-heading" />
            <div className="window-row"><div /><div /><div /></div>
            <div className="window-chart"><span /><span /><span /><span /><span /><span /><span /></div>
            <div className="window-lines"><i /><i /><i /></div>
          </div>
        </div>
      </div>
     </div>
  )
}

function initialLanguage(): Language {
  try {
    const saved = localStorage.getItem('portfolio-lang')
    if (saved === 'es' || saved === 'en') return saved
  } catch { /* Browser storage may be unavailable. */ }
  return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es'
}

function initialTheme(): Theme {
  try {
    // Only explicit selections are restored; legacy auto-saved values are ignored.
    const saved = localStorage.getItem('portfolio-theme-choice')
    if (saved === 'light' || saved === 'dark') return saved
  } catch { /* Storage can be disabled by the browser. */ }
  return 'light'
}

function ThemeIcon({ theme }: { theme: Theme }) {
  return theme === 'dark'
    ? <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
    : <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M20.9 13.2A9 9 0 0 1 10.8 3.1 9.1 9.1 0 1 0 20.9 13.2Z" /></svg>
}


/**
 * Type the hero in three consecutive phases.
 * Full text stays in an invisible layout layer so no lines jump while typing.
 * Screen readers read the complete strings; reduced-motion users get static text.
 */
function HeroOrbLogo({ idPrefix = "hero" }: { idPrefix?: string }) {
  return (
    <svg className="hero-orb-logo" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${idPrefix}-portfolioOrbGradient`} x1="0%" y1="0%" x2="25%" y2="100%">
          <stop offset="0%" stopColor="#1d88ff" />
          <stop offset="44%" stopColor="#6c66ff" />
          <stop offset="77%" stopColor="#c54dfb" />
          <stop offset="100%" stopColor="#ff4bda" />
        </linearGradient>
        <radialGradient id={`${idPrefix}-portfolioOrbHighlight`} cx="29%" cy="16%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity=".22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="87" fill={`url(#${idPrefix}-portfolioOrbGradient)`} />
      <circle cx="100" cy="100" r="87" fill={`url(#${idPrefix}-portfolioOrbHighlight)`} />
      <g fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter">
        <polyline points="73,50 31,99 73,150" />
        <line x1="106" y1="43" x2="96" y2="157" />
        <polyline points="130,50 171,99 130,150" />
      </g>
    </svg>
  )
}

function TypewriterHero({ headline, accent, intro }: { headline: string; accent: string; intro: string }) {
  const first = Array.from(headline)
  const second = Array.from(accent)
  const third = Array.from(intro)
  const headlineEnd = first.length
  const accentEnd = first.length + second.length
  const total = accentEnd + third.length

  const [visible, setVisible] = useState(() => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? total : 0
  ))

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer: ReturnType<typeof setTimeout> | undefined
    let count = 0

    const next = () => {
      count += 1
      setVisible(count)
      if (count >= total) return
      const delay = count === headlineEnd ? 290
        : count === accentEnd ? 370
          : count < headlineEnd ? 47
            : count < accentEnd ? 56 : 18
      timer = setTimeout(next, delay)
    }

    const restart = () => {
      if (timer !== undefined) clearTimeout(timer)
      count = 0
      if (media.matches) {
        setVisible(total)
        return
      }
      setVisible(0)
      timer = setTimeout(next, 260)
    }

    restart()
    media.addEventListener('change', restart)
    return () => {
      if (timer !== undefined) clearTimeout(timer)
      media.removeEventListener('change', restart)
    }
  }, [headline, accent, intro, headlineEnd, accentEnd, total])

  const typedHeadline = first.slice(0, Math.min(visible, headlineEnd)).join('')
  const typedAccent = second.slice(0, Math.min(Math.max(visible - headlineEnd, 0), second.length)).join('')
  const typedIntro = third.slice(0, Math.min(Math.max(visible - accentEnd, 0), third.length)).join('')
  const phase = visible < headlineEnd ? 'headline'
    : visible < accentEnd ? 'accent'
      : visible < total ? 'intro' : 'done'

  return (
    <>
      <h1 className="typewriter-heading" aria-label={headline + ' ' + accent}>
        <span className="typewriter-line">
          <span className="typewriter-ghost" aria-hidden="true">{headline}</span>
          <span className="typewriter-live" aria-hidden="true">
            {typedHeadline}{phase === 'headline' && <span className="typewriter-caret" />}
          </span>
        </span>
        <span className="typewriter-line">
          <span className="typewriter-ghost" aria-hidden="true">{accent}</span>
          <span className="typewriter-live gradient-text" aria-hidden="true">
            {typedAccent}{phase === 'accent' && <span className="typewriter-caret typewriter-caret--accent" />}
          </span>
        </span>
      </h1>
      <p className="hero-intro typewriter-paragraph" aria-label={intro}>
        <span className="typewriter-ghost" aria-hidden="true">{intro}</span>
        <span className="typewriter-live" aria-hidden="true">
          {typedIntro}{phase === 'intro' && <span className="typewriter-caret typewriter-caret--intro" />}
        </span>
      </p>
    </>
  )
}


/** Reveal content once as it enters the viewport; keep content visible without JS. */
function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach(element => {
        element.classList.remove('reveal-pending')
        element.classList.add('reveal-visible')
      })
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const element = entry.target as HTMLElement
        element.classList.remove('reveal-pending')
        element.classList.add('reveal-visible')
        observer.unobserve(element)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' })

    elements.forEach(element => {
      // Only animate blocks not already revealed during this mount.
      if (element.classList.contains('reveal-visible')) return
      element.classList.add('reveal-pending')
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
      // React StrictMode unmounts effects in development: never strand content hidden.
      elements.forEach(element => element.classList.remove('reveal-pending'))
    }
  }, [])
}

export default function App() {
  const [language, setLanguage] = useState<Language>(initialLanguage)
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const t = translations[language]
  useScrollReveal()

  useEffect(() => {
    document.documentElement.lang = language
    document.title = language === 'es' ? 'Carlos Núñez | Desarrollador Full Stack' : 'Carlos Núñez | Full Stack Developer'
    try { localStorage.setItem('portfolio-lang', language) } catch { /* Optional preference. */ }
  }, [language])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute('content', theme === 'light' ? '#f8faff' : '#081322')
  }, [theme])

  const navigation = [
    ['#sobre-mi', t.nav.about],
    ['#proyectos', t.nav.projects],
    ['#tecnologias', t.nav.skills],
    ['#trayectoria', t.nav.journey],
    ['#contacto', t.nav.contact],
  ]

  return (
    <>
      <a className="skip-link" href="#contenido">{language === 'es' ? 'Ir al contenido' : 'Skip to content'}</a>
      <div className="page-shell">
        <header className="site-header">
          <div className="container header-inner">
            <a href="#inicio" className="brand" aria-label="Carlos Núñez, inicio" onClick={() => setMenuOpen(false)}>
              <span className="brand-logo" aria-hidden="true"><HeroOrbLogo idPrefix="header" /></span>
              <span className="brand-text">Carlos Núñez</span>
            </a>
            <nav id="principal" className={'navigation' + (menuOpen ? ' is-open' : '')} aria-label={language === 'es' ? 'Navegación principal' : 'Primary navigation'}>
              {navigation.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            </nav>
            <div className="header-actions">
              <button
                className="theme-toggle"
                type="button"
                aria-label={language === 'es' ? (theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro') : (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')}
                aria-pressed={theme === 'light'}
                title={language === 'es' ? (theme === 'dark' ? 'Modo claro' : 'Modo oscuro') : (theme === 'dark' ? 'Light mode' : 'Dark mode')}
                onClick={() => {
                  const next: Theme = theme === 'dark' ? 'light' : 'dark'
                  try { localStorage.setItem('portfolio-theme-choice', next) } catch { /* Browsers can block storage. */ }
                  setTheme(next)
                }}
              >
                <ThemeIcon theme={theme} />
                <span>{language === 'es' ? (theme === 'dark' ? 'Claro' : 'Oscuro') : (theme === 'dark' ? 'Light' : 'Dark')}</span>
              </button>
              <button className="language-toggle" type="button" aria-label={language === 'es' ? 'Change language to English' : 'Cambiar idioma a español'} onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}>{language === 'es' ? 'EN' : 'ES'} <span aria-hidden="true">↗</span></button>
              <button className="menu-toggle" type="button" aria-label={t.menuButton} aria-controls="principal" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
            </div>
          </div>
        </header>
        <main id="contenido">
          <section id="inicio" className="hero container">
            <div className="hero-main">
              <div className="availability"><span className="status-dot" />{t.available}</div>
              <p className="eyebrow hero-eyebrow">{t.heroKicker}</p>
              <TypewriterHero key={language} headline={t.heroHeadline} accent={t.heroAccent} intro={t.heroIntro} />
              <div className="hero-actions">
                <a className="btn btn-primary" href="#proyectos">{t.seeProjects}<Arrow /></a>
                <a className="btn btn-outline" href="#contacto">{t.getInTouch}<Arrow diagonal /></a>
                <a className="text-link" href={language === 'es' ? './cv.html' : './cv-en.html'} target="_blank" rel="noopener noreferrer">{t.seeResume}<Arrow diagonal /></a>
              </div>
            </div>
            <aside className="hero-art" aria-label={language === 'es' ? 'Ilustración conceptual de un entorno de desarrollo' : 'Conceptual illustration of a development environment'}>
              <div className="hero-orb-wrap" aria-hidden="true"><HeroOrbLogo /></div>
              <div className="hero-card-float">
              <div className="code-card">
                <div className="code-card-top"><div className="code-dots"><i /><i /><i /></div><span>developer.profile.ts</span><small>●</small></div>
                <div className="code-content" aria-hidden="true">
                  <p><span className="code-purple">const</span> developer = {'{'}</p>
                  <p className="code-indent">role: <span className="code-green">'Full Stack'</span>,</p>
                  <p className="code-indent">stack: [</p>
                  <p className="code-indent-2"><span className="code-green">'Laravel'</span>, <span className="code-green">'React'</span>,</p>
                  <p className="code-indent-2"><span className="code-green">'TypeScript'</span></p>
                  <p className="code-indent">],</p>
                  <p className="code-indent">focus: <span className="code-green">'real impact'</span>,</p>
                  <p className="code-indent">remote: <span className="code-orange">true</span></p>
                  <p>{'}'}</p>
                </div>
                <div className="code-card-bottom"><span className="pulse-dot" /> dev / build / improve <span>● ready</span></div>
              </div>
              </div>
              <div className="art-glow" />
              <div className="floating-chip floating-chip--top" aria-hidden="true"><span className="floating-chip-dot" /> React + Laravel</div>
              <div className="floating-chip floating-chip--bottom" aria-hidden="true"><span className="floating-chip-star">✦</span> TypeScript</div>
            </aside>
          </section>
          <div className="container"><div className="section-rule" /></div>
          <section id="sobre-mi" className="section container about-section">
            <div className="about-copy" data-reveal="left">
              <p className="eyebrow"><span className="index">01 /</span> {t.nav.about}</p>
              <h2>{t.summaryTitle}</h2>
              <p className="section-lead">{t.summaryText}</p>
              <p className="education-line"><span className="mini-icon" aria-hidden="true">✦</span>{t.education}</p>
            </div>
            <div className="stats-grid">
              {t.stats.map(stat => <div className="stat-card" data-reveal="up" key={stat.value}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
            </div>
          </section>
          <section id="proyectos" className="section section-alt">
            <div className="container">
              <div className="section-heading" data-reveal="up">
                <p className="eyebrow"><span className="index">02 /</span> {t.sectionProjects}</p>
                <h2>{t.projectsTitle}</h2>
                <p className="section-lead">{t.projectsLead}</p>
              </div>
              <div className="project-list">
                {t.projects.map((project, idx) => (
                  <article className="project-card" data-reveal="up" key={project.id}>
                    <ProjectIllustration id={project.id} />
                    <div className="project-body">
                      <p className="eyebrow project-eyebrow">{project.eyebrow}</p>
                      <h3><span className="project-count">0{idx + 1}.</span> {project.name}</h3>
                      <p className="project-status">{project.status}</p>
                      <p className="project-summary">{project.summary}</p>
                      <div className="chip-group">{project.stack.slice(0, 5).map(tag => <span className="chip" key={tag}>{tag}</span>)}</div>
                      <button className="project-link" type="button" aria-controls={project.id + '-details'} aria-expanded={activeProject === project.id} onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}>{activeProject === project.id ? t.closeCase : t.viewCase} <Arrow diagonal /></button>
                      {activeProject === project.id && <div className="case-details" id={project.id + '-details'}>
                        <h4>{t.labelChallenge}</h4><p>{project.challenge}</p>
                        <h4>{t.labelApproach}</h4><p>{project.approach}</p>
                        <h4>{t.labelArchitecture}</h4><p>{project.architecture}</p>
                        <h4>{t.labelResults}</h4><ul>{project.results.map(item => <li key={item}>{item}</li>)}</ul>
                        <h4>{t.labelStack}</h4><div className="chip-group">{project.stack.map(tag => <span className="chip" key={tag}>{tag}</span>)}</div>
                      </div>}
                    </div>
                  </article>
                ))}
              </div>
             </div>
          </section>
          <section id="tecnologias" className="section container">
            <div className="section-heading" data-reveal="up"><p className="eyebrow"><span className="index">03 /</span> {t.skillsKicker}</p><h2>{t.skillsTitle}</h2><p className="section-lead">{t.skillsLead}</p></div>
            <div className="skills-grid">{t.skills.map((skill, idx) => <div className="skill-card" data-reveal="up" key={skill.title}><span className="skill-number">0{idx + 1}</span><h3>{skill.title}</h3><div className="chip-group">{skill.items.map(item => <span className="chip" key={item}>{item}</span>)}</div></div>)}</div>
          </section>
          <section id="trayectoria" className="section section-alt">
            <div className="container timeline-container">
              <div className="section-heading" data-reveal="up"><p className="eyebrow"><span className="index">04 /</span> {t.journeyKicker}</p><h2>{t.journeyTitle}</h2><p className="section-lead">{t.journeyLead}</p></div>
              <div className="timeline">{t.timeline.map(item => <article className="timeline-item" data-reveal="right" key={item.title}><div className="timeline-dot" /><p className="timeline-date">{item.date}</p><div><p className="timeline-type">{item.type}</p><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
            </div>
          </section>
          <section id="contacto" className="section container contact-section">
            <div className="contact-panel" data-reveal="up">
              <p className="eyebrow"><span className="index">05 /</span> {t.contactKicker}</p>
              <h2>{t.contactTitle}</h2>
              <p className="section-lead">{t.contactLead}</p>
              <div className="contact-actions">
                <a className="btn btn-primary" href="mailto:ingcanp@gmail.com?subject=Oportunidad%20Full%20Stack">{t.mailAction}<Arrow diagonal /></a>
                <a className="btn btn-outline" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/carlos-nunez-559781232/">{t.linkedinAction}<Arrow diagonal /></a>
                <a className="btn btn-outline" target="_blank" rel="noopener noreferrer" href="https://github.com/xxRevenantx">{t.githubAction}<Arrow diagonal /></a>
              </div>
              <p className="contact-location">{t.location} · ingcanp@gmail.com</p>
            </div>
          </section>
        </main>
        <footer className="site-footer"><div className="container footer-inner"><span className="brand-logo brand-logo--footer" aria-hidden="true"><HeroOrbLogo idPrefix="footer" /></span><p>© {new Date().getFullYear()}</p><p>{t.footer}</p></div></footer>
      </div>
    </>
  )
}
