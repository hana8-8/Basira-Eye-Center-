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
   TEACHER NOTE — What to build next in global.js:
   ======================================================
   When you add the backend later, this file is also
   where you'll add:
   - Check if user is logged in (read from localStorage)
   - Show "Welcome, [Name]" in navbar if logged in
   - Show/hide Patient Portal link based on login status
====================================================== */