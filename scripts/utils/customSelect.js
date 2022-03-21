const btn = document.querySelector(".dropdown button");
const btnText = document.querySelector(".dropdown button span");
const btnArrow = document.querySelector(".dropdown button img");
const list = document.querySelector("#dropdown__list");
const options =
document.querySelectorAll("#dropdown__list li");

let listIsOpen = false;

btnText.innerText = options[0].textContent;

options[0].style.display = "none";

options.forEach(option => {
  option.addEventListener("click", function (e) {
    btnText.innerText = option.textContent;
    [...options].filter(el => el !== option).forEach(function (el) { el.style.display = "block"; });
    option.style.display = "none";
    btnArrow.style.transition = "none";
    addBorder();
    toggleDropdown();
  });
});

addBorder();

function addBorder () {
  const visibleOptions = [...options].filter(option => option.style.display !== "none");
  visibleOptions[0].classList.add("bordered");
  visibleOptions[1].classList.remove("bordered");
}

btn.addEventListener("click", function () {
  toggleDropdown();
});

function toggleDropdown () {
  if (!listIsOpen) {
    list.classList.add("open");
    btnArrow.style.transform = "rotate(-180deg)";
    listIsOpen = true;
  } else if (listIsOpen) {
    list.classList.remove("open");
    btnArrow.style.transform = "rotate(360deg)";
    listIsOpen = false;
  }
}
