import { NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [condensed, setCondensed] = useState(false)
  const lastYRef = useRef<number>(0)
  const tickingRef = useRef(false)

  // Hysteresis to avoid flicker: different thresholds for condense vs expand
  const CONDENSE_Y = 120
  const EXPAND_Y = 40

  useEffect(() => {
    lastYRef.current = window.scrollY || 0
    const handle = () => {
      tickingRef.current = false
      const y = window.scrollY
      const lastY = lastYRef.current
      const goingDown = y > lastY
      // Apply hysteresis
      if (goingDown && y > CONDENSE_Y) {
        setCondensed(true)
      } else if (!goingDown && y < EXPAND_Y) {
        setCondensed(false)
      }
      lastYRef.current = y
    }
    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true
        requestAnimationFrame(handle)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/experience', label: 'Experience' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <motion.div
          layout
          transition={{ layout: { duration: 0.25, ease: 'easeOut' } }}
          className={
            `mx-auto w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/80 backdrop-blur ` +
            (condensed ? 'max-w-sm px-3 py-1.5' : 'max-w-2xl px-4 py-2')
          }
        >
          {/* Expanded state: logo + name + links */}
          <motion.div
            layout
            initial={false}
            animate={condensed ? 'hide' : 'show'}
            variants={{
              show: { opacity: 1, y: 0, height: 'auto' },
              hide: { opacity: 0, y: -6, height: 0 },
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between"
          >
            <NavLink to="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <img src="/emma.png" alt="logo" className="h-8 w-8 rounded-full object-cover" />
              <span className="text-white">Eseyin Emmanuel</span>
            </NavLink>
            <nav className="flex items-center justify-center gap-1 text-sm">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-md transition-colors ${
                      isActive ? 'bg-neutral-800 text-white' : 'text-neutral-300 hover:bg-neutral-800/60'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>

          {/* Condensed state: logo + availability */}
          <motion.div
            layout
            initial={false}
            animate={condensed ? 'show' : 'hide'}
            variants={{
              show: { opacity: 1, y: 0, height: 'auto' },
              hide: { opacity: 0, y: -6, height: 0 },
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex items-center justify-between"
          >
            <NavLink to="/" className="flex items-center gap-2">
              <img src="/emma.png" alt="logo" className="h-7 w-7 rounded-full object-cover" />
              <span className="sr-only">Home</span>
            </NavLink>
            <div className="flex items-center gap-2 text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
              </span>
              <span className="text-green-400">Available for work</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}
