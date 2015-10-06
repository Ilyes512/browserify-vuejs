export default {
  appname: 'vueplay',
  app: './app',
  build: './build',
  clean: [
    '!.gitkeep',
    'build/*',
    'app/*.min.js',
    'app/app.css'
  ],
  html: {
    files: [
      './app/index.html',
      './app/**/*.html'
    ]
  },
  js: {
    files: [
      './app/**/*.js',
      '!./app/**/*.min.js'
    ]
  },
  scss: {
    files: [
      './app/**/*.scss'
    ],
    src: './app/app.scss',
    devDest: './app/app.css',
    buildDest: './build/app.css'
  },
  browserify: {
    dev: {
      entries: ['./app/app.js'],
      out: 'app.min.js'
    },
    vendor: {
      libs: [
        'vue',
        'lodash'
        //'jquery'
      ],
      entries: ['./app/vendor.js'],
      out: 'vendor.min.js'
    }
  }
};