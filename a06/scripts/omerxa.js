/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  This script contains ES6 specific generator functions. Use es6-shim.js
  The following code is an adaptation of the original code created 
  by @jbum | https://krazydad.com/tutorials/makecolors.php
  It is ok to include this script in your labs to 
  generate new colors for iterative purposes. 
> nextColor() returns a css color string
  * * * * * * * * * * * * * * * * * * */

function nextColor() {
  return colorStepper.next().value
}
var colorStepper=makeColorGradient(.3, .3, .3, 0, 1, 2, 192, 63, 32);
function* makeColorGradient(frequency1, frequency2, frequency3, phase1, phase2, phase3, center, width, len) {
  if (len==undefined)
    len=49;
  if (center==undefined)
    center=128;
  if (width==undefined)
    width=127;
  for (var i=0; i<=len; ++i) {
    var r=Math.round(Math.sin(frequency1*i+phase1)*width+center);
    var g=Math.round(Math.sin(frequency2*i+phase2)*width+center);
    var b=Math.round(Math.sin(frequency3*i+phase3)*width+center);
    yield `background-color:rgb(${r},${g},${b})`
    i=i==len? 0:i;
  }
}