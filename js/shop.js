/*
=======================================================
  shop.js — Basira Eye Center
  Filter buttons + cart request toast
=======================================================
*/

/* ---- FILTER BUTTONS ---- */
document.querySelectorAll('.filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    /* update active button */
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    document.querySelectorAll('.product-card').forEach(function(card) {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    /* Hide section labels that have no visible products */
    document.querySelectorAll('.shop-section-label').forEach(function(label) {
      const grid = label.nextElementSibling;
      const visible = grid.querySelectorAll('.product-card[style="display: flex;"], .product-card:not([style])');
      label.style.display = (filter === 'all') ? 'flex' : 'flex';
    });
  });
});


/* ---- ADD TO CART TOAST ---- */
function addToCart(productName) {
  const toast = document.getElementById('cartToast');
  const msg   = document.getElementById('cartToastMsg');

  msg.textContent = '"' + productName + '" added to your request list';
  toast.classList.remove('hidden');

  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(function() {
    toast.classList.add('hidden');
  }, 3500);
}