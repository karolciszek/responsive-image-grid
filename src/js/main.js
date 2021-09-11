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

      // Our tiles only show the small image
      this.imgUrl = unsplData.urls.small;

      this.href = unsplData.links.html;
      this.id = unsplData.id;
    }
    // TODO: include likes of photo?
  }

  const photos = [];

  function createPhotos (photoData) {
    photoData.forEach(obj => {
      photos.push(new UnsplashPhoto(obj));

      // Dev purposes
      console.log(photos);
    });
  }

  function fetchPhotos () {
    return fetch(photosURI)
      .then(response => response.json());
  }

  console.log("Hello world!");

  fetchPhotos()
    .then(data => createPhotos(data))
    .catch(err => console.log(err));
})();