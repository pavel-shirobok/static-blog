var gulp = require('gulp');
var blog = require('./plugin/static-blog-plugin');
var jadePlugin = require('gulp-jade');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var gutil  = require('gulp-util');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');
var fs = require('fs');
var jade = require('jade');

var _ = require('lodash');

var JADE_SRC = ['core/**/*.jade', '!core/includes/*.jade'];
var JS_LIBS = [
    'core/jslibs/jquery-1.11.2.js',
    'core/jslibs/lodash.js',
    'core/jslibs/angular.js',
    'core/jslibs/angular-route.js',
    'core/jslibs/angular-disqus.js',
    'core/jslibs/bootstrap.js',
    'core/jslibs/prefixfree.js'
];
var JS_APP  = ['core/coffee/**/*.coffee'];
var CSS_LIBS = ['core/csslibs/*.css'];
var CSS_APP = ['core/stylus/app.styl'];
var FONTS = ['core/fonts/*.*'];

gulp.task('blog:posts', function(){
    gulp
        .src  ( 'content/**/*.md' )
        .pipe ( blog('build', 'content') )
        /*.pipe ( markdown({renderer : customRenderer}) )*/
        .pipe ( gulp.dest('build/content') )
});

gulp.task('blog:img', function(){
    return gulp
        .src( ['content/**/*.jpg', 'content/**/*.png', 'content/**/*.gif'] )
        .pipe(gulp.dest('build/content'));
});

gulp.task('blog:full', ['blog:img', 'blog:posts']);

gulp.task('core:jade', function(){

    var templates = fs.readdirSync('./core/templates');

    templates = _.map(templates, function(path) {
        var content = fs.readFileSync('./core/templates/' + path, {encoding: 'utf8'});
        path = 'templates/' + path.replace('jade', 'html');
        //noinspection JSCheckFunctionSignatures
        content = jade.render(content);
        return { path:path,  content : content };
    });

    return gulp
        .src('core/index.jade')
        .pipe(jadePlugin({
                pretty: true,
                locals: {templates: templates}
        }))
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