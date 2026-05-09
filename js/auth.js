

/* =========================
   GET ELEMENTS
========================= */

const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');


/* =========================
   SWITCH BETWEEN LOGIN / REGISTER
========================= */

if (loginTab && registerTab && loginForm && registerForm) {

  loginTab.addEventListener('click', function () {

    loginTab.classList.add('active');
    registerTab.classList.remove('active');

    loginForm.classList.add('active');
    registerForm.classList.remove('active');

  });


  registerTab.addEventListener('click', function () {

    

    registerTab.classList.add('active');
    loginTab.classList.remove('active');

    registerForm.classList.add('active');
    loginForm.classList.remove('active');

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

    else if (role === 'admin') {
      window.location.href = 'admin-dashboard.html';
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

    else if (role === 'admin') {
      window.location.href = 'admin-dashboard.html';
    }

  });

}