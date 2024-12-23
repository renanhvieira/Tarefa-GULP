const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript () {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function complilaSass () {
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}

function funcaoPadrao(callback) {
    setTimeout(function (){
        console.log("Executando via Gulp");
        callback();
    }, 2000);
}

function dizOi(callback) {
    console.log("Olá GULP");
    dizTchau();
    callback();
}

function dizTchau() {
    console.log("Tchau GULP");
}

exports.default = gulp.parallel(funcaoPadrao, dizOi);
exports.dizOi = dizOi;
exports.sass = complilaSass;
exports.watch = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(complilaSass));
}
exports.javascript = comprimeJavaScript;
exports.images = comprimeImagens;