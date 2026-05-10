/*========================================

Handles:
1. Form validation
2. Button clicks
3. Notifications
4. Animations
========================================*/


/* =========================
   1. CONTACT FORM
========================= */

function sendContact() {
  var nameVal  = document.getElementById('name').value;
  var emailVal = document.getElementById('email').value;

  if (nameVal === '' || emailVal === '') {
    showMessage('Please fill all fields');
    return;
  }

  window.location.href = 'contact_success.html';
}


/* =========================
   2. NOTIFICATION FUNCTION
========================= */

function showMessage(text) {

  const notification = document.createElement('div');

  notification.textContent = text;

  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #0D5C63;
    color: white;
    padding: 14px 24px;
    border-radius: 10px;
    font-size: 14px;
    z-index: 9999;
  `;

  document.body.appendChild(notification);

  setTimeout(function() {

    notification.remove();

  }, 3000);

}


/* =========================
   3. SCROLL ANIMATION
========================= */

const elements = document.querySelectorAll('.fade-item');

elements.forEach(function(element) {

  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = '0.5s';

});

const observer = new IntersectionObserver(function(entries) {

  entries.forEach(function(entry) {

    if (entry.isIntersecting) {

      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';

    }

  });

});

elements.forEach(function(element) {

  observer.observe(element);

});