# Sabin Raut — Portfolio

[View the portfolio](https://sabin901.github.io/sabin-portfolio/) · [GitHub profile](https://github.com/sabin901)

The original navy-and-mint one-page portfolio, enhanced with optional light mode, an interactive homepage project preview, three visual project highlights, an expandable full project archive, and accessible interactions. Dark mode remains the default; a visitor’s explicit theme choice is saved locally.

## Run locally

```sh
python3 -m http.server 8917 --bind 127.0.0.1
```

Open http://127.0.0.1:8917. Use another port if it is occupied. The committed static files require no installation or build to serve.

## Update content

- `index.html`: introduction, project cards, skills, experience, biography, and contact links.
- `script.js`: case studies, writing content, filters, navigation, modal behavior, theme controls, and article reading-time estimates. Bump its `?v=` value in `index.html` when changing it.
- `styles.css`: preserved original styling.
- `enhancements.css`: light mode, accessibility, and responsive refinements. Bump its `?v=` value in `index.html` when changing it so browsers load the new styles.
- `theme.js`: applies the saved theme before the first paint.
- `images/projects/`: optimized screenshots of the actual public projects.
- **Résumé:** replace `images/Sabin_Raut_Resume.pdf` with your updated PDF, keeping that filename. The enhancement does not edit any résumé PDF.

Project copy reflects documented functionality. Footlyzer forecasts are experimental, Pawi is a public beta, the commerce engine is a local MVP, and Mac Computer Service is described as a frontend.

## Styles and checks

The existing Tailwind utility classes are compiled into `utilities.css`, avoiding a runtime CDN compiler. Update its `?v=` value in `index.html` after rebuilding. Skill groups and original editorial cover illustrations live in the HTML; their theme styles live in `enhancements.css`. If you add utility classes to the HTML or JavaScript, rebuild with Node.js/npm:

```sh
npx --yes tailwindcss@3.4.17 -c tailwind.config.cjs -i scripts/tailwind.css -o utilities.css --minify
node --check script.js
node --check theme.js
python3 scripts/check_site.py
```

Check desktop and mobile views, each homepage preview and its case-study link, opening/closing the project archive, rapid filter changes, both themes, menu navigation, keyboard activation of screenshots and writing cards, and modal Tab/Escape/Back behavior. Main content and direct project/résumé links remain available without JavaScript; popups, filters, and theme controls require JavaScript. Google Fonts use system font fallbacks.

## Publish

GitHub Pages serves the **root site** from `main`. Publish these root files through the existing Pages setup; no React build is needed. Local asset paths are relative to work under `/sabin-portfolio/`.

`portfolio-react/` is a separate experiment retained unchanged. It is not the live root site. Earlier planning documents are historical; this README describes the current implementation.

See [the review and source notes](docs/PORTFOLIO_REVIEW.md) for the repository audit, design references, and GitHub profile recommendations.
