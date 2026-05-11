// // finding the elements and storing them

// const step1 = document.getElementById("step-1");
// const step2 = document.getElementById("step-2");
// const step3 = document.getElementById("step-3");

// const stepCircles = document.querySelectorAll(".step-circle");

// const nextBtn1 = document.getElementById("next-btn-1");
// const nextBtn2 = document.getElementById("next-btn-2");
// const nextBtn3 = document.getElementById("next-btn-3");

// const backBtn2 = document.getElementById("back-btn-2");
// const backBtn3 = document.getElementById("back-btn-3");

// const stepLines = document.querySelectorAll(".step-line");
// const stepLabels = document.querySelectorAll(".step-label");

// const patientBtns = document.querySelectorAll(".patient-btn");

// const selects = document.querySelectorAll("select");

// const monthLabel = document.getElementById("month-label");
// const prevMonthBtn = document.getElementById("prev-month");
// const nextMonthBtn = document.getElementById("next-month");

// const calendarGrid = document.getElementById("calendar-grid");
// const timeSlotsContainer = document.getElementById("time-slots");

// let currentStep = 1;

// let selectedDate = null;
// let selectedTime = null;

// // Functions

// function goToStep(stepNumber) {
//   step1.style.display = "none";
//   step2.style.display = "none";
//   step3.style.display = "none";

//   if (stepNumber === 1) {
//     step1.style.display = "block";
//   } else if (stepNumber === 2) {
//     step2.style.display = "block";
//   } else if (stepNumber === 3) {
//     step3.style.display = "block";
//   }
// }

// nextBtn1.addEventListener("click", function () {
//   currentStep = 2;
//   goToStep(2);
// });

// nextBtn2.addEventListener("click", function () {
//   currentStep = 3;
//   goToStep(3);
// });

// backBtn2.addEventListener("click", function () {
//   currentStep = 1;
//   goToStep(1);
// });

// backBtn3.addEventListener("click", function () {
//   currentStep = 2;
//   goToStep(2);
// });

// patientBtns.forEach(function (btn) {
//   btn.addEventListener("click", function () {
//     patientBtns.forEach(function (b) {
//       b.classList.remove("active");
//       b.querySelector("i").className = "ti ti-circle";
//     });

//     this.classList.add("active");
//     this.querySelector("i").className = "ti ti-circle-filled";
//   });
// });

// const monthNames = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// let calendarDate = new Date();

// function buildCalendar() {
//   const year = calendarDate.getFullYear();
//   const month = calendarDate.getMonth();

//   monthLabel.textContent = monthNames[month] + " " + year;

//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   const firstDay = new Date(year, month, 1).getDay();

//   const today = new Date();
//   calendarGrid.innerHTML = "";

//   for (let i = 0; i < firstDay; i++) {
//     const empty = document.createElement("div");
//     empty.classList.add("day", "empty");
//     calendarGrid.appendChild(empty);
//   }

//   for (let day = 1; day < daysInMonth; day++) {
//     const dayEl = document.createElement("div");
//     dayEl.classList.add("day");
//     dayEl.textContent = day;

//     calendarGrid.appendChild(dayEl);
//   }
// }

/*
=======================================================
  booking.js — Basira Eye Center
  Handles: multi-step form, calendar, time slots
=======================================================
*/

/* ======================================================
   1. FIND ALL THE ELEMENTS WE NEED
====================================================== */

// The 3 step containers
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");

// The stepper circles
const stepCircles = document.querySelectorAll(".step-circle");

// Continue buttons
const nextBtn1 = document.getElementById("next-btn-1");
const nextBtn2 = document.getElementById("next-btn-2");
const nextBtn3 = document.getElementById("next-btn-3");

// Back buttons
const backBtn2 = document.getElementById("back-btn-2");
const backBtn3 = document.getElementById("back-btn-3");

// Stepper lines and labels
const stepLines = document.querySelectorAll(".step-line");
const stepLabels = document.querySelectorAll(".step-label");

// Patient type buttons
const patientBtns = document.querySelectorAll(".patient-btn");

// Dropdowns in step 2
const selects = document.querySelectorAll("select");

// Calendar elements
const monthLabel = document.getElementById("month-label");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const calendarGrid = document.getElementById("calendar-grid");
const timeSlotsContainer = document.getElementById("time-slots");

// State variables — these change as the user interacts
let currentStep = 1;
let selectedDate = null;
let selectedTime = null;

// Calendar state — track which month/year is showing
let calendarDate = new Date(); // starts at today's month

/* ======================================================
   2. SHOW THE CORRECT STEP
   ======================================================
   Hides all steps then shows only the requested one.
   Also updates the stepper circles and labels.
====================================================== */

function goToStep(stepNumber) {
  // Hide ALL steps
  step1.style.display = "none";
  step2.style.display = "none";
  step3.style.display = "none";

  // Show only the requested step
  if (stepNumber === 1) {
    step1.style.display = "block";
  } else if (stepNumber === 2) {
    step2.style.display = "block";
  } else if (stepNumber === 3) {
    step3.style.display = "block";
  }

  // Update the stepper UI
  updateStepper(stepNumber);

  // Scroll to top of page smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ======================================================
   3. UPDATE THE STEPPER
   ======================================================
   Updates circles, lines, and labels to reflect
   which step the user is currently on.
====================================================== */

function updateStepper(stepNumber) {
  // Update each circle
  stepCircles.forEach(function (circle, index) {
    // index 0 = circle 1, index 1 = circle 2, index 2 = circle 3
    if (index < stepNumber) {
      // This circle is on or before the current step → active (teal)
      circle.classList.add("active");
    } else {
      // This circle is after the current step → inactive (grey)
      circle.classList.remove("active");
    }
  });

  // Update each line
  stepLines.forEach(function (line, index) {
    // Line 0 = between circles 1&2, Line 1 = between circles 2&3
    if (index < stepNumber - 1) {
      line.classList.add("done");
    } else {
      line.classList.remove("done");
    }
  });

  // Update each label
  stepLabels.forEach(function (label, index) {
    if (index < stepNumber) {
      label.classList.add("active");
    } else {
      label.classList.remove("active");
    }
  });
}

/* ======================================================
   4. BUTTON CLICK LISTENERS
====================================================== */

// Step 1 → Step 2
nextBtn1.addEventListener("click", function () {
  currentStep = 2;
  goToStep(2);
});

// Step 2 → Step 3
nextBtn2.addEventListener("click", function () {
  currentStep = 3;
  goToStep(3);
  updateSummary(); // fill in the summary before showing step 3
});

// Step 2 ← Back to Step 1
backBtn2.addEventListener("click", function () {
  currentStep = 1;
  goToStep(1);
});

// Step 3 ← Back to Step 2
backBtn3.addEventListener("click", function () {
  currentStep = 2;
  goToStep(2);
});

// Submit button
nextBtn3.addEventListener("click", function () {
  handleSubmit();
});

/* ======================================================
   5. PATIENT TYPE BUTTONS
   ======================================================
   When the user clicks "New Patient" or "Returning Patient",
   remove active from all buttons and add it to the clicked one.
====================================================== */

patientBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    // Remove active from ALL buttons + reset icons
    patientBtns.forEach(function (b) {
      b.classList.remove("active");
      b.querySelector("i").className = "ti ti-circle";
    });

    // Add active to clicked button + fill its icon
    this.classList.add("active");
    this.querySelector("i").className = "ti ti-circle-filled";
  });
});

/* ======================================================
   6. CALENDAR
   ======================================================
   Builds a monthly calendar grid dynamically using JS.
   The user can navigate months and click a day to select it.
====================================================== */

// Month names array — index 0 = January, 11 = December
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Time slots to show (hardcoded for frontend-only)
const morningSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
];
const afternoonSlots = ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

// Slots that are "taken" (in a real app this comes from a backend)
const takenSlots = ["9:00 AM", "11:00 AM", "2:00 PM"];

/*
  buildCalendar() — draws the calendar grid for the current month.
  Called once on page load and again when user navigates months.
*/
function buildCalendar() {
  // Get the year and month from our calendarDate variable
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth(); // 0-11

  // Update the month label text (e.g. "May 2026")
  monthLabel.textContent = monthNames[month] + " " + year;

  // Figure out what day of the week the 1st falls on (0=Sun, 6=Sat)
  const firstDay = new Date(year, month, 1).getDay();

  // Figure out how many days are in this month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Today's date for comparison
  const today = new Date();

  // Clear the calendar grid before rebuilding
  calendarGrid.innerHTML = "";

  // Add empty cells for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.classList.add("day", "empty");
    calendarGrid.appendChild(empty);
  }

  // Add a cell for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.textContent = day;

    // Build a date object for this day
    const thisDate = new Date(year, month, day);

    // Is this day in the past? → disable it
    if (
      thisDate <
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
    ) {
      dayEl.classList.add("disabled");

      // Is this today? → mark it
    } else if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayEl.classList.add("today");
      addDayClickListener(dayEl, thisDate);

      // Is this the selected date? → mark it
    } else if (
      selectedDate &&
      thisDate.toDateString() === selectedDate.toDateString()
    ) {
      dayEl.classList.add("selected");
      addDayClickListener(dayEl, thisDate);
    } else {
      // Future date → clickable
      addDayClickListener(dayEl, thisDate);
    }

    calendarGrid.appendChild(dayEl);
  }

  // Build the time slots below the calendar
  buildTimeSlots();
}

/*
  addDayClickListener() — makes a day cell clickable.
  When clicked, it selects that date and rebuilds the calendar.
*/
function addDayClickListener(dayEl, date) {
  dayEl.addEventListener("click", function () {
    selectedDate = date;
    selectedTime = null; // reset time when date changes
    buildCalendar(); // rebuild to show selected state
  });
}

/*
  buildTimeSlots() — draws the time slot buttons below the calendar.
*/
function buildTimeSlots() {
  // Clear existing slots
  timeSlotsContainer.innerHTML = "";

  // Only show time slots if a date is selected
  if (!selectedDate) {
    timeSlotsContainer.innerHTML =
      '<p style="font-size:13px; color: var(--color-text-muted); padding: 12px;">Select a date to see available times.</p>';
    return;
  }

  // Build morning slots
  const morningLabel = document.createElement("p");
  morningLabel.classList.add("time-label");
  morningLabel.textContent = "Morning";
  timeSlotsContainer.appendChild(morningLabel);

  const morningGrid = document.createElement("div");
  morningGrid.classList.add("slots-grid");
  morningSlots.forEach(function (time) {
    morningGrid.appendChild(createSlot(time));
  });
  timeSlotsContainer.appendChild(morningGrid);

  // Build afternoon slots
  const afternoonLabel = document.createElement("p");
  afternoonLabel.classList.add("time-label");
  afternoonLabel.textContent = "Afternoon";
  timeSlotsContainer.appendChild(afternoonLabel);

  const afternoonGrid = document.createElement("div");
  afternoonGrid.classList.add("slots-grid");
  afternoonSlots.forEach(function (time) {
    afternoonGrid.appendChild(createSlot(time));
  });
  timeSlotsContainer.appendChild(afternoonGrid);
}

/*
  createSlot() — creates one time slot button.
  Marks it as taken, selected, or available.
*/
function createSlot(time) {
  const slot = document.createElement("button");
  slot.classList.add("slot");
  slot.textContent = time;
  slot.type = "button";

  // Is this slot taken?
  if (takenSlots.includes(time)) {
    slot.classList.add("taken");
    slot.disabled = true;

    // Is this the selected time?
  } else if (time === selectedTime) {
    slot.classList.add("selected");
  } else {
    // Available → clicking selects it
    slot.addEventListener("click", function () {
      selectedTime = time;
      buildTimeSlots(); // rebuild to show selected state
    });
  }

  return slot;
}

/* ======================================================
   7. CALENDAR NAVIGATION
   ======================================================
   Prev/Next buttons change the month being displayed.
====================================================== */

prevMonthBtn.addEventListener("click", function () {
  // Go back one month
  calendarDate.setMonth(calendarDate.getMonth() - 1);
  buildCalendar();
});

nextMonthBtn.addEventListener("click", function () {
  // Go forward one month
  calendarDate.setMonth(calendarDate.getMonth() + 1);
  buildCalendar();
});

/* ======================================================
   8. UPDATE SUMMARY (Step 3)
   ======================================================
   Before showing Step 3, fill in the summary card
   with the user's selections from Steps 1 and 2.
====================================================== */

function updateSummary() {
  // Get selected patient type
  const activePatientBtn = document.querySelector(".patient-btn.active");
  const patientType = activePatientBtn
    ? activePatientBtn.textContent.trim()
    : "Not selected";

  // Get selected visit reason (first select dropdown)
  const visitReason = selects[0] ? selects[0].value : "Not selected";

  // Get selected doctor (second select dropdown)
  const doctor = selects[1] ? selects[1].value : "Not selected";

  // Format the selected date and time
  let dateTimeText = "Not selected yet";
  if (selectedDate && selectedTime) {
    const options = { weekday: "short", month: "long", day: "numeric" };
    dateTimeText =
      selectedDate.toLocaleDateString("en-US", options) + " · " + selectedTime;
  } else if (selectedDate) {
    dateTimeText = "Date selected — please pick a time";
  }

  // Find the summary value elements and update them
  const summaryValues = document.querySelectorAll(".summary-value");

  // Order matches the HTML: Location, Reason, Doctor, Date & Time
  if (summaryValues[0]) summaryValues[0].textContent = "Basira Eye Center";
  if (summaryValues[1]) summaryValues[1].textContent = visitReason;
  if (summaryValues[2]) summaryValues[2].textContent = doctor;
  if (summaryValues[3]) summaryValues[3].textContent = dateTimeText;
}

const editLinks = document.querySelectorAll(".edit-link");

editLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    const step = parseInt(this.getAttribute("data-step"));
    currentStep = step;
    goToStep(step);
  });
});

/* ======================================================
   9. HANDLE SUBMIT
   ======================================================
   Validates the form and shows a success message.
   TODO: connect to backend when ready.
====================================================== */

function handleSubmit() {
  // Get the form fields
  const firstName = document
    .querySelector('input[placeholder="First Name"]')
    .value.trim();
  const lastName = document
    .querySelector('input[placeholder="Last Name"]')
    .value.trim();
  const email = document.querySelector('input[type="email"]').value.trim();

  // Simple validation — check required fields
  if (!firstName || !lastName || !email) {
    showMessage(
      "Please fill in all required fields (First Name, Last Name, Email).",
      "error",
    );
    return; // stop here, don't submit
  }

  // Check that a date and time were selected
  if (!selectedDate || !selectedTime) {
    showMessage(
      "Please select an appointment date and time in Step 2.",
      "error",
    );
    return;
  }

  // If everything is valid → show success
  showMessage(
    "Your appointment request has been submitted! We will contact you to confirm.",
    "success",
  );

  // TODO: send data to backend here
  console.log("Appointment submitted:", {
    firstName,
    lastName,
    email,
    date: selectedDate,
    time: selectedTime,
    doctor: selects[1] ? selects[1].value : "",
    reason: selects[0] ? selects[0].value : "",
  });
}

/*
  showMessage() — shows a success or error message at the top of step 3.
*/
function showMessage(text, type) {
  // Remove any existing message first
  const existing = document.querySelector(".booking-message");
  if (existing) existing.remove();

  // Create the message element
  const msg = document.createElement("div");
  msg.classList.add("booking-message", type);
  msg.textContent = text;

  // Style it
  msg.style.padding = "14px 20px";
  msg.style.borderRadius = "var(--radius-md)";
  msg.style.marginBottom = "var(--space-md)";
  msg.style.fontSize = "14px";
  msg.style.fontWeight = "500";
  msg.style.opacity = "0";
  msg.style.transition = "opacity 0.3s ease";

  if (type === "success") {
    msg.style.background = "var(--color-primary-light)";
    msg.style.color = "var(--color-primary)";
    msg.style.border = "1px solid var(--color-border)";
  } else {
    msg.style.background = "#fef2f2";
    msg.style.color = "#dc2626";
    msg.style.border = "1px solid #fecaca";
  }

  // Insert before the button row
  const btnRow = step3.querySelector(".btn-row");
  step3.insertBefore(msg, btnRow);

  // Fade it in
  setTimeout(function () {
    msg.style.opacity = "1";
  }, 50);

  // Auto-remove after 5 seconds
  setTimeout(function () {
    msg.style.opacity = "0";
    setTimeout(function () {
      msg.remove();
    }, 300);
  }, 5000);
}

/* ======================================================
   10. INITIALIZE — run when page loads
   ======================================================
   Set the initial state: show step 1, build calendar.
====================================================== */

// Remove the TODO temporary CSS overrides — show step 1 only
goToStep(1);

// Build the calendar for the current month
buildCalendar();

console.log("booking.js loaded successfully.");
