/**
 * Education timeline.
 * `cgpa` / `cgpaScale` drive the animated score meter — keep them numeric.
 */

export type EducationEntry = {
  id: string
  degree: string
  institution: string
  period: string
  cgpa: number
  cgpaScale: number
  status: 'current' | 'completed'
}

export const education: EducationEntry[] = [
  {
    id: 'msc',
    degree: 'M.Sc. Bioinformatics & Biotechnology',
    institution: 'Chanakya University',
    period: 'Expected 2027',
    cgpa: 8.77,
    cgpaScale: 10,
    status: 'current',
  },
  {
    id: 'bsc',
    degree: 'B.Sc. Biotechnology',
    institution: 'Bharath Institute of Higher Education and Research',
    period: '2025',
    cgpa: 8.69,
    cgpaScale: 10,
    status: 'completed',
  },
]
