import UnsplashPhoto from './UnsplashPhoto';

// Make GET requests from a dummy API instead for development purposes
const photosURI = `https://responsive-image-grid.free.beeceptor.com`;

function toggleFit () {
  const images = document.querySelectorAll(".photo-image");
  images.forEach(i => i.classList.toggle("contain"));
  const button = document.querySelector("#fit");
  button.classList.toggle("toggled");
}

function createPhotos (photoData) {
  const photos = [];

  photoData.forEach(obj => {
    photos.push(new UnsplashPhoto(obj));
  });
  return photos;
}

function fetchPhotos () {
  return fetch(photosURI)
    .then(response => response.json());
}

function loadPhotos () {
  console.log("loading photos");
  const photos = fetchPhotos()
    .then(data => createPhotos(data))
    .catch(err => console.error(err));

  const container = document.getElementById("container");

  // Remove all children in the container
  container.textContent = "";

  photos
    .then(ps => {
      ps.forEach(p => container.appendChild(p.render()));
    });
}

document.addEventListener("click", (event) => {
  if (event.target.matches('#fit')) {
    event.preventDefault();
    toggleFit();
  }
}, false);


document.addEventListener("click", (event) => {
  if (event.target.matches('#new-photos')) {
    event.preventDefault();
    loadPhotos();
  }
}, false);

loadPhotos();