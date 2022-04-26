class Sorter {
  constructor () {
    this.mediasSection = document.querySelector(".media_section");
    this.medias = document.querySelectorAll(".media_section article");
  }

  sort () {
    return this.sortMedias().forEach(mediaElement => this.mediasSection.appendChild(mediaElement));
  }
}

// eslint-disable-next-line no-unused-vars
class TitleSorter extends Sorter {
  sortMedias () {
    const sortedMedias = [...this.medias].sort((a, b) => {
      const aTitle = a.querySelector(".title").textContent;
      const bTitle = b.querySelector(".title").textContent;
      return aTitle === bTitle ? 0 : (aTitle > bTitle ? 1 : -1);
    });
    return sortedMedias;
  }
}

// eslint-disable-next-line no-unused-vars
class PopularitySorter extends Sorter {
  sortMedias () {
    const sortedMedias = [...this.medias].sort((a, b) => {
      const aLikes = parseInt(a.querySelector(".likes-counter").textContent);
      const bLikes = parseInt(b.querySelector(".likes-counter").textContent);
      return aLikes === bLikes ? 0 : (aLikes < bLikes ? 1 : -1);
    });
    return sortedMedias;
  }
}

// eslint-disable-next-line no-unused-vars
class DateSorter extends Sorter {
  sortMedias () {
    const sortedMedias = [...this.medias].sort((a, b) => {
      const aDate = new Date(a.dataset.date);
      const bDate = new Date(b.dataset.date);
      return aDate === bDate ? 0 : (aDate < bDate ? 1 : -1);
    });
    return sortedMedias;
  }
}
