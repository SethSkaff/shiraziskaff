# Shirazi Skaff Enterprises Build Plan

## Source Inputs

- Remote Claude design handoff: unavailable from this environment; brand requirements are the source of truth.
- Local assets: `AirMix logo.png`, `Coach logo.png`, `Crave logo.png`, `Kian photo.png`, `Seth photo.png`.
- Skill constraints: editorial dark-mode restraint, asymmetric product layout, exact palette tokens, purposeful motion, no generic AI visual tells.

## File Plan

1. `package.json` - define Vite React app scripts and dependencies.
2. `index.html` - mount point and document metadata.
3. `vite.config.js` - Vite React configuration.
4. `tailwind.config.js` - exact SSE palette, typography families, easing token, and spacing support.
5. `postcss.config.js` - Tailwind/PostCSS pipeline.
6. `public/assets/*` - copied logo and founder image assets.
7. `src/styles/tokens.css` - CSS variables for base palette, product accents, typography, shadows, focus rings, grain, and global motion.
8. `src/styles/index.css` - Tailwind imports plus global layout, typography, buttons, responsive helpers, and page-transition styles.
9. `src/data/products.js` - product copy, routes, metadata, accent tokens, sections, and asset references.
10. `src/components/LogoLockup.jsx` - horizontal mark + wordmark lockup for parent and products.
11. `src/components/SectionLabel.jsx` - Geist Mono section labels.
12. `src/components/StatusIndicator.jsx` - hero "Building" status with pulsing dot.
13. `src/components/Card.jsx` - floating card system with border, top-edge highlight, grain, shadow, and hover microstates.
14. `src/components/EmailCapture.jsx` - early-access form component with product-aware accent styling.
15. `src/components/Nav.jsx` - persistent sticky nav with logo lockup, scroll backdrop only after hero, links, focus states, and theme toggle control.
16. `src/components/Footer.jsx` - SSE lockup, nav links, email, copyright, and `v0.1.0` mono tag.
17. `src/pages/Home.jsx` - left-aligned hero, asymmetric product grid, and "How we work" section.
18. `src/pages/ProductPage.jsx` - reusable product-detail page template for Coach, AirMix, and Crave.
19. `src/pages/About.jsx` - founder page using local portrait assets and "Why we exist" section.
20. `src/pages/Careers.jsx` - internship text rows with mailto subjects.
21. `src/pages/Contact.jsx` - minimal contact page with inquiry mailto rows.
22. `src/App.jsx` - React Router routes and page transition wrapper.
23. `src/main.jsx` - app bootstrap.
24. `BUILD_LOG.md` - final implementation log after QA and polish.

## Implementation Order

1. Scaffold app/config/assets.
2. Build tokens and global CSS.
3. Build shared components.
4. Build home page.
5. Delegate product-detail page content/implementation review in parallel while completing About, Careers, and Contact.
6. Run build and visual/static audits.
7. Fix audit findings.
8. Write `BUILD_LOG.md`.
