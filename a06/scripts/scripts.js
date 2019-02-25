/**
*
*  title	: JavaScript Lab 06, Client-side Programming I && II
*  author	: orem18kz
*  email	: orem18kz[@]student,ju,se
*
*/
window.onload = function() {
	document.getElementById('sandbox').onclick = function(e) { catchClick(e); }
}
function catchClick(e) {
	var el	= e.target;
	var w		= e.target.offsetWidth;
	var h 	= e.target.offsetHeight;
	var el2;
	for(var i=0;i<2;i++) {
		el2 							= document.createElement("div");
		el2.className 		= (el.className=="v") ? "h":"v";
		el2.offsetWidth  	= w/2;
		el2.offsetHeight 	= h/2;
		el2.setAttribute("style",nextColor());
		el.appendChild(el2);
	}
}
/* Helper functions */
function _(str) { console.log(str); }
/* jQuery routines for nmd.eozyo.info */
$(document).ready(function($){
	$('aside p a').click(function(e){
		e.preventDefault();
		$(this).parent().next().slideToggle('slow');
  });
});
