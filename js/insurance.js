/*
=======================================================
  insurance.js — Basira Eye Center Insurance Page
=======================================================

  This file handles:
  1. FAQ accordion — click a question to expand/collapse the answer
  2. Coverage checker form — check if an insurance provider is accepted
  3. Scroll animations — cards fade in as the user scrolls

  global.js already handles: navbar, hamburger, eye dots.
=======================================================
*/


/* ======================================================
   1. FAQ ACCORDION
   ======================================================

   WHAT IS AN ACCORDION?
   A list of questions where you click to see the answer.
   Only one answer is visible at a time.
   When you click a new question, the previous one closes.

   HOW IT WORKS STEP BY STEP:
   - We find all .faq-question buttons
   - We add a "click" listener to each one
   - When clicked, we check if its parent .faq-item already has
     the class "faq-open"
   - If YES → we close it (remove "faq-open")
   - If NO → we first close ALL items, then open this one

   The CSS in insurance.css does the actual show/hide animation
   using max-height transition — JS only adds/removes the class.
====================================================== */

/*
  Find the container that holds all FAQ items.
  We'll use it to find all items inside.
*/
const faqList = document.getElementById('faqList');

if (faqList) {

  /*
    Find every question button inside the FAQ list.
    .querySelectorAll returns a NodeList (list of elements).
  */
  const faqQuestions = faqList.querySelectorAll('.faq-question');

  /*
    Loop through every question and add a click listener.
    When a question is clicked, this function runs.
  */
  faqQuestions.forEach(function(questionBtn) {
    questionBtn.addEventListener('click', function() {

      /*
        .closest('.faq-item') walks UP the HTML tree from the button
        until it finds an ancestor with class "faq-item".
        This gives us the whole item (question + answer together).
      */
      const thisItem = questionBtn.closest('.faq-item');

      /*
        Check if this item is ALREADY open.
        classList.contains() returns true if the class exists.
      */
      const isAlreadyOpen = thisItem.classList.contains('faq-open');

      /*
        CLOSE ALL ITEMS FIRST.
        Loop through every .faq-item and remove the "faq-open" class.
        This ensures only one item is open at a time.
      */
      faqList.querySelectorAll('.faq-item').forEach(function(item) {
        item.classList.remove('faq-open');
      });

      /*
        IF THIS ITEM WAS NOT ALREADY OPEN → open it now.
        (If it was already open, we just closed it above — which is correct.)
      */
      if (!isAlreadyOpen) {
        thisItem.classList.add('faq-open');
      }

    });
  });

}


/* ======================================================
   2. COVERAGE CHECKER FORM
   ======================================================

   HOW FORMS WORK IN JAVASCRIPT:
   Normally when you submit a form, the browser sends the data
   to a server and RELOADS the page.
   We don't want a reload — we want to check the input and
   show a result RIGHT THERE on the same page.

   So we use event.preventDefault() to STOP the default behavior,
   then we handle everything ourselves with JavaScript.

   TODO: BACKEND — right now we check against a hardcoded list.
   In the future, this would send a fetch() request to your
   backend API which queries a real database of accepted providers.
====================================================== */

const coverageForm = document.getElementById('coverageForm');

if (coverageForm) {

  /*
    This is the list of accepted insurance providers.
    We store them all in LOWERCASE so comparisons work regardless
    of how the user typed (e.g. "AXA" or "axa" or "Axa" all match).

    TODO: BACKEND — replace this array with a real database query.
  */
  const acceptedProviders = [
    'axa', 'axa egypt', 'metlife', 'met life', 'globemed', 'globe med',
    'allianz', 'allianz egypt', 'misr', 'misr insurance',
    'egyptian life takaful', 'elt', 'bupa', 'cigna',
    'hsbc', 'hsbc insurance', 'orient takaful', 'orient'
  ];

  coverageForm.addEventListener('submit', function(event) {

    /*
      STOP THE PAGE FROM RELOADING.
      This is the most important line in form handling with JS.
      Without it, the browser would navigate away and we'd lose everything.
    */
    event.preventDefault();

    /*
      Read what the user typed into the input.
      document.getElementById('providerInput') finds the <input> element.
      .value gives us the text inside it.
      .trim() removes any accidental spaces at the start/end.
      .toLowerCase() converts to lowercase for easy comparison.
    */
    const userInput = document.getElementById('providerInput').value.trim().toLowerCase();

    /*
      Don't do anything if the input is empty.
      Just focus the input so the user knows to type something.
    */
    if (!userInput) {
      document.getElementById('providerInput').focus();
      return;   /* "return" exits the function early */
    }

    /*
      Check if the user's input is found anywhere in our acceptedProviders array.
      .some() returns true if AT LEAST ONE item in the array passes the test.

      The test here: does any accepted provider NAME INCLUDE the user's typed text?
      For example: user types "axa" → does "axa egypt".includes("axa") ? YES → found!
      This lets partial matches work too: "met" will match "metlife".
    */
    const isAccepted = acceptedProviders.some(function(provider) {
      return provider.includes(userInput) || userInput.includes(provider);
    });

    /* Find the result box and the text span inside it */
    const resultBox  = document.getElementById('checkerResult');
    const resultText = document.getElementById('checkerResultText');

    /*
      Remove previous result classes before adding new ones.
      If we don't do this, old classes could conflict with new ones.
    */
    resultBox.classList.remove('result-found', 'result-not-found');

    if (isAccepted) {
      /*
        PROVIDER FOUND — show a green success message.
        We also update the icon inside the result box.
      */
      resultBox.querySelector('i').className = 'ti ti-shield-check';
      resultText.textContent =
        '✓ Great news! We accept ' + document.getElementById('providerInput').value.trim() +
        '. Please bring your insurance card to your appointment.';
      resultBox.classList.add('result-found');
    } else {
      /*
        PROVIDER NOT FOUND — show an orange "call us" message.
        We don't say "rejected" because we might still accept it —
        the list might just be incomplete.
      */
      resultBox.querySelector('i').className = 'ti ti-info-circle';
      resultText.textContent =
        'We couldn\'t find "' + document.getElementById('providerInput').value.trim() +
        '" in our system. Please call us — we may still be able to help!';
      resultBox.classList.add('result-not-found');
    }

    /* Show the result box (it starts hidden with display:none) */
    resultBox.style.display = 'flex';

    /*
      Smoothly scroll the result box into view so the user
      can see it even if it's below the fold.
    */
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  });

}


/* ======================================================
   3. SCROLL ANIMATIONS
   ======================================================
   Cards and steps fade in from below as the user scrolls.
   Same pattern used on the services page.

   TEACHER NOTE:
   We animate: insurance cards, how-to steps, intro benefits.
   We DON'T animate the FAQ or form — they're interactive
   and should just be visible right away.
====================================================== */

const animatables = document.querySelectorAll(
  '.insurance-card, .how-to-step, .intro-benefit'
);

animatables.forEach(function(el, index) {
  el.classList.add('animate-hidden');
  /*
    Stagger: each element delays slightly more than the previous.
    This creates a "cascade" effect instead of everything appearing at once.
    Capped at 0.4s max so the last card doesn't wait too long.
  */
  el.style.transitionDelay = Math.min(index * 0.08, 0.4) + 's';
});

const animObserver = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('animate-hidden');
        entry.target.classList.add('animate-visible');
        animObserver.unobserve(entry.target);   /* stop watching once shown */
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
  }
);

animatables.forEach(function(el) {
  animObserver.observe(el);
});


/* ======================================================
   TEACHER NOTE — What to add to insurance.js later:
   ======================================================

   1. REAL COVERAGE CHECKER:
      Instead of a hardcoded array, fetch from your API:

      fetch('/api/insurance/check?provider=' + userInput)
        .then(res => res.json())
        .then(data => {
          if (data.accepted) {
            // show green result
          } else {
            // show orange result
          }
        });

   2. OPEN FAQ FROM A URL HASH:
      If someone links to insurance.html#lasik, auto-open that FAQ:

      const hash = window.location.hash;  // e.g. "#lasik"
      if (hash) {
        const target = document.querySelector(hash);
        if (target) target.classList.add('faq-open');
      }

   3. SMOOTH SCROLL TO CHECKER:
      If a user clicks "Check Coverage" on an insurance card,
      scroll down to the checker form and pre-fill their provider:

      document.querySelectorAll('.ins-check-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          const providerName = btn.closest('.insurance-card')
                                  .querySelector('.ins-card-name').textContent;
          document.getElementById('providerInput').value = providerName;
          document.getElementById('checker').scrollIntoView({ behavior: 'smooth' });
        });
      });
====================================================== */