/* Find all the elements we want to animate.
  document.querySelectorAll() returns a list of ALL elements
  that match the CSS selector inside the quotes.*/
const animatableElements = document.querySelectorAll(
  '.service-card, .process-step, .intro-stat'
);

/* Add the "animate-hidden" class to each element.
  .forEach() runs the function once for EACH item in the list.
  el = the current element being processed.
  index = its position in the list (0, 1, 2, 3...)
*/
animatableElements.forEach(function(el, index) {
  el.classList.add('animate-hidden');
  el.style.transitionDelay = (index * 0.08) + 's';
});


/*Create the IntersectionObserver.
  This is a browser feature that watches elements and tells
  you when they enter or leave the visible area of the screen.
*/
const scrollObserver = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('animate-hidden');
        entry.target.classList.add('animate-visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -20px 0px'
  }
);

animatableElements.forEach(function(el) {
  scrollObserver.observe(el);
});
