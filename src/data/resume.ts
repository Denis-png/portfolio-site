// Content of the Resume page, taken from CV-EU.pdf. Edit this file to change the page.
// The phone number from the PDF is left out on purpose: this page is public.

export interface Experience {
  role: string;
  org: string;
  place: string;
  period: string;
  intro?: string;
  bullets?: string[];
}

export interface Education {
  degree: string;
  school: string;
  place: string;
  period: string;
  bullets?: string[];
}

export const resume = {
  headline: 'AI / ML Engineer — LLM Systems & ML Infrastructure',
  facts: [
    'Mannheim, Germany',
    'Open to relocation: Prague',
    'Remote (CET ±5h)',
    'EU citizen (German), no work permit required in the EU/EEA',
  ],
  summary:
    'Data Science MSc candidate with three years of applied engineering experience across the full data lifecycle, from API ingestion pipelines and PostgreSQL schema design to model training and production web applications. Current focus on LLM-based systems: agentic workflows and benchmark evaluation methodology. Complements ML work with hands-on infrastructure practice, operating a self-managed Linux server environment with containerised services, reverse proxying, monitoring, and secure networking. Seeking an AI Engineer or MLOps role where model development and production infrastructure meet.',

  experience: [
    {
      role: 'Data Engineer & Full-Stack Web Developer',
      org: 'Dept. of Water Resources and Environmental Modeling, CULS',
      place: 'Prague, Czechia',
      period: 'May 2021 – Feb 2023',
      intro:
        'Began as a course project; invited to continue as a paid engineer on the department’s environmental monitoring platform.',
      bullets: [
        'Designed and maintained a PostgreSQL database consolidating environmental sensor and public API data from multiple sources',
        'Built Python ingestion services that automatically retrieved, validated, and persisted data, with duplicate detection and quality checks',
        'Developed a full-stack web application (Django backend, Vue.js frontend) for data access and visualisation',
        'Deployed and operated services on Kubernetes with Django, PostgreSQL, Celery, and Redis',
        'Built a maintenance reporting system used by the research team to track sensor fleet health',
      ],
    },
    {
      role: 'Machine Learning Engineer (Python)',
      org: 'Dept. of Water Resources and Environmental Modeling, CULS',
      place: 'Prague, Czechia',
      period: 'Oct 2021 – Jan 2022',
      bullets: [
        'Researched and implemented HAN (Holistic Attention Network) for single-image super-resolution',
        'Trained the model on the project’s planetary imagery dataset and evaluated resolution improvement',
        'Owned the training and evaluation pipeline using PyTorch, OpenCV, and NumPy',
      ],
    },
    {
      role: 'Project Researcher',
      org: 'Dept. of Water Resources and Environmental Modeling, CULS',
      place: 'Prague, Czechia',
      period: 'Nov 2020 – Dec 2020',
      bullets: [
        'Performed curation and preprocessing of planetary imagery datasets for downstream machine learning use',
        'Rehired by the department the following year based on performance',
      ],
    },
    {
      role: 'Delivery Associate (part-time)',
      org: 'ABV Saarbrucken',
      place: 'Germany',
      period: '2023 – present',
      intro:
        'Part-time role held continuously while relocating to Germany, completing German language certification, and pursuing an MSc full-time.',
    },
  ] satisfies Experience[],

  education: [
    {
      degree: 'MSc Data Science',
      school: 'University of Mannheim',
      place: 'Germany',
      period: '2025 – expected 2027',
      bullets: [
        'Coursework: Large Language Models & Agents, Generative Software Engineering, Data Mining, Web Mining, Machine Learning, Large Scale Database Management, Advanced Methods in Text Analytics',
        'Six-month team project: Evaluation on Live Generated Benchmarks, a methodology for reducing benchmark contamination in LLM evaluation',
      ],
    },
    {
      degree: 'German Intensive Language Course',
      school: 'Abendakademie Mannheim',
      place: 'Germany',
      period: '2024 – 2025',
      bullets: ['Completed with certified B1 proficiency'],
    },
    {
      degree: 'BSc Environmental Data Science',
      school: 'Czech University of Life Sciences',
      place: 'Prague, Czechia',
      period: 'Sep 2019 – May 2022',
      bullets: [
        'Specialisation in Informatics: data structures, storage, and large-scale data handling',
        'Thesis: Development of a Web Application for Air Quality Monitoring in the Czech Republic, grade 2 (very good)',
      ],
    },
  ] satisfies Education[],

  skills: [
    { label: 'Languages', items: 'Python, SQL, JavaScript, R, Bash' },
    {
      label: 'ML / AI',
      items: 'PyTorch, scikit-learn, LLM APIs, agentic workflows, OpenCV, NumPy, pandas',
    },
    {
      label: 'Data',
      items: 'PostgreSQL, ETL pipeline design, API ingestion, Celery, Redis, data quality validation',
    },
    {
      label: 'Infra',
      items:
        'Docker, Docker Compose, Kubernetes, Traefik, Ansible, Linux (Ubuntu, Arch), WireGuard, Cloudflare, Git, CI/CD',
    },
    { label: 'Web', items: 'Django, Vue.js, REST APIs' },
  ],

  spoken: [
    { language: 'Russian', level: 'native' },
    { language: 'English', level: 'C1' },
    { language: 'Czech', level: 'B1' },
    { language: 'German', level: 'B1' },
  ],
};
