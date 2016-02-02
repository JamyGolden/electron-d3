# Electron D3
A modified version of [D3](https://github.com/mbostock/d3) which allows D3 to run within [Electron](https://github.com/atom/electron) apps without a problem.

## Version
electron-d3 is running D3 version: 3.5.14

## Installation instructions
First to install electron-d3:
`bower install electron-d3`

Include it within your HTML:
`<script src="bower_components/electron-d3/dist/electron-d3.min.js"></script>`

Reference it as `d3` within your script as usual:

    <script>
        d3.selectAll("div").style("color", "red");
    </script>

## What about conflicts with the real D3?
If you're having conflicts with D3, then you don't need to use electron-d3.

## Why exactly doesn't it run with Electron as expected?
The issue is on the second last line with d3.js:

    if (typeof define === "function" && define.amd) this.d3 = d3, define(d3); else if (typeof module === "object" && module.exports) module.exports = d3; else this.d3 = d3;

This line is a good thing. It runs the AMD version if it's supported, otherwise it runs the `require('d3')` support, and if all else fails it puts D3 onto the window object. `module.exports` and `require()` is supported with Electron so you are required (pun intended) to `require()` it to gain access, for example:

    var d3 = require('path/to/d3.js');

If you're able to do the above, you should probably do that instead. In my case I was not easily able to.
