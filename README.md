# responsive-image-grid

Fetches 10 images from the Unsplash API and displays them in a Flexbox-based grid. [Demo](https://ciszek.co.uk/responsive-image-grid)

## Installation and building

```
$ npm install         # Install node dependencies
$ mkdir -p dist/js    # Create destination folders
$ mkdir -p dist/css
$ grunt               # Run build system
```

The built project is available in `dist/`. The site is static, so the resulting files can be served directly using a web server, such as Apache or Nginx.

## Implementation

The UI is implemented in vanilla JavaScript and HTML. Features blurred placeholder images using the BlurHash algorithm. The hashes are provided by Unsplash for each image, and then decoded using BlurHash.

The project is built using the Grunt task runner, with Webpack pulling in the one dependency (blurhash algorithm) and Babel transpiling the code. Stylesheets are generated using the SASS preprocessor (SCSS variant).
