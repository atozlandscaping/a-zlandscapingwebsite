// A-Z Landscaping — small site scripts

// ----------------------------------------------------------
// OUR WORK — before & after projects
// To add a project: put two photos in public/assets/work/ and add an entry below.
//   mode: "slider" = drag handle to wipe between photos (best when both photos
//                    are taken from the same spot and angle)
//         "toggle" = tap Before / After buttons (best when the angles differ)
//   category: "hardscape" | "lawn" | "grading"  (matches the filter buttons)
// ----------------------------------------------------------
const PROJECTS = [
  { slug: "08-stone-wall-walk", title: "Stone Wall Walkway Rebuild", category: "hardscape", mode: "slider",
    text: "Weedy, uneven pavers pulled up and relaid as a tight, level flagstone walkway." },
  { slug: "09-gazebo-path", title: "Gazebo Path Replacement", category: "hardscape", mode: "slider",
    text: "An old brick path replaced with natural flagstone set in a river rock border." },
  { slug: "01-stone-stairs", title: "Natural Stone Hillside Stairs", category: "hardscape", mode: "slider",
    text: "A worn timber staircase replaced with sandstone steps set into the hillside, plus fresh soil and plantings." },
  { slug: "07-aspen-path", title: "Aspen Grove Pathway", category: "hardscape", mode: "slider",
    text: "A flagstone path and rock beds winding through the aspens along the house." },
  { slug: "06-deck-walkway", title: "Deck Entry Walkway", category: "hardscape", mode: "slider",
    text: "Gravel around the deck and a curving flagstone walkway leading to the entry stairs." },
  { slug: "05-flagstone-path", title: "Flagstone Path & Gravel Border", category: "hardscape", mode: "toggle",
    text: "Overgrown grass and debris replaced with a gravel border and flagstone path along the house." },
  { slug: "04-grading-swale", title: "Grading & Drainage Swale", category: "grading", mode: "toggle",
    text: "The lot regraded with a gravel swale to carry water away from the home, then reseeded." },
  { slug: "02-revegetation", title: "Mountain Home Revegetation", category: "lawn", mode: "toggle",
    text: "Rutted, torn-up ground around a new build regraded and reseeded into healthy grass." },
  { slug: "03-deck-lawn", title: "Deck-Side Lawn Restoration", category: "lawn", mode: "toggle",
    text: "A construction-damaged yard beside the deck brought back to a full, green lawn." },
];

(function () {
  // Mobile menu
  const btn = document.querySelector(".menu-btn");
  const nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-label", "Open menu");
      })
    );
  }

  // Show the floating call button on phones once the hero is scrolled past
  const call = document.querySelector(".mobile-call");
  if (call) {
    const onScroll = () => call.classList.toggle("show", window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Our Work
  const grid = document.getElementById("work-grid");
  const LABELS = { hardscape: "Hardscape", lawn: "Lawn & revegetation", grading: "Grading & drainage" };
  if (grid) {
    PROJECTS.forEach((p) => {
      const before = `assets/work/${p.slug}-before.webp`;
      const after = `assets/work/${p.slug}-after.webp`;
      const card = document.createElement("article");
      card.className = "project";
      card.dataset.category = p.category;

      const frame = document.createElement("div");
      frame.className = `ba ba-${p.mode}`;
      frame.innerHTML = `
        <img class="ba-after" src="${after}" alt="${p.title} — after" width="600" height="800" loading="lazy">
        <img class="ba-before" src="${before}" alt="${p.title} — before" width="600" height="800" loading="lazy">
        <span class="ba-tag ba-tag-before">Before</span>
        <span class="ba-tag ba-tag-after">After</span>`;

      if (p.mode === "slider") {
        frame.style.setProperty("--pos", "50%");
        frame.insertAdjacentHTML("beforeend",
          `<span class="ba-handle" aria-hidden="true"><span></span></span>
           <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="Drag to compare before and after: ${p.title}">`);
        const range = frame.querySelector(".ba-range");
        range.addEventListener("input", () => frame.style.setProperty("--pos", range.value + "%"));
      } else {
        frame.insertAdjacentHTML("beforeend",
          `<div class="ba-switch" role="group" aria-label="Show before or after">
             <button type="button" aria-pressed="true" data-show="before">Before</button>
             <button type="button" aria-pressed="false" data-show="after">After</button>
           </div>`);
        frame.querySelectorAll(".ba-switch button").forEach((b) =>
          b.addEventListener("click", () => {
            frame.classList.toggle("show-after", b.dataset.show === "after");
            frame.querySelectorAll(".ba-switch button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
          })
        );
      }

      const body = document.createElement("div");
      body.className = "project-body";
      body.innerHTML = `<span class="project-cat">${LABELS[p.category] || ""}</span><h3>${p.title}</h3><p>${p.text}</p>`;

      card.append(frame, body);
      grid.appendChild(card);
    });

    document.querySelectorAll(".work-filters .chip").forEach((chip) =>
      chip.addEventListener("click", () => {
        document.querySelectorAll(".work-filters .chip").forEach((c) => c.classList.toggle("active", c === chip));
        const f = chip.dataset.filter;
        grid.querySelectorAll(".project").forEach((card) => {
          card.hidden = f !== "all" && card.dataset.category !== f;
        });
      })
    );
  }

  // Quote form: send people to the thank-you page on this same site after submitting
  const next = document.querySelector('.quote-form input[name="_next"]');
  if (next) next.value = new URL("thanks.html", window.location.href).href;
})();
