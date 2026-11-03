# Portfolio review — November 3, 2026

## What was reviewed

The [portfolio repository](https://github.com/sabin901/sabin-portfolio), [GitHub profile](https://github.com/sabin901), public repository metadata and READMEs, and the live portfolio, Footlyzer, Pawi, and iRoutine websites. This was a presentation and project-selection review, not a full code or security audit of every application.

## Portfolio findings and changes

- The public Pages site serves the root `index.html`, `styles.css`, and `script.js`. The React experiment is separate and was left intact.
- The previous featured projects did not reflect the newest substantial work. Footlyzer and Pawi now lead alongside iRoutine.
- Preserved the original dark one-page layout, typography, section order, hover effects, scroll reveals, filters, and case-study/article modals. Added an optional light theme, real screenshots, concise project summaries, and new projects within the existing cards.
- Kept the existing portrait, contact email, education, and experience information. No résumé PDFs were edited. The résumé still resolves to `images/Sabin_Raut_Resume.pdf`.
- Matched the LinkedIn destination to the link on the GitHub profile: `https://www.linkedin.com/in/sabin-raut-`.
- Corrected canonical, Open Graph, and sitemap URLs to the public GitHub Pages address instead of the older Vercel address.
- Precompiled the existing Tailwind utilities into a local stylesheet to remove the browser-side CDN compiler. Added saved theme preference, a skip link, reduced-motion support, accessible mobile menu state, modal focus trapping and return, Escape/Back dismissal, and keyboard-operable writing cards. Fixed stale animation timers when filters are changed quickly.

## Repository-by-repository selection

| Repository                                                                 | What the available evidence shows                                                                                                       | Portfolio treatment / next improvement                                                                                                             |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Football-Analyzer-](https://github.com/sabin901/Football-Analyzer-)       | Footlyzer: public football analytics, historical event archive, experimental forecasts, browser-local briefs.                           | Featured. Preserve historical-data and forecast qualifications.                                                                                    |
| [Pawi](https://github.com/sabin901/Pawi)                                   | Desktop virtual companion, TypeScript/Tauri/Rust, nine characters, public release candidates.                                           | Featured as a public beta. Link to website rather than a platform-specific download.                                                               |
| [iRoutine](https://github.com/sabin901/iRoutine)                           | Next.js/FastAPI/Supabase personal analytics across planning, activity, finance, and reflection; public sample workspace.                | Featured. Screenshot is a demo, not personal data.                                                                                                 |
| [Patra-](https://github.com/sabin901/Patra-)                               | README currently describes a Conversational Commerce Engine with a local MVP, mock/provider-ready adapters, and React/FastAPI/Postgres. | Included under its current product name. Avoid claiming live messaging/payment integrations are complete. Clarify the repository name/description. |
| [Ayur.me](https://github.com/sabin901/Ayur.me)                             | Educational wellness app, tracking, React/Express/MongoDB, interactive content.                                                         | Supporting project. Avoid unverified clinical or diagnostic effectiveness claims.                                                                  |
| [amused-py-main22](https://github.com/sabin901/amused-py-main22)           | Python/PyQt Muse S sensor streaming, visualization, recording, and documented platform differences.                                     | Included as “Muse S Sensor Explorer.” A descriptive repository name would improve discoverability.                                                 |
| [Mac-Computer-Service](https://github.com/sabin901/Mac-Computer-Service)   | React storefront and booking frontend; README lists backend, payments, and authentication as remaining work.                            | Supporting project explicitly described as a frontend.                                                                                             |
| [neural-muse-dashboard](https://github.com/sabin901/neural-muse-dashboard) | Profile describes EEG analysis; README is still a generic Lovable starter guide.                                                        | Not featured until documentation explains purpose, architecture, screenshots, and demo behavior.                                                   |
| [Application_Manager](https://github.com/sabin901/Application_Manager)     | Very short README describing student job-application tracking.                                                                          | Retained in Selected Projects. Add setup, screenshots, stack, and specific implemented workflows.                                     |
| [SCSUEventRecommender](https://github.com/sabin901/SCSUEventRecommender)   | C# solution, forms, models, and services; no root README found.                                                                         | Add a README and screenshot. Avoid inventing detailed features without inspecting the application.                                                 |
| [Weather_Analyzer](https://github.com/sabin901/Weather_Analyzer)           | Visual Studio solution and WinForms application directory; no root README found.                                                        | Add source/data explanation, setup, screenshots, and examples.                                                                                     |
| [Age_Calculator](https://github.com/sabin901/Age_Calculator)               | C# solution and app folder; no root README found.                                                                                       | Treat as an early exercise; add a small README.                                                                                                    |
| [sabin-portfolio](https://github.com/sabin901/sabin-portfolio)             | Public profile links to Pages; repository lacked a root README and clear active-site instructions.                                      | Updated the live root site and added maintenance instructions.                                                                                     |

## GitHub profile recommendations

The profile bio already communicates full-stack AI development and an Information Systems/Finance background. Recommended manual follow-ups:

1. Pin Footlyzer, Pawi, iRoutine, the commerce engine, the Muse S explorer, and this portfolio.
2. Add a short description, website, and useful topics to each featured repository. The portfolio repository had no description or website in the inspected public view.
3. Replace starter or missing READMEs with the problem, a real screenshot, current functionality, technology choices, setup, and known limitations.
4. Keep actual usage or performance metrics out of marketing copy until measured. Repository implementation does not establish users, adoption, or business results.

No GitHub profile settings, repository names, or other project sources were changed by this portfolio update.

## Design references

- [Brittany Chiang](https://brittanychiang.com/): clear project evidence, concise experience, and accessible navigation.
- [Lee Robinson](https://leerob.com/): direct personal introduction and restrained content structure.
- [Josh Comeau, Building an Effective Developer Portfolio](https://storage.googleapis.com/joshwcomeau/building-an-effective-dev-portfolio.pdf): original identity and thoughtful project presentation rather than copying another developer’s design.

The final implementation retains Sabin’s existing navy-and-mint visual identity. Light mode uses cool white surfaces, dark slate text, and a deeper teal accent while keeping the same layout and interactions. The references informed clarity and project presentation, not a replacement design.

## Image sources

Project screenshots were captured on November 3, 2026 from the user's public websites:

- `images/projects/footlyzer.webp`: https://sabin901.github.io/Football-Analyzer-/ — historical 2017/18 league view.
- `images/projects/pawi.webp`: https://sabin901.github.io/Pawi/ — public landing page and companion preview.
- `images/projects/iroutine.webp`: https://i-routine.vercel.app/dashboard?preview=true — public demo workspace.

`images/profile-pic.png` is the existing repository portrait and social preview. Screenshots illustrate the projects and are not live data feeds.

## Validation

- Static check: 118 asset/link references, 24 unique IDs, structured data, sitemap, image alt attributes, and résumé PDF pass.
- JavaScript syntax and CSS compilation pass. Utilities are committed as a 14 KB stylesheet.
- Browser checks: dark/light theme switching and saved preference; 320, 390, 768, 1024, and 1440 px layouts without horizontal overflow; mobile menu state and section focus; category filters and rapid filter changes.
- All ten project case studies and three writing popups open. Modal focus trapping, Escape, browser Back, background inert state, and return to the triggering control were verified.
- All loaded image assets were checked. The résumé PDF and original `styles.css` match the original repository bytes; the separate React source is unchanged.
- Reduced-motion behavior was checked in source. Full assistive-technology and cross-browser testing was not performed.
