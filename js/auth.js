/* =========================
   GET ELEMENTS
========================= */

const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const adminLoginTab = document.getElementById('loginAdmin');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const adminLoginForm = document.getElementById('adminLoginForm');


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

  loginForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const role = document.getElementById('loginRole').value;

    if (role === 'patient') {
      window.location.href = 'patient-portal.html';
    }

    else if (role === 'doctor') {
      window.location.href = 'doctor-dashboard.html';
    }

    else {
      alert('Please select a valid role.');
    }

  });

}


/* =========================
   REGISTER REDIRECTION
========================= */

if (registerForm) {

  registerForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const role = document.getElementById('registerRole').value;

    if (role === 'patient') {
      window.location.href = 'patient-portal.html';
    }

    else if (role === 'doctor') {
      window.location.href = 'doctor-dashboard.html';
    }

    else {
      alert('Please select a valid role.');
    }

  });

}


/* =========================
   ADMIN LOGIN REDIRECTION
========================= */

if (adminLoginForm) {

  adminLoginForm.addEventListener('submit', function(event) {

    event.preventDefault();

    window.location.href = 'admin-dashboard.html';

  });

}