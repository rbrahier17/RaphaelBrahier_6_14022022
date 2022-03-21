/* eslint-disable no-undef */

// eslint-disable-next-line no-unused-vars
function mediaFactory (data, photographerName) {
  const isMediaVideo = !!data.video;
  const isMediaImage = !!data.image;

  const media = {
    id: data.id,
    photographerId: data.photographerId,
    title: data.title,
    mediaUrl: isMediaImage ? data.image : isMediaVideo ? data.video : null,
    likes: data.likes,
    date: data.date,
    price: data.price
  };

  const mediaSrc = `assets/photographers/media/${photographerName}/${media.mediaUrl}`;

  function getMediaCardDOM () {
    // ALL MEDIAS SETTINGS

    // Create card elements
    const article = document.createElement("article");
    const link = document.createElement("a");
    const p = document.createElement("p");
    const span1 = document.createElement("span");
    const divLikes = document.createElement("div");
    const span2 = document.createElement("span");
    const icon = document.createElement("img");

    // Set attributes
    article.setAttribute("id", media.id);
    article.setAttribute("data-date", media.date);
    link.setAttribute("href", "#");
    link.setAttribute("aria-label", media.title);
    span1.setAttribute("class", "title");
    divLikes.setAttribute("class", "likes-container");
    span2.setAttribute("class", "likes-counter");
    icon.setAttribute("class", "likes-icon");
    icon.setAttribute("alt", "likes");
    icon.setAttribute("src", "assets/icons/heart-solid-red.svg");

    // Set textual content
    span1.textContent = media.title;
    span2.textContent = media.likes;

    // Append childs
    article.appendChild(link);
    p.appendChild(span1);
    divLikes.appendChild(span2);
    divLikes.appendChild(icon);
    p.appendChild(divLikes);
    article.appendChild(p);

    // SPECIFIC MEDIA SETTINGS

    if (isMediaImage) {
      const img = document.createElement("img");
      img.setAttribute("src", mediaSrc);
      img.setAttribute("alt", "");
      link.appendChild(img);
    }

    if (isMediaVideo) {
      const div = document.createElement("div");
      const video = document.createElement("video");
      const span = document.createElement("span");
      video.setAttribute("src", mediaSrc);
      video.setAttribute("preload", "metadata");
      div.setAttribute("class", "video-container");
      span.setAttribute("class", "play-video-icon");
      div.appendChild(video);
      div.appendChild(span);
      link.appendChild(div);
    }

    return (article);
  }

  function likeMedia (mediaCardDOM) {
    const likesContainer = mediaCardDOM.querySelector(".likes-container");
    const likesCounter = mediaCardDOM.querySelector(".likes-counter");

    let mediaIsLiked = false;

    likesContainer.addEventListener("click", function () {
      if (!mediaIsLiked) {
        media.likes += 1;
        likesCounter.innerText = media.likes;
        likesContainer.classList.add("media-is-liked");
        updateTotalLikes("INC");
        mediaIsLiked = true;
      } else if (mediaIsLiked) {
        media.likes -= 1;
        likesCounter.innerText = media.likes;
        likesContainer.classList.remove("media-is-liked");
        updateTotalLikes("DEC");
        mediaIsLiked = false;
      }
    });
  }

  return { media, mediaFactory, getMediaCardDOM, likeMedia };
}
