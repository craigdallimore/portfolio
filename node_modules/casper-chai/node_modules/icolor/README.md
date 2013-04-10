icolor.js
=========

Colors for Javascript on the console.

Compatible with Node and PhantomJS.

### Installation

    npm install icolor

### Usage

    require('icolor');

    console.log("bluestring".blue);
    console.log("bold with purple background".purplebg.bold);

    String.icolorToggle(false); // disable colors
    console.log("no colors".blue);
    console.log("re-enabled colors".icolorToggle().blue)

This is the same style and syntax as
[colors.js](https://github.com/Marak/colors.js).

Uses [`cake`](http://coffeescript.org/#cake) for toasting and testing.

Use `String.icolorToggle(enable)` to turn ANSI escape codes on and off.

### See also

[icolor for Python](https://github.com/brianmhunt/icolor)

### MIT License

Copyright (C) 2012 Brian M Hunt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
