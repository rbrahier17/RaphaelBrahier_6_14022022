async function getAllPhotographers () {
  // eslint-disable-next-line no-undef
  const photographerApi = new PhotographerApi();
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
}

/**
 * This function allows to deploy the project on GitHub Pages that doesn't support URL params.
 * Instead of URL params, it use localStorage to store photographer Id.
 * This type of redirection is only used if the project is consulted on GitHub Pages.
 */
function gitHubPagesRedirection () {
  const photographersLinks = document.querySelectorAll("#photographers article a");
  photographersLinks.forEach((link) =>
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const id = link.href.split("?id=")[1];
      localStorage.setItem("photographerId", id);
      window.location.href = "photographer.html";
    })
  );
}

async function init () {
  const photographers = await getAllPhotographers();
  displayData(photographers);
  if (window.location.href.indexOf(".github.io") > -1) {
    gitHubPagesRedirection();
  }
}

init();
