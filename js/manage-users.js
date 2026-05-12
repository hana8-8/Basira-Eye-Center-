/*
========================================
  manage-users.js
========================================
*/


/* =========================
   GET ELEMENTS
========================= */

const searchInput = document.querySelector('.search-input');
const filterSelect = document.querySelector('.filter-select');
const usersTableBody = document.querySelector('.users-table tbody');

const addUserBtn = document.querySelector('.add-user-btn');

const userModal = document.getElementById('userModal');
const closeModalBtn = document.querySelector('.close-modal-btn');

const userForm = document.getElementById('userForm');
const modalTitle = document.getElementById('modalTitle');

const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('userEmail');
const userRoleInput = document.getElementById('userRole');
const userStatusInput = document.getElementById('userStatus');

let editingRow = null;


/* =========================
   OPEN MODAL
========================= */

function openModal(mode, row = null) {

  userModal.classList.add('active');

  if (mode === 'add') {

    modalTitle.textContent = 'Add User';

    userForm.reset();

    editingRow = null;

  }

  if (mode === 'edit') {

    modalTitle.textContent = 'Edit User';

    editingRow = row;

    userNameInput.value = row.children[0].textContent;
    userEmailInput.value = row.children[1].textContent;
    userRoleInput.value = row.children[2].textContent;
    userStatusInput.value = row.querySelector('.status').textContent.trim();

  }

}


/* =========================
   CLOSE MODAL
========================= */

function closeModal() {

  userModal.classList.remove('active');

  userForm.reset();

  editingRow = null;

}


/* =========================
   ADD USER BUTTON
========================= */

if (addUserBtn) {

  addUserBtn.addEventListener('click', function() {

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

if (userModal) {

  userModal.addEventListener('click', function(event) {

    if (event.target === userModal) {

      closeModal();

    }

  });

}


/* =========================
   SAVE USER
========================= */

if (userForm) {

  userForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const name = userNameInput.value;
    const email = userEmailInput.value;
    const role = userRoleInput.value;
    const status = userStatusInput.value;

    if (role === 'Admin') {

      alert('Admin users cannot be added or edited from this page.');

      return;

    }

    const statusClass =
      status.toLowerCase() === 'active' ? 'active' : 'inactive';


    if (editingRow) {

      editingRow.children[0].textContent = name;
      editingRow.children[1].textContent = email;
      editingRow.children[2].textContent = role;

      const statusSpan = editingRow.querySelector('.status');

      statusSpan.textContent = status;
      statusSpan.className = 'status ' + statusClass;

    }

    else {

      const newRow = document.createElement('tr');

      newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${role}</td>
        <td>
          <span class="status ${statusClass}">
            ${status}
          </span>
        </td>
        <td class="actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </td>
      `;

      usersTableBody.appendChild(newRow);

    }

    closeModal();

    filterUsers();

  });

}


/* =========================
   FILTER USERS
========================= */

function filterUsers() {

  const rows = document.querySelectorAll('.users-table tbody tr');

  const searchText = searchInput.value.toLowerCase();

  const selectedRole = filterSelect.value.toLowerCase();

  rows.forEach(function(row) {

    const name = row.children[0].textContent.toLowerCase();

    const email = row.children[1].textContent.toLowerCase();

    const role = row.children[2].textContent.toLowerCase();

    const matchesSearch =
      name.includes(searchText) || email.includes(searchText);

    const matchesRole =
      selectedRole === 'all roles' ||
      role === selectedRole.slice(0, -1);

    if (matchesSearch && matchesRole) {

      row.style.display = '';

    }

    else {

      row.style.display = 'none';

    }

  });

}


if (searchInput && filterSelect) {

  searchInput.addEventListener('input', filterUsers);

  filterSelect.addEventListener('change', filterUsers);

}


/* =========================
   TABLE ACTIONS
========================= */

if (usersTableBody) {

  usersTableBody.addEventListener('click', function(event) {

    const button = event.target;

    const row = button.closest('tr');

    if (!row) return;


    if (button.classList.contains('edit-btn')) {

      const role = row.children[2].textContent.trim();

      if (role === 'Admin') {

        alert('Admin users cannot be edited from this page.');

        return;

      }

      openModal('edit', row);

    }


    if (button.classList.contains('delete-btn')) {

      const userName = row.children[0].textContent;

      const role = row.children[2].textContent.trim();

      if (role === 'Admin') {

        alert('Admin users cannot be deleted from this page.');

        return;

      }

      const confirmDelete =
        confirm('Delete user: ' + userName + '?');

      if (confirmDelete) {

        row.remove();

      }

    }

  });

}


/* =========================
   PAGE ANIMATION
========================= */

const cards =
  document.querySelectorAll('.user-stat-card, .users-table-section');

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