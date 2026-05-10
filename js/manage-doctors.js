const searchInput = document.querySelector('.search-input');
const specialtyFilter = document.querySelector('.specialty-filter');
const doctorsTableBody = document.querySelector('.doctors-table tbody');

const addDoctorBtn = document.querySelector('.add-doctor-btn');
const doctorModal = document.getElementById('doctorModal');
const closeModalBtn = document.querySelector('.close-modal-btn');

const doctorForm = document.getElementById('doctorForm');
const modalTitle = document.getElementById('modalTitle');

const doctorNameInput = document.getElementById('doctorName');
const doctorEmailInput = document.getElementById('doctorEmail');
const doctorSpecialtyInput = document.getElementById('doctorSpecialty');
const doctorScheduleInput = document.getElementById('doctorSchedule');

let editingRow = null;


function openModal(mode, row = null) {
  doctorModal.classList.add('active');

  if (mode === 'add') {
    modalTitle.textContent = 'Add Doctor';
    doctorForm.reset();
    editingRow = null;
  }

  if (mode === 'edit') {
    modalTitle.textContent = 'Edit Doctor';
    editingRow = row;

    doctorNameInput.value = row.children[0].textContent;
    doctorEmailInput.value = row.children[1].textContent;
    doctorSpecialtyInput.value = row.children[2].textContent;
    doctorScheduleInput.value = row.children[3].textContent;
  }
}


function closeModal() {
  doctorModal.classList.remove('active');
  doctorForm.reset();
  editingRow = null;
}


if (addDoctorBtn) {
  addDoctorBtn.addEventListener('click', function() {
    openModal('add');
  });
}


if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}


doctorModal.addEventListener('click', function(event) {
  if (event.target === doctorModal) {
    closeModal();
  }
});


doctorForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = doctorNameInput.value;
  const email = doctorEmailInput.value;
  const specialty = doctorSpecialtyInput.value;
  const schedule = doctorScheduleInput.value;

  if (editingRow) {
    editingRow.children[0].textContent = name;
    editingRow.children[1].textContent = email;
    editingRow.children[2].textContent = specialty;
    editingRow.children[3].textContent = schedule;
  }

  else {
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
      <td>${specialty}</td>
      <td>${schedule}</td>
      <td><span class="status available">Available</span></td>
      <td class="actions">
        <button class="edit-btn">Edit</button>
        <button class="leave-btn">Set Leave</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;

    doctorsTableBody.appendChild(newRow);
  }

  closeModal();
});


function filterDoctors() {
  const rows = document.querySelectorAll('.doctors-table tbody tr');

  const searchText = searchInput.value.toLowerCase();
  const selectedSpecialty = specialtyFilter.value.toLowerCase();

  rows.forEach(function(row) {
    const doctorName = row.children[0].textContent.toLowerCase();
    const email = row.children[1].textContent.toLowerCase();
    const specialty = row.children[2].textContent.toLowerCase();

    const matchesSearch =
      doctorName.includes(searchText) || email.includes(searchText);

    const matchesSpecialty =
      selectedSpecialty === 'all specialties' ||
      specialty === selectedSpecialty;

    row.style.display =
      matchesSearch && matchesSpecialty ? '' : 'none';
  });
}


if (searchInput && specialtyFilter) {
  searchInput.addEventListener('input', filterDoctors);
  specialtyFilter.addEventListener('change', filterDoctors);
}


doctorsTableBody.addEventListener('click', function(event) {
  const button = event.target;
  const row = button.closest('tr');

  if (!row) return;

  if (button.classList.contains('edit-btn')) {
    openModal('edit', row);
  }

  if (button.classList.contains('leave-btn')) {
    const status = row.querySelector('.status');

    if (status.classList.contains('available')) {
      status.textContent = 'On Leave';
      status.className = 'status leave';
      button.textContent = 'Set Available';
    }

    else {
      status.textContent = 'Available';
      status.className = 'status available';
      button.textContent = 'Set Leave';
    }
  }

  if (button.classList.contains('delete-btn')) {
    const doctorName = row.children[0].textContent;
    const confirmDelete = confirm('Delete ' + doctorName + '?');

    if (confirmDelete) {
      row.remove();
    }
  }
});