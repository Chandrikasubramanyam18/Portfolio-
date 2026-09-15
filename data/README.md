# Content data layer

All resume content lives in this folder. The UI components read from here, so
updating the portfolio never requires touching a component.

| File            | What it controls                                                          |
| --------------- | ------------------------------------------------------------------------- |
| `profile.ts`    | Name, wordmark, identity line, hero headline/CTAs, About copy, footer note |
| `projects.ts`   | The three featured projects, their workflow diagrams and full case studies |
| `skills.ts`     | The eight skill categories and their items                                 |
| `education.ts`  | Education timeline entries and CGPA values (numeric — they drive the meter)|
| `contact.ts`    | Email, contact headline, availability line, social links                   |

## Things to know

- **`contact.ts` social URLs are placeholders.** Both entries are flagged
  `placeholder: true`. Replace the `url` values with the real LinkedIn and
  GitHub profiles.
- **Case study sections with no data** use the shared `NO_RESULTS_NOTE`
  constant in `projects.ts` ("Results and detailed analysis available in the
  project repository.") rather than invented figures. Replace it per project
  once real outputs exist.
- **Adding a project** — append an object to `projects`. The card, the
  `/work/<slug>` case study page and the "next project" link are all generated
  from it. `featured: true` gives the card the larger, dominant treatment.
- **CGPA values** in `education.ts` are numbers, not strings; the animated
  meter is calculated as `cgpa / cgpaScale`.
