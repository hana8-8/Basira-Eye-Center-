/* Doctors should never land on the patient portal */
(function () {
  const raw  = localStorage.getItem('basiraUser');
  const user = raw ? JSON.parse(raw) : null;
  if (user && user.role === 'doctor') {
    window.location.href = 'doctor-dashboard.html';
  }
})();

document.querySelectorAll('.appt-cancel-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const row = btn.closest('.appt-row');
    const confirmed = window.confirm('Cancel this appointment?');

    if (confirmed) {
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

document.querySelectorAll('.record-download-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const recordName = btn.closest('.record-row')
                          .querySelector('.record-name').textContent;
    showToast('📄 Downloading: ' + recordName + ' — PDF will be available soon!', 'teal');
  });
});


const prescriptionBtn = document.querySelector('.prescription-download-btn');
if (prescriptionBtn) {
  prescriptionBtn.addEventListener('click', function() {
    showToast('📄 Downloading your prescription PDF — coming soon!', 'teal');
  });
}



function showToast(message, type) {
  const toast = document.createElement('div');
  toast.textContent = message;

  
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


  if (type === 'orange') {
    toast.style.background = '#E8852A';
    toast.style.color = 'white';
  } else {
    toast.style.background = '#0D5C63';
    toast.style.color = 'white';
  }

  document.body.appendChild(toast);

  setTimeout(function() {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  }, 10);

  setTimeout(function() {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(function() { toast.remove(); }, 300);
  }, 3000);
}


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