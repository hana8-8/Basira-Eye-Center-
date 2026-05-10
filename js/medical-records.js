const reportForm = document.getElementById('reportForm');
const reportsList = document.getElementById('reportsList');

if (reportForm) {
  reportForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const patientName = document.getElementById('patientName').value;
    const reportType = document.getElementById('reportType').value;
    const reportFile = document.getElementById('reportFile').files[0];

    const item = document.createElement('div');
    item.classList.add('report-item');

    item.innerHTML = `
      <h3>${patientName}</h3>
      <p><strong>Report Type:</strong> ${reportType}</p>
      <p><strong>File:</strong> ${reportFile.name}</p>
    `;

    reportsList.appendChild(item);

    reportForm.reset();
  });
}