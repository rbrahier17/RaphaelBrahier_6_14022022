class Photographer {
  constructor(data) {
      this._name     = data.name
      this._id       = data.id
      this._city     = data.city
      this._country  = data.country
      this._tagline  = data.tagline
      this._price    = data.price
      this._portrait = data.portrait
  }

  get name() {
    return this._name
  }

  get portrait() {
      return `/assets/photographers/ID-photo/${this._portrait}`
  }

  get localisation() {
      return `${this._city}, ${this._country}`
  }

  get tagline() {
      return this._tagline
  }

  get dailyRate() {
      return `${this._price}€/jour`
  }
}