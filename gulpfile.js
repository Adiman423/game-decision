/* This gulp file has been adapted from the following stackoverflow posts: 
http://stackoverflow.com/questions/21969021/gulp-ngmin-uglify-not-working-properly
http://stackoverflow.com/questions/27916062/gulp-uglify-output-min-js
*/

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var pump = require('pump');

var paths = {
    scripts: ['js/gameapp.js','js/recentReleases.js','js/gameSearchComponent.js','js/releaseComponent.js'],

    filesToConcat: [
        'js/angular.min.js',
        'js/jquery-3.1.1.min.js',
        'js/bootstrap.min.js',
        'js/gameapp.min.js',
        'js/gameSearchComponent.min.js',
        'js/recentReleases.min.js',
        'js/releaseComponent.min.js'
    ],
    
    cssToUglify: [
        'css/style.css',
        'css/bootstrap.css'
        ],
    
    cssToConcat: [
        'css/style.min.css',
        'css/bootstrap.min.css'
        ]

};

gulp.task('compress', function(cb){
    
    var options = {
      preserveComments: 'all'  
    };
    
    pump([
        gulp.src(paths.scripts),
        uglify({mangle: false}),
        rename({ suffix: '.min' }),
        gulp.dest('js/')
    ],
    cb
    );
});

gulp.task('concat', function(){
   return gulp.src(paths.filesToConcat)
   .pipe(concat('gameJudgement.js'))
   .pipe(gulp.dest('js/'));
});

gulp.task('minify-css', function(){
   var options = {
      preserveComments: 'all'  
    };
   return gulp.src(paths.cssToUglify)
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('css/'));
});


gulp.task('concat-css', function(cb) {
    return gulp.src(paths.cssToConcat)
    .pipe(concat('combinedStyle.css'))
    .pipe(gulp.dest('css/'));
})