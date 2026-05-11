/* =========================
   GET ELEMENTS
========================= */

const loginTab      = document.getElementById('loginTab');
const registerTab   = document.getElementById('registerTab');
// const adminLoginTab = document.getElementById('loginAdmin');

const loginForm      = document.getElementById('loginForm');
const registerForm   = document.getElementById('registerForm');
// const adminLoginForm = document.getElementById('adminLoginForm');


/* =========================
   HELPER FUNCTION
========================= */

function showForm(activeTab, activeForm) {
  loginTab.classList.remove('active');
  registerTab.classList.remove('active');
  adminLoginTab.classList.remove('active');

  loginForm.classList.remove('active');
  registerForm.classList.remove('active');
  adminLoginForm.classList.remove('active');

  activeTab.classList.add('active');
  activeForm.classList.add('active');
}


/* =========================
   SWITCH BETWEEN FORMS
========================= */

if (loginTab && registerTab && adminLoginTab && loginForm && registerForm && adminLoginForm) {

  loginTab.addEventListener('click', function () {
    showForm(loginTab, loginForm);
  });

  registerTab.addEventListener('click', function () {
    showForm(registerTab, registerForm);
  });

  adminLoginTab.addEventListener('click', function () {
    showForm(adminLoginTab, adminLoginForm);
  });

}


/* =========================
   LOGIN REDIRECTION
========================= */

if (loginForm) {

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const role = document.getElementById('loginRole').value;

    if (role === 'patient') {

      /* Save dummy patient session */
      localStorage.setItem('basiraUser', JSON.stringify({
        name:  'Sara Ahmed',
        email: 'sara@example.com',
        id:    'PAT-001',
        role:  'patient'
      }));

      /* Go to booking page if they came from Book Appointment, else portal */
      const redirect = localStorage.getItem('basiraRedirect') || 'patient-portal.html';
      localStorage.removeItem('basiraRedirect');
      window.location.href = redirect;

    } else if (role === 'doctor') {

      localStorage.setItem('basiraUser', JSON.stringify({
        name:  'Dr. Karim Hassan',
        email: 'karim@basira.com',
        id:    'DOC-001',
        role:  'doctor'
      }));

      window.location.href = 'doctor-dashboard.html';

    } else {
      alert('Please select a valid role.');
    }

  });

}


/* =========================
   REGISTER REDIRECTION
========================= */

if (registerForm) {

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const role = document.getElementById('registerRole').value;

    if (role === 'patient') {

      /* Save dummy patient session for new registrant */
      localStorage.setItem('basiraUser', JSON.stringify({
        name:  'New Patient',
        email: 'newpatient@example.com',
        id:    'PAT-NEW',
        role:  'patient'
      }));

      const redirect = localStorage.getItem('basiraRedirect') || 'patient-portal.html';
      localStorage.removeItem('basiraRedirect');
      window.location.href = redirect;

    } else if (role === 'doctor') {

      localStorage.setItem('basiraUser', JSON.stringify({
        name:  'New Doctor',
        email: 'newdoctor@basira.com',
        id:    'DOC-NEW',
        role:  'doctor'
      }));

      window.location.href = 'doctor-dashboard.html';

    } else {
      alert('Please select a valid role.');
    }

  });

}


/* =========================
   ADMIN LOGIN REDIRECTION
========================= */

// if (adminLoginForm) {

//   adminLoginForm.addEventListener('submit', function (event) {
//     event.preventDefault();

//     localStorage.setItem('basiraUser', JSON.stringify({
//       name:  'Admin',
//       email: 'admin@basira.com',
//       id:    'ADMIN-001',
//       role:  'admin'
//     }));

//     window.location.href = 'admin-dashboard.html';

//   });

// }