const server = require("browser-sync").create();
const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const minify = require("gulp-csso");
const babel = require("gulp-babel");
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");

gulp.task("style", function() {
    return gulp.src("source/sass/style.scss")
        .pipe(plumber())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(minify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream());
});

gulp.task("script", function() {
    return gulp.src("source/js/**/*.js")
        .pipe(gulp.dest("build/js"))
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("build/js")).on("change", server.reload);
});

gulp.task("html", function() {
    return gulp.src("source/*.html")
        .pipe(posthtml([
            include()
        ]))
        .pipe(gulp.dest("build"));
});

gulp.task("copy", function() {
    return gulp.src([
        "source/images/**",
        "source/pictures/**"
        ], {
            base: "source"
        })
        .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
    return del("build");
});

gulp.task("serve",  function() {
    server.init({
        server: "build/"
    });

    gulp.watch(["source/sass/**/*.{scss, sass}", "source/js/**/*.js"], gulp.parallel(["style", "script"]));
    gulp.watch("source/*.html", gulp.parallel("html"));
});

gulp.task("build", gulp.series(["clean", "copy", "style", "script", "html"]));