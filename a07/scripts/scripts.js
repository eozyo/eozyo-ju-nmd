/**
*
*  title	: JavaScript Lab 07, Client-side Programming I && II
*  author	: orem18kz
*  email	: orem18kz[@]student,ju,se
*
*/
var guessTheNumber;
window.onload = function() {
	guessTheNumber = new GuessGame();
	["keypress","input","focus","paste"].forEach(function($event) { guessTheNumber.html.input.addEventListener($event, function(e) { guessTheNumber.input(e); }) });
	guessTheNumber.html.input.addEventListener ("select", function(e) { guessTheNumber.erase(e); guessTheNumber.draw(); });
	guessTheNumber.html.button.addEventListener("click",  function(e) { guessTheNumber.challenge(e); });
	guessTheNumber.html.input.setAttribute("min",guessTheNumber.data.lowLimit);
	guessTheNumber.html.input.setAttribute("max",guessTheNumber.data.highLimit);
}

function GuessGame($inputTag="inputTag",$buttonTag="validate",$guessArea="guessArea",$stats="stats",$lowLimit=1,$highLimit=10,$chances=10) {
	this.data 	= {
		lowLimit 		: $lowLimit,
		highLimit 	: $highLimit,
		gameNumber	: 0,
		chances 		: $chances,
		random 			: _r(1,10),
		validKeys 	: [48,49,50,51,52,53,54,55,56,57],
		guess				: null,
		score				: 0
	}
	this.html		= {
		input 			:	document.getElementById($inputTag),
		button			: document.getElementById($buttonTag),
		ul					: document.getElementById($guessArea),
		stats				: document.getElementById($stats),
		circles			: document.querySelectorAll("#guessArea li"),
		li_guess		: null,
		div_rdm			: document.getElementById("random"),
		get li() 		{ return this.ul.children; }
	}
	this.input = function(e) {

		let inputSource 	= e;
		let initial_input	= this.html.input.value;
		e.preventDefault();
		this.html.div_rdm.innerText = this.data.random;
		switch (inputSource.type) {
			case "keypress":
				let keyPressed = {
					charCode	: +inputSource.charCode,
					isValid		: (this.data.validKeys.includes(+inputSource.charCode)) ? true : false,
					number		: this.data.validKeys.indexOf(+inputSource.charCode)
				}
				if(keyPressed.charCode && keyPressed.isValid === true) {
					this.data.guess = (initial_input!="") ? initial_input:0;
					this.data.guess += keyPressed.number;

					if( this.data.guess>(this.data.lowLimit-1) && this.data.guess<(this.data.highLimit+1) ){
						this.html.input.value = this.data.guess;
						this.draw(this.data.guess);
					} else {
						alert("Sorry, but number " + this.html.input.value + keyPressed.number.toString() + " would be outbonds.\nPlease, enter a number between " + this.data.lowLimit + " and " + this.data.highLimit + ".");
						__("a valid number, out ouf bounds, was entered");
					}
				} else { alert("Sorry, only numbers are allowed."); }
				break;
			case "input":
			case "focus":
				if(this.html.input.value!="" && typeof +this.html.input.value == "number") {
					this.data.guess = this.html.input.value;
					this.draw(this.data.guess); } else { this.draw();
				}
				break;
			default:
				alert("Please only use your keyboard to input numbers");
				__(e);
		}
	}
	this.draw = function($guess=0) {
		this.html.li_guess = document.querySelectorAll("li.guess");
		this.html.li_guess.forEach(function($element) { $element.classList.remove("guess"); });
		if($guess>0){
			if(this.html.button.hasAttribute("disabled")) { this.html.button.removeAttribute("disabled"); }
			this.html.circles.forEach(function(circle) {	if(!circle.classList.contains("white")) { circle.classList.add("white"); }	});
			for(let i=0; i<$guess; i++) { this.html.circles[i].classList.add("guess"); }
		} else {
				this.html.li_guess.forEach(function($element) { $element.classList.remove("guess"); });
				this.html.circles.forEach (function(circle)   { if(circle.classList.contains("white")) { circle.classList.remove("white"); }	});
				this.html.button.setAttribute("disabled", "disabled")
		}
	}
	this.challenge = function(e) {
		let that = this;

		if(this.html.stats.style.display===""||this.html.stats.style.display==="none") { this.html.stats.style.display="block"; }

		switch (true) {
			case (this.data.guess<=this.data.random):
				for(let i=0; i<this.data.guess; i++) { this.html.circles[i].classList.add("matched"); }
				this.data.score += this.data.guess;
				break;
			default:

		}



		__(e);
	}
	this.erase = function(e) { e.preventDefault(); this.html.input.value=""; this.draw(); }
}
/* Helper functions */
function __(str) { console.log(str); }
function _r($min,$max) { $min = Math.ceil($min); $max = Math.floor($max); return Math.floor(Math.random() * ($max - $min + 1)) + $min; }
/* jQuery routines for nmd.eozyo.info */
$(document).ready(function($){ $('aside p a').click(function(e){ e.preventDefault(); $(this).parent().next().slideToggle('slow'); }); });
