/*
=======================================================
  patient-portal.js — Basira Eye Center
=======================================================

  This file handles:
  1. Cancel appointment button — shows a confirmation
  2. Download buttons — shows a "coming soon" toast message
  3. Scroll animations for the features section

  global.js already handles the navbar, hamburger, eye dots.
=======================================================
*/


/* ======================================================
   1. CANCEL APPOINTMENT BUTTONS
   ======================================================
   Each appointment row has a small X button.
   When clicked, we ask the user to confirm,
   then visually remove the row from the page.

   TEACHER NOTE:
   On a real site, clicking cancel would also send a
   request to the backend server to delete the appointment
   from the database. Here we only do the visual part.
====================================================== */

/*
  document.querySelectorAll('.appt-cancel-btn') finds ALL
  cancel buttons at once and returns them as a list.
  .forEach() then loops through each one and adds a click listener.
*/
document.querySelectorAll('.appt-cancel-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {

    /*
      .closest('.appt-row') walks UP the HTML tree from the button
      until it finds a parent element with class "appt-row".
      This gives us the whole row that contains this button,
      so we can remove the entire row, not just the button.
    */
    const row = btn.closest('.appt-row');

    /*
      window.confirm() shows a browser popup asking the user to confirm.
      It returns true if they click OK, false if they click Cancel.
    */
    const confirmed = window.confirm('Cancel this appointment?');

    if (confirmed) {
      /*
        We animate the row fading out before removing it.
        1. Add the fade-out CSS (opacity → 0, height → 0)
        2. After 400ms (when animation finishes), remove the element from DOM
      */
      row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      row.style.opacity = '0';
      row.style.transform = 'translateX(20px)';

      setTimeout(function() {
        row.remove();
        showToast('Appointment cancelled successfully.', 'teal');
      }, 350);
    }
  });
});


/* ======================================================
   2. DOWNLOAD BUTTONS
   ======================================================
   Both the record download buttons and the prescription
   download button show a friendly message because the
   real files don't exist yet.
   TODO: BACKEND — replace showToast with actual download logic.
====================================================== */

/* Medical record download buttons */
document.querySelectorAll('.record-download-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const recordName = btn.closest('.record-row')
                          .querySelector('.record-name').textContent;
    showToast('📄 Downloading: ' + recordName + ' — PDF will be available soon!', 'teal');
  });
});

/* Prescription download button */
const prescriptionBtn = document.querySelector('.prescription-download-btn');
if (prescriptionBtn) {
  prescriptionBtn.addEventListener('click', function() {
    showToast('📄 Downloading your prescription PDF — coming soon!', 'teal');
  });
}


/* ======================================================
   3. TOAST NOTIFICATION HELPER
   ======================================================
   A "toast" is the small notification that pops up at the
   bottom of the screen and disappears after a few seconds.
   It's called a "toast" because it pops up like toast! 🍞

   TEACHER NOTE:
   This is a reusable FUNCTION. We define it once and call it
   from multiple places in the code above.
   Parameters:
   - message: the text to show
   - type: 'teal' or 'orange' (controls the color)
====================================================== */

function showToast(message, type) {
  /* Create the toast element */
  const toast = document.createElement('div');
  toast.textContent = message;

  /* Base styles */
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    padding: 14px 28px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
    z-index: 9999;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    font-family: 'DM Sans', sans-serif;
    max-width: 90%;
    text-align: center;
  `;

  /* Color based on type */
  if (type === 'orange') {
    toast.style.background = '#E8852A';
    toast.style.color = 'white';
  } else {
    toast.style.background = '#0D5C63';
    toast.style.color = 'white';
  }

  document.body.appendChild(toast);

  /*
    We use setTimeout with 10ms to let the browser "see" the
    element before we animate it. Without this tiny delay,
    the browser might skip the animation.
  */
  setTimeout(function() {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  }, 10);

  /* Auto-remove after 3 seconds */
  setTimeout(function() {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(function() { toast.remove(); }, 300);
  }, 3000);
}


/* ======================================================
   4. SCROLL ANIMATIONS for feature cards
====================================================== */
const featureCards = document.querySelectorAll('.portal-feature-card, .portal-stat-card');

featureCards.forEach(function(card, index) {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  card.style.transitionDelay = (index * 0.07) + 's';
});

const featureObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      featureObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

featureCards.forEach(function(card) {
  featureObserver.observe(card);
});


/* ======================================================
   TEACHER NOTE — What to build next in patient-portal.js:
   ======================================================
   When your backend is ready, this file will need:

   1. LOGIN CHECK — at the very top of this file:
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        window.location.href = 'login.html';  ← redirect if not logged in
      }

   2. LOAD REAL DATA — fetch from your API:
      fetch('/api/appointments?userId=' + user.id)
        .then(res => res.json())
        .then(appointments => {
          // loop through and create HTML for each one
          appointments.forEach(appt => {
            const row = document.createElement('div');
            row.className = 'appt-row';
            // ... build the row
            appointmentsList.appendChild(row);
          });
        });

   3. REAL CANCEL — send DELETE request to server:
      fetch('/api/appointments/' + apptId, { method: 'DELETE' })
        .then(res => { if(res.ok) { ... remove from page ... } });
====================================================== */
