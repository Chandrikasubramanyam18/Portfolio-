/**
 * Academic coursework, grouped exactly as listed on the resume.
 * Each entry's detail is drawn verbatim from the resume coursework section.
 */

export type CourseworkEntry = {
  id: string
  label: string
  detail: string
}

export const coursework: CourseworkEntry[] = [
  {
    id: 'python',
    label: 'Programming in Python',
    detail:
      'Python programming, NumPy, Pandas, Matplotlib, Jupyter Notebook, data handling, Biopython, sequence analysis, motif discovery, image processing, and computational pipeline development.',
  },
  {
    id: 'biostat',
    label: 'Biostatistics & R Programming',
    detail:
      'R, RStudio, biological data analysis, descriptive statistics, probability, hypothesis testing, parametric and non-parametric tests, correlation, regression, ggplot2, and Bioconductor.',
  },
  {
    id: 'advanced',
    label: 'Advanced Bioinformatics',
    detail:
      'Genomics, transcriptomics, proteomics, metabolomics, structural bioinformatics, systems biology, NGS data analysis, genome annotation, variant analysis, multi-omics, and computational workflows.',
  },
  {
    id: 'aiml',
    label: 'AI / ML & Applications in Biology',
    detail:
      'Supervised and unsupervised learning, regression, classification, clustering, model evaluation, neural networks, CNNs, RNNs, transformers, generative AI, and AI applications in genomics and drug discovery.',
  },
]