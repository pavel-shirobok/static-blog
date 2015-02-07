var gulp = require('gulp');
var blog = require('./blog');
var markdown = require('gulp-markdown')

gulp.task('blog:posts', function(){
    gulp
        .src  ( 'content/**/*.md' )
        .pipe ( blog('content') )
        .pipe ( markdown() )
        .pipe ( gulp.dest('build/content') )
});

gulp.task('blog:img', function(){
    return gulp
        .src( ['content/**/*.jpg', 'content/**/*.png', 'content/**/*.gif'] )
        .pipe(gulp.dest('build/content'));
});

gulp.task('blog:full', ['blog:img', 'blog:posts']);