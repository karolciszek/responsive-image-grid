import { decode } from 'blurhash';

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

export default UnsplashPhoto;