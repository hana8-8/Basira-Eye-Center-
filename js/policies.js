const sections = document.querySelectorAll(".policy-section");
const tocLinks = document.querySelectorAll(".toc-link");

// makes toc link 'active' for visible section
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
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  },
);

// Watch each section
sections.forEach(function (section) {
  tocObserver.observe(section);
});

// scrolls to target toc link section
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

// scrolling animation
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
