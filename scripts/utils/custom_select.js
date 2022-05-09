// MANAGE THE CUSTOM SELECT MENU ON PHOTOGRAPHER PAGE THAT ALLOWS TO SORT MEDIAS BY OPTION

// Open or close dropdown
function toggleDropdown () {
  const isListOpen = document.querySelector("#dropdown__list").classList.contains("open");
  if (!isListOpen) {
    openDropdown();
  } else if (isListOpen) {
    closeDropdown();
  }
}

function openDropdown () {
  document.querySelector("#dropdown__list").classList.add("open");
  document.querySelector(".dropdown button").ariaExpanded = "true";
  document.querySelector(".dropdown .arrow-icon").style.transform = "rotate(-180deg)"; // Arrow icon pointing at the top
  document
    .querySelectorAll("#dropdown__list li[role='option']")
    .forEach((option, idx) => option.setAttribute("tabindex", idx + 1)); // Tab index is set to get the correct tab navigation order
  addDropdownListeners();
}

function closeDropdown () {
  document.querySelector("#dropdown__list").classList.remove("open");
  document.querySelector(".dropdown button").ariaExpanded = "false";
  document.querySelector(".dropdown .arrow-icon").style.transform = "rotate(360deg)"; // Arrow icon pointing at the top
  removeDropdownListeners();
}

function addDropdownListeners () {
  const options = document.querySelectorAll("#dropdown__list li[role='option']");
  const focusableElements = document.querySelectorAll(".dropdown button, #dropdown__list li:not(:first-child)");
  focusableElements.forEach((el) => el.addEventListener("keydown", arrowsOptionsNav)); // Navigate the list with Tab or vertical arrows
  options.forEach((option) => {
    option.addEventListener("click", selectOption); // Select option by clicking
    option.addEventListener("keydown", selectOption); // Select option by pressing enter
  });
}

// Removes event listeners when dropdown is closed to avoid event listeners interference problems or problems due to their accumulation
function removeDropdownListeners () {
  const options = document.querySelectorAll("#dropdown__list li[role='option']");
  const focusableElements = document.querySelectorAll(".dropdown button, #dropdown__list li:not(:first-child)");
  focusableElements.forEach((el) => el.removeEventListener("keydown", arrowsOptionsNav));
  options.forEach((option) => {
    option.removeEventListener("click", selectOption);
    option.removeEventListener("keydown", selectOption);
  });
}

// Triggers the appropriate sorting depending on the selected option (cf. sorters folder)
function switchSortingOption (optionID) {
  let sorter;
  switch (optionID) {
    case "popularity":
      // eslint-disable-next-line no-undef
      sorter = new PopularitySorter();
      break;
    case "title":
      // eslint-disable-next-line no-undef
      sorter = new TitleSorter();
      break;
    case "date":
      // eslint-disable-next-line no-undef
      sorter = new DateSorter();
      break;
  }
  sorter.sort();
}

// When option is selected, this function reorganizes dropdown list elements, trigger sorting function and close the dropdown list
function selectOption (e) {
  if (e.key && e.key !== "Enter") {
    // If event is keyboard event, continue only if 'Enter' key was pressed
    return;
  }
  const option = e.target;
  const list = document.querySelector("#dropdown__list");
  const options = document.querySelectorAll("#dropdown__list li");
  const btnText = document.querySelector(".dropdown button span");
  switchSortingOption(option.id); // Trigger sorting
  btnText.innerText = option.textContent; // Set button textual content to the value of the selected option
  list.appendChild(option); // Selected option becomes first element of the list
  [...options].filter((el) => el !== option).forEach((el) => list.appendChild(el)); // Append the other options
  toggleDropdown();
}

// Allows to navigate between options with keyboard arrows and tab key
function arrowsOptionsNav (e) {
  if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Tab" && !e.shiftKey) {
    return;
  }
  const btn = document.querySelector(".dropdown button");
  const visibleOptions = document.querySelectorAll("#dropdown__list li:not(:first-child)");
  const firstOption = visibleOptions[0];
  const lastOption = visibleOptions[visibleOptions.length - 1];
  if (e.key === "ArrowUp" || (e.shiftKey && e.key === "Tab")) {
    e.preventDefault();
    if (document.activeElement === btn) {
      lastOption.focus();
    } else if (document.activeElement === firstOption) {
      btn.focus();
    } else {
      document.activeElement.previousElementSibling.focus();
    }
  } else if (e.key === "ArrowDown" || e.key === "Tab") {
    e.preventDefault();
    if (document.activeElement === btn) {
      firstOption.focus();
    } else if (document.activeElement === lastOption) {
      btn.focus();
    } else {
      document.activeElement.nextElementSibling.focus();
    }
  }
}

// Allows to open list with down arrow key
function openListWithDownArrow (e) {
  const list = document.querySelector("#dropdown__list");
  const isListOpen = list.classList.contains("open");
  if (e.key === "ArrowDown" && !isListOpen) openDropdown();
}

// Allows to close list with escape key
function closeListWithEscape (e) {
  const list = document.querySelector("#dropdown__list");
  const isListOpen = list.classList.contains("open");
  if ((e.key === "Escape" || e.key === "Esc") && isListOpen) closeDropdown();
}

// eslint-disable-next-line no-unused-vars
function initCustomSelect () {
  const btn = document.querySelector(".dropdown button");
  const btnText = document.querySelector(".dropdown button span");
  const options = document.querySelectorAll("#dropdown__list li");

  btnText.innerText = options[0].textContent;

  btn.addEventListener("click", toggleDropdown);
  btn.addEventListener("keydown", (e) => openListWithDownArrow(e));
  document.addEventListener("keydown", (e) => closeListWithEscape(e));
}
