'use client'

/**
 * Subtle 3D wireframe DNA double helix for the hero.
 *
 * - Lazy-loaded via `next/dynamic` (ssr: false) in the page that mounts it.
 * - Scientific, not game-like: thin emissive lime tubes + faint base-pair rungs,
 *   slow rotation, gentle pointer parallax on fine pointers.
 * - Pauses rendering once the hero leaves the viewport.
 * - Falls back to nothing when WebGL is unavailable or the canvas throws.
 */

import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ACID = '#d8f36b'
const BACKGROUND = '#0a0a0b'
const TURNS = 4
const RADIUS = 2.3
const HEIGHT = 9
const STRAND_TUBE = 0.055
const RUNG_TUBE = 0.02

const strandMaterial = new THREE.MeshBasicMaterial({
  color: ACID,
  transparent: true,
  opacity: 0.5,
})
const rungMaterial = new THREE.MeshBasicMaterial({
  color: ACID,
  transparent: true,
  opacity: 0.26,
})

function helixPoints(phase: number): THREE.Vector3[] {
  const samples = 180
  const pts: THREE.Vector3[] = []
  for (let i = 0; i <= samples; i++) {
    const t = i / samples
    const angle = t * Math.PI * 2 * TURNS + phase
    const y = t * HEIGHT - HEIGHT / 2
    pts.push(new THREE.Vector3(Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS))
  }
  return pts
}

type Rung = {
  position: THREE.Vector3
  quaternion: THREE.Quaternion
  length: number
}

function buildDna() {
  const curveA = new THREE.CatmullRomCurve3(helixPoints(0))
  const curveB = new THREE.CatmullRomCurve3(helixPoints(Math.PI))
  const tubeA = new THREE.TubeGeometry(curveA, 180, STRAND_TUBE, 5, false)
  const tubeB = new THREE.TubeGeometry(curveB, 180, STRAND_TUBE, 5, false)
  const rungGeo = new THREE.CylinderGeometry(RUNG_TUBE, RUNG_TUBE, 1, 4, 1)
  const rungs: Rung[] = []
  const rungCount = 32
  const up = new THREE.Vector3(0, 1, 0)
  for (let i = 0; i <= rungCount; i++) {
    const t = i / rungCount
    const a = curveA.getPoint(t)
    const b = curveB.getPoint(t)
    const dir = b.clone().sub(a).normalize()
    rungs.push({
      position: a.clone().add(b).multiplyScalar(0.5),
      quaternion: new THREE.Quaternion().setFromUnitVectors(up, dir),
      length: a.distanceTo(b),
    })
  }
  return { tubeA, tubeB, rungs, rungGeo }
}

function HelixScene({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null)
  const dna = useMemo(buildDna, [])

  const reduced = useReducedMotion()

  useFrame((state, delta) => {
    if (!active || !group.current || reduced) return
    const targetY = state.clock.elapsedTime * 0.13 + state.pointer.x * 0.26
    const targetX = state.pointer.y * 0.06
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 1.8, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 1.8, delta)
  })

  return (
    <group ref={group} rotation={reduced ? [-0.12, -0.45, 0] : [0, 0, 0]}>
      <mesh geometry={dna.tubeA} material={strandMaterial} />
      <mesh geometry={dna.tubeB} material={strandMaterial} />
      {dna.rungs.map((rung, i) => (
        <mesh
          key={i}
          geometry={dna.rungGeo}
          material={rungMaterial}
          position={rung.position}
          quaternion={rung.quaternion}
          scale={[1, rung.length, 1]}
        />
      ))}
    </group>
  )
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function useWebGLSupport() {
  const [supported] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      const canvas = document.createElement('canvas')
      return Boolean(
        canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'),
      )
    } catch {
      return false
    }
  })
  return supported
}

class HelixErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export function HeroHelix() {
  const webgl = useWebGLSupport()
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!webgl) return null

  return (
    <div ref={containerRef} className="hero-helix" aria-hidden="true">
      <HelixErrorBoundary>
        <Canvas
          frameloop={active ? 'always' : 'demand'}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 9], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <fog attach="fog" args={[BACKGROUND, 4.5, 11]} />
          <HelixScene active={active} />
        </Canvas>
      </HelixErrorBoundary>
    </div>
  )
}