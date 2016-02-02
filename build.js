'use strict';

const fs = require('fs');
const uglify = require("uglify-js");

let src = './bower_components/d3/d3.js';
let dest = './dist/electron-d3.js';
let destMin = './dist/electron-d3.min.js';
let regexStr = 'if (typeof define === "function" && define.amd) this.d3 = d3, define(d3); else if (typeof module === "object" && module.exports) module.exports = d3; else this.d3 = d3;';
let replacement = 'this.d3 = d3';

// Read d3.js file
fs.readFile(src, 'utf8', function (err,data) {
    if (err) return console.log(err);

    let result = data.replace(regexStr, replacement);
    let minifiedStream = null;

    // write d3.js
    fs.writeFile(dest, result, 'utf8', function (err) {
        if (err) return console.log(err);

        minifiedStream = fs.createReadStream(dest).pipe(fs.createWriteStream(destMin));

        minifiedStream.on('finish', function() {
            let minifiedCode = uglify.minify(result, {fromString: true}).code;

            fs.writeFile(destMin, minifiedCode, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        })
    });
});
