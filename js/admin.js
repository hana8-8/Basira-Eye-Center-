
/* =========================
   DASHBOARD CARD ANIMATION
========================= */

const dashboardCards = document.querySelectorAll('.dashboard-card');

dashboardCards.forEach(function(card) {

  card.addEventListener('mouseenter', function() {

    card.style.transform = 'translateY(-6px)';

  });

  card.addEventListener('mouseleave', function() {

    card.style.transform = 'translateY(0)';

  });

});


/* =========================
   STAT COUNTER ANIMATION
========================= */

const statNumbers = document.querySelectorAll('.stat-card p');

statNumbers.forEach(function(stat) {

  const finalValue = parseInt(stat.textContent);

  let currentValue = 0;

  const speed = Math.ceil(finalValue / 40);

  const counter = setInterval(function() {

    currentValue += speed;

    if (currentValue >= finalValue) {

      stat.textContent = finalValue;

      clearInterval(counter);

    }

    else {

      stat.textContent = currentValue;

    }

  }, 30);

});


/* =========================
   LOGOUT BUTTON
========================= */

const logoutBtn = document.querySelector('.logout-btn');

if (logoutBtn) {

  logoutBtn.addEventListener('click', function(event) {

    const confirmLogout = confirm('Are you sure you want to logout?');

    if (!confirmLogout) {

      event.preventDefault();

    }

  });

}


/* =========================
   WELCOME MESSAGE
========================= */

window.addEventListener('load', function() {

  console.log('Admin Dashboard Loaded Successfully');

});


/* =========================
   SIMPLE NOTIFICATION
========================= */

function showNotification(message) {

  const notification = document.createElement('div');

  notification.textContent = message;

  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';

  notification.style.background = '#0D5C63';
  notification.style.color = 'white';

  notification.style.padding = '14px 22px';

  notification.style.borderRadius = '12px';

  notification.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';

  notification.style.zIndex = '9999';

  document.body.appendChild(notification);

  setTimeout(function() {

    notification.remove();

  }, 3000);

}

