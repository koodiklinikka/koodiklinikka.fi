'use strict';

var browserify = require('browserify'),
    chalk = require('chalk'),
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
    prettyTime = require('pretty-hrtime'),
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
  var build, bundle;
  bundle = browserify({
    entries: [config.scripts.source],
    extensions: config.scripts.extensions,
    debug: !production
  });
  build = bundle.bundle().on('error', handleError).pipe(source(config.scripts.filename));
  if (production) {
    build.pipe(streamify(uglify()));
  }
  return build.pipe(gulp.dest(config.scripts.destination));
});

gulp.task('templates', function() {
  var pipeline;
  pipeline = gulp.src(config.templates.source).pipe(jade({
    pretty: !production
  })).on('error', handleError).pipe(gulp.dest(config.templates.destination));
  if (!production) {
    pipeline = pipeline.pipe(livereload({
      auto: false
    }));
  }
  return pipeline;
});

gulp.task('styles', function() {
  var icons, styles;
  styles = gulp.src(config.styles.source).pipe(stylus({
    'include css': true
  }));
  icons = gulp.src(config.styles.icons).pipe(less());
  styles = es.merge(styles, icons).pipe(concat(config.styles.filename)).on('error', handleError).pipe(prefix('last 2 versions', 'Chrome 34', 'Firefox 28', 'iOS 7'));
  if (production) {
    styles = styles.pipe(CSSmin());
  }
  styles = styles.pipe(gulp.dest(config.styles.destination));
  if (!production) {
    styles = styles.pipe(livereload({
      auto: false
    }));
  }
  return styles;
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
  var bundle;
  livereload.listen();
  gulp.watch(config.templates.watch, ['templates']);
  gulp.watch(config.styles.watch, ['styles']);
  gulp.watch(config.assets.watch, ['assets']);
  bundle = watchify(browserify({
    entries: [config.scripts.source],
    extensions: config.scripts.extensions,
    debug: !production,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));
  return bundle.on('update', function() {
    var build, start;
    gutil.log("Starting '" + (chalk.cyan('rebundle')) + "'...");
    start = process.hrtime();
    build = bundle.bundle().on('error', handleError).pipe(source(config.scripts.filename));
    build.pipe(gulp.dest(config.scripts.destination)).pipe(livereload());
    return gutil.log("Finished '" + (chalk.cyan('rebundle')) + "' after " + (chalk.magenta(prettyTime(process.hrtime(start)))));
  }).emit('update');
});

gulp.task('no-js', ['templates', 'styles', 'assets']);

gulp.task('build', ['scripts', 'no-js']);

gulp.task('default', ['watch', 'no-js', 'server']);
