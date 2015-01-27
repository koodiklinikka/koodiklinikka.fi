'use strict';

var browserify = require('browserify'),
    concat = require('gulp-concat'),
    CSSmin = require('gulp-minify-css'),
    ecstatic = require('ecstatic'),
    es = require('event-stream'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    path = require('path'),
    prefix = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    httpProxy = require('http-proxy'),
    watchify = require('watchify');

var production = process.env.NODE_ENV === 'production';

var config = {
  scripts: {
    source: './src/js/main.js',
    destination: './public/js/',
    filename: 'bundle.js',
    extensions: ['.jsx']
  },
  templates: {
    source: './src/jade/*.jade',
    watch: './src/jade/*.jade',
    destination: './public/'
  },
  styles: {
    source: './src/styles/style.styl',
    icons: './src/styles/icons.less',
    filename: 'style.css',
    watch: './src/styles/*.*',
    destination: './public/css/'
  },
  assets: {
    source: ['./src/assets/**/*.*', './bower_components/font-awesome/fonts*/*.*'],
    watch: './src/assets/**/*.*',
    destination: './public/'
  }
};

function handleError(err) {
  gutil.log(err);
  gutil.beep();
  return this.emit('end');
};

gulp.task('scripts', function() {

  var bundle = browserify({
    entries: [config.scripts.source],
    extensions: config.scripts.extensions,
    debug: !production
  })
  .bundle()
  .on('error', handleError)
  .pipe(source(config.scripts.filename));

  if (production) {
    bundle.pipe(streamify(uglify()));
  }

  return bundle
    .pipe(gulp.dest(config.scripts.destination));
});

gulp.task('templates', function() {
  return gulp.src(config.templates.source)
  .pipe(jade({
    pretty: !production
  }))
  .on('error', handleError)
  .pipe(gulp.dest(config.templates.destination))
  .pipe(livereload({
    auto: false
  }));
});

gulp.task('styles', function() {

  var styles = gulp.src(config.styles.source)
  .pipe(stylus({
    'include css': true
  }));

  var icons = gulp.src(config.styles.icons)
  .pipe(less());

  styles = es.merge(styles, icons)
    .pipe(concat(config.styles.filename))
    .on('error', handleError)
    .pipe(prefix('last 2 versions', 'Chrome 34', 'Firefox 28', 'iOS 7'));

  if (production) {
    styles = styles.pipe(CSSmin());
  }

  return styles
    .pipe(gulp.dest(config.styles.destination))
    .pipe(livereload({
      auto: false
    }));
});

gulp.task('assets', function() {
  return gulp.src(config.assets.source).pipe(gulp.dest(config.assets.destination));
});

gulp.task('server', function() {
  var staticHandler = ecstatic({root: path.join(__dirname, 'public')});

  var proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    target: process.env.SERVER || 'http://koodiklinikka.fi/api'
  });

  proxy.on('error', function(err) {
    return console.error(err);
  });

  return require('http').createServer(function(req, res) {
    if(req.url.indexOf('/api') > -1) {
      req.url = req.url.replace('/api', '');
      proxy.web(req, res);
      return;
    }
    staticHandler.apply(this, arguments);
  }).listen(9001);
});

gulp.task('watch', function() {
  livereload.listen();

  gulp.watch(config.templates.watch, ['templates']);
  gulp.watch(config.styles.watch, ['styles']);
  gulp.watch(config.assets.watch, ['assets']);

  var bundle = watchify(browserify({
    entries: [config.scripts.source],
    extensions: config.scripts.extensions,
    debug: !production,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  return bundle.on('update', function() {
    gutil.log('Starting',  ' \'' + (gutil.colors.cyan('rebundle')) + '\'', '...');

    bundle.bundle()
      .on('error', handleError).pipe(source(config.scripts.filename))
      .pipe(gulp.dest(config.scripts.destination))
      .pipe(livereload());

  }).emit('update');
});

gulp.task('no-js', ['templates', 'styles', 'assets']);
gulp.task('build', ['scripts', 'no-js']);
gulp.task('default', ['watch', 'no-js', 'server']);
