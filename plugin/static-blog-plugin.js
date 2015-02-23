var gutil = require('gulp-util');
var through = require('through2');
var marked = require('marked');
var fs = require('fs');
var path =require('path');

module.exports = function (dest, content) {
    var blogGenerator = new StaticBlogGenerator(dest, content);

    return through.obj(
        blogGenerator.onStream.bind(blogGenerator),
        blogGenerator.onEnd.bind(blogGenerator)
    );
};

function StaticBlogGenerator(dest, content) {
    this.blogData = { posts : [], tree : {} };
    this.dest = dest;
    this.contentDestination = content;
    this.options = {};
    this.initRenderer();
}

StaticBlogGenerator.prototype.initRenderer = function() {

    this.renderer = new marked.Renderer();
    var old_heading = this.renderer.heading.bind(this.renderer);
    var old_image = this.renderer.image.bind(this.renderer);

    this.renderer.heading = function(text, level, raw){
        if(!this.post.name){
            this.post.name = text;
        }

        if(!this.post.cut && text =='cut' && level == 1) {
            this.post.cut = true;
            return '<sb-cut post="post" is-short="isShort"></sb-cut>';
        }

        return old_heading(text, level, raw);
    }.bind(this);

    this.renderer.image = function(href, title, text) {
        if(href.indexOf('http://')==0 || href.indexOf('https://')== 0){
            return old_image(href, title, text);
        }

        href = [
            this.contentDestination,
            this.getInContentDirectoryWithPost(this.file.path, this.file.base),
            href
        ].join('\\');

        return '<sb-img post="post" src="' + href + '" title="'+ title+'" alt="' + text+'"></sb-img>';
    }.bind(this);

    this.renderer.code = this.renderer.codespan = function(code, lang) {
        lang = lang || 'auto';
        return '<code sb-code lang="' + lang + '">' + code + '</code>'
    }.bind(this);


    this.options.renderer = this.renderer;
};

StaticBlogGenerator.prototype.getInContentDirectoryWithPost = function(postMdPath, base, popLast) {
    if(popLast == undefined){
        popLast = true;
    }
    var path = postMdPath.substr(base.length);
    path = path.split('\\');
    if(popLast)path.pop();
    return path.filter(function(p){ return p.length > 0; }).join('\\');
};

StaticBlogGenerator.prototype.onStream = function(file, enc, cb){
    if (file.isNull()) {
        cb(null, file);
        return;
    }

    if (file.isStream()) {
        cb(new gutil.PluginError('gulp-markdown', 'Streaming not supported'));
        return;
    }

    this.computePost( file, this.options, cb );
};

StaticBlogGenerator.prototype.computePost = function(file, options, cb) {
    this.post = {};
    this.file = file;
    this.render(file, options, cb);
    this.registerPost(file, this.post);
};

StaticBlogGenerator.prototype.registerPost = function(file) {
    var postPath = this.getInContentDirectoryWithPost(file.path, file.base, false);
    var postName = this.post.name;

    var relPath = postPath.split('\\');
    var preFileName = relPath.pop();
    var postFileName = preFileName.replace('.html', '');
    var directory = relPath;
    var date = directory.concat(preFileName.split('-')[0]).join('/');

    var descriptor = {
        postName : postName,
        postFileName : postFileName,
        directory : directory,
        date : date
    };

    this.blogData.posts.push(descriptor);
    this.registerInTree(this.blogData.tree, 0, descriptor, this.blogData.posts.length - 1);
};

StaticBlogGenerator.prototype.registerInTree = function(treeRoot, level, descriptor, index) {
    var dir = descriptor.directory[level];

    if(!treeRoot[dir]){
        treeRoot[dir] = {};
    }

    if(level == 1) { //file-list
        treeRoot[dir][descriptor.postFileName] = index;
    }else {  //other directories
        this.registerInTree(treeRoot[dir], ++level, descriptor, index);
    }
};

StaticBlogGenerator.prototype.render = function(file, options, cb) {

    marked(file.contents.toString(), options, function (err, data) {
        if (err) {
            cb(new gutil.PluginError('gulp-markdown', err, {fileName: file.path}));
            return;
        }

        file.contents = new Buffer(data);
        file.path = gutil.replaceExtension(file.path, '.html');

        cb(null, file);
    });
};

StaticBlogGenerator.prototype.onEnd = function(done) {
    fs.writeFileSync(
        path.resolve([this.dest, this.contentDestination, 'blogDescriptor.json'].join('\\')),
        JSON.stringify(this.blogData, null, 4)
    );
    done();
};