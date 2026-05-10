const prescriptionForm = document.getElementById('prescriptionForm');
const prescriptionList = document.getElementById('prescriptionList');

if (prescriptionForm) {
  prescriptionForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const patientName = document.getElementById('patientName').value;
    const medication = document.getElementById('medication').value;
    const dosage = document.getElementById('dosage').value;
    const instructions = document.getElementById('instructions').value;

    const item = document.createElement('div');
    item.classList.add('prescription-item');

    item.innerHTML = `
      <h3>${patientName}</h3>
      <p><strong>Medication:</strong> ${medication}</p>
      <p><strong>Dosage:</strong> ${dosage}</p>
      <p><strong>Instructions:</strong> ${instructions}</p>
    `;

    prescriptionList.appendChild(item);

    prescriptionForm.reset();
  });
}