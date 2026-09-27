import { useEffect, useRef, useState } from 'react'

type NavigationLink = { label: string; href: string; newTab?: boolean }
type NavigationSection = NavigationLink & { children?: NavigationLink[] }

// Añadir subsecciones solo cuando su destino esté implementado.
const sections: NavigationSection[] = [
  { label: 'Conceptos', href: '#conceptos', children: [
    { label: 'El ordenador necesita números', href: '#conceptos' },
    { label: 'Representaciones clásicas', href: '#representaciones' },
    { label: 'El problema del significado', href: '#significado' },
    { label: 'Embeddings', href: '#embeddings' },
    { label: 'Contexto', href: '#contexto' },
    { label: 'Tokenización', href: '#tokenizacion' },
    { label: 'Pipeline', href: '#pipeline' },
    { label: 'Similitud semántica', href: '#similitud' },
    { label: 'Límites y cierre', href: '#cierre' },
  ] },
  { label: 'Exploraciones', href: '#exploraciones' },
  { label: 'Materiales', href: 'https://github.com/drojas-7u7/nlp-explorer', newTab: true },
  { label: 'PDF', href: './NLP_Explorer.pdf', newTab: true },
]

function NavigationItem({ section, open, setOpen, onNavigate }: {
  section: NavigationSection
  open: boolean
  setOpen: (open: boolean) => void
  onNavigate: () => void
}) {
  const itemRef = useRef<HTMLLIElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = `navigation-${section.href.slice(1)}`

  useEffect(() => {
    if (!open) return
    function dismiss(event: PointerEvent) {
      if (!itemRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !itemRef.current?.contains(document.activeElement)) setOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', escape)
    }
  }, [open, setOpen])

  return (
    <li ref={itemRef} className="navigation-item"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault()
          event.stopPropagation()
          buttonRef.current?.focus()
          setOpen(false)
        }
      }}
      onPointerEnter={(event) => {
        if (section.children && event.pointerType === 'mouse' && window.matchMedia('(hover: hover)').matches) setOpen(true)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse' && !itemRef.current?.contains(document.activeElement)) setOpen(false)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}>
      <div className="navigation-label">
        <a
          href={section.href}
          target={section.newTab ? '_blank' : undefined}
          rel={section.newTab ? 'noreferrer' : undefined}
          onClick={() => { setOpen(false); onNavigate() }}
        >
          {section.label}
        </a>
        {section.children && <button ref={buttonRef} type="button" className="navigation-toggle"
          aria-label={`Subsecciones de ${section.label}`} aria-expanded={open} aria-controls={panelId}
          onClick={() => setOpen(!open)}>
          <span aria-hidden="true">⌄</span>
        </button>}
      </div>
      {section.children && <ul id={panelId} className="navigation-submenu" hidden={!open}>
        {section.children.map((link) => <li key={link.href}>
          <a href={link.href} onClick={() => {
            // No dejar el foco dentro de un panel que pasa a estar oculto.
            buttonRef.current?.focus()
            setOpen(false)
            onNavigate()
          }}>{link.label}</a>
        </li>)}
      </ul>}
    </li>
  )
}

export function Navigation() {
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [hidden, setHidden] = useState(false)
  const pointerInside = useRef(false)
  const menuLocked = useRef(false)
  const reveal = useRef<() => void>(() => {})
  const release = useRef<() => void>(() => {})

  // Direction and accumulated distance stay outside React; render only on a
  // visibility change. Sticky retains its original space; only transform moves.
  useEffect(() => {
    let lastY = Math.max(0, window.scrollY)
    let distance = 0
    let direction = 0
    let wantsHidden = false
    let visible = true
    let timer: ReturnType<typeof setTimeout> | undefined
    const locked = () => menuLocked.current || pointerInside.current
      || !!headerRef.current?.querySelector(':focus-visible')
    const apply = () => {
      const nextVisible = window.scrollY < 120 || locked() || !wantsHidden
      if (nextVisible !== visible) {
        visible = nextVisible
        setHidden(!nextVisible)
      }
    }
    reveal.current = () => {
      clearTimeout(timer)
      if (!visible) { visible = true; setHidden(false) }
    }
    release.current = () => {
      clearTimeout(timer)
      timer = setTimeout(apply, 220)
    }
    const scroll = () => {
      const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight))
      const delta = y - lastY
      lastY = y
      if (delta !== 0) {
        const nextDirection = Math.sign(delta)
        distance = nextDirection === direction ? distance + Math.abs(delta) : Math.abs(delta)
        direction = nextDirection
        if (distance >= (direction > 0 ? 24 : 8)) {
          wantsHidden = direction > 0
          distance = 0
          apply()
        }
      }
      if (y < 120) { wantsHidden = false; apply() }
    }
    window.addEventListener('scroll', scroll, { passive: true })
    return () => { window.removeEventListener('scroll', scroll); clearTimeout(timer) }
  }, [])

  useEffect(() => {
    menuLocked.current = mobileOpen || openSection !== null
    if (menuLocked.current) reveal.current()
    else release.current()
  }, [mobileOpen, openSection])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)')
    const resize = () => {
      // Move focus before CSS hides the desktop links or mobile button.
      if (headerRef.current?.contains(document.activeElement)) {
        if (media.matches) menuButtonRef.current?.focus()
        else headerRef.current?.querySelector<HTMLAnchorElement>('.wordmark')?.focus()
      }
      setMobileOpen(false)
      setOpenSection(null)
      pointerInside.current = false
    }
    media.addEventListener('change', resize)
    return () => media.removeEventListener('change', resize)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const dismiss = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        menuButtonRef.current?.focus()
        setMobileOpen(false)
        setOpenSection(null)
      }
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [mobileOpen])

  const closeMobile = () => {
    if (mobileOpen) menuButtonRef.current?.focus()
    setMobileOpen(false)
    setOpenSection(null)
  }

  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const updateHeight = () => document.documentElement.style.setProperty('--navigation-height', `${header.getBoundingClientRect().height}px`)
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(header)
    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty('--navigation-height')
    }
  }, [])

  return (
    <>
      <div className="navigation-edge" aria-hidden="true"
        onPointerEnter={(event) => { if (event.pointerType === 'mouse') reveal.current() }}
        onPointerLeave={() => release.current()} />
      <header ref={headerRef} className={`navigation${hidden ? ' navigation--hidden' : ''}`}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') { pointerInside.current = true; reveal.current() }
        }}
        onPointerLeave={() => { pointerInside.current = false; release.current() }}
        onFocusCapture={() => reveal.current()}
        onBlur={() => release.current()}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && mobileOpen) {
            event.preventDefault()
            closeMobile()
          }
        }}>
        <a className="wordmark" href="#inicio" aria-label="NLP Explorer, inicio" onClick={closeMobile}><span className="brand-nlp">NLP</span><span className="brand-explorer">EXPLORER</span></a>
        <button ref={menuButtonRef} className="navigation-mobile-toggle" type="button"
          aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          aria-expanded={mobileOpen} aria-controls="navigation-main"
          onClick={() => { setMobileOpen(!mobileOpen); setOpenSection(null) }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d={mobileOpen ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
        </button>
        <nav id="navigation-main" className={mobileOpen ? 'navigation-main--open' : ''} aria-label="Navegación principal">
          <ul className="navigation-list">{sections.map((section) => <NavigationItem key={section.href}
            section={section} open={openSection === section.href}
            setOpen={(open) => setOpenSection(open ? section.href : null)} onNavigate={closeMobile} />)}</ul>
        </nav>
      </header>
    </>
  )
}
