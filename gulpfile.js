var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    serve = require('gulp-serve'),
    // inject = require('gulp-inject'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    include = require('gulp-include'),
    bower = require('gulp-bower'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    rimraf = require('rimraf'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    merge = require('merge-stream'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag_version = require('gulp-tag-version'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    minify = require('gulp-minify'),
    express = require('gulp-express');

gulp.task("default",function(callback){
  runSequence('copy','host','server','watch','open',callback);
 //runSequence('build',callback);
});
gulp.task("build",function(callback){
  runSequence('copy',callback);
});

gulp.task('host', serve({root:['dist'],port:8030}));

gulp.task('server', function(){
  express.run(['server.js']);
  gulp.watch(['server.js'],[express.run]);
});

/* open the browser */
gulp.task("open", function(){
 gulp.src("./min/index.html")
   .pipe(open("", {
     url: "http://localhost:8030/min/#/",
     app: ""
   })
 );
});

/* clean the dist folder */
gulp.task('clean', function (cb) {
  rimraf('min', cb);
});

// /*Copy all files to dist*/
// gulp.task('copy',function(callback){
//   runSequence('clean','basejs','appjs', 'copyhtml','copypic','copycss','copyvendorstyle','copydatatable', 'copyindex','copydata','copyfakedownload',callback);
// });
gulp.task('copy',function(callback){
  runSequence('clean', 'basejs','appjs', 'copyhtml','copypic','copycss','copyvendorstyle', 'copyindex',callback);
});

// /*Copy JS files*/
gulp.task('basejs', function () {
  	return gulp.src(['bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
  	'bower_components/angular-route/angular-route.js',
  	'bower_components/angular-cookies/angular-cookies.js',
  	'bower_components/bootstrap/dist/js/bootstrap.min.js'
  	])
    .pipe(concat('base.js'))
    // .pipe(minify({
    //   ext:{
    //         src:'.js',
    //         min:'.min.js'
    //     }
    // }))
    .pipe(gulp.dest('./dist/secure/js'));
});
gulp.task('appjs', function () {
  	return gulp.src(['app/*.js','app/*/*.module.js','app/*/*.service.js','app/*/directive.*.js','app/*/*.controller.js','app/*/*.run.js','app/*/*.filter.*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/secure/js'));
});
gulp.task('serverjs', function () {
    gulp.src(['server.js'])
    .pipe(gulp.dest('./dist'));
    gulp.src(['server/*.js'])
    .pipe(gulp.dest('./dist/server'));
    return;
});

// /*Copy CSS stylesheets*/
gulp.task('copycss', function() {
    return gulp.src('assets/sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/secure/css'));
});
gulp.task('copyvendorstyle', function() {
    gulp.src(['bower_components/datatables/media/css/jquery.datatables.min.css', 'bower_components/angular-datatables/dist/css/angular-datatables.min.css', 'bower_components/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(concat('base.css'))
        .pipe(gulp.dest('./dist/secure/css'));
    gulp.src(['bower_components/bootstrap/dist/fonts/*.*'])
        .pipe(gulp.dest('./dist/secure/fonts'));
    return;
});
// gulp.task('copydatatable', function() {
//     return gulp.src(['bower_components/datatables/media/css/jquery.dataTables.css'])
//         .pipe(gulp.dest('./dist/assets/css'));
// });
// /*Copy HTML assets*/
gulp.task('copyhtml', function () {
  	gulp.src(['assets/html/**.html'])
    .pipe(gulp.dest('./dist/secure/html'));
    gulp.src(['assets/html/partials/**.html'])
    .pipe(gulp.dest('./dist/secure/html/partials'));
    return;
});
// /*Copy Image assets*/
gulp.task('copypic', function () {
  	return gulp.src(['assets/images/*.*'])
    .pipe(gulp.dest('./dist/secure/images'));
});

gulp.task('copyindex', function () {
  	return gulp.src('index.html')
    .pipe(gulp.dest('./dist/secure'));
});
// /*Copy Fake Data and downloads*/
gulp.task('copydata', function () {
  	return gulp.src(['data/*'])
    .pipe(gulp.dest('./dist/data'));
});
// gulp.task('copyfakedownload', function () {
//     return gulp.src(['fake_downloads/*'])
//     .pipe(gulp.dest('./dist/fake_downloads'));
// });

// /*Add watch event to recopy and reload browser*/
gulp.task('watch', function(){
  gulp.watch(['index.html','assets/images/*.*','assets/**/*.*','app/*.*','app/**/*.*','data/*'],['copy']);
});
