import* as gulp from 'gulp';

// copy html task 
function html(){
    return gulp.src('./*.html')
        .pipe(gulp.dest('./frontend/dist/'));
}

//styles task
import* as sass from 'sass';
import gulpSass from 'gulp-sass';
const scss = gulpSass(sass);

import autoprefixer from 'gulp-autoprefixer';
import cssMinify from 'gulp-clean-css';


function styles(){
    return gulp.src('./frontend/src/styles/**/*.scss',{sourcemaps: true})
        .pipe(scss())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cssMinify())
        .pipe(gulp.dest('./frontend/dist/styles/',{sourcemaps:'.'}));

}

// scripts task
import jsMinify from 'gulp-terser';


function scripts(){
    return gulp.src('./frontend/src/scripts/**/*.js',{sourcemaps: true})
        .pipe(jsMinify())
        .pipe(gulp.dest('./frontend/dist/scripts/',{sourcemaps:'.'}));
}


// browser sync task
import* as browserSync from 'browser-sync';


function browserSyncTask(cb){
    browserSync.create().init({
        server: {
            baseDir: "./"
        }
    })
    cb();
}

function browserSyncReload(cb){
    browserSync.reload();
    cb();
}


// watch task
function watchTask() {
  gulp.watch('./*.html', gulp.series(html, browserSyncReload));
  gulp.watch(
    ['./frontend/src/styles/**/*.scss', './frontend/src/scripts/**/*.js'],
    gulp.series(styles, scripts, browserSyncReload)
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