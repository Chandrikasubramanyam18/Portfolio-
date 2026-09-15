/**
 * Contact + social links.
 *
 * NOTE: `linkedin` and `github` are PLACEHOLDER URLs.
 * Replace the `url` values below with the real profiles when available.
 */

export const contact = {
  email: 'chandrtikadps18@gmail.com',

  /** Headline rendered across three lines in the contact section. */
  headlineLines: ["LET'S BUILD SOMETHING", 'AT THE INTERSECTION OF'],
  headlineAccent: 'BIOLOGY & COMPUTATION.',

  availability: 'Open to bioinformatics & computational biology internships',

  socials: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/chandrika-s',
      /** Placeholder until the real profile URL is confirmed. */
      placeholder: true,
    },
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/chandrika-s',
      placeholder: true,
    },
  ],
} as const

export type Contact = typeof contact
