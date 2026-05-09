
const dashboardSections = document.querySelectorAll(
  '.stat-card, .dashboard-section'
);

dashboardSections.forEach(function(section) {
  section.style.opacity = '0';
  section.style.transform = 'translateY(25px)';
  section.style.transition = 'all 0.6s ease';
});

window.addEventListener('load', function() {
  dashboardSections.forEach(function(section, index) {
    setTimeout(function() {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, index * 120);
  });
});


const actionLinks = document.querySelectorAll('.action-list a');

actionLinks.forEach(function(link) {
  link.addEventListener('click', function(event) {
    const pageName = link.textContent.trim();
    console.log('Opening:', pageName);
  });
});


/* =========================
   LOGOUT CONFIRMATION
========================= */

const logoutBtn = document.querySelector('.logout-btn');

if (logoutBtn) {

  logoutBtn.addEventListener('click', function(event) {

    const confirmLogout = window.confirm('Are you sure you want to logout?');

    if (confirmLogout === false) {
      event.preventDefault();
    }

  });

}


const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(function(link) {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

