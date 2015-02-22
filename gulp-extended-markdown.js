'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var marked = require('marked');

module.exports = function (options) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-markdown', 'Streaming not supported'));
            return;
        }

        marked(file.contents.toString(), options, function (err, data) {
            if (err) {
                cb(new gutil.PluginError('gulp-markdown', err, {fileName: file.path}));
                return;
            }

            file.contents = new Buffer(data);
            file.path = gutil.replaceExtension(file.path, '.html');

            cb(null, file);
        });
    });
};

/*var through = require('through2');
var path = require('path');
var marked = require('marked');
var fs = require('fs');
module.exports = function(target_content) {
    var customRenderer = new marked.Renderer();
    var oldHead = customRenderer.heading.bind(customRenderer);



    var blog = {
        posts : [],
        tree : {}
    };

    function getPostDescriptor(file) {
        var relPath = file.path.substr(file.base.length);   //full path with D:\\sdfsf\sdfsdf\sdfsdf

        relPath = relPath.split('\\')   //relative path 2001/12/03-0.md
        var date = relPath.pop().split('-')[0];
        //relPath.push(date);

        return {
            postName : findPostName(file),
            postFileName : path.basename(file.path, '.md'),
            directory : relPath,
            date : relPath.concat(date).join('/')
        }
    }

    function findPostName(file){
        var postName = undefined;
        var cut = false;
        customRenderer.heading = function(text, level, raw) {
            if(!postName){
                postName = text;
            }


            return oldHead(text, level, raw);
        };
        marked.setOptions({ renderer : customRenderer });
        marked ( fs.readFileSync(file.path, 'utf8') );
        return postName;
    }

    function addToBlog(descriptor) {
        blog.posts.push(descriptor);

        addToTree(blog.tree, 0, descriptor, blog.posts.length - 1);
    }

    function addToTree (treeRoot, level, descriptor, index) {
        var dir = descriptor.directory[level];

        if(!treeRoot[dir]){
            treeRoot[dir] = {};
        }

        if(level == 1) { //file-list
            treeRoot[dir][descriptor.postFileName] = index;
        }else {  //other directories
            addToTree(treeRoot[dir], ++level, descriptor, index);
        }
    }

    return through.obj(function(file, encode, done){

        addToBlog(getPostDescriptor(file));




        done(undefined, file);

    }, function(done){
        fs.writeFileSync(
            path.resolve(target_content + '\\blogDescriptor.json'),
            JSON.stringify(blog, null, 4)
        );
        console.log('test');
        done();
    });
};*/
