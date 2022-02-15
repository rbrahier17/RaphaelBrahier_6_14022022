class IndexPage {
  constructor() {
      this.photographersSection = document.querySelector('.photographer_section')
      this.photographersApi = new PhotographersApi('../../data/photographers.json')
  }

  async main() {
    const photographersData = await this.photographersApi.getPhotographers()
      
      photographersData
          .map(photographer => new Photographer(photographer))
          .forEach(photographer => {
              const Template = new PhotographerCard(photographer)
              this.photographersSection.appendChild(
                  Template.createPhotographerCard()
              )
          })
  }
}

const app = new IndexPage()
app.main()