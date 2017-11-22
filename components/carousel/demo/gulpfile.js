let gulp = require('gulp');

let babelify = require('babelify');
let browserify = require('browserify');
let buffer = require('vinyl-buffer');
let sass = require('gulp-sass');
let source = require('vinyl-source-stream');
let sourcemaps = require('gulp-sourcemaps');

function handleError(err) {
    console.log(err);
    this.emit('end');
}

gulp.task('js', () => {
    return browserify({entries: './main.js', debug: true})
        .transform("babelify", {
            presets: ["es2015"],
        })
        .on('error', handleError)
        .bundle()
        .on('error', handleError)
        .pipe(source('main.min.js'))
        .on('error', handleError)
        .pipe(buffer())
        .on('error', handleError)
        .pipe(gulp.dest('./'));
});

gulp.task('css', () => {
    return gulp.src('./main.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .on('error', handleError)
        .pipe(gulp.dest('./'))
});

gulp.task('watch', ['css', 'js'], () => {
    gulp.watch('./main.scss', ['css']).on('error', handleError);
    gulp.watch('./main.js', ['js']).on('error', handleError);
});

gulp.task('default', ['css', 'js', 'watch']);