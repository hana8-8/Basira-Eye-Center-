/*
=======================================================
  services.js — Basira Eye Center Services Page
=======================================================

  TEACHER NOTE:
  This file handles the JavaScript for services.html ONLY.
  It does two things:
    1. Scroll animations — cards fade in as you scroll
    2. Active filter highlight — when you click a category
       filter button, the matching cards get highlighted

  global.js already handles:
    - Navbar shadow on scroll
    - Hamburger menu
    - Highlighting active nav link
  So we DON'T repeat those here.
=======================================================
*/


/* ======================================================
   1. SCROLL ANIMATIONS
   ======================================================
   We want each service card to start invisible (opacity 0,
   shifted down) and smoothly appear when the user scrolls to it.

   HOW IT WORKS:
   Step 1 — We find all elements we want to animate
   Step 2 — We add the class "animate-hidden" to each one
             (CSS in services.css makes hidden elements invisible)
   Step 3 — We create an IntersectionObserver that watches
             each element. When it enters the screen,
             we swap "animate-hidden" for "animate-visible"
             (CSS then transitions the element into view)
====================================================== */

/*
  STEP 1: Find all the elements we want to animate.
  document.querySelectorAll() returns a list of ALL elements
  that match the CSS selector inside the quotes.

  We're selecting:
  - .service-card     → all the service cards
  - .process-step     → all the "How it works" steps
  - .intro-stat       → the big number stats
*/
const animatableElements = document.querySelectorAll(
  '.service-card, .process-step, .intro-stat'
);

/*
  STEP 2: Add the "animate-hidden" class to each element.
  .forEach() runs the function once for EACH item in the list.
  el = the current element being processed.
  index = its position in the list (0, 1, 2, 3...)
*/
animatableElements.forEach(function(el, index) {
  el.classList.add('animate-hidden');

  /*
    STAGGER EFFECT:
    Instead of all cards appearing at the same time,
    we delay each one slightly more than the previous.
    index * 0.08 means:
    - Card 0: delay 0s    (appears immediately)
    - Card 1: delay 0.08s (appears a little later)
    - Card 2: delay 0.16s (appears a little later still)
    This creates a nice "cascade" or "waterfall" effect.
  */
  el.style.transitionDelay = (index * 0.08) + 's';
});


/*
  STEP 3: Create the IntersectionObserver.
  This is a browser feature that watches elements and tells
  you when they enter or leave the visible area of the screen.
*/
const scrollObserver = new IntersectionObserver(
  function(entries) {
    /*
      entries is the list of elements being observed.
      We loop through each one.
    */
    entries.forEach(function(entry) {
      /*
        entry.isIntersecting = true means the element is now visible on screen.
        When that happens, we:
        1. Remove "animate-hidden" (removes the invisible/shifted state)
        2. Add "animate-visible" (the CSS transitions it to fully visible)
      */
      if (entry.isIntersecting) {
        entry.target.classList.remove('animate-hidden');
        entry.target.classList.add('animate-visible');

        /*
          Stop watching this element after it has appeared once.
          No point continuing to watch it — it's already visible.
          This saves browser memory and processing power.
        */
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  {
    /*
      OPTIONS for the observer:
      threshold: 0.12 means "trigger when 12% of the element is visible"
      rootMargin: '-20px' shifts the trigger point slightly inward
                  so the animation starts just as the element appears
    */
    threshold: 0.12,
    rootMargin: '0px 0px -20px 0px'
  }
);

/*
  Tell the observer to WATCH each element.
  Now it will call our function above whenever any of them appear.
*/
animatableElements.forEach(function(el) {
  scrollObserver.observe(el);
});


/* ======================================================
   TEACHER NOTE — What you can add to services.js later:
   ======================================================

   FEATURE IDEA 1 — Filter cards by category:
   You already added data-category attributes to each card
   in the HTML. You could add filter buttons:
     <button data-filter="surgery">Surgery Only</button>
   And then in JS:
     - When button is clicked, hide cards that don't match
     - Show only cards where card.dataset.category === filter

   FEATURE IDEA 2 — Search:
   Add a text input at the top of the services section.
   As the user types, hide cards whose title doesn't include
   the typed text. Use .includes() to check this.

   FEATURE IDEA 3 — Expand card details:
   When a card is clicked, show more detailed information
   in a popup (called a "modal"). The global.css has
   modal-ready styles that your team can use.

   These are intermediate JavaScript tasks — perfect for
   after you finish all the pages!
====================================================== */
