/* eslint-disable no-undef */

function toggleDropdown () {
  const list = document.querySelector("#dropdown__list");
  const options = document.querySelectorAll("#dropdown__list li");
  const btnArrow = document.querySelector(".dropdown button img");
  const isListOpen = list.classList.contains("open");
  const btn = document.querySelector(".dropdown button");
  if (!isListOpen) {
    list.classList.add("open");
    btnArrow.style.transform = "rotate(-180deg)";
    options.forEach((option, idx) => option.setAttribute("tabindex", idx + 1));
    document.addEventListener("keydown", arrowsOptionsNav);
    listenOptions();
    btn.ariaExpanded = "true";
  } else if (isListOpen) {
    list.classList.remove("open");
    btnArrow.style.transform = "rotate(360deg)";
    document.removeEventListener("keydown", arrowsOptionsNav);
    btn.ariaExpanded = "false";
  }
}

function selectOption (option) {
  const list = document.querySelector("#dropdown__list");
  const options = document.querySelectorAll("#dropdown__list li");
  const btnText = document.querySelector(".dropdown button span");
  btnText.innerText = option.textContent;
  list.appendChild(option);
  [...options].filter(el => el !== option).forEach((el) => list.appendChild(el));
  switchSortingOption(option.id);
  toggleDropdown();
}

function listenOptions () {
  const options = document.querySelectorAll("#dropdown__list li");
  options.forEach(option => {
    option.addEventListener("click", () => selectOption(option));
    option.addEventListener("keydown", (e) => {
      if (e.key === "Enter") selectOption(option);
    });
  });
}

function switchSortingOption (optionID) {
  let sorter;
  console.log(optionID);
  switch (optionID) {
    case "popularity":
      sorter = new PopularitySorter();
      break;
    case "title":
      sorter = new TitleSorter();
      break;
    case "date":
      sorter = new DateSorter();
      break;
  }
  sorter.sort();
}

function arrowsOptionsNav (e) {
  if (e.key !== "ArrowDown" && e.key !== "ArrowUp") {
    return;
  }
  const btn = document.querySelector(".dropdown button");
  const visibleOptions = document.querySelectorAll("#dropdown__list li:not(:first-child)");
  const firstOption = visibleOptions[0];
  const lastOption = visibleOptions[visibleOptions.length - 1];
  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (document.activeElement === btn) {
      firstOption.focus();
    } else if (document.activeElement === lastOption) {
      btn.focus();
    } else {
      document.activeElement.nextElementSibling.focus();
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (document.activeElement === btn) {
      lastOption.focus();
    } else if (document.activeElement === firstOption) {
      btn.focus();
    } else {
      document.activeElement.previousElementSibling.focus();
    }
  }
}

function openListWithDownArrow (e) {
  const list = document.querySelector("#dropdown__list");
  const isListOpen = list.classList.contains("open");
  if (e.key === "ArrowDown" && !isListOpen) {
    e.stopPropagation();
    toggleDropdown();
  }
}

function init () {
  const btn = document.querySelector(".dropdown button");
  const btnText = document.querySelector(".dropdown button span");
  const options = document.querySelectorAll("#dropdown__list li");

  btnText.innerText = options[0].textContent;

  btn.addEventListener("click", toggleDropdown);
  btn.addEventListener("keydown", (e) => openListWithDownArrow(e));
}

init();
