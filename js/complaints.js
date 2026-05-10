
/* =========================
   COMPLAINT FORM SUBMISSION
========================= */

const complaintForm = document.querySelector('.complaint-form');

if (complaintForm) {

  complaintForm.addEventListener('submit', function(event) {

    event.preventDefault();

    window.location.href = 'complaint_success.html';

  });

}


/* =========================
   SUCCESS MESSAGE
========================= */

function showSuccessMessage() {

  let successBox = document.querySelector('.success-message');

  if (!successBox) {

    successBox = document.createElement('div');

    successBox.classList.add('success-message');

    successBox.textContent =
      'Your complaint has been submitted successfully.';

    document
      .querySelector('.complaints-container')
      .appendChild(successBox);

  }

  successBox.style.display = 'block';

  successBox.style.opacity = '0';

  setTimeout(function() {

    successBox.style.opacity = '1';

  }, 50);


  setTimeout(function() {

    successBox.style.opacity = '0';

    setTimeout(function() {

      successBox.style.display = 'none';

    }, 400);

  }, 4000);

}


/* =========================
   PAGE FADE-IN ANIMATION
========================= */

const complaintsContainer =
  document.querySelector('.complaints-container');

if (complaintsContainer) {

  complaintsContainer.style.opacity = '0';

  complaintsContainer.style.transform = 'translateY(30px)';

  complaintsContainer.style.transition =
    'all 0.7s ease';

  window.addEventListener('load', function() {

    complaintsContainer.style.opacity = '1';

    complaintsContainer.style.transform =
      'translateY(0)';

  });

}


/* =========================
   FAQ CARD HOVER EFFECT
========================= */

const faqCards = document.querySelectorAll('.faq-card');

faqCards.forEach(function(card) {

  card.addEventListener('mouseenter', function() {

    card.style.transform = 'translateY(-6px)';

  });

  card.addEventListener('mouseleave', function() {

    card.style.transform = 'translateY(0)';

  });

});


/* =========================
   OPEN / CLOSED STATUS
========================= */

const openNow =
  document.querySelector('.footer-open-now span:last-child');

if (openNow) {

  const currentHour = new Date().getHours();

  if (currentHour >= 9 && currentHour < 18) {

    openNow.textContent = 'Open Now';

  }

  else {

    openNow.textContent = 'Currently Closed';

  }

}


/* =========================
   CONSOLE MESSAGE
========================= */

window.addEventListener('load', function() {

  console.log('Complaints page loaded successfully.');

});