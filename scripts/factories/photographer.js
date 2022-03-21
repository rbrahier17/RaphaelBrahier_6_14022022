/* eslint-disable no-unused-vars */
function photographerFactory (data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/ID-photo/${portrait}`;
  const localisation = city + ", " + country;
  const dailyRate = price + "€/jour";
  const linkHREF = "/photographer.html" + "?id=" + id;

  function getPhotographerCardDOM () {
    // Create card elements
    const article = document.createElement("article");
    const link = document.createElement("a");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");

    // Set attributes
    link.setAttribute("href", linkHREF);
    link.setAttribute("aria-label", name);
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    span1.setAttribute("class", "localisation");
    span2.setAttribute("class", "tagline");
    span3.setAttribute("class", "daily-rate");

    // Set textual content
    h2.textContent = name;
    span1.textContent = localisation;
    span2.textContent = tagline;
    span3.textContent = dailyRate;

    // Append childs
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(link);
    p.appendChild(span1);
    p.appendChild(span2);
    p.appendChild(span3);
    article.appendChild(p);

    return (article);
  }
  return { name, linkHREF, localisation, tagline, dailyRate, picture, getPhotographerCardDOM };
}
