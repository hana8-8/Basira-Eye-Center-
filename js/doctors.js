

function toggleDoctor(cardId) {
  const allCards = document.querySelectorAll('.doctor-card');
  const clickedCard = document.getElementById(cardId);

  allCards.forEach(function (card) {
    if (card !== clickedCard) {
      /*
        Close all other cards.
        classList.remove() does nothing if the class isn't there
        so this is safe to run on every card.
      */
      card.classList.remove('expanded');
    }
  });

  /* Toggle the clicked card open or closed */
  clickedCard.classList.toggle('expanded');

  /*
    Smooth scroll so the expanded card is in view.
    We wait a tiny moment (100ms) to let the CSS animation start first.
  */
  setTimeout(function () {
    if (clickedCard.classList.contains('expanded')) {
      clickedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);
}



document.addEventListener('click', function (e) {
  /*
    e.target is the element that was actually clicked.
    .closest() walks up the DOM tree to find the nearest
    parent matching the selector — here we check if the
    clicked element is inside a .time-slots container.
  */
  if (e.target.classList.contains('time-slot')) {
    const clickedSlot = e.target;

    /*
      Find the parent .day-col so we only deselect
      slots in the SAME column, not all columns.
    */
    const parentCol = clickedSlot.closest('.day-col');
    if (!parentCol) return;

    /* Remove selected from all slots in this column */
    parentCol.querySelectorAll('.time-slot').forEach(function (slot) {
      slot.classList.remove('selected');
    });

    /* Add selected to clicked slot */
    clickedSlot.classList.add('selected');
  }
});



document.addEventListener('click', function (e) {
  if (e.target.classList.contains('book-btn') && !e.target.disabled) {

    /* Find which doctor card this button is inside */
    const card = e.target.closest('.doctor-card');
    const doctorName = card ? card.querySelector('.doctor-name').textContent : 'the doctor';

    /* Find the selected time slot in the same day column */
    const dayCol = e.target.closest('.day-col');
    const selectedSlot = dayCol ? dayCol.querySelector('.time-slot.selected') : null;
    const selectedTime = selectedSlot ? selectedSlot.textContent : 'your chosen time';

    /* Show confirmation toast notification */
    showBookingToast(doctorName, selectedTime);
  }
});

function showBookingToast(doctorName, time) {
  /* Remove any existing toast first */
  const existing = document.getElementById('bookingToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'bookingToast';
  toast.innerHTML = `
    <i class="ti ti-circle-check" style="font-size:20px;color:#A8C5A0;flex-shrink:0;"></i>
    <div>
      <strong style="display:block;margin-bottom:2px;">Appointment Request Sent</strong>
      <span style="font-size:12px;opacity:0.85;">Dr. ${doctorName} · ${time}</span>
    </div>
  `;

  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    background: #0D5C63;
    color: white;
    padding: 14px 24px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 8px 32px rgba(13,92,99,0.35);
    font-family: 'DM Sans', sans-serif;
    animation: toastIn 0.35s ease;
    white-space: nowrap;
  `;

  /* Add animation */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastIn {
      from { opacity:0; transform: translateX(-50%) translateY(16px); }
      to   { opacity:1; transform: translateX(-50%) translateY(0); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);

  /* Auto-remove after 4 seconds */
  setTimeout(function () {
    toast.style.transition = 'opacity 0.3s ease';
    toast.style.opacity = '0';
    setTimeout(function () { toast.remove(); }, 300);
  }, 4000);
}