/**
 * Featured projects + case study content.
 *
 * Everything here comes from the resume. Where a section has no supporting
 * data (e.g. quantitative results), a neutral placeholder is used on purpose —
 * do not replace it with invented figures.
 */

export type WorkflowStep = {
  id: string
  label: string
  /** Optional tool / short annotation shown under the step label. */
  tool?: string
  /** Optional supporting line shown beside the active stage in the detail timeline. */
  note?: string
}

export type Project = {
  slug: string
  number: string
  title: string
  subtitle: string
  type: string
  /** Colour class on the project art — matches the existing palette. */
  tone: 'violet' | 'amber' | 'blue' | 'rose' | 'leaf'
  /** Large serif word rendered inside the project art. */
  artWord: string
  featured: boolean
  tagline: string
  description: string
  meta: { label: string; value: string }[]
  /** Compact chain rendered on the card. */
  toolchain: string[]
  tech: string[]
  workflow: { title: string; steps: WorkflowStep[] }
  caseStudy: {
    problem: string[]
    approach: string[]
    architecture: string[]
    technologies: { group: string; items: string[] }[]
    implementation: string[]
    results: string[]
    learnings: string[]
  }
}

/** Used wherever the resume does not supply quantitative outcomes. */
export const NO_RESULTS_NOTE =
  'Results and detailed analysis available in the project repository.'

export const projects: Project[] = [
  {
    slug: 'rna-seq-analysis-platform',
    number: '01',
    title: 'RNA-seq Analysis Platform',
    subtitle: 'Glucocorticoid Response Analysis',
    type: 'Mini Project',
    tone: 'violet',
    artWord: 'RNA-seq',
    featured: true,
    tagline: 'An end-to-end RNA-seq workflow on a real human airway dataset.',
    description:
      'An end-to-end RNA-seq workflow built on GSE52778 — from raw reads through quality control, alignment and counting to donor-aware differential expression.',
    meta: [
      { label: 'Type', value: 'Mini Project' },
      { label: 'Dataset', value: 'GSE52778' },
      { label: 'Design', value: '~ donor + condition' },
    ],
    toolchain: ['FastQC', 'fastp', 'STAR', 'featureCounts', 'DESeq2'],
    tech: [
      'FastQC',
      'fastp',
      'STAR',
      'featureCounts',
      'DESeq2',
      'Nextflow',
      'FastAPI',
      'React',
      'TypeScript',
    ],
    workflow: {
      title: 'RNA-seq workflow',
      steps: [
        {
          id: 'raw',
          label: 'Raw data',
          tool: 'GSE52778',
          note:
            'GSE52778 is a human airway smooth muscle RNA-seq dataset covering 16 samples across four donors and four conditions, six of which were used in the current analysis.',
        },
        { id: 'qc', label: 'FastQC', tool: 'Quality control', note: 'Quality control with FastQC.' },
        { id: 'prep', label: 'fastp', tool: 'Preprocessing', note: 'Adapter and quality trimming with fastp.' },
        { id: 'align', label: 'STAR', tool: 'Spliced alignment', note: 'Spliced alignment with STAR.' },
        {
          id: 'count',
          label: 'featureCounts',
          tool: 'Gene-level counting',
          note: 'Gene-level quantification with featureCounts.',
        },
        {
          id: 'de',
          label: 'DESeq2',
          tool: 'Differential expression',
          note:
            'A donor-aware DESeq2 experimental design of approximately ~ donor + condition was used to control for inter-donor variability.',
        },
        { id: 'results', label: 'Results', tool: 'Reporting', note: NO_RESULTS_NOTE },
      ],
    },
    caseStudy: {
      problem: [
        'GSE52778 is a human airway smooth muscle RNA-seq dataset covering 16 samples across four donors and four conditions, six of which were used in the current analysis.',
        'Turning that raw sequencing data into interpretable differential expression results requires a workflow that is not only correct but reproducible — and that accounts for variation between individual donors rather than treating every sample as independent.',
      ],
      approach: [
        'An end-to-end RNA-seq workflow was implemented across quality control, preprocessing, alignment, counting and differential expression.',
        'A donor-aware DESeq2 experimental design of approximately ~ donor + condition was used to control for inter-donor variability.',
        'Reproducibility, data provenance and workflow limitations were documented alongside the analysis so the work can be reused and extended.',
      ],
      architecture: [
        'Analysis layer — FastQC → fastp → STAR → featureCounts → DESeq2, run as a sequential, reproducible chain over the GSE52778 samples.',
        'Pipeline layer — modular Nextflow DSL2 pipelines wrapping the analysis steps so they can be composed and re-run.',
        'Service layer — a FastAPI backend exposing the pipeline and its outputs.',
        'Interface layer — a React / TypeScript frontend for interacting with the workflow and its results.',
      ],
      technologies: [
        {
          group: 'Analysis',
          items: ['FastQC', 'fastp', 'STAR', 'featureCounts', 'DESeq2'],
        },
        { group: 'Pipeline', items: ['Nextflow (DSL2)'] },
        { group: 'Backend', items: ['FastAPI'] },
        { group: 'Frontend', items: ['React', 'TypeScript'] },
      ],
      implementation: [
        'Quality control with FastQC, adapter and quality trimming with fastp, spliced alignment with STAR, gene-level quantification with featureCounts and differential expression with DESeq2.',
        'Donor included as a term in the DESeq2 design so condition effects are estimated within, rather than across, donors.',
        'Modular Nextflow DSL2 pipelines paired with a FastAPI backend and a React / TypeScript frontend.',
      ],
      results: [NO_RESULTS_NOTE],
      learnings: [
        'Experimental design matters before any code runs — a donor-aware model is what makes the condition comparison meaningful in a multi-donor dataset.',
        'Documenting data provenance and known workflow limitations is part of the deliverable, not an afterthought.',
        'Splitting the workflow into modular pipeline steps makes each stage independently re-runnable and easier to reason about.',
      ],
    },
  },
  {
    slug: 'inha-drug-discovery',
    number: '02',
    title: 'Drug Discovery Against Mtb InhA',
    subtitle: 'Comparative molecular docking on the InhA target',
    type: 'Mini Project',
    tone: 'rose',
    artWord: 'Dock',
    featured: false,
    tagline: 'Comparative docking of isoniazid, pyridomycin and NITD-916 against the InhA therapeutic target.',
    description:
      'A structural bioinformatics investigation of the InhA target in Mycobacterium tuberculosis, examining the S94A mutation and its effect on isoniazid interactions, with three inhibitors compared by docking affinity, interaction distances and drug-likeness.',
    meta: [
      { label: 'Type', value: 'Mini Project' },
      { label: 'Target', value: 'Mtb InhA' },
      { label: 'Priority', value: 'NITD-916' },
    ],
    toolchain: ['PyMOL', 'AutoDock', 'PDB', 'PubChem', 'SwissADME'],
    tech: [
      'PDB',
      'PubChem',
      'PyMOL',
      'AutoDock',
      'SwissADME',
      'Molecular docking',
      'Protein–ligand interaction',
    ],
    workflow: {
      title: 'Docking workflow',
      steps: [
        {
          id: 'target',
          label: 'InhA target',
          tool: 'M. tuberculosis',
          note:
            'InhA was investigated as a therapeutic target in Mycobacterium tuberculosis, examining the S94A mutation and its effect on isoniazid interactions.',
        },
        {
          id: 'structures',
          label: 'Structures',
          tool: 'PDB · PubChem',
          note: 'Protein and ligand information was retrieved from PDB and PubChem.',
        },
        {
          id: 'site',
          label: 'Active site',
          tool: 'Preparation',
          note: 'The target structure was prepared and the active site identified.',
        },
        {
          id: 'dock',
          label: 'Molecular docking',
          tool: 'AutoDock',
          note: 'Molecular docking was performed for the candidate ligands.',
        },
        {
          id: 'interaction',
          label: 'Interaction analysis',
          tool: 'PyMOL',
          note: 'Protein–ligand interactions were analyzed using PyMOL.',
        },
        {
          id: 'admet',
          label: 'Drug-likeness',
          tool: 'SwissADME',
          note:
            'Isoniazid, pyridomycin and NITD-916 were compared using docking affinity, interaction distances and SwissADME drug-likeness parameters.',
        },
        {
          id: 'priority',
          label: 'Prioritisation',
          tool: 'NITD-916',
          note: 'NITD-916 was prioritized according to the project\u2019s reported criteria.',
        },
      ],
    },
    caseStudy: {
      problem: [
        'InhA is a therapeutic target in Mycobacterium tuberculosis. The S94A mutation and its effect on isoniazid interactions were examined as part of understanding the target.',
        'Comparing candidate inhibitors requires consistent structural evidence — docking affinity, interaction distances and drug-likeness parameters, rather than a single metric.',
      ],
      approach: [
        'Protein and ligand information was retrieved from PDB and PubChem; the target structure was prepared and the active site identified.',
        'Molecular docking was performed and protein–ligand interactions analyzed using PyMOL.',
        'Isoniazid, pyridomycin and NITD-916 were compared using docking affinity, interaction distances and SwissADME drug-likeness parameters.',
        'Candidates were prioritized according to the project\u2019s reported criteria.',
      ],
      architecture: [
        'Data retrieval — target and ligand structures from PDB and PubChem.',
        'Preparation — target structure prepared and active site identified.',
        'Docking — molecular docking performed with AutoDock.',
        'Interaction analysis — protein–ligand interactions analyzed with PyMOL.',
        'Drug-likeness — SwissADME parameters across isoniazid, pyridomycin and NITD-916.',
        'Prioritisation — candidates ranked by the project\u2019s reported criteria.',
      ],
      technologies: [
        { group: 'Data sources', items: ['PDB', 'PubChem'] },
        { group: 'Docking', items: ['AutoDock', 'Molecular docking'] },
        { group: 'Analysis', items: ['PyMOL', 'Protein–ligand interaction'] },
        { group: 'Drug-likeness', items: ['SwissADME'] },
      ],
      implementation: [
        'Investigated InhA as a therapeutic target and examined the S94A mutation and its effect on isoniazid interactions.',
        'Retrieved protein and ligand information from PDB and PubChem, prepared the target and identified the active site.',
        'Performed molecular docking, then analyzed protein–ligand interactions using PyMOL, and compared the candidates on affinity, interaction distances and drug-likeness.',
      ],
      results: [NO_RESULTS_NOTE],
      learnings: [
        'A candidate ranking depends on combining docking affinity, interaction distances and drug-likeness rather than any single score.',
        'Consistent structural preparation matters before any docking comparison is meaningful.',
        'Standard public resources — PDB, PubChem, SwissADME — keep a docking study reproducible and shareable.',
      ],
    },
  },
  {
    slug: 'biosampletrack',
    number: '03',
    title: 'BioSampleTrack',
    subtitle: 'Biological Specimen & NGS Workflow Management System',
    type: 'Mini Project',
    tone: 'amber',
    artWord: 'Track',
    featured: false,
    tagline: 'Specimen tracking across a seven-stage NGS workflow.',
    description:
      'A full-stack specimen tracking system covering a seven-stage NGS workflow — from intake and QC through sequencing and bioinformatics analysis to completion or failure handling.',
    meta: [
      { label: 'Type', value: 'Mini Project' },
      { label: 'Scope', value: 'Full-stack' },
      { label: 'Stages', value: 'Seven' },
    ],
    toolchain: ['FastAPI', 'SQLAlchemy', 'React', 'GitHub Actions'],
    tech: [
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'SQLite',
      'Pydantic',
      'React',
      'Vite',
      'React Router',
      'Recharts',
      'GitHub Actions',
    ],
    workflow: {
      title: 'Seven-stage NGS workflow',
      steps: [
        {
          id: 'intake',
          label: 'Intake',
          note:
            'A biological specimen moves through many hands and many stages before it becomes data.',
        },
        { id: 'qc', label: 'QC' },
        { id: 'prep', label: 'Library prep' },
        { id: 'seq', label: 'Sequencing' },
        {
          id: 'bioinfo',
          label: 'Bioinformatics',
          note: 'Surface the state of the lab through search, filtering and dashboard analytics.',
        },
        { id: 'review', label: 'Review' },
        {
          id: 'done',
          label: 'Completion / Failure',
          note:
            'Every stage transition is an explicit, validated state change rather than a free-text status field.',
        },
      ],
    },
    caseStudy: {
      problem: [
        'A biological specimen moves through many hands and many stages before it becomes data. Without a single system of record, sample metadata, workflow position and history are easy to lose.',
        'This project set out to model that journey explicitly: a seven-stage NGS workflow from intake and QC through sequencing, bioinformatics analysis, and completion or failure handling.',
      ],
      approach: [
        'Design and build a full-stack specimen tracking system where every stage transition is an explicit, validated state change rather than a free-text status field.',
        'Capture sample metadata at intake, prevent duplicates, and keep an audit log of everything that happens to a specimen afterwards.',
        'Surface the state of the lab through search, filtering and dashboard analytics.',
      ],
      architecture: [
        'Data layer — SQLAlchemy models over SQLite, with Pydantic schemas validating everything entering the system.',
        'API layer — a Python / FastAPI service exposing specimen CRUD, workflow transitions, search and analytics endpoints.',
        'Client layer — a React / Vite application using React Router for navigation and Recharts for dashboard analytics.',
        'Workflow layer — a seven-stage state machine covering intake, QC, library prep, sequencing, bioinformatics, review and completion or failure.',
      ],
      technologies: [
        { group: 'Backend', items: ['Python', 'FastAPI', 'SQLAlchemy', 'Pydantic'] },
        { group: 'Database', items: ['SQLite'] },
        { group: 'Frontend', items: ['React', 'Vite', 'React Router', 'Recharts'] },
        { group: 'Engineering', items: ['GitHub Actions'] },
      ],
      implementation: [
        'Sample metadata capture, workflow state transitions, audit logging, validation, duplicate prevention, search and filtering, and dashboard analytics.',
        'A 21-test automated test suite covering the system.',
        'A GitHub Actions CI/CD pipeline running on the repository.',
      ],
      results: [NO_RESULTS_NOTE],
      learnings: [
        'Modelling a laboratory process as explicit state transitions — rather than editable status text — is what makes validation and auditability possible.',
        'Validation and duplicate prevention belong at the schema boundary, where every request passes through them.',
        'An automated test suite wired into CI keeps a multi-stage workflow trustworthy as it grows.',
      ],
    },
  },
  {
    slug: 'dna-barcoding-phylogenetics',
    number: '04',
    title: 'DNA Barcoding & Phylogenetics',
    subtitle: 'COI gene analysis of prawn & shrimp species',
    type: 'Mini Project',
    tone: 'leaf',
    artWord: 'Barcode',
    featured: false,
    tagline: 'From the wet lab to the tree — COI barcoding and phylogenetic analysis of prawns and shrimp.',
    description:
      'Species identification of prawns and shrimp by COI DNA barcoding — DNA extraction, PCR amplification of the mitochondrial COI gene, gel electrophoresis and Sanger sequencing, followed by BLAST-based identification, MSA and phylogenetic analysis.',
    meta: [
      { label: 'Type', value: 'Mini Project' },
      { label: 'Scope', value: 'Wet lab → Analysis' },
      { label: 'Marker', value: 'COI gene' },
    ],
    toolchain: ['NCBI BLAST', 'Clustal Omega', 'MEGA', 'BOLD Systems', 'Sanger Sequencing'],
    tech: [
      'DNA extraction',
      'COI PCR',
      'Agarose gel electrophoresis',
      'Sanger sequencing',
      'NCBI BLAST',
      'Clustal Omega',
      'MEGA',
      'BOLD Systems',
    ],
    workflow: {
      title: 'Barcoding pipeline',
      steps: [
        {
          id: 'extract',
          label: 'DNA extraction',
          tool: 'Wet lab',
          note: 'DNA extraction was performed for prawn and shrimp species identification.',
        },
        {
          id: 'pcr',
          label: 'COI PCR',
          tool: 'Mitochondrial COI',
          note: 'PCR amplification of the mitochondrial COI gene was carried out.',
        },
        {
          id: 'seq',
          label: 'Gel & Sanger',
          tool: 'Sequencing',
          note: 'Agarose gel electrophoresis and Sanger sequencing were performed.',
        },
        {
          id: 'id',
          label: 'Species ID',
          tool: 'NCBI BLAST',
          note: 'NCBI BLAST-based species identification was conducted.',
        },
        {
          id: 'msa',
          label: 'Alignment',
          tool: 'Clustal Omega',
          note: 'Multiple Sequence Alignment (MSA) was performed using Clustal Omega.',
        },
        {
          id: 'phylo',
          label: 'Phylogenetics',
          tool: 'MEGA',
          note: 'Phylogenetic analysis was carried out using MEGA.',
        },
        {
          id: 'barcode',
          label: 'Barcodes & tree',
          tool: 'BOLD Systems',
          note:
            'DNA barcodes were generated and phylogenetic trees constructed to evaluate genetic relationships among identified prawn and shrimp species.',
        },
      ],
    },
    caseStudy: {
      problem: [
        'DNA barcoding and phylogenetic analysis of prawn and shrimp species using the COI gene span the whole molecular pipeline — from wet-lab extraction through sequencing to the trees that reveal species relationships.',
        'A reproducible barcode pipeline needs each link in the chain: extraction, amplification, sequencing, identification, alignment and phylogenetics.',
      ],
      approach: [
        'Performed DNA extraction, PCR amplification of the mitochondrial COI gene, agarose gel electrophoresis and Sanger sequencing for species identification.',
        'Conducted NCBI BLAST-based species identification and Multiple Sequence Alignment (MSA) using Clustal Omega.',
        'Generated DNA barcodes and constructed phylogenetic trees to evaluate genetic relationships among the identified species.',
      ],
      architecture: [
        'Molecular lab — DNA extraction, COI PCR, agarose gel electrophoresis, Sanger sequencing.',
        'Identification — NCBI BLAST-based species identification, with BOLD Systems as reference.',
        'Alignment — Multiple Sequence Alignment (MSA) with Clustal Omega.',
        'Phylogenetics — tree construction and analysis with MEGA.',
      ],
      technologies: [
        {
          group: 'Wet lab',
          items: ['DNA extraction', 'COI PCR', 'Agarose gel electrophoresis', 'Sanger sequencing'],
        },
        { group: 'Identification', items: ['NCBI BLAST', 'BOLD Systems'] },
        { group: 'Alignment', items: ['Clustal Omega', 'Multiple Sequence Alignment (MSA)'] },
        { group: 'Phylogenetics', items: ['MEGA'] },
      ],
      implementation: [
        'DNA extraction followed by PCR amplification of the mitochondrial COI gene, agarose gel electrophoresis and Sanger sequencing.',
        'NCBI BLAST-based species identification and Multiple Sequence Alignment (MSA) using Clustal Omega.',
        'Phylogenetic analysis using MEGA, with DNA barcodes generated and trees constructed for the identified species.',
      ],
      results: [NO_RESULTS_NOTE],
      learnings: [
        'A species barcode project is a complete pipeline — wet-lab work, sequencing and analysis each matter for a trustworthy identification.',
        'Standard, reproducible links — BLAST, Clustal Omega, MEGA — connect molecular data to phylogenetic inference.',
        'The COI marker ties molecular taxonomy to evolutionary relationships in a single workflow.',
      ],
    },
  },
  {
    slug: 'ecohabit',
    number: '05',
    title: 'EcoHabit',
    subtitle: 'AI-Powered Circular Economy Platform',
    type: 'Mini Project',
    tone: 'blue',
    artWord: 'Eco',
    featured: false,
    tagline: 'A multi-app campus platform with an image-classification AI service.',
    description:
      'A multi-app circular economy platform for college campuses, combining a Flutter mobile app, a NestJS backend, a Python / FastAPI AI service and a Next.js admin dashboard.',
    meta: [
      { label: 'Type', value: 'Mini Project' },
      { label: 'Context', value: 'College campuses' },
      { label: 'Model', value: 'MobileNetV2' },
    ],
    toolchain: ['Flutter', 'NestJS', 'FastAPI', 'Next.js'],
    tech: [
      'Flutter',
      'NestJS',
      'Python',
      'FastAPI',
      'TensorFlow',
      'MobileNetV2',
      'Next.js',
      'Redis',
    ],
    workflow: {
      title: 'AI classification pipeline',
      steps: [
        {
          id: 'image',
          label: 'Image',
          note: 'Identify waste items from a photograph.',
        },
        {
          id: 'model',
          label: 'MobileNetV2',
          note: 'MobileNetV2 used to classify images into eight waste categories.',
        },
        {
          id: 'class',
          label: 'Classification',
          tool: 'Eight categories',
          note: 'A confidence threshold is what separates a demo classifier from a system that can decline to answer rather than guide someone wrongly.',
        },
        {
          id: 'threshold',
          label: 'Confidence check',
          note: 'Turn the classification into disposal guidance and upcycling suggestions.',
        },
        {
          id: 'guidance',
          label: 'Disposal & upcycling guidance',
          note: 'Disposal guidance and upcycling suggestions are surfaced on the classified item.',
        },
      ],
    },
    caseStudy: {
      problem: [
        'Waste on a college campus is generated continuously and sorted inconsistently. Knowing what a given item is — and what should happen to it next — is the step where most circular economy efforts stall.',
        'EcoHabit approaches this as a platform problem: one system spanning students on mobile, services in the backend, and administrators on the web.',
      ],
      approach: [
        'Build a multi-app platform for college campuses combining a Flutter mobile app, a NestJS backend, a Python / FastAPI AI service and a Next.js admin dashboard.',
        'Use an image classification model to identify waste items from a photograph, then turn that classification into disposal guidance and upcycling suggestions.',
        'Apply Redis caching within the platform.',
      ],
      architecture: [
        'Mobile — a Flutter application as the student-facing entry point.',
        'Backend — a NestJS service coordinating the platform.',
        'AI service — a Python / FastAPI service running MobileNetV2 image classification.',
        'Admin — a Next.js dashboard for administration.',
        'Caching — Redis.',
      ],
      technologies: [
        { group: 'Mobile', items: ['Flutter'] },
        { group: 'Backend', items: ['NestJS'] },
        { group: 'AI service', items: ['Python', 'FastAPI', 'TensorFlow', 'MobileNetV2'] },
        { group: 'Admin', items: ['Next.js'] },
        { group: 'Infrastructure', items: ['Redis'] },
      ],
      implementation: [
        'MobileNetV2 used to classify images into eight waste categories.',
        'A classification pipeline running image → MobileNetV2 → classification → confidence threshold → disposal guidance → upcycling suggestions.',
        'Redis caching used within the platform.',
      ],
      results: [NO_RESULTS_NOTE],
      learnings: [
        'A confidence threshold is what separates a demo classifier from a system that can decline to answer rather than guide someone wrongly.',
        'Splitting the AI service out from the main backend lets the model evolve independently of the rest of the platform.',
        'Coordinating four applications around one model means the contract between them matters more than any single codebase.',
      ],
    },
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
