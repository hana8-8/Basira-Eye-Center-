
/* =========================
   FADE-IN ANIMATION
========================= */

const aboutSections = document.querySelectorAll('.about-section');

const observer = new IntersectionObserver(function(entries) {

  entries.forEach(function(entry) {

    if (entry.isIntersecting) {

      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';

    }

  });

}, {
  threshold: 0.2
});


aboutSections.forEach(function(section) {

  section.style.opacity = '0';
  section.style.transform = 'translateY(40px)';
  section.style.transition = 'all 0.7s ease';

  observer.observe(section);

});


/* =========================
   NAVBAR SHADOW ON SCROLL
========================= */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {

  if (window.scrollY > 40) {

    navbar.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';

  }

  else {

    navbar.style.boxShadow = 'none';

  }

});


/* =========================
   ACTIVE NAV LINK
========================= */

const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(function(link) {

  if (link.href === window.location.href) {

    link.classList.add('active');

  }

});


/* =========================
   SIMPLE WELCOME MESSAGE
========================= */

window.addEventListener('load', function() {

  console.log('About Page Loaded');

});


/* =========================
   FOOTER SOCIAL BUTTON EFFECT
========================= */

const socialButtons = document.querySelectorAll('.social-btn');

socialButtons.forEach(function(button) {

  button.addEventListener('mouseenter', function() {

    button.style.transform = 'translateY(-3px) scale(1.05)';

  });

  button.addEventListener('mouseleave', function() {

    button.style.transform = 'translateY(0) scale(1)';

  });

});


/* =========================
   OPEN STATUS CHECK
========================= */

const openNow = document.querySelector('.footer-open-now span:last-child');

if (openNow) {

  const currentHour = new Date().getHours();

  if (currentHour >= 9 && currentHour < 18) {

    openNow.textContent = 'Open Now';

  }

  else {

    openNow.textContent = 'Currently Closed';

  }

}