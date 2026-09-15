'use client'

/**
 * Scroll-driven scientific workflow timeline.
 *
 * `full`  — vertical spine (case studies): stages fill and highlight as the
 *           block scrolls through the viewport; a sticky panel shows the active
 *           stage's supporting note. Inline notes appear below each stage on
 *           mobile / reduced-motion instead.
 * `compact` — horizontal strip (project cards): a fill line and stage dots
 *           progress with the card's position on screen.
 *
 * Motion is driven by `motion`'s useScroll/useSpring (scroll scrubbing); visual
 * states are plain CSS. Reduced motion renders the timeline fully revealed and
 * static. No results are ever invented — stage `note` copy comes from
 * `data/projects.ts`.
 */

import { useRef, useState, type CSSProperties } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'
import type { WorkflowStep } from '@/data/projects'

function useWorkflowActive(
  count: number,
  ref: React.RefObject<HTMLDivElement | null>,
  variant: 'full' | 'compact',
  reduced: boolean | null,
) {
  const [active, setActive] = useState<number>(() => (reduced ? count : -1))

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: variant === 'full' ? ['start center', 'end center'] : ['start 0.9', 'end 0.45'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 26, mass: 0.6 })

  useMotionValueEvent(progress, 'change', (value) => {
    if (reduced) return
    const index = value >= 1 ? count : Math.max(-1, Math.floor(value * count))
    setActive((prev) => (prev === index ? prev : index))
  })

  return { active, progress }
}

export function WorkflowDiagram({
  steps,
  title,
  variant = 'full',
  className = '',
}: {
  steps: WorkflowStep[]
  title?: string
  variant?: 'full' | 'compact'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { active, progress } = useWorkflowActive(steps.length, ref, variant, reduced)

  const nodeState = (index: number) => {
    if (active < 0) return ''
    if (index < active) return 'is-passed'
    if (index === active) return 'is-active'
    return ''
  }

  const isFull = variant === 'full'
  const panelIndex = active < 0 ? 0 : Math.min(active, steps.length - 1)
  const panel = steps[panelIndex]

  const wrapperClass = [
    'workflow',
    isFull ? 'workflow-full' : 'workflow-compact',
    reduced ? 'is-static' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (isFull) {
    return (
      <div ref={ref} className={wrapperClass}>
        {title && <p className="workflow-title">{title}</p>}
        <div className="workflow-detail-grid">
          <div className="workflow-spine">
            <motion.span
              className="workflow-spine-fill"
              style={{ scaleY: progress }}
              aria-hidden="true"
            />
            <ol className="workflow-track">
              {steps.map((step, i) => (
                <li
                  key={step.id}
                  className={`workflow-node ${nodeState(i)}`}
                  style={{ '--i': i } as CSSProperties}
                >
                  <span className="workflow-dot" aria-hidden="true" />
                  <div className="workflow-copy">
                    <span className="workflow-label">{step.label}</span>
                    {step.tool && <span className="workflow-tool">{step.tool}</span>}
                    {step.note && <p className="workflow-note">{step.note}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="workflow-stage-panel">
            <motion.div
              key={panel.id}
              className="workflow-stage"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <p className="workflow-stage-index">
                Stage {String(panelIndex + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
              </p>
              <h3 className="workflow-stage-label">{panel.label}</h3>
              {panel.tool && <p className="workflow-stage-tool">{panel.tool}</p>}
              {panel.note && <p className="workflow-stage-note">{panel.note}</p>}
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className={wrapperClass}>
      {title && <p className="workflow-title">{title}</p>}
      <div className="workflow-track-wrap">
        <motion.span
          className="workflow-fill"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
        <ol className="workflow-track">
          {steps.map((step, i) => (
            <li
              key={step.id}
              className={`workflow-node ${nodeState(i)}`}
              style={{ '--i': i } as CSSProperties}
            >
              <span className="workflow-dot" aria-hidden="true" />
              <span className="workflow-label">{step.label}</span>
              {step.tool && <span className="workflow-tool">{step.tool}</span>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

/** Inline tool chain — FastQC → fastp → STAR … — used on project cards. */
export function ToolChain({ items }: { items: string[] }) {
  return (
    <div className="toolchain" aria-label={`Toolchain: ${items.join(', ')}`}>
      {items.map((item, i) => (
        <span className="toolchain-item" key={item} style={{ '--i': i } as CSSProperties}>
          {item}
          {i < items.length - 1 && <em aria-hidden="true">→</em>}
        </span>
      ))}
    </div>
  )
}