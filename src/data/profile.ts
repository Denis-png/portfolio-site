// Everything personal that appears on the site lives here, so pages never hard-code it.
// Edit this file to change your name, bio, contact links and navigation.

export interface ContactLink {
  label: string;
  text: string;
  href: string;
}

export const profile = {
  name: 'Denis Maxheimer',
  role: 'Machine learning engineer',
  // Shown on the first page (About) under the role. Replace with your own words.
  bio: 'I am finishing an MSc in Data Science at the University of Mannheim, with primary interests in LLM\'s, Evaluation and Benchmarking, DevOps and Self-Hosting.',
  note: 'Looking for a full-time job, remote or located in Prague, ready to start from January 2027.',
  // Path of your CV inside public/, for example '/cv.pdf'. While null, the link is hidden.
  cv: '/CV-EU.pdf' as string | null,
  description: 'Portfolio of Denis Maxheimer, machine learning engineer.',
  repo: 'https://github.com/Denis-png/portfolio-site',
  contacts: [
    { label: 'GitHub', text: 'Denis-png', href: 'https://github.com/Denis-png' },
    { label: 'LinkedIn', text: 'denis-maxheimer', href: 'https://www.linkedin.com/in/denis-maxheimer' },
    { label: 'Email', text: 'denismaxheimer@gmail.com', href: 'mailto:denismaxheimer@gmail.com' },
  ] satisfies ContactLink[],
};

export const nav = [
  { href: '/', label: 'About' },
  { href: '/projects/', label: 'Projects' },
  { href: '/resume/', label: 'Resume' },
];
