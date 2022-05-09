/* eslint-disable no-unused-vars */

function displayModal () {
  const mainWrapper = document.querySelector(".main-wrapper");
  const modal = document.getElementById("contact_modal");
  const form = modal.querySelector("form");
  const submitConfirmation = document.querySelector("#contact_modal .submitConfirmation");
  modal.style.display = "block";
  modal.ariaHidden = "false";
  mainWrapper.ariaHidden = "true";
  form.style.display = "block";
  submitConfirmation.style.display = "none";
  const firstInput = modal.querySelector("input");
  firstInput.focus();
  document.addEventListener("keydown", keepFocusInModal);
  document.addEventListener("keydown", closeModal);
}

function closeModal (e) {
  if (e !== undefined && e.key && e.key !== "Escape" && e.key !== "Esc") {
    // Close modal with escape key
    return;
  }
  const mainWrapper = document.querySelector(".main-wrapper");
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.ariaHidden = "true";
  mainWrapper.ariaHidden = "false";
  document.removeEventListener("keydown", keepFocusInModal);
  document.removeEventListener("keydown", closeModal);
  modal.querySelector("form").reset();
}

function keepFocusInModal (e) {
  const modal = document.getElementById("contact_modal");
  const focusableElements = [...modal.querySelectorAll("button, input, textarea")];

  const isTabPressed = e.key === "Tab";

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) {
    // if shift + tab combination
    if (document.activeElement === focusableElements[0]) {
      // if focused is on the first focusable element then focus last focusable element after pressing  shift + tab combination
      focusableElements[focusableElements.length - 1].focus();
      e.preventDefault();
    }
  } else {
    // if tab key is pressed
    if (document.activeElement === focusableElements[focusableElements.length - 1]) {
      // if focused has reached to last focusable element then focus first focusable element after pressing tab
      focusableElements[0].focus();
      e.preventDefault();
    }
  }
}

function setAriaValidity () {
  const inputs = document.querySelectorAll("#firstName, #lastName, #email");
  for (const input of inputs) {
    input.addEventListener("change", (event) => {
      if (input.validity.valid) input.setAttribute("aria-invalid", "false");
    });
  }
}

function logUserDatas () {
  const userDatas = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };
  const photographerName = document.querySelector(".modal h2").innerText.split("Contactez-moi")[1].trim();
  console.log(
    `Bonjour ${photographerName}, \n\nVous avez reçu une demande de contact de la part d'un utilisateur Fisheye: \n\nNom: ${
      userDatas.firstName
    } ${userDatas.lastName}, \nEmail: ${userDatas.email}, ${
      userDatas.message ? "\nMessage: " + userDatas.message : ""
    }\n\nCordialement, L'équipe Fisheye.`
  );
}

function submitContactForm () {
  const form = document.querySelector("#contact_modal form");
  const submitConfirmation = document.querySelector("#contact_modal .submitConfirmation");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    logUserDatas();
    form.style.display = "none";
    submitConfirmation.style.display = "block";
    form.reset();
    document.querySelector("#contact_modal .closeBtn").focus();
  });
}

// eslint-disable-next-line no-unused-vars
function initContactForm (photographerName) {
  document.querySelector("#contact_modal h2").innerHTML += photographerName;
  setAriaValidity();
  document.querySelector(".openContactBtn").addEventListener("click", displayModal);
  submitContactForm();
  document.querySelector("#contact_modal .closeBtn").addEventListener("click", closeModal);
}
