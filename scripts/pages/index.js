async function getAllPhotographers () {
  // Data is retrieved from the file hosted on GitHub for compatibility with deployment on Git Hub Pages and to simulate a real API.
  // eslint-disable-next-line no-undef
  const photographerApi = new PhotographerApi("https://rbrahier17.github.io/RaphaelBrahier_6_14022022/data/photographers.json");
  return await photographerApi.getAllPhotographers();
}

async function displayData (photographers) {
  const photographersSection = document.querySelector("#photographers");

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getPhotographerCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

function gitHubPagesRedirection () {
  const photographersLinks = document.querySelectorAll("#photographers article a");
  photographersLinks.forEach(link => link.addEventListener("click", function (e) {
    e.preventDefault();
    const id = link.href.split("?id=")[1];
    localStorage.setItem("photographerId", id);
    window.location.href = "photographer.html";
  }));
}

async function init () {
  const photographers = await getAllPhotographers();
  displayData(photographers);
  if (window.location.href.indexOf(".github.io") > -1) {
    gitHubPagesRedirection();
  }
};

init();
