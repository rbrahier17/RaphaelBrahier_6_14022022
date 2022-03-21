async function getAllPhotographers () {
  // eslint-disable-next-line no-undef
  const photographerApi = new PhotographerApi();
  return await photographerApi.getAllPhotographers();
}

async function displayData (photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getPhotographerCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

function loader (loading) {
  const contentElements = document.querySelectorAll("header , main");
  const loader = document.querySelector(".loader");
  contentElements.forEach(function (el) { el.style.opacity = "0"; });
  if (!loading) {
    contentElements.forEach(function (el) { el.style.opacity = "1"; });
    loader.style.display = "none";
  }
}

async function init () {
  loader(true);
  const photographers = await getAllPhotographers();
  displayData(photographers);
  setTimeout(() => loader(false), 100); // 100ms security delay
};

init();
