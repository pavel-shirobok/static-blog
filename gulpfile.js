var gulp = require('gulp');
var blog = require('./blog');
var markdown = require('./gulp-extended-markdown');
var marked = require('marked');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var gutil  = require('gulp-util');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');

var JADE_SRC = ['core/**/*.jade', '!core/includes/*.jade'];
var JS_LIBS = [
    'core/jslibs/jquery-1.11.2.js',
    'core/jslibs/lodash.js',
    'core/jslibs/angular.js',
    'core/jslibs/angular-route.js',
    'core/jslibs/bootstrap.js',
    'core/jslibs/prefixfree.js'
];
var JS_APP  = ['core/coffee/**/*.coffee'];
var CSS_LIBS = ['core/csslibs/*.css'];
var CSS_APP = ['core/stylus/app.styl'];
var FONTS = ['core/fonts/*.*'];

gulp.task('blog:posts', function(){
    var customRenderer = new marked.Renderer();
    var oldHead = customRenderer.heading.bind(customRenderer);

    var cut = false;
    customRenderer.heading = function(text, level, raw) {
        if(!cut && text =='cut' && level == 1) {
            cut = true;
            return '<sb-cut post="post" is-short="isShort"></sb-cut>';
        }
        return oldHead(text, level, raw);
    };

    var oldImage = customRenderer.image.bind(customRenderer);

    customRenderer.image = function(href, title, text) {

         if(href.indexOf('http://')==0 || href.indexOf('https://')== 0){
            return oldImage(href, title, text);
         }

         return '<sb-img post="post" src="' + href + '" title="'+ title+'" alt="' + text+'"></sb-img>';
     };

    gulp
        .src  ( 'content/**/*.md' )
        .pipe ( blog('build/content') )
        .pipe ( markdown({renderer : customRenderer}) )
        .pipe ( gulp.dest('build/content') )
});

gulp.task('blog:img', function(){
    return gulp
        .src( ['content/**/*.jpg', 'content/**/*.png', 'content/**/*.gif'] )
        .pipe(gulp.dest('build/content'));
});

gulp.task('blog:full', ['blog:img', 'blog:posts']);

gulp.task('core:jade', function(){
    return gulp
        .src(JADE_SRC)
        .pipe(jade({pretty: true}))
        .pipe( gulp.dest('build/') )
});

gulp.task('core:js/libs', function(){
    return gulp
        .src(JS_LIBS)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('build/js/'))
});

gulp.task('core:js/app', function(){
    return gulp
        .src(JS_APP)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('core:fonts', function(){
    return gulp
        .src(FONTS)
        .pipe( gulp.dest('build/fonts') )
});

gulp.task('core:css/libs', function(){
    return gulp
        .src(CSS_LIBS)
        .pipe(concat('libs.css'))
        .pipe( gulp.dest('build/css') )
});

gulp.task('core:css/app', function(){
    return gulp
        .src(CSS_APP)
        .pipe(stylus())
        .pipe( gulp.dest('build/css') )
});

gulp.task('core:watch', function(){
    watchIt('core:jade', JADE_SRC);
    watchIt('core:js/app', JS_APP);
    watchIt('core:css/app', 'core/stylus/*.styl');
});

function watchIt(name, src) {
    gulp.start(name);
    watch(src, function(){
        gulp.start(name);
    });
}