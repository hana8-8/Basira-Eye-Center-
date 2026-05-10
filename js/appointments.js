const searchInput = document.querySelector('.search-input');
const statusFilter = document.querySelector('.status-filter');
const appointmentRows = document.querySelectorAll('.appointments-table tbody tr');

function filterAppointments() {
  const searchText = searchInput.value.toLowerCase();
  const selectedStatus = statusFilter.value.toLowerCase();

  appointmentRows.forEach(function(row) {
    const patient = row.children[0].textContent.toLowerCase();
    const doctor = row.children[1].textContent.toLowerCase();
    const status = row.children[5].textContent.toLowerCase();

    const matchesSearch =
      patient.includes(searchText) || doctor.includes(searchText);

    const matchesStatus =
      selectedStatus === 'all status' || status === selectedStatus;

    row.style.display = matchesSearch && matchesStatus ? '' : 'none';
  });
}

if (searchInput && statusFilter) {
  searchInput.addEventListener('input', filterAppointments);
  statusFilter.addEventListener('change', filterAppointments);
}

document.querySelectorAll('.approve-btn').forEach(function(button) {
  button.addEventListener('click', function() {
    const confirmApprove = confirm('Approve this appointment?');

    if (!confirmApprove) return;
        const row = button.closest('tr');
        const status = row.querySelector('.status');

        status.textContent = 'Confirmed';
        status.className = 'status confirmed';
  });
});

document.querySelectorAll('.cancel-btn').forEach(function(button) {
  button.addEventListener('click', function() {
    const confirmCancel = confirm('Cancel this appointment?');

    if (confirmCancel) {
      const row = button.closest('tr');
      const status = row.querySelector('.status');

      status.textContent = 'Cancelled';
      status.className = 'status cancelled';
    }
  });
});

const cards = document.querySelectorAll('.stat-card, .appointments-table-section');

cards.forEach(function(card) {
  card.style.opacity = '0';
  card.style.transform = 'translateY(25px)';
  card.style.transition = 'all 0.6s ease';
});

window.addEventListener('load', function() {
  cards.forEach(function(card, index) {
    setTimeout(function() {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 120);
  });
});