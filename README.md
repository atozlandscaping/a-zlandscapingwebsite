# A-Z Landscaping — Website

Public website for A-Z Landscaping (Summit County, CO). Plain HTML/CSS/JS — no build step.

## Folder layout

```
public/            ← everything that goes live
  index.html       ← the main page (all sections)
  thanks.html      ← page shown after someone sends the quote form
  styles.css       ← colors, fonts, layout (brand colors at the top)
  main.js          ← mobile menu, project photo gallery, form redirect
  assets/          ← logo, favicon, and gallery/ for project photos
.replit            ← tells Replit how to preview and deploy
```

## Hosting on Replit

1. In Replit: **Create App → Import from GitHub** → pick this repo.
2. Click **Run** to preview.
3. Click **Deploy → Static**. Public directory: `public`.
4. To use your own domain (e.g. azlandscapingco.com), open the deployment's **Settings → Link a domain**.

## Making changes

Changes are made with Claude and pushed to GitHub. In Replit, open the **Git** pane → **Pull**, then **Redeploy**.
Avoid editing the same files in Replit at the same time, or the two copies can conflict.

## Quote form

The form sends submissions to atozlandscapingco1@gmail.com through FormSubmit (formsubmit.co, free).
**The very first time the form is used, FormSubmit emails that inbox a confirmation link — click it once to activate.**

## Adding project photos

Put photos in `public/assets/gallery/` and list them in the `GALLERY` array at the top of `public/main.js`.
The "Recent work" section appears automatically once at least one photo is listed.
