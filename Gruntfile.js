const webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        esversion: 6,
        moz: true,
        globals: {
          jQuery: true
        }
      }
    },

    webpack: {
      myConfig: webpackConfig
    },

    // babel: {
    //   options: {
    //     sourceMap: true,
    //     presets: ["@babel/preset-env"],
    //   },
    //   dist: {
    //     files: {
    //       // Webpack builds to dist/main.js by default
    //       "dist/js/main.js": "dist/main.js",
    //     },
    //   },
    // },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },

    sass: {
      dist: {
        // options: {
        //   style: 'expanded'
        // },
        files: {
          'dist/css/main.css': 'src/css/main.scss'
        }
      }
    },

    copy: {
      // Copy plugin is used to move any remaining files to the dist/ subdirectory
      main: {
        files: [
          // Move all files (not dirs) from src/ into our dist/ directory
          {expand: true, cwd: 'src/', src: ['*'], dest: 'dist/', filter: 'isFile'},
          // Move all pure (non-SASS) stylesheets into dist/css
          {expand: true, cwd: 'src/css', src: ['*.css'], dest: 'dist/css', filter: 'isFile'},
        ],
      },
    },

    clean: {
      dist: {
        files: [{
          src: [
            // This file is produced by Webpack's default config
            // Afterwards the file is transpiled by Babel to dist/js/main.js
            'dist/main.js'
          ]
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-webpack');
  // grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // grunt.registerTask('default', ['jshint', 'webpack', 'babel', 'sass', 'copy', 'clean']);
  grunt.registerTask('default', ['jshint', 'webpack', 'sass', 'copy', 'clean']);

};