const searchInput = document.getElementById('recordSearch');
const recordCards = document.querySelectorAll('.record-card');

if (searchInput) {
  searchInput.addEventListener('input', function() {
    const searchText = searchInput.value.toLowerCase();

    recordCards.forEach(function(card) {
      const patientName = card.querySelector('h2').textContent.toLowerCase();

      card.style.display = patientName.includes(searchText) ? 'block' : 'none';
    });
  });
}

document.querySelectorAll('.view-btn').forEach(function(button) {
  button.addEventListener('click', function() {
    const patientName = button.parentElement.querySelector('h2').textContent;
    alert('Opening record for ' + patientName);
  });
});