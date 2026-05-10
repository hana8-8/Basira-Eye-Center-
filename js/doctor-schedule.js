const scheduleForm = document.getElementById('scheduleForm');
const scheduleList = document.getElementById('scheduleList');

if (scheduleForm) {
  scheduleForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const day = document.getElementById('day').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    const item = document.createElement('div');
    item.classList.add('schedule-item');

    item.innerHTML = `
      <span><strong>${day}</strong>: ${startTime} - ${endTime}</span>
      <button class="delete-btn">Delete</button>
    `;

    scheduleList.appendChild(item);

    scheduleForm.reset();
  });
}

scheduleList.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    event.target.parentElement.remove();
  }
});