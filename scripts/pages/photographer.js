/* eslint-disable no-undef */

/**
 *
 * @returns { string } The photographer's id contained in URL
 */
function getPhotographerId () {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
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
    const mediaModel = mediaFactory(media, photographerName);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
    mediaModel.likeMedia(mediaCardDOM);
  });
};

// eslint-disable-next-line no-unused-vars
function updateTotalLikes (action) {
  const totalLikesCounter = document.querySelector(".total-likes-counter");
  let currentTotal = parseInt(totalLikesCounter.textContent);
  if (action === "INC") totalLikesCounter.innerText = currentTotal += 1;
  else if (action === "DEC") totalLikesCounter.innerText = currentTotal -= 1;
}

function handleSort () {
  let sorter;
  options.forEach(option => {
    option.addEventListener("click", function () {
      switch (option.id) {
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
      const sortedMedias = sorter.sort();
      sorter.reorderMedias(sortedMedias);
    });
  });
}

function loader (loading) {
  const contentElements = document.querySelectorAll("header , main");
  const loader = document.querySelector(".loader");
  if (!loading) {
    contentElements.forEach(function (el) { el.style.opacity = "1"; });
    loader.style.display = "none";
  }
}

async function init () {
  loader(true);
  const photographerId = getPhotographerId();
  // Data is retrieved from the file hosted on GitHub for compatibility with deployment on Git Hub Pages and to simulate a real API.
  const photographerApi = new PhotographerApi("https://rbrahier17.github.io/RaphaelBrahier_6_14022022/data/photographers.json");
  const photographer = await photographerApi.getOnePhotographer(photographerId);
  const photographerLikes = await photographerApi.getPhotographerLikes(photographerId);
  const medias = await photographerApi.getMedias(photographerId);
  setPhotographHeader(photographer);
  setBottomInfo(photographer, photographerLikes);
  displayMedias(medias, photographer.name);
  handleSort();
  setTimeout(() => loader(false), 100); // 100ms security delay

  lightbox();
}

init();
