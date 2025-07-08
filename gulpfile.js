const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const { src, dest, watch, series } = require('gulp');

// Компиляция SCSS в CSS
function compileSass() {
    return src('src/styles/*.scss')
        .pipe(sass({quietDeps: true, }).on('error', sass.logError))
        .pipe(dest('dist/styles'))
        .pipe(browserSync.stream());
}

// Перезагрузка браузера при изменении HTML
function reloadHtml() {
    return src('src/*.html')
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

// Копирование и перезагрузка при изменении JS
function reloadJs() {
    return src('src/scripts/*.js')
        .pipe(dest('dist/scripts'))
        .pipe(browserSync.stream());
}

// Копирование PNG изображений
function processPngImages() {
    return src('src/images/*.png', {encoding: false})
        .pipe(dest('dist/images'))
        .pipe(browserSync.stream());
}

// Копирование SVG изображений
function processSvgImages() {
    return src('src/images/*.svg')
        .pipe(dest('dist/images'))
        .on('end', () => console.log('PNG images processed'))
        .pipe(browserSync.stream());
}

// Копирование WOFF2 шрифтов
function processFonts() {
    return src('src/fonts/*.woff2', {encoding: false})
        .pipe(dest('dist/fonts'))
        .pipe(browserSync.stream());
}

// Инициализация сервера
function serve() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    });

    // Наблюдение за изменениями файлов
    watch('src/styles/*.scss', compileSass);
    watch('src/*.html', reloadHtml);
    watch('src/scripts/*.js', reloadJs);
    watch('src/images/*.png', processPngImages);
    watch('src/images/*.svg', processSvgImages);
    watch('src/images/*.woff2', processFonts);
}

exports.default = series(compileSass, reloadHtml, reloadJs, processPngImages, processSvgImages, processFonts, serve);
