/**
 * Central profile data.
 * Edit this file to update personal / identity content across the whole site.
 */

export const profile = {
  name: 'Chandrika S',
  /** Rendered in the top-left wordmark. */
  wordmark: { lead: 'CHANDRIKA', accent: 'S' },

  /** Professional identity line. */
  identity: 'Bioinformatics • Computational Biology • Genomics • Scientific Software',
  disciplines: [
    'Bioinformatics',
    'Computational Biology',
    'Scientific Software',
  ],

  hero: {
    eyebrow: 'Chandrika S',
    /** Headline is split so the accent half can use the serif/acid treatment. */
    headline: 'Turning biological data into',
    headlineAccent: 'computational insight.',
    supporting:
      'M.Sc. Bioinformatics & Biotechnology student working across RNA-seq analysis, NGS workflows, computational pipelines and scientific software.',
    metaLeft: 'Bioinformatics • Computational Biology • Genomics',
    metaRight: 'M.Sc. Bioinformatics & Biotechnology — Expected 2027',
    ctas: [
      { label: 'View My Work', href: '#work', primary: true },
      { label: "Let's Connect", href: '#contact', primary: false },
    ],
  },

  about: {
    headingLead: 'Reading biology through',
    headingSpans: ['code', 'pipelines', 'data'],
    paragraphs: [
      "I'm an M.Sc. Bioinformatics & Biotechnology student at Chanakya University, with a B.Sc. in Biotechnology behind me. My work sits where biotechnology knowledge meets computational analysis and software development.",
      'Across my projects I have worked on RNA-seq analysis, NGS workflows and differential expression analysis, molecular docking for drug discovery, and DNA barcoding with phylogenetic analysis — and built the scientific software around them, including AI/ML components.',
      'I am currently seeking internships in bioinformatics, computational biology, genomics, NGS data analysis, AI/ML for life sciences or biotechnology research.',
    ],
    focusAreas: [
      'RNA-seq analysis',
      'NGS workflows',
      'Differential expression analysis',
      'Computational pipelines',
      'Molecular docking & drug discovery',
      'DNA barcoding & phylogenetics',
      'Scientific software development',
      'AI / ML',
    ],
  },

  /** Short summary, kept here so it can be reused (metadata, future CV export, etc.). */
  summary:
    'M.Sc. Bioinformatics & Biotechnology student (CGPA 8.77/10) with a B.Sc. in Biotechnology (CGPA 8.69/10). Hands-on project experience in RNA-seq analysis, NGS workflows and computational pipeline development. Programming and development experience in Python, R, Bash, SQL, FastAPI, React and TypeScript.',

  objective:
    'Seeking internships in bioinformatics, computational biology, genomics, NGS data analysis, or biotechnology research.',

  footerNote: '© 2026 Chandrika S. Built with curiosity, code & biology.',
} as const

export type Profile = typeof profile
