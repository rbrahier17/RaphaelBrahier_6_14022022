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

async function init () {
  const photographers = await getAllPhotographers();
  displayData(photographers);
};

init();
