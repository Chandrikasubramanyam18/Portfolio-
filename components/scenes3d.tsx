'use client'

import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export type SceneTone = 'violet' | 'amber' | 'blue' | 'rose' | 'leaf'

const TONE_COLOR: Record<SceneTone, string> = {
  violet: '#cfc4ff',
  amber: '#ffe0b8',
  blue: '#c7e7ee',
  rose: '#ffd6cf',
  leaf: '#d5e8bd',
}

const STRAND_OPACITY = 0.5
const DETAIL_OPACITY = 0.32

const SCENE_BY_SLUG: Record<string, 'read-stream' | 'specimen-orbit' | 'waste-orbit' | 'docking' | 'phylo-tree'> = {
  'rna-seq-analysis-platform': 'read-stream',
  biosampletrack: 'specimen-orbit',
  ecohabit: 'waste-orbit',
  'inha-drug-discovery': 'docking',
  'dna-barcoding-phylogenetics': 'phylo-tree',
}

/* ------------------------------------------------------------ read stream -- */

function buildTranscript() {
  const TURNS = 2.2
  const SPAN = 3.6
  const RADIUS = 0.44
  const samples = 110
  const mk = (phase: number) => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= samples; i++) {
      const t = i / samples
      const angle = t * Math.PI * 2 * TURNS + phase
      pts.push(
        new THREE.Vector3(Math.sin(angle) * RADIUS, t * SPAN - SPAN / 2, Math.cos(angle) * RADIUS),
      )
    }
    return new THREE.CatmullRomCurve3(pts)
  }
  const curveA = mk(0)
  const curveB = mk(Math.PI)
  const tubeA = new THREE.TubeGeometry(curveA, 140, 0.028, 4, false)
  const tubeB = new THREE.TubeGeometry(curveB, 140, 0.028, 4, false)
  const rungGeo = new THREE.CylinderGeometry(0.012, 0.012, 1, 4)
  const rungCount = 22
  const up = new THREE.Vector3(0, 1, 0)
  const rungs: { position: THREE.Vector3; quaternion: THREE.Quaternion; length: number }[] = []
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
  return { curveA, curveB, tubeA, tubeB, rungs, rungGeo }
}

function ReadStream({ color, reduced }: { color: string; reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const beads = useRef<(THREE.Mesh | null)[]>([])
  const dna = useMemo(buildTranscript, [])
  const strandMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: STRAND_OPACITY }),
    [color],
  )
  const rungMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: DETAIL_OPACITY }),
    [color],
  )
  const beadGeo = useMemo(() => new THREE.SphereGeometry(0.09, 10, 8), [])
  const beadMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }),
    [color],
  )

  useFrame((state, delta) => {
    if (reduced || !group.current) return
    group.current.rotation.y += delta * 0.18
    const t = state.clock.elapsedTime
    beads.current.forEach((mesh, k) => {
      if (!mesh) return
      const p = (t * 0.16 + k / 6) % 1
      const a = dna.curveA.getPointAt(p)
      const side = dna.curveB.getPointAt(p).sub(a).normalize()
      mesh.position.copy(a).addScaledVector(side, 0.14)
    })
  })

  return (
    <group ref={group} rotation={[-0.14, 0, 0]}>
      <mesh geometry={dna.tubeA} material={strandMat} />
      <mesh geometry={dna.tubeB} material={strandMat} />
      {dna.rungs.map((rung, i) => (
        <mesh
          key={i}
          geometry={dna.rungGeo}
          material={rungMat}
          position={rung.position}
          quaternion={rung.quaternion}
          scale={[1, rung.length, 1]}
        />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh
          key={`bead-${i}`}
          ref={(m) => {
            beads.current[i] = m
          }}
          geometry={beadGeo}
          material={beadMat}
        />
      ))}
    </group>
  )
}

/* ---------------------------------------------------------- specimen orbit -- */

function SpecimenOrbit({ color, reduced }: { color: string; reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const vials = useMemo(() => {
    const out: { position: THREE.Vector3; angle: number; y: number }[] = []
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2
      out.push({
        angle,
        position: new THREE.Vector3(Math.cos(angle) * 1.55, 0, Math.sin(angle) * 1.55),
        y: (i % 3) * 0.1 - 0.1,
      })
    }
    return out
  }, [])
  const vialMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 }),
    [color],
  )
  const ringMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.22 }),
    [color],
  )
  const vialGeo = useMemo(() => new THREE.CylinderGeometry(0.07, 0.105, 0.46, 8), [])
  const ringGeo = useMemo(
    () => new THREE.TorusGeometry(1.55, 0.012, 6, 96),
    [],
  )

  useFrame((state, delta) => {
    if (reduced || !group.current) return
    group.current.rotation.y += delta * 0.2
  })

  return (
    <group ref={group}>
      <mesh geometry={ringGeo} material={ringMat} rotation={[Math.PI / 2, 0, 0]} />
      {vials.map((v, i) => (
        <mesh
          key={i}
          geometry={vialGeo}
          material={vialMat}
          position={[v.position.x, v.y, v.position.z]}
          rotation={[Math.sin(v.angle) * 0.24, 0, -Math.cos(v.angle) * 0.24]}
          scale={[1, 1 + (i % 3) * 0.16, 1]}
        />
      ))}
    </group>
  )
}

/* ----------------------------------------------------------- waste orbit -- */

function buildWasteShapes() {
  const boxGeo = new THREE.BoxGeometry(0.56, 0.56, 0.56)
  const canGeo = new THREE.CylinderGeometry(0.27, 0.27, 0.64, 10)
  const profile = [
    [0, 0],
    [0.16, 0],
    [0.21, 0.1],
    [0.21, 0.26],
    [0.1, 0.32],
    [0.1, 0.6],
    [0.2, 0.66],
    [0.2, 0.8],
    [0.13, 0.84],
  ].map(([x, y]) => new THREE.Vector2(x, y))
  const bottleGeo = new THREE.LatheGeometry(profile, 10)
  return { boxGeo, canGeo, bottleGeo }
}

function WasteOrbit({ color, reduced }: { color: string; reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const spin = useRef<(THREE.Mesh | null)[]>([])
  const geos = useMemo(buildWasteShapes, [])
  const shapeMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55 }),
    [color],
  )
  const ringMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2 }),
    [color],
  )
  const ringGeo = useMemo(() => new THREE.TorusGeometry(1.85, 0.012, 6, 96), [])
  const slots = useMemo(
    () =>
      [0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2
        return {
          angle,
          position: new THREE.Vector3(Math.cos(angle) * 1.7, (i - 1) * 0.5, Math.sin(angle) * 1.7),
        }
      }),
    [],
  )
  const shapes = [
    { geometry: geos.boxGeo, rotation: [0.4, 0.6, 0] as const, speed: [0.35, 0.22, 0] as const },
    { geometry: geos.canGeo, rotation: [0.1, 0.7, 0.2] as const, speed: [0.2, 0.3, 0.12] as const },
    { geometry: geos.bottleGeo, rotation: [0.2, 0.5, 0.1] as const, speed: [0.28, 0.18, 0.3] as const },
  ]

  useFrame((state, delta) => {
    if (reduced || !group.current) return
    group.current.rotation.y += delta * 0.12
    spin.current.forEach((mesh, i) => {
      if (!mesh || !shapes[i]?.speed) return
      const s = shapes[i].speed
      mesh.rotation.x += delta * s[0]
      mesh.rotation.y += delta * s[1]
      mesh.rotation.z += delta * s[2]
    })
  })

  return (
    <group ref={group}>
      <mesh geometry={ringGeo} material={ringMat} rotation={[Math.PI / 2, 0, 0]} />
      {shapes.map((s, i) => (
        <mesh
          key={i}
          ref={(m) => {
            spin.current[i] = m
          }}
          geometry={s.geometry}
          material={shapeMat}
          position={slots[i].position}
          rotation={s.rotation}
        />
      ))}
    </group>
  )
}

/* ---------------------------------------------------------------- docking -- */

function buildPocket() {
  const pts: THREE.Vector3[] = []
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2
    const r = 0.62 + (i % 3) * 0.24
    pts.push(new THREE.Vector3(Math.cos(angle) * r, r * r * 0.3, Math.sin(angle) * r))
  }
  return pts
}

function Docking({ color, reduced }: { color: string; reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const ligand = useRef<THREE.Group>(null)
  const pocket = useMemo(buildPocket, [])
  const domeMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.42 }),
    [color],
  )
  const ringMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.18 }),
    [color],
  )
  const ligMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85 }),
    [color],
  )
  const domeGeo = useMemo(() => new THREE.SphereGeometry(0.13, 12, 8), [])
  const ringGeo = useMemo(() => new THREE.TorusGeometry(1.32, 0.012, 6, 96), [])
  const atomGeo = useMemo(() => new THREE.SphereGeometry(0.09, 10, 8), [])
  const bondGeo = useMemo(() => new THREE.CylinderGeometry(0.025, 0.025, 1, 5), [])
  const UP = useMemo(() => new THREE.Vector3(0, 1, 0), [])
  const bonds = useMemo(
    () => [
      { a: new THREE.Vector3(-0.18, 0, 0), b: new THREE.Vector3(0, 0.1, 0) },
      { a: new THREE.Vector3(0, 0.1, 0), b: new THREE.Vector3(0.18, 0, 0.05) },
    ],
    [],
  )

  useFrame((state, delta) => {
    if (reduced || !group.current) return
    group.current.rotation.y += delta * 0.16
    if (ligand.current) {
      ligand.current.position.y = 1.06 + Math.sin(state.clock.elapsedTime * 0.7) * 0.24
      ligand.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={group}>
      <mesh geometry={ringGeo} material={ringMat} rotation={[Math.PI / 2, 0, 0]} />
      {pocket.map((p, i) => (
        <mesh key={i} geometry={domeGeo} material={domeMat} position={p} />
      ))}
      <group ref={ligand} position={[0, 1.06, 0]}>
        <mesh geometry={atomGeo} material={ligMat} position={bonds[0].a} />
        <mesh geometry={atomGeo} material={ligMat} position={bonds[0].b} />
        <mesh geometry={atomGeo} material={ligMat} position={bonds[1].b} />
        {bonds.map((bond, i) => {
          const dir = bond.b.clone().sub(bond.a)
          const mid = bond.a.clone().add(bond.b).multiplyScalar(0.5)
          return (
            <mesh
              key={i}
              geometry={bondGeo}
              material={ligMat}
              position={mid}
              quaternion={new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize())}
              scale={[1, dir.length(), 1]}
            />
          )
        })}
      </group>
    </group>
  )
}

/* -------------------------------------------------------------- phylo tree -- */

function buildTreeTopology() {
  const branches: { mid: THREE.Vector3; quat: THREE.Quaternion; len: number }[] = []
  const tips: THREE.Vector3[] = []
  const UP = new THREE.Vector3(0, 1, 0)
  const Z = new THREE.Vector3(0, 0, 1)
  const X = new THREE.Vector3(1, 0, 0)
  const grow = (
    a: THREE.Vector3,
    dir: THREE.Vector3,
    len: number,
    depth: number,
    flip: number,
  ) => {
    const b = a.clone().addScaledVector(dir, len)
    branches.push({
      mid: a.clone().add(b).multiplyScalar(0.5),
      quat: new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize()),
      len,
    })
    if (depth === 0) {
      tips.push(b)
      return
    }
    const angle = 0.5 + depth * 0.04
    const d1 = dir.clone().applyAxisAngle(Z, angle * flip).applyAxisAngle(X, 0.14 * flip)
    const d2 = dir
      .clone()
      .applyAxisAngle(Z, -angle * flip)
      .applyAxisAngle(X, -0.14 * flip)
    grow(b, d1, len * 0.72, depth - 1, flip)
    grow(b, d2, len * 0.72, depth - 1, -flip)
  }
  grow(new THREE.Vector3(0, -1.8, 0), new THREE.Vector3(0, 1, 0), 0.95, 4, 1)
  return { branches, tips }
}

function PhyloTree({ color, reduced }: { color: string; reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const tree = useMemo(buildTreeTopology, [])
  const branchMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 }),
    [color],
  )
  const tipMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 }),
    [color],
  )
  const branchGeo = useMemo(() => new THREE.CylinderGeometry(0.02, 0.032, 1, 5), [])
  const tipGeo = useMemo(() => new THREE.SphereGeometry(0.055, 8, 6), [])

  useFrame((state, delta) => {
    if (reduced || !group.current) return
    group.current.rotation.y += delta * 0.14
  })

  return (
    <group ref={group}>
      {tree.branches.map((b, i) => (
        <mesh
          key={i}
          geometry={branchGeo}
          material={branchMat}
          position={b.mid}
          quaternion={b.quat}
          scale={[1, b.len, 1]}
        />
      ))}
      {tree.tips.map((tip, i) => (
        <mesh key={`tip-${i}`} geometry={tipGeo} material={tipMat} position={tip} />
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

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export function Scene3D({ slug, tone }: { slug: string; tone: SceneTone }) {
  const webgl = useWebGLSupport()
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [inZone, setInZone] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInZone(true)
        observer.disconnect()
      },
      { rootMargin: '150% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el || !inZone) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [inZone])

  const variant = SCENE_BY_SLUG[slug] ?? 'read-stream'
  const color = TONE_COLOR[tone]
  const frameloop: 'always' | 'demand' = inView && !reduced ? 'always' : 'demand'

  return (
    <div ref={containerRef} className="scene3d" aria-hidden="true">
      {webgl && inZone ? (
        <SceneErrorBoundary>
          <Canvas
            frameloop={frameloop}
            dpr={[1, 1.25]}
            camera={{ position: [0, 0, 6.2], fov: 42 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
          >
          {variant === 'read-stream' && <ReadStream color={color} reduced={reduced} />}
          {variant === 'specimen-orbit' && <SpecimenOrbit color={color} reduced={reduced} />}
          {variant === 'waste-orbit' && <WasteOrbit color={color} reduced={reduced} />}
          {variant === 'docking' && <Docking color={color} reduced={reduced} />}
          {variant === 'phylo-tree' && <PhyloTree color={color} reduced={reduced} />}
          </Canvas>
        </SceneErrorBoundary>
      ) : null}
    </div>
  )
}