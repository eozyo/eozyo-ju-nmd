/**
*
*  title	: JavaScript Lab 07, Client-side Programming I && II
*  author	: orem18kz
*  email	: orem18kz[@]student,ju,se
*
*/
window.onload = function() {

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
