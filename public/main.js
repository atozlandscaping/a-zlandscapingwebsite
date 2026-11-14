// A-Z Landscaping — small site scripts

// ----------------------------------------------------------
// OUR WORK — before & after projects
// To add a project: put two photos in public/assets/work/ and add an entry below.
//   mode: "slider" = drag handle to wipe between photos (best when both photos
//                    are taken from the same spot and angle)
//         "toggle" = tap Before / After buttons (best when the angles differ)
//         "photo"  = a single finished photo, saved as <slug>.webp
// ----------------------------------------------------------
const PROJECTS = [
  { slug: "18-fire-pit-patio", title: "Fire Pit Patio Boulder Border", mode: "slider",
    text: "Overgrown grass and weeds cleared and an old stump cut down around a fire pit patio, then edged with a natural boulder border." },
  { slug: "10-flagstone-patio", title: "Under-Deck Flagstone Patio", mode: "slider",
    text: "Gravel and an old fence gate cleared out and replaced with a flagstone patio running from the door under the deck." },
  { slug: "11-brush-pile", title: "Brush Pile Removal", mode: "slider",
    text: "A large pile of slash and dead branches cleared and hauled away the same day, leaving a clean berm." },
  { slug: "12-garden-bed-refresh", title: "Garden Bed Refresh", mode: "slider",
    text: "An overgrown bed by the entry stairs cut back, weeded and finished with fresh mulch inside the rock border." },
  { slug: "13-shrub-pruning", title: "Shrub Pruning & Bed Cleanup", mode: "slider",
    text: "Overgrown shrubs along the patio pruned into shape, beds weeded and fresh mulch laid." },
  { slug: "17-river-rock-border", title: "River Rock Foundation Border", mode: "slider",
    text: "Weeds and bare dirt along a log home's foundation replaced with a river rock border: a clean, non-burnable buffer right against the house." },
  { slug: "14-patio-planters", title: "Patio Planter Design", mode: "photo",
    alt: "Long black planter filled with dahlias, red and yellow flowers and silver dusty miller beside an outdoor dining patio",
    text: "Layered summer planters, from dahlias to silvery dusty miller, lining an outdoor dining patio." },
  { slug: "15-poolside-planters", title: "Poolside Planters", mode: "photo",
    alt: "Black planter of marigolds, pink and yellow flowers and dusty miller beside a pool with a ski slope behind",
    text: "Marigolds, zinnias and dusty miller framing a poolside view of the slopes." },
  { slug: "16-entry-planter", title: "Entry Planter", mode: "photo",
    alt: "Black planter filled with red geraniums, dahlias, blue lobelia and purple flowers by a glass entry door",
    text: "A mixed planter of geraniums, dahlias and lobelia welcoming guests at the door." },
  { slug: "08-stone-wall-walk", title: "Stone Wall Walkway Rebuild", mode: "slider",
    text: "Weedy, uneven pavers pulled up and relaid as a tight, level flagstone walkway." },
  { slug: "09-gazebo-path", title: "Gazebo Path Replacement", mode: "slider",
    text: "An old brick path replaced with natural flagstone set in a river rock border." },
  { slug: "01-stone-stairs", title: "Natural Stone Hillside Stairs", mode: "slider",
    text: "A worn timber staircase replaced with sandstone steps set into the hillside, plus fresh soil and plantings." },
  { slug: "07-aspen-path", title: "Aspen Grove Pathway", mode: "slider",
    text: "A flagstone path and rock beds winding through the aspens along the house." },
  { slug: "06-deck-walkway", title: "Deck Entry Walkway", mode: "slider",
    text: "Gravel around the deck and a curving flagstone walkway leading to the entry stairs." },
  { slug: "05-flagstone-path", title: "Flagstone Path & Gravel Border", mode: "slider",
    text: "Overgrown grass and debris replaced with a gravel border and flagstone path along the house." },
  { slug: "04-grading-swale", title: "Grading & Drainage Swale", mode: "slider",
    text: "The lot regraded with a gravel swale to carry water away from the home, then reseeded." },
  { slug: "02-revegetation", title: "Mountain Home Revegetation", mode: "slider",
    text: "Rutted, torn-up ground around a new build regraded and reseeded into healthy grass." },
  { slug: "03-deck-lawn", title: "Deck-Side Lawn Restoration", mode: "slider",
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

  // ----------------------------------------------------------
  // PAGES — only one section shows at a time.
  // Each page has its own link (e.g. yoursite.com/#work), and the
  // browser Back button works.
  // ----------------------------------------------------------
  const PAGES = {
    home: "A-Z Landscaping | Summit County, CO Landscaping, Tree Work & Wildfire Mitigation",
    services: "Services | A-Z Landscaping",
    work: "Portfolio | A-Z Landscaping",
    about: "Our Story | A-Z Landscaping",
    area: "Service Area | A-Z Landscaping",
    apparel: "Apparel | A-Z Landscaping",
    contact: "Request a Quote | A-Z Landscaping",
  };
  const views = document.querySelectorAll("[data-view]");
  const tabLinks = document.querySelectorAll("[data-tab]");
  const track = document.querySelector(".tabs-track");
  const call = document.querySelector(".mobile-call");
  let page = "home";

  const updateCall = () => {
    // Hidden on the quote page so it never covers the form
    if (call) call.classList.toggle("show", page !== "contact" && (page !== "home" || window.scrollY > 520));
  };

  // Work out which page a link points to. A link can also point to a spot
  // inside a page (e.g. #wildfire opens Services and scrolls to that part).
  const resolve = (name) => {
    if (PAGES[name]) return { page: name, target: null };
    const el = name && document.getElementById(name);
    const view = el && el.closest("[data-view]");
    if (view) return { page: view.dataset.view, target: el };
    return null;
  };

  const show = (name) => {
    const r = resolve(name) || { page: "home", target: null };
    page = r.page;
    views.forEach((v) => { v.hidden = v.dataset.view !== page; });
    tabLinks.forEach((a) => a.classList.toggle("active", a.dataset.tab === page));
    document.title = PAGES[page];
    const tab = track && track.querySelector(`[data-tab="${page}"]`);
    if (tab && track.scrollWidth > track.clientWidth) {
      track.scrollTo({ left: tab.offsetLeft - (track.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
    }
    if (r.target) r.target.scrollIntoView();
    else window.scrollTo(0, 0);
    updateCall();
  };

  const fromHash = () => (location.hash || "#home").slice(1);

  // Clicking any in-site link switches pages without jumping down the page
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const name = link.getAttribute("href").slice(1);
    if (!resolve(name)) return;
    e.preventDefault();
    if (location.hash !== "#" + name) history.pushState(null, "", "#" + name);
    show(name);
  });
  window.addEventListener("popstate", () => show(fromHash()));
  window.addEventListener("hashchange", () => show(fromHash()));
  window.addEventListener("scroll", updateCall, { passive: true });
  show(fromHash());

  // Featured video: plays (muted) only while it's on screen, with pause and sound buttons
  const video = document.getElementById("crew-video");
  if (video) {
    const playBtn = document.querySelector('.vbtn[data-action="play"]');
    const soundBtn = document.querySelector('.vbtn[data-action="sound"]');
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let userPaused = reduceMotion;
    const syncPlay = () => {
      playBtn.classList.toggle("is-paused", video.paused);
      playBtn.setAttribute("aria-label", video.paused ? "Play video" : "Pause video");
    };
    video.addEventListener("play", syncPlay);
    video.addEventListener("pause", syncPlay);
    syncPlay();
    playBtn.addEventListener("click", () => {
      if (video.paused) { userPaused = false; video.play().catch(() => {}); }
      else { userPaused = true; video.pause(); }
    });
    soundBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      if (!video.muted && video.paused) { userPaused = false; video.play().catch(() => {}); }
      soundBtn.classList.toggle("is-on", !video.muted);
      soundBtn.setAttribute("aria-label", video.muted ? "Turn sound on" : "Turn sound off");
      soundBtn.querySelector(".vbtn-label").textContent = video.muted ? "Sound on" : "Sound off";
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !userPaused) video.play().catch(() => {});
          else if (!e.isIntersecting) video.pause();
        });
      }, { threshold: 0.35 }).observe(video);
    }
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Portfolio
  const grid = document.getElementById("work-grid");
  if (grid) {
    PROJECTS.forEach((p) => {
      const before = `assets/work/${p.slug}-before.webp`;
      const after = `assets/work/${p.slug}-after.webp`;
      const card = document.createElement("article");
      card.className = "project";

      const frame = document.createElement("div");
      frame.className = `ba ba-${p.mode}`;
      if (p.mode === "photo") {
        // Single finished-work photo: no slider, no Before/After labels
        frame.innerHTML = `<img class="ba-after" src="assets/work/${p.slug}.webp" alt="${p.alt || p.title}" width="600" height="800" loading="lazy">`;
      } else {
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
      }

      const body = document.createElement("div");
      body.className = "project-body";
      body.innerHTML = `<h3>${p.title}</h3><p>${p.text}</p>`;

      card.append(frame, body);
      grid.appendChild(card);
    });

  }

  // Quote form: send people to the thank-you page on this same site after submitting
  // Combine all ticked services into one line so the email lists every one of them
  const form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", () => {
      const boxes = form.querySelectorAll('input[type="checkbox"][name="services"]');
      const picked = [...boxes].filter((b) => b.checked).map((b) => b.value);
      form.querySelector('input[name="Services requested"]').value = picked.join(", ") || "Not specified";
      boxes.forEach((b) => b.removeAttribute("name"));
    });
  }

  document.querySelectorAll('form input[name="_next"]').forEach((next) => {
    next.value = new URL("thanks.html", window.location.href).href;
  });
})();
