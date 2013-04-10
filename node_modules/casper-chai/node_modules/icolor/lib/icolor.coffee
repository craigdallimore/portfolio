###
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
###

icolorEnabled = Object.getOwnPropertyDescriptor(String.prototype,
  'icolorEnabled')

# prevent running twice
if icolorEnabled != undefined
  return

esc = (code) ->
  # return a string with ansi escape code 'code'
  return "\u001b[#{code}m"

# These are the insignificant digits of the ANSI color codes
# eg x4 is blue; x may be 3 for foreground, 4 for background
COLOR_MAP =
  black:   0
  red:     1
  green:   2
  yellow:  3
  blue:    4
  magenta: 5
  purple: 5
  cyan:    6
  white:   7
  default: 9

# maps names to [start-code, stop-code]
ANSI_CODE_MAP =
  reset:     [0, 0]
  bold:      [1, 22]
  italics:   [3, 23]
  inverse:   [7, 27]
  strike:    [9, 29]
  underline: [4, 24]

for color_name, insig of COLOR_MAP
  ANSI_CODE_MAP[color_name]        = [30 + insig , 39] # eg red => 31
  ANSI_CODE_MAP[color_name + "bg"] = [40 + insig, 49] # redbg => 41

_addProp = (name, code) ->
  # this must be a function all to itself so that 'code' has proper scope
  # (otherwise everything will be defaultbg -- the last item)
  Object.defineProperty(String.prototype, name, get: ->
    if @icolorEnabled
      return esc(code[0]) + @ + esc(code[1])
    return String(@)
  )
  return

for name, code of ANSI_CODE_MAP
  _addProp(name, code)

# toggle for turning iColor on and off
String.prototype.icolorEnabled = true
String.icolorToggle = String.prototype.icolorToggle = (enable) ->
  if enable
    String.prototype.icolorEnabled = enable
  else
    String.prototype.icolorEnabled = not String.prototype.icolorEnabled
  return @

# rip out colors from string
Object.defineProperty(String.prototype, 'stripColors', ->
  return ("" + @).replace(/\u001b\[\d+m/g,'')
)

