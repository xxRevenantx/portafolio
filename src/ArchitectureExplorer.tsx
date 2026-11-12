import { useState } from 'react'
import type { CSSProperties } from 'react'

type Language = 'es' | 'en'
type Project = 'moctezuma' | 'alinura'

type NodeInfo = {
  id: string
  name: string
  tag: string
  description: string
  reason: string
}

const schemas: Record<Language, Record<Project, {
  label: string
  summary: string
  nodes: NodeInfo[]
  dataFlow: string
}>> = {
  es: {
    moctezuma: {
      label: 'Gestión Académica Moctezuma',
      summary: 'Arquitectura conceptual de los módulos académicos: interfaz reactiva, lógica Laravel y almacenamiento relacional.',
      dataFlow: 'El usuario interactúa con Livewire; Laravel valida las solicitudes y consulta o actualiza MySQL antes de presentar los datos.',
      nodes: [
        { id: 'ui', name: 'Interfaz', tag: 'Livewire · Tailwind', description: 'Pantallas de alumnos, inscripciones, calificaciones, listas y reportes.', reason: 'Permite manejar flujos académicos con interfaces reactivas y formularios validados.' },
        { id: 'api', name: 'Lógica de negocio', tag: 'Laravel · PHP', description: 'Reglas de inscripción, acceso por roles, operaciones y generación de documentos.', reason: 'Centraliza las reglas institucionales y evita distribuirlas entre las vistas.' },
        { id: 'db', name: 'Persistencia', tag: 'MySQL', description: 'Registros académicos organizados mediante relaciones entre personas, grupos, ciclos y calificaciones.', reason: 'Facilita consultar y mantener información estructurada durante múltiples ciclos escolares.' },
        { id: 'out', name: 'Documentos', tag: 'PDF · Word · Excel', description: 'Listas, boletas y reportes derivados de los registros gestionados por el sistema.', reason: 'Reduce tareas manuales y ofrece resultados utilizables en el trabajo escolar.' },
      ],
    },
    alinura: {
      label: 'Nexo Alinura',
      summary: 'Esquema conceptual de la aplicación de escritorio y el backend, con almacenamiento local y sincronización offline.',
      dataFlow: 'La aplicación guarda cambios locales en SQLite. Al haber conectividad, el proceso de sincronización los transmite a la API de Laravel que trabaja con PostgreSQL.',
      nodes: [
        { id: 'ui', name: 'Escritorio', tag: 'React · TypeScript · Tauri', description: 'Interfaz de consultas, expedientes, planes y seguimiento nutricional.', reason: 'Combina interfaces modernas con un contenedor de escritorio multiplataforma.' },
        { id: 'api', name: 'API y servicios', tag: 'Laravel', description: 'Servicios de aplicación, validaciones, acceso a recursos y procesamiento de cambios sincronizados.', reason: 'Mantiene una capa de servicios compartida entre diferentes clientes del sistema.' },
        { id: 'db', name: 'Datos centrales', tag: 'PostgreSQL', description: 'Persistencia central del sistema y datos compartidos por los clientes autorizados.', reason: 'Ofrece un repositorio relacional para mantener información coherente en el servidor.' },
        { id: 'out', name: 'Datos locales', tag: 'SQLite · Offline', description: 'Copia local y cola de cambios que permite seguir trabajando sin conexión.', reason: 'Da continuidad a las tareas cuando la conectividad falla y conserva operaciones pendientes.' },
      ],
    },
  },
  en: {
    moctezuma: {
      label: 'Moctezuma Academic Management',
      summary: 'Conceptual architecture of the academic modules: reactive UI, Laravel business logic and relational storage.',
      dataFlow: 'Users interact with Livewire, while Laravel validates requests and reads or updates MySQL before returning data.',
      nodes: [
        { id: 'ui', name: 'Interface', tag: 'Livewire · Tailwind', description: 'Screens for students, enrollment, grades, lists and reports.', reason: 'Supports academic workflows with reactive interfaces and validated forms.' },
        { id: 'api', name: 'Business logic', tag: 'Laravel · PHP', description: 'Enrollment rules, role-based access, application operations and document generation.', reason: 'Keeps institutional business rules in one maintainable layer instead of spreading them across views.' },
        { id: 'db', name: 'Storage', tag: 'MySQL', description: 'Relational records for people, groups, school years and grades.', reason: 'Supports queries and maintains structured records across academic years.' },
        { id: 'out', name: 'Documents', tag: 'PDF · Word · Excel', description: 'Class lists, report cards and exported documents based on managed records.', reason: 'Reduces repetitive manual work and creates usable outputs for school operations.' },
      ],
    },
    alinura: {
      label: 'Nexo Alinura',
      summary: 'Conceptual desktop and backend architecture, including local storage and offline synchronization.',
      dataFlow: 'The app stores local changes in SQLite. When connectivity returns, the sync process sends them to a Laravel API backed by PostgreSQL.',
      nodes: [
        { id: 'ui', name: 'Desktop', tag: 'React · TypeScript · Tauri', description: 'Interface for appointments, patient records, meal plans and follow-up.', reason: 'Combines a modern interface with a cross-platform desktop shell.' },
        { id: 'api', name: 'API & services', tag: 'Laravel', description: 'Application services, validation, resource access and processing of synchronized changes.', reason: 'Provides a shared service layer for multiple clients.' },
        { id: 'db', name: 'Central data', tag: 'PostgreSQL', description: 'Central persistence and data shared by authorized application clients.', reason: 'Provides relational storage to keep server-side information coherent.' },
        { id: 'out', name: 'Local data', tag: 'SQLite · Offline', description: 'Local records and a pending-change queue that keep the desktop app usable offline.', reason: 'Allows work to continue during connectivity loss while preserving changes to sync later.' },
      ],
    },
  },
}

const interfaceText = {
  es: {
    kicker: 'ARQUITECTURA INTERACTIVA',
    title: 'Explora cómo conecto cada pieza.',
    lead: 'Selecciona componentes y recorre el flujo entre interfaz, lógica y datos. Diagramas conceptuales basados en los proyectos destacados.',
    choose: 'Seleccionar arquitectura',
    components: 'Componentes del sistema',
    click: 'Selecciona un bloque del diagrama para consultar su función.',
    role: 'Responsabilidad',
    why: 'Decisión técnica',
    flow: 'Flujo de información',
    offlineTitle: 'Recorrido de sincronización offline',
    offlineSubtitle: 'Visualiza cuatro estados del flujo sin depender de una API real.',
    offlineStages: [
      { title: '1. Sin conexión', body: 'El cliente continúa trabajando y conserva cambios en almacenamiento local.' },
      { title: '2. Cambios pendientes', body: 'Las operaciones quedan en una cola local para su envío posterior.' },
      { title: '3. Vuelve la conexión', body: 'El cliente transmite los cambios pendientes a la API para que sean procesados.' },
      { title: '4. Sincronizado', body: 'La cola queda vacía cuando los cambios de esta simulación se han procesado.' },
    ],
    previous: 'Anterior', next: 'Siguiente', restart: 'Reiniciar', status: 'Estado', demoNote: 'Visualización explicativa con datos simulados. No representa acceso al backend real ni garantiza cómo se resuelven conflictos de sincronización.', concept: 'Diagrama simplificado, no documentación exhaustiva de producción.',
  },
  en: {
    kicker: 'INTERACTIVE ARCHITECTURE',
    title: 'See how the pieces connect.',
    lead: 'Select a component and explore how the UI, business logic and data layers communicate. Conceptual diagrams based on featured projects.',
    choose: 'Select architecture',
    components: 'System components',
    click: 'Choose a diagram block to explore its responsibilities.',
    role: 'Responsibility',
    why: 'Technical rationale',
    flow: 'Information flow',
    offlineTitle: 'Offline synchronization walkthrough',
    offlineSubtitle: 'Explore four states of the workflow without a live API.',
    offlineStages: [
      { title: '1. Offline', body: 'The client continues working and saves its changes in local storage.' },
      { title: '2. Changes queued', body: 'Operations remain in a local queue to be sent later.' },
      { title: '3. Connection restored', body: 'The client sends pending changes to the API for processing.' },
      { title: '4. Synchronized', body: 'The simulation queue is empty after its changes have been processed.' },
    ],
    previous: 'Previous', next: 'Next', restart: 'Restart', status: 'Status', demoNote: 'Educational illustration using simulated data. It does not connect to a real backend or demonstrate conflict-resolution guarantees.', concept: 'Simplified conceptual diagram, not exhaustive production documentation.',
  },
}

function ArchitectureFlow({ project, selected, onSelect, nodes }: {
  project: Project
  selected: string
  onSelect: (id: string) => void
  nodes: NodeInfo[]
}) {
  return <div className="arch-diagram" aria-label="Diagram">
    <svg className="arch-connection-layer" viewBox="0 0 840 320" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="arch-flow-gradient" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#3fdcbb"/><stop offset="55%" stopColor="#7dafff"/><stop offset="100%" stopColor="#b38af5"/>
        </linearGradient>
      </defs>
      <path d="M200 104 H318" className="arch-connection"/>
      <path d="M520 104 H640" className="arch-connection"/>
      <path d={project === 'alinura' ? 'M101 164 V257 H641' : 'M419 164 V255 H641'} className="arch-connection arch-connection--lower"/>
      <circle cx="318" cy="104" r="4" className="arch-flow-dot"/>
      <circle cx="640" cy="104" r="4" className="arch-flow-dot"/>
    </svg>
    <div className="arch-diagram-grid">
      {nodes.map((node, index) => <button
        type="button"
        className={'arch-node arch-node--'+node.id+(selected===node.id?' is-selected':'')}
        aria-pressed={selected===node.id}
        onClick={() => onSelect(node.id)}
        key={node.id}
        style={{ '--node-index': index } as CSSProperties}
      >
        <span className="arch-node-index">{String(index+1).padStart(2,'0')}</span>
        <strong>{node.name}</strong><small>{node.tag}</small>
        <span className="arch-node-arrow" aria-hidden="true">↗</span>
      </button>)}
    </div>
  </div>
}

export default function ArchitectureExplorer({ language }: { language: Language }) {
  const [project, setProject] = useState<Project>('moctezuma')
  const [selected, setSelected] = useState('ui')
  const [syncStep, setSyncStep] = useState(0)
  const t = interfaceText[language]
  const current = schemas[language][project]
  const info = current.nodes.find(node=>node.id===selected) ?? current.nodes[0]
  const sync = t.offlineStages[syncStep]
  const switchProject = (next: Project) => { setProject(next); setSelected('ui'); setSyncStep(0) }

  return <section id="arquitectura" className="section arch-section">
    <div className="container">
      <div className="section-heading" data-reveal="up">
        <p className="eyebrow"><span className="index">04 /</span> {t.kicker}</p>
        <h2>{t.title}</h2>
        <p className="section-lead">{t.lead}</p>
      </div>
      <div className="arch-shell">
        <div className="arch-toolbar">
          <span>{t.choose}</span>
          <div className="arch-switch" role="group" aria-label={t.choose}>
            <button type="button" aria-pressed={project==='moctezuma'} className={project==='moctezuma'?'is-active':''} onClick={()=>switchProject('moctezuma')}>Moctezuma</button>
            <button type="button" aria-pressed={project==='alinura'} className={project==='alinura'?'is-active':''} onClick={()=>switchProject('alinura')}>Nexo Alinura</button>
          </div>
        </div>
        <div className="arch-stage">
          <div className="arch-stage-header">
            <div><h3>{current.label}</h3><p>{current.summary}</p></div>
            <span className="arch-stage-pill">React / Laravel</span>
          </div>
          <ArchitectureFlow project={project} selected={selected} onSelect={setSelected} nodes={current.nodes}/>
          <div className="arch-info" aria-live="polite">
            <div className="arch-info-heading"><span>{t.components}</span><strong>{info.name}</strong><small>{info.tag}</small></div>
            <div className="arch-info-body"><div><h4>{t.role}</h4><p>{info.description}</p></div><div><h4>{t.why}</h4><p>{info.reason}</p></div></div>
          </div>
          <div className="arch-flow-note"><strong>{t.flow}</strong><p>{current.dataFlow}</p></div>
        </div>
      </div>
      {project==='alinura' && <div className="arch-sync">
        <div className="arch-sync-head"><h3>{t.offlineTitle}</h3><p>{t.offlineSubtitle}</p></div>
        <div className="arch-sync-steps" role="group" aria-label={t.offlineTitle}>
          {t.offlineStages.map((entry,index)=><button type="button" key={entry.title} aria-pressed={syncStep===index} className={syncStep===index?'is-active':''} onClick={()=>setSyncStep(index)}><span>{index+1}</span>{entry.title.replace(/^\d+\. /,'')}</button>)}
        </div>
        <div className="arch-sync-live" aria-live="polite">
          <div className="arch-sync-illustration">
            <div className="arch-mini-node"><span>SQLite</span><small>Local</small></div>
            <div className={'arch-sync-link arch-sync-link--'+syncStep}><span>{syncStep<2?'×':'⇄'}</span></div>
            <div className="arch-mini-node"><span>Laravel</span><small>API</small></div>
            <div className="arch-sync-queue"><span>{syncStep===0?'0':syncStep===1||syncStep===2?'3':'0'}</span><small>Queue</small></div>
          </div>
          <div className="arch-sync-copy"><small>{t.status} {syncStep+1} / 4</small><h4>{sync.title}</h4><p>{sync.body}</p></div>
        </div>
        <div className="arch-sync-actions">
          <button type="button" disabled={syncStep===0} onClick={()=>setSyncStep(step=>Math.max(0,step-1))}>{t.previous}</button>
          <button type="button" onClick={()=>setSyncStep(step=>(step+1)%4)}>{syncStep===3?t.restart:t.next} →</button>
        </div>
        <p className="arch-caption">{t.demoNote}</p>
      </div>}
      <p className="arch-caption">{t.concept}</p>
    </div>
  </section>
}
