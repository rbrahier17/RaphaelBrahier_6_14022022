// Returns photographer's Id from URL params
// If the project is consulted on GitHub Pages that doesn't support URL params the Id is retrieved from localStorage
function getPhotographerId () {
  if (window.location.href.indexOf(".github.io") > -1) {
    return localStorage.getItem("photographerId");
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  }
}

function setPhotographHeader (photographer) {
  // DOM Elements
  const header = document.querySelector(".photograph-header");
  const h1 = header.querySelector("h1");
  const localisation = header.querySelector(".localisation");
  const tagline = header.querySelector(".tagline");
  const img = header.querySelector("img");

  // Set textual content
  h1.innerText = photographer.name;
  localisation.innerText = `${photographer.city}, ${photographer.country}`;
  tagline.innerText = photographer.tagline;

  // Set attributes
  img.setAttribute("src", `assets/photographers/ID-photo/${photographer.portrait}`);
  img.setAttribute("alt", photographer.name);
}

function setBottomInfo (photographer, photographerLikes) {
  const bottomInfoContainer = document.querySelector(".bottom-info-container");
  const totalLikesCounter = bottomInfoContainer.querySelector(".total-likes-counter");
  const dailyRate = bottomInfoContainer.querySelector(".daily-rate");
  totalLikesCounter.innerText = photographerLikes;
  dailyRate.innerText = photographer.price + "€/jour";
}

async function displayMedias (medias, photographerName) {
  const mediaSection = document.querySelector(".media_section");

  medias.forEach((media) => {
    // eslint-disable-next-line no-undef
    const mediaModel = mediaFactory(media, photographerName);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
    mediaModel.likeMedia(mediaCardDOM);
  });
}

// eslint-disable-next-line no-unused-vars
function updateTotalLikes (action) {
  const totalLikesCounter = document.querySelector(".total-likes-counter");
  let currentTotal = parseInt(totalLikesCounter.textContent);
  if (action === "INC") totalLikesCounter.innerText = currentTotal += 1;
  else if (action === "DEC") totalLikesCounter.innerText = currentTotal -= 1;
}

async function init () {
  const photographerId = getPhotographerId();
  // eslint-disable-next-line no-undef
  const photographerApi = new PhotographerApi();
  const photographer = await photographerApi.getOnePhotographer(photographerId);
  const photographerLikes = await photographerApi.getPhotographerLikes(photographerId);
  const medias = await photographerApi.getMedias(photographerId);
  setPhotographHeader(photographer);
  setBottomInfo(photographer, photographerLikes);
  displayMedias(medias, photographer.name);
  /* eslint-disable no-undef */
  initLightbox();
  initContactForm(photographer.name);
  initCustomSelect();
  new PopularitySorter().sort(); // Initiate sort by sorting medias by popularity (number of likes)
  /* eslint-enable no-undef */
}

init();
