/*
=======================================================
  news.js — Basira Eye Center
  Handles tab switching between News and Devices
=======================================================
*/

function switchTab(tab) {
  /* Hide all tab content */
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));

  /* Remove active from all buttons */
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  /* Show selected tab */
  document.getElementById('tab-' + tab).classList.remove('hidden');

  /* Activate clicked button */
  event.target.closest('.tab-btn').classList.add('active');

  /* Scroll to content smoothly */
  document.getElementById('tab-' + tab).scrollIntoView({ behavior: 'smooth', block: 'start' });
}