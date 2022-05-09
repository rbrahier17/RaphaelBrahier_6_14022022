/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function mediaFactory (data, photographerName) {
  let { id, photographerId, title, image, video, likes, date, price } = data;

  const isMediaVideo = !!data.video;
  const isMediaImage = !!data.image;

  const mediaSrc = `assets/photographers/media/${photographerName}/${
    isMediaImage ? image : isMediaVideo ? video : null
  }`;

  function getMediaCardDOM () {
    // COMMON MEDIAS SETTINGS (FOR ALL TYPES OF MEDIAS)

    // Create card elements
    const article = document.createElement("article");
    const link = document.createElement("a");
    const p = document.createElement("p");
    const headline = document.createElement("h2");
    const divLikes = document.createElement("div");
    const span2 = document.createElement("span");
    const btnLike = document.createElement("button");
    const icon = document.createElement("img");
    const accessibleBtnContent = document.createElement("span");

    // Set attributes
    article.setAttribute("id", id);
    article.setAttribute("data-date", date);
    link.setAttribute("href", "#");
    headline.setAttribute("class", "title");
    divLikes.setAttribute("class", "likes-container");
    span2.setAttribute("class", "likes-counter");
    icon.setAttribute("class", "likes-icon");
    icon.setAttribute("alt", "Likes");
    icon.setAttribute("src", "assets/icons/heart-solid-red.svg");
    accessibleBtnContent.setAttribute("class", "visually-hidden btnLike-accessible");

    // Set textual content
    headline.textContent = title;
    span2.textContent = likes;
    accessibleBtnContent.textContent = "Ajouter un like";

    // Append childs
    article.appendChild(link);
    p.appendChild(headline);
    btnLike.appendChild(icon);
    btnLike.appendChild(accessibleBtnContent);
    divLikes.appendChild(span2);
    divLikes.appendChild(btnLike);
    p.appendChild(divLikes);
    article.appendChild(p);

    // SPECIFIC MEDIA SETTINGS

    if (isMediaImage) {
      link.setAttribute("aria-label", "Ouvrir la lightbox vers l'image intitulée: " + title + ".");
      const img = document.createElement("img");
      img.setAttribute("src", mediaSrc);
      img.setAttribute("alt", title);
      link.appendChild(img);
    }

    if (isMediaVideo) {
      const div = document.createElement("div");
      const video = document.createElement("video");
      const span = document.createElement("span");
      link.setAttribute("aria-label", "Ouvrir la lightbox vers la vidéo intitulée: " + title + ".");
      video.setAttribute("src", mediaSrc);
      video.setAttribute("preload", "metadata");
      video.setAttribute("title", title);
      div.setAttribute("class", "video-container");
      span.setAttribute("class", "play-video-icon");
      div.appendChild(video);
      div.appendChild(span);
      link.appendChild(div);
    }

    return article;
  }

  function likeMedia (mediaCardDOM) {
    const likesContainer = mediaCardDOM.querySelector(".likes-container");
    const likesCounter = mediaCardDOM.querySelector(".likes-counter");
    const btnLikesAccessibleContent = mediaCardDOM.querySelector(".btnLike-accessible");

    let mediaIsLiked = false;

    likesContainer.addEventListener("click", function () {
      if (!mediaIsLiked) {
        likes += 1;
        likesCounter.innerText = likes;
        likesContainer.classList.add("media-is-liked");
        updateTotalLikes("INC");
        mediaIsLiked = true;
        btnLikesAccessibleContent.textContent = "Retirer un like";
      } else if (mediaIsLiked) {
        likes -= 1;
        likesCounter.innerText = likes;
        likesContainer.classList.remove("media-is-liked");
        updateTotalLikes("DEC");
        mediaIsLiked = false;
        btnLikesAccessibleContent.textContent = "Ajouter un like";
      }
    });
  }

  return { mediaFactory, getMediaCardDOM, likeMedia };
}
