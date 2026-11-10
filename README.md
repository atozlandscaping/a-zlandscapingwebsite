# A-Z Landscaping — Website

Public website for A-Z Landscaping (Summit County, CO). Plain HTML/CSS/JS — no build step.

## Folder layout

```
public/            ← everything that goes live
  index.html       ← all pages live in this one file; only one shows at a time
  thanks.html      ← page shown after someone sends the quote form
  styles.css       ← colors, fonts, layout (brand colors at the top)
  main.js          ← mobile menu, before & after projects, form redirect
  assets/          ← logo, favicon, and work/ for project photos
.replit            ← tells Replit how to preview and deploy
```

## Pages

Each section is its own page: Home, Services (includes Wildfire Mitigation), Portfolio, Our Story, Service Area, Contact.
Each one has its own link, e.g. `yoursite.com/#work` or `yoursite.com/#contact`, and the browser Back button works.
Page titles are set in the `PAGES` list in `public/main.js`.

## Hosting on Replit

1. In Replit: **Create App → Import from GitHub** → pick this repo.
2. Click **Run** to preview.
3. Click **Deploy → Static**. Public directory: `public`.
4. To use your own domain (e.g. azlandscapingco.com), open the deployment's **Settings → Link a domain**.

## Making changes

Changes are made with Claude and pushed to GitHub. In Replit, open the **Git** pane → **Pull**, then **Redeploy**.
Avoid editing the same files in Replit at the same time, or the two copies can conflict.

## Cache busting

`index.html` and `thanks.html` load `styles.css?v=...` and `main.js?v=...`.
Bump the `v=` value whenever those files change so browsers (and the Replit preview) load the new version.

## Quote form

The form sends submissions to atozlandscapingco1@gmail.com through FormSubmit (formsubmit.co, free).
**The very first time the form is used, FormSubmit emails that inbox a confirmation link — click it once to activate.**

## Adding before & after projects

1. Put the two photos in `public/assets/work/` named `<slug>-before.webp` and `<slug>-after.webp`
   (3:4 portrait, about 600×800, works best).
2. Add an entry to the `PROJECTS` list at the top of `public/main.js`.
   - `mode: "slider"`: drag handle. Use when both photos are from the same spot and angle.
   - `mode: "toggle"`: Before / After buttons. Use when the angles differ.
   - `category`: `hardscape`, `lawn` or `grading` (matches the filter buttons).
