/*COVERAGE CHECKER*/

const coverageForm = document.getElementById("coverageForm");
const providerInput = document.getElementById("providerInput");
const checkerResult = document.getElementById("checkerResult");
const checkerResultText = document.getElementById("checkerResultText");

const acceptedProviders = [
  "axa",
  "metlife",
  "globemed",
  "allianz",
  "misr",
  "egyptian life takaful",
  "bupa",
  "cigna"
];

coverageForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const provider = providerInput.value.toLowerCase().trim();

  if (provider === "") {
    checkerResult.style.display = "flex";
    checkerResult.style.background = "#fff2d9";
    checkerResult.style.color = "#b7791f";

    checkerResultText.textContent =
      "Please enter your insurance provider.";

    return;
  }

  if (acceptedProviders.includes(provider)) {
    checkerResult.style.display = "flex";
    checkerResult.style.background = "#e8f7ee";
    checkerResult.style.color = "#1c7a45";

    checkerResultText.textContent =
      "Great news! Your insurance provider is accepted at Basira Eye Center.";
  } else {
    checkerResult.style.display = "flex";
    checkerResult.style.background = "#ffe8e8";
    checkerResult.style.color = "#c53030";

    checkerResultText.textContent =
      "We could not find this provider in our system. Please contact us for verification.";
  }
});


/* FAQ ACCORDION */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {

  const question = item.querySelector(".faq-question");

  question.addEventListener("click", function () {

    faqItems.forEach(function (faq) {
      faq.classList.remove("faq-open");
    });

    item.classList.toggle("faq-open");
  });

});