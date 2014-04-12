/*
 This is free and unencumbered software released into the public domain.

 Anyone is free to copy, modify, publish, use, compile, sell, or
 distribute this software, either in source code form or as a compiled
 binary, for any purpose, commercial or non-commercial, and by any
 means.

 In jurisdictions that recognize copyright laws, the author or authors
 of this software dedicate any and all copyright interest in the
 software to the public domain. We make this dedication for the benefit
 of the public at large and to the detriment of our heirs and
 successors. We intend this dedication to be an overt act of
 relinquishment in perpetuity of all present and future rights to this
 software under copyright law.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.

 For more information, please refer to <http://unlicense.org/>
 */

var fs = require('fs'),
    mkdirp = require('mkdirp'),
    path = require('path');

var downloadPath = './Test Episodes/',
    videoPath = './videos/';


function getStat(path, callback) {
    fs.stat(path, function (err, stat) {
        if (err) {
            console.log(err);
        }
        if (stat) {
            if (stat.isDirectory()) {
                callback(true);
            } else {
                callback(false);
            }
        }

    });
}

function doFile(oFile) {
    if (oFile.file.match(/S\d\dE\d\d/)) {

        try {
            var details = {
                name: oFile.file.match(/(.*?)S\d\dE\d\d/)[1].replace(/\./g, " ").trim(),
                episode: oFile.file.match(/E(\d\d)/)[1],
                season: oFile.file.match(/S(\d\d)/)[1],
                extension: oFile.file.match(/\.([0-9a-z]+$)/i)[1]
            }

            //var filedPath = videoPath + details.name + "/" + "Season " + details.season;

            var filedPath = path.join(videpPath + details.name, Season + details.season);

            var filedName = details.name + " S" + details.season + "E" + details.episode + "." + details.extension;
            var fromName = oFile.full;
            //var toName = filedPath + "/" + filedName;

            var toName = path.join(filedPath, filedName);


            mkdirp(filedPath, function (err) {
                fs.rename(fromName, toName, function (err) {
                    console.log("Moved");
                });
            });

            console.log(details);
        } catch (e) {
            console.error("ERROR!", e);

        }

    }


}

function getDirs(path) {
    //console.log("getDirs", path);
    fs.readdir(path, function (err, files) {
        //console.log(path, files);
        if (files) {
            files.forEach(function (file) {
                getStat(path + file, function (isDir) {
                    if (isDir) {
                        getDirs(path + file + "/");
                    } else {
                        var oFile = {
                            file: file,
                            path: path,
                            full: path + file
                        }
                        doFile(oFile);
                    }
                });
            });
        }

    });
}

getDirs(downloadPath);

