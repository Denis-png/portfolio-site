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
  // Shown on the home page under the role. Replace with your own words.
  bio: 'Short bio goes here: who you are and what you build.',
  note: 'One more line goes here: what you are looking for.',
  // Paragraphs on the About page. Replace with your own background.
  about: ['A short background goes here: where you started, what you work on, what you are after.'],
  // Path of your CV inside public/, for example '/cv.pdf'. While null, the link is hidden.
  cv: null as string | null,
  description: 'Portfolio of Denis Maxheimer, machine learning engineer.',
  repo: 'https://github.com/Denis-png/portfolio-site',
  contacts: [
    { label: 'GitHub', text: 'Denis-png', href: 'https://github.com/Denis-png' },
    { label: 'Email', text: 'denismaxheimer@gmail.com', href: 'mailto:denismaxheimer@gmail.com' },
  ] satisfies ContactLink[],
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/projects/', label: 'Projects' },
  { href: '/posts/', label: 'Posts' },
  { href: '/about/', label: 'About' },
];
