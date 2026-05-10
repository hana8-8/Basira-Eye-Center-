/*
=======================================================
  global.js — Basira Eye Center
=======================================================

  TEACHER NOTE:
  This file runs on EVERY page (just like global.css).
  It handles things that every page needs:
    1. Navbar scroll shadow effect
    2. Mobile hamburger menu
    3. Highlight which nav link is the current page

  JavaScript runs AFTER the HTML loads (because we put
  the <script> tags at the bottom of the body).

  Key concepts used here:
  - document.getElementById()  → find one element by id
  - document.querySelector()   → find one element by CSS selector
  - addEventListener()         → listen for events (click, scroll...)
  - classList.add/remove/toggle → add or remove CSS classes
=======================================================
*/


/* ======================================================
   1. NAVBAR SCROLL EFFECT
   ======================================================
   When the user scrolls down, we add the class "scrolled"
   to the navbar. In global.css, .navbar.scrolled has a
   box-shadow, so scrolling adds a shadow automatically.
====================================================== */

const navbar = document.getElementById('navbar');

/*
  TEACHER NOTE:
  window.addEventListener('scroll', ...) runs the function
  inside every time the user scrolls.
  window.scrollY is how many pixels the user has scrolled.
*/
window.addEventListener('scroll', function () {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ======================================================
   2. MOBILE HAMBURGER MENU
   ======================================================
   On small screens, the nav links are hidden.
   When the hamburger button is clicked, we toggle
   the class "open" which makes them visible.
====================================================== */

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

/*
  TEACHER NOTE:
  classList.toggle() is a shortcut:
  - If the class is NOT there, it ADDS it
  - If the class IS there, it REMOVES it
  So clicking the button opens/closes the menu.
*/
if (hamburger && navLinks) {
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  /* Close menu if user clicks any link */
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  /* Close menu if user clicks anywhere outside */
  document.addEventListener('click', function (event) {
    const clickedInsideNav = navbar.contains(event.target);
    if (!clickedInsideNav) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}


/* ======================================================
   3. HIGHLIGHT CURRENT PAGE IN NAVBAR
   ======================================================
   This automatically adds the "active" class to the
   link that matches the current page URL.
   So the user can always see which page they're on.
====================================================== */

/*
  TEACHER NOTE:
  window.location.pathname gives you the current URL path
  For example: "/services.html" or "/about.html"
  We compare this to each link's href to find the match.
*/
const currentPath = window.location.pathname.split('/').pop();

document.querySelectorAll('.nav-links a').forEach(function (link) {
  const linkPath = link.getAttribute('href');
  if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
    link.classList.add('active');
  }
});


/* ======================================================
   4. INJECT REAL EYE SVG INTO EVERY .eye-dot SPAN
   ======================================================
   TEACHER NOTE:
   Instead of drawing the eye with CSS alone (which can only
   make circles and squares), we inject a proper SVG shape.
   An SVG lets us draw the almond/leaf eye outline with
   pointed corners and curved eyelash strokes.

   innerHTML sets the HTML content INSIDE the span.
   We do this for every .eye-dot on the page at once.
====================================================== */
document.querySelectorAll('.eye-dot').forEach(function (dot) {
  /*
    This SVG draws:
    - An almond eye outline using a "path" with curves
    - 5 eyelash lines radiating upward from the top lid
    - An iris circle
    - A pupil circle inside the iris
    - A white shine dot
  */
  dot.innerHTML = `
    <svg width="22" height="14" viewBox="0 0 22 14" xmlns="http://www.w3.org/2000/svg">

      <!-- EYELASHES — short strokes above the lid -->
      <!-- Each line goes from a point ON the top lid curve upward -->
      <line x1="5"  y1="4.5" x2="3.5" y2="1.5"  stroke="#0D5C63" stroke-width="1"   stroke-linecap="round"/>
      <line x1="8"  y1="2.5" x2="7.5" y2="0"    stroke="#0D5C63" stroke-width="1"   stroke-linecap="round"/>
      <line x1="11" y1="2"   x2="11"  y2="0"    stroke="#0D5C63" stroke-width="1.1" stroke-linecap="round"/>
      <line x1="14" y1="2.5" x2="14.5" y2="0"   stroke="#0D5C63" stroke-width="1"   stroke-linecap="round"/>
      <line x1="17" y1="4.5" x2="18.5" y2="1.5" stroke="#0D5C63" stroke-width="1"   stroke-linecap="round"/>

      <!-- EYE OUTLINE — almond/leaf shape with pointed corners -->
      <!--
        M = move to starting point (left corner)
        Q = quadratic curve: Q controlPoint endPoint
        The top curve bows upward, the bottom bows downward.
        This creates the classic eye almond shape.
      -->
      <path
        d="M1,7 Q5.5,2 11,2 Q16.5,2 21,7 Q16.5,12 11,12 Q5.5,12 1,7 Z"
        fill="white"
        stroke="#0D5C63"
        stroke-width="1.2"
        stroke-linejoin="round"
      />

      <!-- IRIS circle -->
      <circle cx="11" cy="7" r="3.2" fill="#0D5C63"/>

      <!-- PUPIL circle -->
      <circle cx="11" cy="7" r="1.6" fill="#07383d"/>

      <!-- SHINE dot -->
      <circle cx="12.5" cy="5.8" r="0.9" fill="white" opacity="0.9"/>

    </svg>
  `;
});



/* ======================================================
   4. SMOOTH SCROLL for anchor links
   ======================================================
   When a link goes to #eye-test, this smoothly scrolls
   to that section instead of jumping instantly.
   (We also have scroll-behavior: smooth in CSS, but
   this JS version has better browser support.)
====================================================== */

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;   /* Skip empty anchors */

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/* ======================================================
   5. AUTH STATE — show/hide navbar buttons based on login
====================================================== */
(function () {
  const raw  = localStorage.getItem('basiraUser');
  const user = raw ? JSON.parse(raw) : null;

  const guestDiv  = document.getElementById('nav-auth-guest');
  const userDiv   = document.getElementById('nav-auth-user');
  const greeting  = document.getElementById('nav-greeting');
  const logoutBtn = document.getElementById('nav-logout-btn');
  const bookBtn   = document.getElementById('nav-book-btn');
  const portalLi  = document.getElementById('nav-portal-li');

  if (user) {
    /* LOGGED IN */
    if (guestDiv)  guestDiv.style.display  = 'none';
    if (userDiv)   userDiv.style.display   = 'flex';
    if (greeting) {greeting.style.display = 'none';}
    if (portalLi)  portalLi.style.display  = 'list-item';
    if (bookBtn)   bookBtn.href             = 'booking.html';

    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('basiraUser');
        window.location.href = 'index.html';
      });
    }

  } else {
    /* NOT LOGGED IN */
    if (guestDiv)  guestDiv.style.display  = 'flex';
    if (userDiv)   userDiv.style.display   = 'none';
    if (portalLi)  portalLi.style.display  = 'none';

    if (bookBtn) {
      bookBtn.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.setItem('basiraRedirect', 'booking.html');
        window.location.href = 'login.html';
      });
    }
  }
})();