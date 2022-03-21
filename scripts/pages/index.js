async function getAllPhotographers () {
  const gitHubPagesURL = "https://rbrahier17.github.io/RaphaelBrahier_6_14022022/data/photographers.json";
  const localURL = "../../data/photographers.json";
  const relevantURL = window.location.href.indexOf("github.io") > -1 ? gitHubPagesURL : localURL;
  // eslint-disable-next-line no-undef
  const photographerApi = new PhotographerApi(relevantURL);
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
