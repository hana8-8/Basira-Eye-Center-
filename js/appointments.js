/*
========================================
  appointments.js
========================================
*/


/* =========================
   GET ELEMENTS
========================= */

const searchInput = document.querySelector('.search-input');
const statusFilter = document.querySelector('.status-filter');
const appointmentsTableBody = document.querySelector('.appointments-table tbody');

const addAppointmentBtn = document.querySelector('.add-appointment-btn');

const appointmentModal = document.getElementById('appointmentModal');
const closeModalBtn = document.querySelector('.close-modal-btn');

const appointmentForm = document.getElementById('appointmentForm');
const modalTitle = document.getElementById('modalTitle');

const patientInput = document.getElementById('appointmentPatient');
const doctorInput = document.getElementById('appointmentDoctor');
const dateInput = document.getElementById('appointmentDate');
const timeInput = document.getElementById('appointmentTime');
const serviceInput = document.getElementById('appointmentService');
const statusInput = document.getElementById('appointmentStatus');

let editingRow = null;


/* =========================
   OPEN MODAL
========================= */

function openModal(mode, row = null) {

  appointmentModal.classList.add('active');

  if (mode === 'add') {

    modalTitle.textContent = 'Add Appointment';

    appointmentForm.reset();

    editingRow = null;

  }

  if (mode === 'edit') {

    modalTitle.textContent = 'Edit Appointment';

    editingRow = row;

    patientInput.value = row.children[0].textContent;
    doctorInput.value = row.children[1].textContent;
    dateInput.value = row.children[2].textContent;
    timeInput.value = row.children[3].textContent;
    serviceInput.value = row.children[4].textContent;
    statusInput.value = row.querySelector('.status').textContent.trim();

  }

}


/* =========================
   CLOSE MODAL
========================= */

function closeModal() {

  appointmentModal.classList.remove('active');

  appointmentForm.reset();

  editingRow = null;

}


/* =========================
   ADD APPOINTMENT BUTTON
========================= */

if (addAppointmentBtn) {

  addAppointmentBtn.addEventListener('click', function() {

    openModal('add');

  });

}


/* =========================
   CLOSE MODAL BUTTON
========================= */

if (closeModalBtn) {

  closeModalBtn.addEventListener('click', closeModal);

}


/* =========================
   CLOSE MODAL BY CLICKING OUTSIDE
========================= */

if (appointmentModal) {

  appointmentModal.addEventListener('click', function(event) {

    if (event.target === appointmentModal) {

      closeModal();

    }

  });

}


/* =========================
   SAVE APPOINTMENT
========================= */

if (appointmentForm) {

  appointmentForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const patient = patientInput.value;
    const doctor = doctorInput.value;
    const date = dateInput.value;
    const time = timeInput.value;
    const service = serviceInput.value;
    const status = statusInput.value;

    const statusClass = status.toLowerCase();

    if (editingRow) {

      editingRow.children[0].textContent = patient;
      editingRow.children[1].textContent = doctor;
      editingRow.children[2].textContent = date;
      editingRow.children[3].textContent = time;
      editingRow.children[4].textContent = service;

      const statusSpan = editingRow.querySelector('.status');

      statusSpan.textContent = status;
      statusSpan.className = 'status ' + statusClass;

    }

    else {

      const newRow = document.createElement('tr');

      newRow.innerHTML = `
        <td>${patient}</td>
        <td>${doctor}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${service}</td>
        <td>
          <span class="status ${statusClass}">
            ${status}
          </span>
        </td>
        <td class="actions">
          <button class="edit-btn">Edit</button>
          <button class="approve-btn">Approve</button>
          <button class="cancel-btn">Cancel</button>
        </td>
      `;

      appointmentsTableBody.appendChild(newRow);

    }

    closeModal();

    filterAppointments();

  });

}


/* =========================
   FILTER APPOINTMENTS
========================= */

function filterAppointments() {

  const rows = document.querySelectorAll('.appointments-table tbody tr');

  const searchText = searchInput.value.toLowerCase();

  const selectedStatus = statusFilter.value.toLowerCase();

  rows.forEach(function(row) {

    const patient = row.children[0].textContent.toLowerCase();

    const doctor = row.children[1].textContent.toLowerCase();

    const status = row.children[5].textContent.trim().toLowerCase();

    const matchesSearch =
      patient.includes(searchText) || doctor.includes(searchText);

    const matchesStatus =
      selectedStatus === 'all status' || status === selectedStatus;

    row.style.display =
      matchesSearch && matchesStatus ? '' : 'none';

  });

}


if (searchInput && statusFilter) {

  searchInput.addEventListener('input', filterAppointments);

  statusFilter.addEventListener('change', filterAppointments);

}


/* =========================
   TABLE ACTIONS
========================= */

if (appointmentsTableBody) {

  appointmentsTableBody.addEventListener('click', function(event) {

    const button = event.target;

    const row = button.closest('tr');

    if (!row) return;


    if (button.classList.contains('edit-btn')) {

      openModal('edit', row);

    }


    if (button.classList.contains('approve-btn')) {

      const confirmApprove =
        confirm('Approve this appointment?');

      if (!confirmApprove) return;

      const status = row.querySelector('.status');

      status.textContent = 'Confirmed';

      status.className = 'status confirmed';

    }


    if (button.classList.contains('cancel-btn')) {

      const confirmCancel =
        confirm('Cancel this appointment?');

      if (!confirmCancel) return;

      const status = row.querySelector('.status');

      status.textContent = 'Cancelled';

      status.className = 'status cancelled';

    }

  });

}


/* =========================
   PAGE ANIMATION
========================= */

const cards =
  document.querySelectorAll('.stat-card, .appointments-table-section');

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