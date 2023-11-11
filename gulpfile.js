'use strict';

const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));


gulp.task("move-html", function (done) {
  gulp.src("./src/*.html")
    .pipe(gulp.dest("./dist/"))
    .on("end", done);
});
gulp.task("move-js", function (done) {
  gulp.src("./src/*.js")
    .pipe(gulp.dest("./dist/"))
    .on("end", done);
});
gulp.task("move-fonts", function (done) {
  gulp.src("./src/**/*.ttf")
    .pipe(gulp.dest("./dist/"))
    .on("end", done);
});


gulp.task("scss", function (done) {
  gulp
    .src("./src/scss/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./dist/css"))
    .on("end", done);
});


gulp.task("img", function (done) {
  gulp.src("./src/img")
    .pipe(gulp.dest("./dist/img"))
    .on("end", done);
});

gulp.task("build", gulp.series("move-html", "move-fonts", "scss", "move-js"));


const browserSync1 = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function () {
  browserSync1.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("src/scss/*.scss", ['scss']);
  gulp.watch("src/*.html", ['move-js']);
});


const browserSync = require('browser-sync').create();
const minify = require('gulp-js-minify');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

// Очищення папки dist
function cleanDist() {
  return gulp.src('dist', { read: false, allowEmpty: true })
    .pipe(clean());
};

// Компіляція SCSS у CSS, додавання вендорних префіксів та мініфікація CSS
function buildStyles() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css/'))
};

function moveHtml() {
  return gulp.src("./src/*.html").pipe(gulp.dest("./dist/")).pipe(browserSync.stream());
};

function moveFonts() {
  return gulp.src("./src/**/*.ttf").pipe(gulp.dest("./dist/")).pipe(browserSync.stream());
};

// Конкатенація та мініфікація JS файлів
function buildScripts() {
  return gulp.src('src/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
};

// Оптимізація та копіювання зображень
function optimizeImages() {
  return gulp.src('src/img/**/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
};

// Робоче завдання build
const build = gulp.series(cleanDist, moveHtml, moveFonts, gulp.parallel(buildStyles, buildScripts, optimizeImages));

// Запуск сервера та відстеження змін для робочого завдання dev
function serve() {
  browserSync.init({
    server: './dist/',
  });

  gulp.watch('src/scss/*.scss', buildStyles).on('change', browserSync.reload);
  gulp.watch('src/js/*.js', buildScripts).on('change', browserSync.reload);
  gulp.watch('src/img/*', optimizeImages).on('change', browserSync.reload);
}

// Робоче завдання dev
const dev = gulp.series(build, serve);

exports.build = build;
exports.dev = dev;
