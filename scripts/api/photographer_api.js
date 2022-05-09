// eslint-disable-next-line no-unused-vars
class PhotographerApi {
  constructor () {
    // Data is retrieved from the file hosted on GitHub to simulate a real API.
    this._url = "https://rbrahier17.github.io/RaphaelBrahier_6_14022022/data/photographers.json";
  }

  async get () {
    return fetch(this._url)
      .then((res) => res.json())
      .catch((err) => console.log("an error occurs", err));
  }

  async getAllPhotographers () {
    return (await this.get()).photographers;
  }

  async getOnePhotographer (photographerId) {
    const photographers = (await this.get()).photographers;
    return photographers.filter((photographer) => photographer.id === parseInt(photographerId))[0];
  }

  async getMedias (photographerId) {
    const medias = (await this.get()).media;
    return medias.filter((media) => media.photographerId === parseInt(photographerId));
  }

  async getPhotographerLikes (photographerId) {
    const photographerMedias = await this.getMedias(photographerId);
    return photographerMedias.map((media) => media.likes).reduce((a, b) => a + b);
  }
}
