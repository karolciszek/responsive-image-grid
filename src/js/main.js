// Global function closure
(function () {
  const API_ROOT = 'https://api.unsplash.com';
  const ACCESS_KEY = 'in_progress';
  const keyURI = 'http://localhost:3000/unsplash_key';
  // const photosURI = `${API_ROOT}/photos/?client_id=${ACCESS_KEY}`;

  // Make GET requests from a dummy API instead for development purposes
  const photosURI = `https://responsive-image-grid.free.beeceptor.com`;

  class UnsplashPhoto {
    constructor (unsplData) {
      this.unsplData = unsplData;
      this.authorName = unsplData.user.name;
      this.altText = unsplData.alt_description;

      // Our tiles only show the regular image
      this.imgUrl = unsplData.urls.regular;

      this.href = unsplData.links.html;
      this.id = unsplData.id;
    }
    // TODO: include likes of photo?

    render () {
      const elem = document.createElement("div");
      elem.id = this.id;
      elem.classList.add("photo-container");
      elem.innerHTML = `
        <a href="${this.href}">
          <img class="photo-image" src="${this.imgUrl}" alt="${this.altText}" />
          <p class="photo-author">${this.authorName}</p>
        </a>
      `;
      return elem;
    }
  }

  function createPhotos (photoData) {
    const photos = [];
    photoData.forEach(obj => {
      photos.push(new UnsplashPhoto(obj));

      // Dev purposes
      console.log(photos);
    });
    return photos;
  }

  function fetchPhotos () {
    return fetch(photosURI)
      .then(response => response.json());
  }

  console.log("Hello world!");

  photos = fetchPhotos()
    .then(data => createPhotos(data))
    .catch(err => console.log(err));

  const container = document.getElementById("container");

  photos
    .then(ps => {
      ps.forEach(p => container.appendChild(p.render()));
    });
})();