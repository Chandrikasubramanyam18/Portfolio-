/**
 * Skills, grouped into categories.
 * Only technologies present on the resume are listed here.
 */

export type SkillCategory = {
  id: string
  label: string
  /** Short mono caption shown next to the category name. */
  caption: string
  items: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'bioinformatics',
    label: 'Bioinformatics & Genomics',
    caption: 'Analysis',
    items: [
      'RNA-seq',
      'NGS',
      'Sequence analysis',
      'Differential expression analysis',
      'Genome annotation',
      'Biopython',
      'BLAST',
      'NCBI',
      'UniProt',
      'Galaxy',
    ],
  },
  {
    id: 'barcoding',
    label: 'DNA Barcoding & Phylogenetics',
    caption: 'Molecular taxonomy',
    items: [
      'DNA barcoding',
      'COI gene analysis',
      'Multiple Sequence Alignment (MSA)',
      'Clustal Omega',
      'BOLD Systems',
      'GenBank',
      'Phylogenetic analysis',
      'MEGA',
    ],
  },
  {
    id: 'statistics',
    label: 'Statistics & Biostatistics',
    caption: 'Stats',
    items: [
      'Descriptive statistics',
      'Probability',
      'Hypothesis testing',
      't-test',
      'ANOVA',
      'Chi-square',
      'Correlation',
      'Linear regression',
      'Logistic regression',
      'RStudio',
      'ggplot2',
      'Bioconductor',
    ],
  },
  {
    id: 'pipelines',
    label: 'Genomics Tools & Pipelines',
    caption: 'Workflows',
    items: ['FastQC', 'fastp', 'STAR', 'featureCounts', 'DESeq2', 'Nextflow'],
  },
  {
    id: 'programming',
    label: 'Programming & Data',
    caption: 'Languages',
    items: ['Python', 'R', 'Bash', 'SQL'],
  },
  {
    id: 'software',
    label: 'Software Development',
    caption: 'Engineering',
    items: ['FastAPI', 'React', 'TypeScript', 'SQLAlchemy', 'SQLite'],
  },
  {
    id: 'structural',
    label: 'Structural Bioinformatics',
    caption: 'Molecules',
    items: ['Molecular docking', 'PyMOL', 'AutoDock', 'PDB', 'KEGG'],
  },
  {
    id: 'aiml',
    label: 'AI / ML',
    caption: 'Models',
    items: ['TensorFlow', 'MobileNetV2', 'Image classification'],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    caption: 'Environment',
    items: ['Linux', 'Git', 'GitHub Actions', 'Docker', 'Microsoft Excel'],
  },
  {
    id: 'lab',
    label: 'Laboratory Techniques',
    caption: 'Wet lab',
    items: ['PCR', 'DNA/RNA extraction', 'Gel electrophoresis'],
  },
]
