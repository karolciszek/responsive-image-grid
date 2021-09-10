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
          {expand: true, cwd: 'src/js', src: ['*'], dest: 'dist/js', filter: 'isFile'},
          // Move all pure (non-SASS) stylesheets into dist/css
          {expand: true, cwd: 'src/css', src: ['*.css'], dest: 'dist/css', filter: 'isFile'},
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jshint', 'sass', 'copy']);

};