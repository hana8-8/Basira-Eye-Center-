/*
=======================================================
  home.js — Basira Eye Center Homepage
=======================================================

  TEACHER NOTE:
  This file ONLY runs on the home page (index.html).
  It handles:
    1. Drawing the Ishihara color dots (Card 2)
    2. Drawing the astigmatism wheel (Card 3)
    3. Download functionality for the eye test cards
    4. Scroll animations (elements fade in as you scroll)

  New concepts used:
  - document.createElement()   → create a new HTML element
  - element.appendChild()      → add an element inside another
  - Math.random()              → generate a random number
  - IntersectionObserver       → detect when elements enter the screen
=======================================================
*/


/* ======================================================
   1. DRAW ISHIHARA COLOR DOTS (Card 2)
   ======================================================
   The color vision test card shows a grid of colored dots.
   We generate them with JavaScript so they look random.
====================================================== */

/*
  TEACHER NOTE:
  document.getElementById() finds the element with id="ishiharaDots"
  in your HTML. We then fill it with colored dots using a loop.
*/
const ishiharaContainer = document.getElementById('ishiharaDots');

if (ishiharaContainer) {
  /*
    TEACHER NOTE:
    These are arrays — lists of values inside square brackets [].
    We'll randomly pick colors from this list for each dot.
  */
  const dotColors = [
    '#e84040', '#e87040', '#40a870', '#4070e8', '#a840e8',
    '#e84070', '#70e840', '#40e8a8', '#e8c840', '#40c8e8',
    '#c8e840', '#e89040', '#a8e840', '#8840e8', '#40e870',
    '#e8a840', '#40e840', '#e84088', '#4088e8', '#88e840',
    '#e86040', '#40e8c8', '#c840e8', '#e8e840', '#40a8e8'
  ];

  /*
    TEACHER NOTE:
    A for loop runs a block of code a set number of times.
    for (let i = 0; i < 25; i++) means:
    - Start with i = 0
    - Keep going while i is less than 25
    - Add 1 to i each time (i++)
    So this creates 25 dots total.
  */
  for (let i = 0; i < 25; i++) {
    const dot = document.createElement('div');

    /* Style each dot as a colored circle */
    dot.style.width         = '22px';
    dot.style.height        = '22px';
    dot.style.borderRadius  = '50%';
    dot.style.background    = dotColors[i];

    /* Add small random size variation so it looks natural */
    const sizeVariation = 0.85 + Math.random() * 0.3;
    dot.style.transform = `scale(${sizeVariation})`;

    ishiharaContainer.appendChild(dot);
  }
}


/* ======================================================
   2. DRAW ASTIGMATISM WHEEL (Card 3)
   ======================================================
   We draw lines at different angles using an SVG element
   created entirely with JavaScript.
====================================================== */

/*
  TEACHER NOTE:
  SVG (Scalable Vector Graphics) is like HTML but for drawing.
  We use it to draw lines. The namespace URL is required
  when creating SVG elements with JavaScript — it's just
  how SVG works, you don't need to understand it deeply yet.
*/
const astigContainer = document.getElementById('astigWheel');

if (astigContainer) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg   = document.createElementNS(svgNS, 'svg');

  svg.setAttribute('viewBox', '0 0 150 150');
  svg.setAttribute('width', '140');
  svg.setAttribute('height', '140');

  /* Draw 12 lines at different angles (0° to 165° in 15° steps) */
  for (let angle = 0; angle < 180; angle += 15) {
    const line = document.createElementNS(svgNS, 'line');

    /*
      TEACHER NOTE:
      To draw a line through the center of a circle at any angle,
      we use trigonometry (Math.cos and Math.sin).
      Don't worry about this math now — just know it creates lines
      from the center outward at the angle we specify.
      The * Math.PI / 180 converts degrees to radians (what JS uses).
    */
    const cx = 75, cy = 75, r = 60;
    const radians = (angle * Math.PI) / 180;
    const x1 = cx + r * Math.cos(radians);
    const y1 = cy + r * Math.sin(radians);
    const x2 = cx - r * Math.cos(radians);
    const y2 = cy - r * Math.sin(radians);

    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#0D5C63');
    line.setAttribute('stroke-width', angle % 45 === 0 ? '2.5' : '1.2');
    line.setAttribute('opacity', angle % 45 === 0 ? '0.9' : '0.4');

    svg.appendChild(line);
  }

  /* Add center dot */
  const centerCircle = document.createElementNS(svgNS, 'circle');
  centerCircle.setAttribute('cx', '75');
  centerCircle.setAttribute('cy', '75');
  centerCircle.setAttribute('r', '4');
  centerCircle.setAttribute('fill', '#0D5C63');
  svg.appendChild(centerCircle);

  astigContainer.appendChild(svg);
}


/* ======================================================
   3. EYE TEST CARD DOWNLOAD FUNCTIONALITY
   ======================================================
   When a user clicks a test card, it triggers a download.
   For now this shows a friendly message — your team will
   replace the alert with a real PDF download later.
====================================================== */

/*
  TEACHER NOTE:
  document.querySelectorAll() returns ALL elements matching
  the CSS selector — in this case all elements with class "test-card".
  .forEach() then runs a function on each one.
*/
document.querySelectorAll('.test-card').forEach(function (card) {
  card.addEventListener('click', function () {
    /*
      TEACHER NOTE:
      card.dataset.file reads the data-file attribute from the HTML.
      card.dataset.name reads the data-name attribute.
      We set these in the HTML like: data-file="assets/pdfs/snellen.pdf"
    */
    const fileName = card.dataset.file;
    const testName = card.dataset.name;

    /*
      TODO (for your team — Hana):
      When the PDF files are ready, replace this block with:

      const link = document.createElement('a');
      link.href     = fileName;
      link.download = testName + '.pdf';
      link.click();

      For now we just show a message so you can test the click works.
    */
    showDownloadMessage(testName);
  });
});

/*
  TEACHER NOTE:
  This is a custom function we wrote. In JavaScript you can create
  your own functions with the "function" keyword.
  A function is like a reusable recipe — define it once, use it many times.
*/
function showDownloadMessage(testName) {
  /* Create a notification element */
  const notification = document.createElement('div');

  notification.textContent = '📥 Downloading: ' + testName + ' — PDF will be available soon!';

  /* Style it */
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: #0D5C63;
    color: white;
    padding: 14px 28px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
    z-index: 9999;
    box-shadow: 0 8px 24px rgba(13,92,99,0.3);
    animation: slideUp 0.3s ease;
    font-family: 'DM Sans', sans-serif;
  `;

  /* Add animation keyframe */
  if (!document.getElementById('notifStyle')) {
    const style = document.createElement('style');
    style.id = 'notifStyle';
    style.textContent = `
      @keyframes slideUp {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  /* Add to page */
  document.body.appendChild(notification);

  /*
    TEACHER NOTE:
    setTimeout() runs a function after a delay (in milliseconds).
    3000 milliseconds = 3 seconds.
    After 3 seconds, we remove the notification from the page.
  */
  setTimeout(function () {
    notification.style.opacity    = '0';
    notification.style.transition = 'opacity 0.3s ease';
    setTimeout(function () {
      notification.remove();
    }, 300);
  }, 3000);
}


/* ======================================================
   4. SCROLL ANIMATIONS
   ======================================================
   Elements fade in from below as the user scrolls to them.
   This uses IntersectionObserver — a modern browser feature
   that tells you when an element enters the screen.
====================================================== */

/*
  TEACHER NOTE:
  First we select all the elements we want to animate.
  Then we add the CSS class "hidden" to them — this makes
  them invisible and shifted down.
  When they enter the screen, we remove "hidden" and the
  CSS transition makes them fade in smoothly.
*/

/* Add fade-in styles */
const animStyle = document.createElement('style');
animStyle.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(animStyle);

/* Apply to elements we want to animate */
const animatedElements = document.querySelectorAll('.test-card, .stat-item, .quick-link, .trust-item');
animatedElements.forEach(function (el, index) {
  el.classList.add('fade-in');
  /* Stagger the delay so they don't all appear at once */
  el.style.transitionDelay = (index * 0.08) + 's';
});

/* Create the observer */
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        /*
          TEACHER NOTE:
          entry.isIntersecting is true when the element
          is visible on the screen. We add "visible"
          which triggers the CSS animation.
        */
        entry.target.classList.add('visible');
        /* Stop observing after it's been shown once */
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,   /* Trigger when 10% of the element is visible */
    rootMargin: '0px 0px -40px 0px'   /* Trigger a bit before it's fully visible */
  }
);

/* Tell the observer to watch each element */
animatedElements.forEach(function (el) {
  observer.observe(el);
});


/* ======================================================
   TEACHER NOTE — What to add to home.js later:
   ======================================================
   - A live appointment booking form
   - A services carousel/slider
   - A "Latest News" section populated from an API
   - A map showing clinic location
====================================================== */