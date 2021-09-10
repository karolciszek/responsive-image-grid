// Global function closure
(function () {
  const API_ROOT = 'https://api.unsplash.com';
  const ACCESS_KEY = 'in_progress';
  const photosURI = `${API_ROOT}/photos/?client_id=${ACCESS_KEY}`;

  function fetchPhotos () {
    return fetch(photosURI)
      .then(response => response.json());
  }

  console.log("Hello world!");

  fetchPhotos()
    .then(photos => console.log(photos))
    .catch(err => console.log(err));
})();