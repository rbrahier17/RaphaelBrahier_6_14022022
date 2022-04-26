function openLightBox () {
  const mainWrapper = document.querySelector(".main-wrapper");
  const lightbox = document.querySelector(".lightbox");
  const articlesLinks = document.querySelectorAll("article a");
  [...articlesLinks].forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (lightbox.style.display !== "block") {
        const mediaSrc = getTargetedMediaSrc(e.target);
        const mediaTitle = link.ariaLabel;
        lightbox.style.display = "block";
        mainWrapper.ariaHidden = "true";
        lightbox.ariaHidden = "false";
        displayMedia(mediaSrc, mediaTitle);
        lightbox.firstElementChild.focus();
        keepFocusInLightbox();
      }
    });
  });
}

// Allows to get the source whether the target is the clicked media (image or video) or the link receiving the focus in case of interaction with the keyboard.
function getTargetedMediaSrc (target) {
  if (target.tagName === "IMG" || target.tagName === "VIDEO") {
    return target.src;
  } else if (target.tagName === "A") {
    const media = target.querySelector("img, video");
    return media.src;
  }
}

function keepFocusInLightbox (e) {
  const lightbox = document.querySelector(".lightbox");
  const focusableElements = [...lightbox.querySelectorAll(".closeBtn, .prevMedia, video, .nextMedia")];

  focusableElements.forEach(el => {
    el.addEventListener("keydown", function (e) {
      const isTabPressed = e.key === "Tab";

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) { // if shift + tab combination
        if (document.activeElement === focusableElements[0]) {
          focusableElements[focusableElements.length - 1].focus();
          e.preventDefault();
        }
      } else { // if tab key is pressed
        if (document.activeElement === focusableElements[focusableElements.length - 1]) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
          focusableElements[0].focus();
          e.preventDefault();
        }
      }
    });
  });
}

function displayMedia (mediaSrc, mediaTitle) {
  const mediaContainer = document.querySelector(".lightbox > .mediaContainer");
  const mediaTitleNode = document.querySelector(".lightbox .mediaTitle");
  const displayedMedia = mediaContainer.firstChild;

  if (displayedMedia) {
    displayedMedia.ariaHidden = "true";
    displayedMedia.remove();
  }

  if (mediaSrc.includes(".mp4")) {
    const video = document.createElement("video");
    video.setAttribute("src", mediaSrc);
    video.setAttribute("controls", "controls");
    mediaContainer.insertBefore(video, mediaTitleNode);
    video.ariaHidden = "false";
  } else {
    const img = document.createElement("img");
    img.setAttribute("src", mediaSrc);
    img.setAttribute("alt", "");
    mediaContainer.insertBefore(img, mediaTitleNode);
    img.ariaHidden = "false";
  }

  mediaTitleNode.innerHTML = mediaTitle;
  mediaTitleNode.style.width = mediaContainer.firstChild.clientWidth + "px";
}

function displayNewMedia (scrollDirection) {
  const mediaContainer = document.querySelector(".lightbox > .mediaContainer");
  const currentSrc = mediaContainer.firstChild.src;
  const gallery = getGallery();
  const currentIndex = gallery.findIndex(el => el.mediaSrc === currentSrc);
  let newIndex;
  if (scrollDirection === "prev") {
    newIndex = currentIndex === 0 ? gallery.length - 1 : currentIndex - 1;
  } else if (scrollDirection === "next") {
    newIndex = currentIndex === gallery.length - 1 ? 0 : currentIndex + 1;
  }
  displayMedia(gallery[newIndex].mediaSrc, gallery[newIndex].mediaTitle);
}

function scrollMedias () {
  const btnPrev = document.querySelector(".lightbox > .prevMedia");
  const btnNext = document.querySelector(".lightbox > .nextMedia");

  [btnPrev, btnNext].forEach(function (btn) {
    btn.addEventListener("click", () => {
      btn === btnPrev ? displayNewMedia("prev") : displayNewMedia("next");
    });
    btn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") displayNewMedia("prev");
      else if (e.key === "ArrowRight") displayNewMedia("next");
    });
  });
}

function getGallery () {
  const medias = document.querySelectorAll("article a img, article a video");
  const gallery = [];
  [...medias].forEach(media => {
    const mediaTitle = media.tagName === "IMG" ? media.alt : media.title ? media.title : "";
    const mediaSrc = media.src;
    gallery.push({ mediaTitle, mediaSrc });
  });
  return gallery;
}

function handleCloseEvent (e) {
  const mainWrapper = document.querySelector(".main-wrapper");
  const lightbox = document.querySelector(".lightbox");
  if (e.type === "click" || e.key === "Escape" || e.key === "Esc") {
    lightbox.style.display = "none";
    lightbox.ariaHidden = "true";
    mainWrapper.ariaHidden = "false";
    document.removeEventListener("keydown", keepFocusInLightbox);
  }
}

function closeLightbox () {
  const closeBtn = document.querySelector(".lightbox > .closeBtn");
  closeBtn.addEventListener("click", handleCloseEvent);
  document.addEventListener("keydown", handleCloseEvent);
  document.removeEventListener("keydown", handleCloseEvent);
}

// eslint-disable-next-line no-unused-vars
function initLightbox () {
  openLightBox();
  scrollMedias();
  closeLightbox();
}
