var through = require('through2');
var path = require('path');
var marked = require('marked');
var fs = require('fs');
module.exports = function(files, base) {
    return through.obj(function(file, encode, done){

        var fileString = file.contents.toString();

        var iof = fileString.indexOf('$templates$');

        if(iof > -1){
            var intend = 0
            do{
                var c = fileString[--iof];
                intend++;
            } while(c != '\r' && c!='\n')
            intend--;

            var inject = '';
            var intendString = '';
            for(var i = 0; i < intend; i++){
                intendString += ' ';
            }

            /*console.log('intend', intend, (new Array(intend)).map(function(){console.log('map'); return '\t'; }))


            var intendString = (new Array(intend)).map(function(){ return '\t'; }).join('');*/

            var first = true
            files.forEach(function(fileName, i){
                inject += (first?'':intendString) + 'script(type="text/ng-template", id="' + base + '/' + fileName.replace('jade', 'html') + '")\r\n';
                inject += intendString + '  include ' + base + '/' + fileName + '\r\n';
                first = false;
            });

            console.log('1' + intendString + '1');

            fileString = fileString.replace('$templates$', inject)
            file.contents = new Buffer(fileString);


            console.log(fileString)

        }

        //console.log(file.contents.toString())

        done(undefined, file);
    }, function(done){
        done();
    });
};