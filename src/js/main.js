import { decode } from 'blurhash';

// Global function closure
(function () {
  const API_ROOT = 'https://api.unsplash.com';
  const ACCESS_KEY = 'in_progress';
  const keyURI = 'http://localhost:3001/unsplash_key';
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
      
      this.width = unsplData.width;
      this.height = unsplData.height;

      // 1080px is the "regular" image width used by Unsplash
      this.scaledWidth = Math.min(this.width, 1080);
      this.scaledHeight = Math.floor(this.height * this.scaledWidth / this.width);

      this.blurhash = unsplData.blur_hash;
      this.placeholder = this.decodeBlurhash();
    }
    // TODO: include likes of photo?

    decodeBlurhash () {
      const pixels = decode(this.blurhash, 32, 32);

      const canvas = document.createElement("canvas");
      canvas.classList.add("photo-placeholder");
      const ctx = canvas.getContext("2d");

      // These attributes allow the canvas to be resized using CSS
      ctx.canvas.width = 32;
      ctx.canvas.height = 32;

      // const imageData = ctx.createImageData(500, 500);
      // imageData.data.set(pixels);
      const imageData = new ImageData(pixels, 32, 32); 
      ctx.putImageData(imageData, 0, 0);

      canvas.setAttribute("style", `width: ${this.scaledWidth}px; height: ${this.scaledHeight}px`);
      return canvas;
    }

    render () {
      const elem = document.createElement("div");
      elem.id = this.id;
      elem.classList.add("photo-container");
      elem.innerHTML += `
        <a href="${this.href}">
          <img class="photo-image" src="${this.imgUrl}" alt="${this.altText}" />
          <p class="photo-author">${this.authorName}</p>
        </a>
      `;

      // Placeholder is prepended so that it can be covered by the image once it loads
      elem.prepend(this.placeholder);
      return elem;
    }
  }

  function toggleFit () {
    const images = document.querySelectorAll(".photo-image");
    images.forEach(i => i.classList.toggle("contain"));
  }

  document.addEventListener("click", (event) => {
    if (event.target.matches('#fit')) {
      event.preventDefault();
      toggleFit();
    }
  }, false);

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

  const photos = fetchPhotos()
    .then(data => createPhotos(data))
    .catch(err => console.error(err));

  const container = document.getElementById("container");

  photos
    .then(ps => {
      ps.forEach(p => container.appendChild(p.render()));
    });
})();