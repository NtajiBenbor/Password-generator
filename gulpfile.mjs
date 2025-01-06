import* as gulp from 'gulp';
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'

// paths
const path = {
    src:{
        scripts:'./frontend/src/scripts/**/*.js',
        styles:'./frontend/src/styles/**/*.scss',
        html: './*.html'
    },
    dest:{
        scripts:'./frontend/dist/scripts/',
        styles:'./frontend/dist/styles/',
        html: './frontend/dist/'
    },
    server:'frontend/dist'
}


// HTMLtask 
function html(){
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.dest.html));
}


//Styles task
import* as sass from 'sass';
import gulpSass from 'gulp-sass';
const scss = gulpSass(sass);
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';


function styles(){
    let plugins = [
        autoprefixer('last 1 version'),
        cssnano()
    ]
    return gulp.src(path.src.styles)
        .pipe( sourcemaps.init())
        .pipe( scss())
        .pipe( postcss(plugins))
        .pipe( rename('min.css'))
        .pipe( sourcemaps.write('.', {includeContent: false, sourceRoot: '../src/sytles'}))
        .pipe( gulp.dest(path.dest.styles));
}

// Scripts task
import jsMinify from 'gulp-terser';


function scripts(){
    return gulp.src(path.src.scripts)
        .pipe(jsMinify())
        .pipe(gulp.dest(path.dest.scripts));
}


// Browser sync task
import* as browserSync from 'browser-sync';
const bsServer = browserSync.create();

// spin up local dev server in base directory
function browserSyncTask(cb){
    bsServer.init({
        server: path.server 
    })
    cb();
}

// page reload function for browser sync
function reload(cb){
    bsServer.reload();
    cb();
}


// watch task
function watchTask() {
  gulp.watch(path.src.html, html);
  gulp.watch('./frontend/dist/**/*.html', reload);
  gulp.watch(
    [path.src.styles, path.src.scripts],
    gulp.series(styles, scripts, reload)
  );
}

// default task
export default gulp.series(
     html,
     styles,
     scripts, 
     browserSyncTask,
     watchTask
    );