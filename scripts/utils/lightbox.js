// eslint-disable-next-line no-unused-vars
function lightbox () {
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox-container img");
  const images = document.querySelectorAll("article a img");
  const imagesLinks = document.querySelectorAll("article a");
  const imagesSrc = [];
  [...images].forEach(img => imagesSrc.push(img.src));
  [...imagesLinks].forEach(function (link) {
    link.addEventListener("click", function (e) {
      const imgSrc = e.target.src;
      lightboxImg.setAttribute("src", imgSrc);
      lightbox.style.display = "block";
    });
  });
}

function closeLightbox () {
  const lightbox = document.querySelector(".lightbox");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  closeBtn.addEventListener("click", function (e) {
    lightbox.style.display = "none";
  });
}

closeLightbox();
