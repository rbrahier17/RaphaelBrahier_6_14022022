

class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerCard() {
    const article = document.createElement('article')
    article.classList.add('photographer-card')

    const photographerCard = `
      <a href="#" aria-label="${this._photographer.name}">
        <img alt="" src="${this._photographer.portrait}" />
        <h2 >${this._photographer.name}</h2>
      </a>
      <p>
        <span class="localisation">${this._photographer.localisation}</span>
        <span class="tagline">${this._photographer.tagline}</span>
        <span class="daily-rate">${this._photographer.dailyRate}</span>
      </p>
    `
    article.innerHTML = photographerCard
    return article;
  }
}
