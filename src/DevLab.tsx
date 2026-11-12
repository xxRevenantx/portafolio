import { useEffect, useState } from 'react'

type Language = 'es' | 'en'
type Tab = 'school' | 'offline'
type Student = { id: string; name: string; group: string; status: string }

const students: Student[] = [
  { id: 'AL-001', name: 'Andrea López', group: '1° A', status: 'Activa' },
  { id: 'AL-002', name: 'Daniel García', group: '1° A', status: 'Activo' },
  { id: 'AL-003', name: 'María Torres', group: '2° B', status: 'Activa' },
  { id: 'AL-004', name: 'Luis Mendoza', group: '2° B', status: 'Activo' },
  { id: 'AL-005', name: 'Sofía Rivera', group: '1° A', status: 'Activa' },
  { id: 'AL-006', name: 'Carlos Vega', group: '2° B', status: 'Activo' },
]

const content = {
  es: {
    kicker: 'LABORATORIO INTERACTIVO',
    title: 'Prueba la lógica, no solo la interfaz.',
    lead: 'Dos demostraciones educativas inspiradas en mis proyectos. Usa información ficticia y explora cómo resuelvo problemas reales.',
    schoolTab: 'Gestión escolar',
    offlineTab: 'Sincronización offline',
    school: {
      title: 'Generador de listas escolares',
      desc: 'Selecciona un grupo y genera una lista ficticia. La vista previa representa el flujo de automatización de documentos.',
      group: 'Grupo escolar',
      showStatus: 'Incluir estado',
      generate: 'Generar lista',
      reset: 'Restablecer',
      groupCount: 'Alumnos en el grupo',
      name: 'Nombre completo',
      code: 'Matrícula ficticia',
      status: 'Estado',
      empty: 'Selecciona un grupo y presiona “Generar lista” para ver el resultado.',
      ready: 'Lista generada para',
      rows: 'registros',
      export: 'Descargar CSV',
      comparison: 'Proceso manual aproximado: 20–40 min · Automatización reportada: menos de 10 s',
      measured: 'Esta demostración no mide ni reproduce el rendimiento de la plataforma institucional.',
    },
    offline: {
      title: 'Simulador de sincronización offline',
      desc: 'Desconecta la aplicación simulada, registra cambios y vuelve a conectarla para ver cómo se vacía la cola de pendientes.',
      connected: 'Conectado',
      disconnected: 'Sin conexión',
      goOffline: 'Desconectar',
      goOnline: 'Reconectar',
      add: 'Registrar cambio ficticio',
      pending: 'Pendientes locales',
      synced: 'Sincronizados',
      records: 'Bitácora de simulación',
      initial: 'Simulador preparado para registrar eventos.',
      queued: 'Cambio guardado localmente',
      sent: 'Cambios enviados al servidor simulado',
      created: 'Cambio registrado y sincronizado',
      wentOffline: 'La conexión se interrumpió',
      wentOnline: 'Conexión recuperada',
      clear: 'Reiniciar simulación',
      warning: 'Simulación únicamente local: no conecta con pacientes, servicios ni bases de datos reales.',
    },
  },
  en: {
    kicker: 'INTERACTIVE LAB',
    title: 'Explore the logic behind the UI.',
    lead: 'Two educational demos inspired by my projects. Experiment with fictional data and see how I approach real-world workflows.',
    schoolTab: 'School management',
    offlineTab: 'Offline synchronization',
    school: {
      title: 'School list generator',
      desc: 'Select a class and generate a fictional student list. The preview demonstrates a document automation workflow.',
      group: 'Class',
      showStatus: 'Include status',
      generate: 'Generate list',
      reset: 'Reset',
      groupCount: 'Students in class',
      name: 'Full name',
      code: 'Fictional student ID',
      status: 'Status',
      empty: 'Choose a class and click “Generate list” to see the result.',
      ready: 'List generated for',
      rows: 'records',
      export: 'Download CSV',
      comparison: 'Approximate manual workflow: 20–40 min · Reported automated workflow: under 10 s',
      measured: 'This demo does not benchmark or replicate the institutional platform.',
    },
    offline: {
      title: 'Offline synchronization simulator',
      desc: 'Disconnect the simulated app, add changes, then reconnect to see queued entries sync automatically.',
      connected: 'Connected',
      disconnected: 'Offline',
      goOffline: 'Disconnect',
      goOnline: 'Reconnect',
      add: 'Record fictional change',
      pending: 'Queued locally',
      synced: 'Synchronized',
      records: 'Simulation event log',
      initial: 'The simulator is ready to record events.',
      queued: 'Change stored locally',
      sent: 'Changes sent to simulated server',
      created: 'Change created and synchronized',
      wentOffline: 'Connection interrupted',
      wentOnline: 'Connection restored',
      clear: 'Reset simulation',
      warning: 'Local-only simulation: no real patients, services, or databases are accessed.',
    },
  },
} as const

function LabIcon({ kind }: { kind: Tab }) {
  if (kind === 'school') {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M3 9 12 4l9 5-9 5-9-5Z"/><path d="M7 12v5c3.5 2.6 6.5 2.6 10 0v-5M21 10v6"/></svg>
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 7h13M4 7l4-4M4 7l4 4M20 17H7m13 0-4-4m4 4-4 4"/></svg>
}

function csvCell(value: string): string {
  return '"' + value.replace(/"/g, '""') + '"'
}

function SchoolDemo({ language }: { language: Language }) {
  const t = content[language].school
  const [group, setGroup] = useState('1° A')
  const [showStatus, setShowStatus] = useState(true)
  const [generated, setGenerated] = useState(false)
  const [renderedGroup, setRenderedGroup] = useState('')
  const [renderedStatus, setRenderedStatus] = useState(true)
  const currentStudents = students.filter(student => student.group === group)
  const selected = students.filter(student => student.group === renderedGroup)

  const downloadCsv = () => {
    const headings = [t.code, t.name, ...(renderedStatus ? [t.status] : [])]
    const values = selected.map(student => [student.id, student.name, ...(renderedStatus ? [student.status] : [])])
    const csv = '\uFEFF' + [headings, ...values].map(row => row.map(csvCell).join(',')).join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'lista-demo-' + (renderedGroup === '1° A' ? '1A' : '2B') + '.csv'
    anchor.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return <div className="lab-workspace">
    <div className="lab-workspace-header">
      <div className="lab-icon"><LabIcon kind="school" /></div>
      <div><h3>{t.title}</h3><p>{t.desc}</p></div>
    </div>
    <div className="lab-school-controls">
      <label className="lab-control-label">{t.group}
        <select value={group} onChange={e => { setGroup(e.target.value); setGenerated(false) }}>
          <option value="1° A">1° A</option><option value="2° B">2° B</option>
        </select>
      </label>
      <label className="lab-toggle"><input type="checkbox" checked={showStatus} onChange={e => { setShowStatus(e.target.checked); setGenerated(false) }} />{t.showStatus}</label>
      <div className="lab-count"><strong>{currentStudents.length}</strong><span>{t.groupCount}</span></div>
    </div>
    <div className="lab-actions">
      <button type="button" className="lab-primary" onClick={() => { setRenderedGroup(group); setRenderedStatus(showStatus); setGenerated(true) }}>{t.generate}</button>
      <button type="button" className="lab-secondary" onClick={() => { setGroup('1° A'); setShowStatus(true); setGenerated(false) }}>{t.reset}</button>
    </div>
    {generated ? <div className="lab-results" aria-live="polite">
      <div className="lab-results-heading"><strong>{t.ready} {renderedGroup}</strong><span>{selected.length} {t.rows}</span></div>
      <div className="lab-table-scroll"><table className="lab-table"><thead><tr><th>{t.code}</th><th>{t.name}</th>{renderedStatus && <th>{t.status}</th>}</tr></thead>
      <tbody>{selected.map(student => <tr key={student.id}><td>{student.id}</td><td>{student.name}</td>{renderedStatus && <td>{student.status}</td>}</tr>)}</tbody></table></div>
      <button type="button" className="lab-export" onClick={downloadCsv}>{t.export} ↗</button>
    </div> : <p className="lab-placeholder" aria-live="polite">{t.empty}</p>}
    <p className="lab-comparison">{t.comparison}</p>
    <p className="lab-fineprint">{t.measured}</p>
  </div>
}

function OfflineDemo({ language }: { language: Language }) {
  const t = content[language].offline
  const [connected, setConnected] = useState(true)
  const [queued, setQueued] = useState<number[]>([])
  const [synced, setSynced] = useState(0)
  const [nextId, setNextId] = useState(1)
  const [history, setHistory] = useState<string[]>([])

  const changeConnection = () => {
    if (connected) {
      setConnected(false)
      setHistory(old => [t.wentOffline, ...old].slice(0,8))
    } else {
      setConnected(true)
      if (queued.length > 0) {
        setSynced(old => old + queued.length)
        setHistory(old => [t.sent + ': ' + queued.length, t.wentOnline, ...old].slice(0,8))
        setQueued([])
      } else {
        setHistory(old => [t.wentOnline, ...old].slice(0,8))
      }
    }
  }

  const addChange = () => {
    if (connected) {
      setSynced(old => old + 1)
      setHistory(old => [t.created + ' #' + nextId, ...old].slice(0,8))
    } else {
      setQueued(old => [...old, nextId])
      setHistory(old => [t.queued + ' #' + nextId, ...old].slice(0,8))
    }
    setNextId(id => id + 1)
  }

  return <div className="lab-workspace">
    <div className="lab-workspace-header">
      <div className="lab-icon lab-icon--violet"><LabIcon kind="offline" /></div>
      <div><h3>{t.title}</h3><p>{t.desc}</p></div>
    </div>
    <div className="lab-flow" aria-label={connected ? t.connected : t.disconnected}>
      <div className="lab-node"><span>SQLite</span><small>Local app</small></div>
      <div className={'lab-flow-line ' + (connected ? 'is-connected' : 'is-disconnected')}><span>{connected ? '⇄' : '×'}</span></div>
      <div className="lab-node"><span>API</span><small>Cloud mock</small></div>
    </div>
    <div className="lab-indicators">
      <div className={'lab-status ' + (connected ? 'online' : 'offline')}><span className="lab-status-dot" />{connected ? t.connected : t.disconnected}</div>
      <div><strong>{queued.length}</strong><span>{t.pending}</span></div>
      <div><strong>{synced}</strong><span>{t.synced}</span></div>
    </div>
    <div className="lab-actions">
      <button type="button" className="lab-primary" onClick={addChange}>{t.add}</button>
      <button type="button" className="lab-secondary" onClick={changeConnection}>{connected ? t.goOffline : t.goOnline}</button>
      <button type="button" className="lab-secondary" onClick={() => { setConnected(true); setQueued([]); setSynced(0); setNextId(1); setHistory([]) }}>{t.clear}</button>
    </div>
    <div className="lab-log" aria-live="polite"><strong>{t.records}</strong>
      {history.length ? <ol>{history.map((entry,i)=><li key={nextId+'-'+i}>{entry}</li>)}</ol> : <p>{t.initial}</p>}
    </div>
    <p className="lab-fineprint">{t.warning}</p>
  </div>
}

export default function DevLab({ language }: { language: Language }) {
  const [tab, setTab] = useState<Tab>('school')
  const t = content[language]
  useEffect(() => { setTab('school') }, [language])

  return <section className="section devlab-section" id="laboratorio">
    <div className="container">
      <div className="section-heading" data-reveal="up">
        <p className="eyebrow"><span className="index">03 /</span> {t.kicker}</p>
        <h2>{t.title}</h2>
        <p className="section-lead">{t.lead}</p>
      </div>
      <div className="lab-shell">
        <div className="lab-tabs" role="tablist" aria-label={t.kicker}>
          <button type="button" role="tab" id="school-tab" aria-controls="school-panel" aria-selected={tab==='school'} className={tab==='school'?'active':''} onClick={()=>setTab('school')}><LabIcon kind="school"/>{t.schoolTab}</button>
          <button type="button" role="tab" id="offline-tab" aria-controls="offline-panel" aria-selected={tab==='offline'} className={tab==='offline'?'active':''} onClick={()=>setTab('offline')}><LabIcon kind="offline"/>{t.offlineTab}</button>
        </div>
        <div role="tabpanel" id={tab==='school'?'school-panel':'offline-panel'} aria-labelledby={tab==='school'?'school-tab':'offline-tab'}>
          {tab==='school'?<SchoolDemo language={language}/>:<OfflineDemo language={language}/>}
        </div>
      </div>
    </div>
  </section>
}
