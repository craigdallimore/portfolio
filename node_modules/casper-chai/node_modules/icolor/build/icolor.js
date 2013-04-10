
// -- from: lib/icolor.coffee -- \\

/*
  icolor
  ======
 
  Colors for Javascript

  Usage
  ~~~~~

  "bluestring".blue
  "bold with purple background".purplebg.bold

  See also
  ~~~~~~~~

  [icolor for Python](https://github.com/brianmhunt/icolor)

  MIT License
  ~~~~~~~
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
*/


(function() {
  var ANSI_CODE_MAP, COLOR_MAP, code, color_name, esc, icolorEnabled, insig, name, _addProp;

  icolorEnabled = Object.getOwnPropertyDescriptor(String.prototype, 'icolorEnabled');

  if (icolorEnabled !== void 0) {
    return;
  }

  esc = function(code) {
    return "\u001b[" + code + "m";
  };

  COLOR_MAP = {
    black: 0,
    red: 1,
    green: 2,
    yellow: 3,
    blue: 4,
    magenta: 5,
    purple: 5,
    cyan: 6,
    white: 7,
    "default": 9
  };

  ANSI_CODE_MAP = {
    reset: [0, 0],
    bold: [1, 22],
    italics: [3, 23],
    inverse: [7, 27],
    strike: [9, 29],
    underline: [4, 24]
  };

  for (color_name in COLOR_MAP) {
    insig = COLOR_MAP[color_name];
    ANSI_CODE_MAP[color_name] = [30 + insig, 39];
    ANSI_CODE_MAP[color_name + "bg"] = [40 + insig, 49];
  }

  _addProp = function(name, code) {
    Object.defineProperty(String.prototype, name, {
      get: function() {
        if (this.icolorEnabled) {
          return esc(code[0]) + this + esc(code[1]);
        }
        return String(this);
      }
    });
  };

  for (name in ANSI_CODE_MAP) {
    code = ANSI_CODE_MAP[name];
    _addProp(name, code);
  }

  String.prototype.icolorEnabled = true;

  String.icolorToggle = String.prototype.icolorToggle = function(enable) {
    if (enable) {
      String.prototype.icolorEnabled = enable;
    } else {
      String.prototype.icolorEnabled = !String.prototype.icolorEnabled;
    }
    return this;
  };

  Object.defineProperty(String.prototype, 'stripColors', function() {
    return ("" + this).replace(/\u001b\[\d+m/g, '');
  });

}).call(this);
