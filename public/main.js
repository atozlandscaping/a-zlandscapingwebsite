// A-Z Landscaping — small site scripts

// ----------------------------------------------------------
// PROJECT PHOTOS
// Drop photos into public/assets/gallery/ and list them here.
// The "Recent work" section stays hidden until this list has at least one photo.
// Example:
//   { src: "assets/gallery/flagstone-patio-frisco.jpg", caption: "Flagstone patio — Frisco" },
// ----------------------------------------------------------
const GALLERY = [
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

  // Gallery
  const section = document.getElementById("work");
  const grid = document.getElementById("gallery");
  if (section && grid && GALLERY.length) {
    GALLERY.forEach(({ src, caption }) => {
      const fig = document.createElement("figure");
      const img = document.createElement("img");
      img.src = src;
      img.alt = caption || "A-Z Landscaping project";
      img.loading = "lazy";
      fig.appendChild(img);
      if (caption) {
        const cap = document.createElement("figcaption");
        cap.textContent = caption;
        fig.appendChild(cap);
      }
      grid.appendChild(fig);
    });
    section.hidden = false;
  }

  // Quote form: send people to the thank-you page on this same site after submitting
  const next = document.querySelector('.quote-form input[name="_next"]');
  if (next) next.value = new URL("thanks.html", window.location.href).href;
})();
