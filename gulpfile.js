'use strict';
const gulp = require('gulp');
const browserify = require('browserify');
const $ = require('gulp-load-plugins')({lazy: true});
$.wiredep = require('wiredep').stream;
$.source = require('vinyl-source-stream');
$.buffer = require('vinyl-buffer');
const tsify = require('tsify');
const babelify = require('babelify');
const tsconfig = require('./tsconfig.json');

function swallowError () {
  var args = Array.prototype.slice.call(arguments);
  $.notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);

  this.emit('end');
}

const javascriptsFiles = [
  'client/javascripts/index.ts',
  'client/javascripts/common.ts'
]

gulp.task('bower', () => {
  gulp.src('./views/layout.jade')
    .pipe($.wiredep())
    .pipe(gulp.dest('./views/'));
});

gulp.task('less', () => {
  gulp.src('client/less/**/*.less')
    .pipe($.less())
    .pipe($.concat('style.css'))
    .pipe(gulp.dest('public/stylesheets/'))
    .pipe($.livereload());
});

gulp.task('javascript', () => {
  javascriptsFiles.map(function(entry) {
    return browserify({ entries: [entry], debug: true })
      .plugin(tsify)
      .bundle().on('error', swallowError)
      .pipe($.source(entry))
      .pipe($.buffer())
      .pipe($.rename(path => {
        path.extname = '.js';
       }))
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.sourcemaps.write('./'))
      .pipe($.flatten())
      .pipe(gulp.dest('public/javascripts/'))
      .pipe($.livereload());
    });
});

gulp.task('jade', () => {
  gulp.src('views/*jade')
    .pipe($.livereload());
});


gulp.task('watch', ['less', 'javascript'], () => {
  $.livereload.listen();
  gulp.watch('client/less/**/*.less', ['less']);
  gulp.watch('bower.json', ['bower']);
  gulp.watch('client/javascripts/**/*.ts', ['javascript']);
  gulp.watch('views/*.jade', ['jade']);
});


gulp.task('default', ['watch']);
