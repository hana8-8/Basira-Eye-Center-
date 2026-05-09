/*
=======================================================
  policies.js — Basira Eye Center
=======================================================
  Handles 2 features:
  1. Active TOC highlight — highlights which section
     the user is currently reading as they scroll
  2. Scroll animations — sections fade in on scroll
=======================================================
*/

/* ======================================================
   1. ACTIVE TABLE OF CONTENTS HIGHLIGHT
   ======================================================
   As the user scrolls, we watch which policy section
   is currently visible and highlight its TOC link.

   HOW IT WORKS:
   - We use IntersectionObserver to watch all sections
   - When a section enters the viewport, we find its
     matching TOC link and mark it as "active"
   - We remove "active" from all other links first
====================================================== */

const sections = document.querySelectorAll(".policy-section");
const tocLinks = document.querySelectorAll(".toc-link");

/*
  IntersectionObserver watches elements on the page.
  When a section becomes visible (enters the viewport),
  we update the active TOC link.
*/
const tocObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Get the section's id
        const id = entry.target.getAttribute("id");

        // Remove active from all TOC links
        tocLinks.forEach(function (link) {
          link.classList.remove("active");
        });

        // Add active to the matching TOC link
        const matchingLink = document.querySelector(`.toc-link[href="#${id}"]`);
        if (matchingLink) {
          matchingLink.classList.add("active");
        }
      }
    });
  },
  {
    /*
      rootMargin shifts the trigger zone.
      '-20% 0px -70% 0px' means:
      - Top trigger: 20% down from top of viewport
      - Bottom trigger: 70% up from bottom of viewport
      So the section is "active" when it's in the
      middle-ish zone of the screen.
    */
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  },
);

// Watch each section
sections.forEach(function (section) {
  tocObserver.observe(section);
});

/* ======================================================
   2. SMOOTH SCROLL for TOC links
   ======================================================
   When clicking a TOC link, scroll smoothly to
   that section with an offset for the sticky navbar.
====================================================== */

tocLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const navbarHeight = 70;
      const extraOffset = 20;
      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        extraOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

/* ======================================================
   3. SCROLL ANIMATIONS
   ======================================================
   Policy sections fade in as user scrolls to them.
   Same IntersectionObserver pattern used in services.js.
====================================================== */

const animatableElements = document.querySelectorAll(".policy-section");

animatableElements.forEach(function (el, index) {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  el.style.transitionDelay = "0s"; // no stagger for sections (too spread out)
});

const scrollObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
);

animatableElements.forEach(function (el) {
  scrollObserver.observe(el);
});
