/* ======================================================
   1. DISEASE DATA
====================================================== */
const diseaseData = {
  myopia: {
    title: "Myopia (Nearsightedness)",
    description:
      "Myopia is a refractive error where the eye grows too long or the cornea is too curved. Light focuses in front of the retina instead of on it, making distant objects blurry.",
    causes: [
      "Genetics (family history)",
      "Prolonged close-up work",
      "Lack of outdoor time",
      "Screen overuse in children",
    ],
    treatments: [
      "Prescription glasses or contact lenses",
      "Orthokeratology (reshaping lenses worn overnight)",
      "LASIK or PRK laser surgery (adults)",
      "Atropine eye drops (slows progression in children)",
    ],
    prevention:
      "Spend time outdoors. Take regular breaks from screens (20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds).",
  },
  glaucoma: {
    title: "Glaucoma",
    description:
      "Glaucoma is a group of eye conditions that damage the optic nerve, usually due to abnormally high pressure inside the eye. It is a leading cause of blindness for people over 60 but can occur at any age.",
    causes: [
      "Elevated eye pressure",
      "Family history",
      "Age (over 60)",
      "Certain medical conditions like diabetes",
    ],
    treatments: [
      "Prescription eye drops to reduce pressure",
      "Oral medications",
      "Laser therapy (trabeculoplasty)",
      "Surgery in advanced cases",
    ],
    prevention:
      "Regular eye exams are the best prevention. Once diagnosed early, glaucoma can be managed effectively to prevent further vision loss.",
  },
  cataracts: {
    title: "Cataracts",
    description:
      "A cataract is a clouding of the normally clear lens of the eye. For people who have cataracts, seeing through cloudy lenses is like looking through a frosty or fogged-up window.",
    causes: [
      "Normal aging process",
      "Diabetes",
      "Excessive UV light exposure",
      "Steroid medications",
      "Eye trauma",
    ],
    treatments: [
      "Updated prescription glasses (early stages)",
      "Anti-glare coatings",
      "Cataract surgery — removes clouded lens and replaces with artificial lens (IOL)",
      "Highly successful with 95%+ success rate",
    ],
    prevention:
      "Wear UV-protective sunglasses. Manage diabetes. Avoid smoking. Eat a diet rich in antioxidants (leafy greens, fish).",
  },
  "diabetic-retinopathy": {
    title: "Diabetic Retinopathy",
    description:
      "Diabetic retinopathy is a diabetes complication that affects the eyes. It's caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina).",
    causes: [
      "Poorly controlled blood sugar",
      "High blood pressure",
      "High cholesterol",
      "Duration of diabetes",
    ],
    treatments: [
      "Blood sugar and blood pressure control",
      "Laser photocoagulation",
      "Anti-VEGF injections (Avastin, Lucentis)",
      "Vitrectomy surgery in severe cases",
    ],
    prevention:
      "Control blood sugar levels carefully. Get a dilated eye exam at least once a year if you have diabetes. Don't smoke.",
  },
  conjunctivitis: {
    title: "Conjunctivitis (Pink Eye)",
    description:
      "Conjunctivitis is an inflammation of the conjunctiva — the thin, clear tissue that lines the inside of the eyelid and the white part of the eyeball. It's very common and usually not serious.",
    causes: [
      "Viral infection (most common)",
      "Bacterial infection",
      "Allergies (pollen, dust, pets)",
      "Chemical exposure",
    ],
    treatments: [
      "Viral: self-resolving in 1–2 weeks, cool compresses",
      "Bacterial: antibiotic eye drops",
      "Allergic: antihistamine drops, avoiding allergens",
      "Artificial tears for comfort",
    ],
    prevention:
      "Wash hands frequently. Don't share towels or eye makeup. Avoid touching your eyes. Change pillowcases regularly.",
  },
  amblyopia: {
    title: "Amblyopia (Lazy Eye)",
    description:
      'Amblyopia occurs when vision in one eye doesn\'t develop properly during childhood. The brain begins to ignore the signals from the weaker eye, causing it to become "lazy." Early treatment is essential.',
    causes: [
      "Strabismus (misaligned eyes)",
      "Unequal refractive errors between eyes",
      "Cloudiness in the lens (cataract)",
      "Eyelid drooping (ptosis)",
    ],
    treatments: [
      "Glasses to correct refractive error",
      "Eye patching (covering the stronger eye to force use of weak eye)",
      "Atropine drops in the stronger eye",
      "Vision therapy exercises",
    ],
    prevention:
      "Early detection is key. Children should have their first eye exam by age 1, then age 3, then before starting school.",
  },
  "macular-degeneration": {
    title: "Age-Related Macular Degeneration (AMD)",
    description:
      "AMD is the leading cause of severe vision loss in adults over 50. It affects the macula — the part of the retina responsible for sharp, central vision needed for tasks like reading and driving.",
    causes: [
      "Age (most significant risk factor)",
      "Smoking",
      "Family history",
      "Cardiovascular disease",
      "Obesity",
    ],
    treatments: [
      "Dry AMD: AREDS2 supplements (vitamins C, E, zinc)",
      "Wet AMD: Anti-VEGF injections (monthly)",
      "Laser therapy for some cases",
      "Low vision aids and rehabilitation",
    ],
    prevention:
      "Don't smoke. Eat leafy greens and fish. Exercise regularly. Control blood pressure. Wear UV-protective sunglasses.",
  },
  strabismus: {
    title: "Strabismus (Crossed Eyes)",
    description:
      "Strabismus is a condition in which the eyes do not align properly. One eye turns in, out, up, or down while the other looks straight ahead. It can occur constantly or intermittently.",
    causes: [
      "Muscle imbalance",
      "Neurological problems",
      "Uncorrected refractive errors",
      "Family history",
      "Stroke or brain injury (adults)",
    ],
    treatments: [
      "Prescription glasses",
      "Eye patching for associated amblyopia",
      "Prism lenses",
      "Botulinum toxin (Botox) injections",
      "Eye muscle surgery",
    ],
    prevention:
      "No proven prevention, but early treatment prevents development of amblyopia. Regular eye exams from infancy are important.",
  },
  "dry-eye": {
    title: "Dry Eye Syndrome",
    description:
      "Dry eye disease occurs when your tears can't provide adequate lubrication for your eyes. Tears can be inadequate for many reasons — extremely common in Egypt due to heat, dust, and screen usage.",
    causes: [
      "Screen overuse (reduced blinking)",
      "Hot, dry, or windy weather",
      "Contact lens wear",
      "Aging and hormonal changes",
      "Certain medications (antihistamines, antidepressants)",
    ],
    treatments: [
      "Artificial tear eye drops",
      "Prescription eye drops (Restasis, Xiidra)",
      "Omega-3 fatty acid supplements",
      "Punctal plugs (block tear drainage)",
      "Warm compresses and eyelid massage",
    ],
    prevention:
      "Follow the 20-20-20 rule for screens. Stay hydrated. Use a humidifier. Wear sunglasses outdoors. Avoid air blowing directly in your eyes.",
  },
};

/* ======================================================
   2. SEARCH & FILTER LOGIC
====================================================== */

let activeFilter = "all";
let searchQuery = "";

function filterDiseases() {
  const cards = document.querySelectorAll(".disease-card");
  const noResults = document.getElementById("no-results");
  let visibleCount = 0;

  cards.forEach(function (card) {
    const category = card.getAttribute("data-category");
    const name = card.querySelector(".disease-name").textContent.toLowerCase();
    const desc = card.querySelector(".disease-desc").textContent.toLowerCase();

    // Check if card passes the filter
    const passesFilter = activeFilter === "all" || category === activeFilter;

    // Check if card passes the search
    const passesSearch =
      searchQuery === "" ||
      name.includes(searchQuery) ||
      desc.includes(searchQuery);

    if (passesFilter && passesSearch) {
      card.style.display = "flex";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  // Show "no results" message if nothing matches
  noResults.style.display = visibleCount === 0 ? "block" : "none";
}

// Search input listener
const searchInput = document.getElementById("disease-search");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    searchQuery = this.value.toLowerCase().trim();
    filterDiseases();
  });
}

// Filter button listeners
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    // Remove active from all
    filterBtns.forEach((b) => b.classList.remove("active"));
    // Add active to clicked
    this.classList.add("active");
    activeFilter = this.getAttribute("data-filter");
    filterDiseases();
  });
});

/* ======================================================
   3. LEARN MORE MODAL
====================================================== */

const modalOverlay = document.getElementById("modal-overlay");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");

document.querySelectorAll(".btn-learn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const key = this.getAttribute("data-disease");
    const data = diseaseData[key];

    if (!data) return;

    // Build HTML for the modal
    const causesHTML = data.causes.map((c) => `<li>${c}</li>`).join("");
    const treatmentsHTML = data.treatments.map((t) => `<li>${t}</li>`).join("");

    modalBody.innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <h4>Common Causes</h4>
      <ul>${causesHTML}</ul>
      <h4>Treatment Options</h4>
      <ul>${treatmentsHTML}</ul>
      <h4>Prevention Tips</h4>
      <p>${data.prevention}</p>
      <a href="booking.html" class="modal-cta">
        Book a Consultation <i class="ti ti-arrow-right"></i>
      </a>
    `;

    // Show the modal
    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden"; // prevent background scrolling
  });
});

// Close modal on X button click
if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

// Close modal when clicking outside
if (modalOverlay) {
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) closeModal();
  });
}

// Close modal on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

function closeModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = ""; // restore scrolling
}

/* ======================================================
   4. SCROLL ANIMATIONS — cards fade in
   as they enter the viewport.
====================================================== */

const animatableElements = document.querySelectorAll(".disease-card");

animatableElements.forEach(function (el, index) {
  el.classList.add("animate-hidden");
  el.style.transitionDelay = index * 0.08 + "s"; //fades in one after another
});

const scrollObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove("animate-hidden");
        entry.target.classList.add("animate-visible");
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -20px 0px" },
);

animatableElements.forEach(function (el) {
  scrollObserver.observe(el);
});
