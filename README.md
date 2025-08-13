# SeungTaek "Stan" Lee — Portfolio

Static, responsive portfolio website built with HTML/CSS/JS. No build step required.

## Deploy to GitHub Pages

You have two easy options. Pick one.

### Option A: Pages from `main` (simplest)
1. Create a new repository on GitHub (any name), or use `username.github.io` if you want it at the root domain.
2. Push this folder to the new repo:
   - Initialize and push (replace placeholders):
     ```bash
     git init
     git branch -M main
     git add .
     git commit -m "Initial portfolio"
     git remote add origin https://github.com/<your-username>/<your-repo>.git
     git push -u origin main
     ```
3. In the GitHub repo: Settings → Pages → Build and deployment → Branch: `main` and Folder: `/ (root)` → Save.
4. Wait ~1–3 minutes. Your site will be at `https://<your-username>.github.io/<your-repo>/` (or `https://<your-username>.github.io/` if the repo is `username.github.io`).

### Option B: `gh-pages` branch via Actions (optional)
If you prefer, create a Pages workflow to publish to `gh-pages`. For this static site, Option A is recommended.

## What you should update

- Links: In `assets/js/main.js`, set your real links for `GH`, `LI`, and `RESUME` constants.
- Resume PDF: Place your PDF at `assets/Stan_Lee_Resume.pdf` and point `RESUME` to it (or an external link).
- Project links: In `index.html` under the Projects section, replace `#` hrefs with your real Paper/Repo URLs.
- Socials in Contact: The contact section uses the same link IDs and will update automatically once you set `GH`/`LI` in JS.

## Local preview

- Open `index.html` directly in your browser, or serve locally:
  ```bash
  cd /Users/istantheman/Desktop/Portfolio
  python3 -m http.server 8000
  ```
  Visit `http://localhost:8000`.

## Editing guide

- Projects: Duplicate a `.project-card` block in `index.html` and adjust `data-tags` for filtering.
- Sections: Content is organized in sections (`#about`, `#education`, `#experience`, `#projects`, `#skills`, `#awards`, `#contact`).
- Styling: Update `assets/css/style.css`. Colors use CSS variables at the top; theme toggles automatically.

## Notes

- `.nojekyll` disables Jekyll processing so that all assets in `assets/` are served as-is.
- This site is fully static and doesn’t need Node or a build step.
