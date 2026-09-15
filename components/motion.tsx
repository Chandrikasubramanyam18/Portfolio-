'use client'

/**
 * Shared motion primitives.
 * These are intentionally dependency-free and CSS-driven — the JS only toggles
 * classes, so animation cost stays on the compositor.
 */

import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

/** Scroll-triggered reveal. Adds `is-visible` once the element enters view. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'article' | 'li'
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/** Magnetic link — pointer-following translation, desktop only. */
export function Magnetic({
  children,
  className = '',
  href,
  strength = 0.16,
  ...rest
}: {
  children: React.ReactNode
  className?: string
  href: string
  strength?: number
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null)
  const enabled = useRef(false)

  useEffect(() => {
    enabled.current = isFinePointer() && !prefersReducedMotion()
  }, [])

  const move = (e: React.MouseEvent) => {
    if (!ref.current || !enabled.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${
      (e.clientY - r.top - r.height / 2) * strength
    }px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={move}
      onMouseLeave={reset}
      onBlur={reset}
      className={`magnetic ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

/** Thin acid progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const ratio = max > 0 ? doc.scrollTop / max : 0
      if (ref.current) ref.current.style.transform = `scaleX(${ratio})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={ref} className="scroll-progress-bar" />
    </div>
  )
}

/** Subtle trailing cursor ring. Desktop pointers only, respects reduced motion. */
export function CursorRing() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return
    setActive(true)

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { ...target }
    let frame = 0

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      ref.current?.classList.add('is-live')
      const el = e.target as HTMLElement | null
      const interactive = !!el?.closest?.('a, button, [role="button"], .skill-cat-head')
      ref.current?.classList.toggle('is-hot', interactive)
    }

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.14
      pos.y += (target.y - pos.y) * 0.14
      if (ref.current)
        ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  if (!active) return null
  return <div ref={ref} className="cursor-ring" aria-hidden="true" />
}

/** Parallax wrapper — translates its child slightly against scroll. */
export function Parallax({
  children,
  className = '',
  amount = 0.06,
}: {
  children?: React.ReactNode
  className?: string
  amount?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -amount
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [amount])
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
