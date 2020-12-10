const gulp = require("gulp");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify-es").default;
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");

sass.compiler = require("node-sass");

exports.default = () => {
    gulp.watch("assets/stylesheets/scss/*", compileSass);
    gulp.watch("assets/scripts/*", minifyJS);
    gulp.watch("index.html",minifyHTML);
    gulp.watch("assets/media/details/*", { events: "add" }, minifyDetails);
    gulp.watch("assets/media/bgs/*", { events: "add" }, minifyBackground);
}

const compileSass = () => {
    return gulp.src("assets/stylesheets/scss/style.scss")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(gulp.dest("assets/stylesheets/css/"))
        .pipe(gulp.dest("publish/assets/stylesheets/css/"));
}

const minifyDetails = () => {
    return gulp.src("assets/media/details/*")
        .pipe(imagemin())
        .pipe(gulp.dest("publish/assets/media/details/"));
}

const minifyBackground = () => {
    return gulp.src("assets/media/bgs/*")
        .pipe(imagemin())
        .pipe(gulp.dest("publish/assets/media/bgs/"));
}

const minifyJS = () => {
    return gulp.src("assets/scripts/*")
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ["@babel/env"] }))
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("publish/assets/scripts/"));
}

const minifyHTML = () => {
    return gulp.src("index.html")
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest("publish/"));
}
