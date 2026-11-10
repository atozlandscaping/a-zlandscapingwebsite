# Running the website

This is an existing static HTML/CSS/JavaScript website. Preserve its structure and stack; no dependency installation or build step is required.

- Run workflow: **Start application**
- Command: `python3 serve.py 5000`
- `serve.py` serves `public/` with video range support (needed by Safari/iPhone) and no-cache headers.
- Open the Preview to view the site. Refresh after editing files in `public/`.
- Only `public/` is served. The existing static publishing configuration also uses `public/`.

## Quote form

The form uses the existing external FormSubmit service. Its recipient must complete FormSubmit's one-time email activation before submissions can be delivered. No application secrets are required for the preview. Setup checks do not submit the form or verify email delivery.
