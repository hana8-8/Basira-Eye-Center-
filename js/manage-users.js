const searchInput = document.querySelector('.search-input');
const filterSelect = document.querySelector('.filter-select');
const tableRows = document.querySelectorAll('.users-table tbody tr');

function filterUsers() {
  const searchText = searchInput.value.toLowerCase();
  const selectedRole = filterSelect.value.toLowerCase();

  tableRows.forEach(function(row) {
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
    } else {
      row.style.display = 'none';
    }
  });
}

if (searchInput && filterSelect) {
  searchInput.addEventListener('input', filterUsers);
  filterSelect.addEventListener('change', filterUsers);
}

const deleteButtons = document.querySelectorAll('.delete-btn');

deleteButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    const row = button.closest('tr');
    const userName = row.children[0].textContent;

    const confirmDelete = confirm('Delete user: ' + userName + '?');

    if (confirmDelete) {
      row.remove();
    }
  });
});

const editButtons = document.querySelectorAll('.edit-btn');

editButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    const row = button.closest('tr');
    const userName = row.children[0].textContent;

    alert('Edit feature for ' + userName + ' will be added later.');
  });
});

const addUserBtn = document.querySelector('.add-user-btn');

if (addUserBtn) {
  addUserBtn.addEventListener('click', function() {
    alert('Add user form will be added later.');
  });
}

const cards = document.querySelectorAll('.user-stat-card, .users-table-section');

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