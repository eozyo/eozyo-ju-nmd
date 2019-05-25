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
	guessTheNumber.html.input.addEventListener("select", function(e) { guessTheNumber.erase(e); });
	guessTheNumber.html.button.omni.addEventListener("click", function(e) { guessTheNumber.start(e,this); })
	guessTheNumber.html.input.setAttribute("min",guessTheNumber.data.lowLimit);
	guessTheNumber.html.input.setAttribute("max",guessTheNumber.data.hghLimit);
}

function GuessGame($inputTag="inputTag",$omniButton="omni",$board="board",$stats="stats",$display="display",$random="random",$table="scores",$lowLimit=1,$hghLimit=10,$rounds=5) {
	this.html		= {
		input 			:	document.getElementById($inputTag),
		button			: { omni : document.getElementById($omniButton) },
		section			: {
			board		: document.getElementById($board),
			stats		: document.getElementById($stats),
			random	: document.getElementById($random)
		},
		ul					: document.getElementById($display),
		board				: {
			game	 : document.getElementById("gameBoard"),
			round  : document.getElementById("roundBoard"),
			guess	 : document.getElementById("guessBoard"),
			random : document.getElementById("randomBoard"),
			pts		 : document.getElementById("totalPtsBoard"),
			update : function(data,board,table) {
				board.game.innerText 	 = data[0];
				board.round.innerText	 = data[1];
				board.guess.innerText	 = data[2];
				board.random.innerText = data[3];
				board.pts.innerText		 = data[4];
			}
		},
		table				: document.getElementById($table),
		circles			: document.querySelectorAll("#" + $display + " li"),
		li_guess		: null,
		div_rdm			: document.getElementById("random"),
		get li() 		{ return this.ul.children; }
	}
	this.data		= {
		lowLimit : $lowLimit,
		hghLimit : $hghLimit,
		games		 : new Array(),
		game		 : 0,
		rounds	 : $rounds,
		round 	 : 0,
		guess		 : null,
		random 	 : _r($lowLimit,$hghLimit),
		numKeys	 : [48,49,50,51,52,53,54,55,56,57],
		score		 : 0
	}
	this.draw 	= function($guess=0) {
		this.html.li_guess = document.querySelectorAll("li.guess");
		this.html.li_guess.forEach(function($element) { $element.classList.remove("guess"); });
		if($guess>0){
			if(this.html.button.omni.style.display!==""||this.html.button.omni.style.display!=="none") {
				if(this.html.button.omni.hasAttribute("disabled")) { this.html.button.omni.removeAttribute("disabled"); }
			}
			this.html.circles.forEach(function(circle) {	if(!circle.classList.contains("white")) { circle.classList.add("white"); }	});
			for(let i=0; i<$guess; i++) { this.html.circles[i].classList.add("guess"); }
		} else {
				this.html.li_guess.forEach(function($element) { $element.classList.remove("guess"); });
				this.html.circles.forEach (function(circle)   { if(circle.classList.contains("white")) { circle.classList.remove("white"); }	});
				this.html.button.omni.setAttribute("disabled", "disabled");
		}
	}
	this.input 	= function(e) {
		let inputSource 	= e;
		let initial_input	= this.html.input.value;
		e.preventDefault();
		this.html.section.random.innerText = this.data.random;
		switch (inputSource.type) {
			case "keypress":
				let keyPressed = {
					charCode	: +inputSource.charCode,
					isValid		: (this.data.numKeys.includes(+inputSource.charCode)) ? true : false,
					number		: this.data.numKeys.indexOf(+inputSource.charCode)
				}
				if(keyPressed.charCode && keyPressed.isValid === true) {
					this.data.guess = (initial_input!="") ? initial_input:0;
					this.data.guess += keyPressed.number;

					if( this.data.guess>(this.data.lowLimit-1) && this.data.guess<(this.data.hghLimit+1) ){
						this.html.input.value = this.data.guess;
						this.draw(this.data.guess);
					} else {
						alert("Sorry, but number " + this.html.input.value + keyPressed.number.toString() + " would be outbonds.\nPlease, enter a number between " + this.data.lowLimit + " and " + this.data.hghLimit + ".");
						__("a valid number, out ouf bounds, was entered");
					}
				} else { alert("Sorry, only numbers are allowed."); }
				break;
			case "input":
			case "focus":
				if(this.html.input.value!="" && typeof +this.html.input.value == "number") {
					this.data.guess = +this.html.input.value;
					this.draw(this.data.guess); }
				else { this.draw(); }
				break;
			default:
				alert("Please only use your keyboard to input numbers");
				__(e);
		}
	}
	this.erase 	= function(e) {
		if(e) { e.preventDefault(); }
		this.html.circles.forEach(function($circle) { $circle.removeAttribute("class"); })
		this.html.input.value="";
		this.html.input.focus();
		this.draw();
	}
	this.start	= function(e,omni) {
		if(this.data.round==0) { this.data.game++; }
		if(this.data.round!==this.data.hghLimit) {
			this.html.board.game.innerText = this.data.game;
			let current_class = omni.className;
			switch (current_class) {
				case "launch":
					omni.classList.add("next-try");
					omni.innerText="next try";
					this.match(omni);
					break;
				case "next-try":
					omni.classList.add("launch");
					omni.innerText="match";
					this.erase();
					break;
					case "game-end":
						omni.classList.add("next-try");
						omni.innerText="new game";
						this.erase();
						break;
				default:

			}
			omni.classList.remove(current_class);
			this.html.board.round.innerText = (this.data.round==0) ? 1 : this.data.round;
		}
	}
	this.match	= function($btn) {
		let match_class = (this.data.guess<=this.data.random) ? "matched":"mismatched";

		if(this.html.section.stats.style.display===""||this.html.section.stats.style.display==="none") { this.html.section.stats.style.display="block"; }
		for(let i=0; i<this.data.random; i++) { this.html.circles[i].classList.add("revealed"); }
		for(let i=0; i<this.data.guess; i++)  { this.html.circles[i].classList.add(match_class); }

		this.data.round++;
		this.data.score += (this.data.guess<=this.data.random) ? +this.data.guess:0;

		let data = [this.data.game,this.data.round,this.data.guess,this.data.random,this.data.score];

		this.html.board.update(data,this.html.board,this.html.table);
		if(this.data.round!==this.data.hghLimit) {
			this.data.random = _r($lowLimit,$hghLimit);
		} else {
			this.html.button.omni.removeAttribute("class");
			this.html.button.omni.className="game-end";
			this.html.button.omni.innerText="new game";
		}
	}
}
/* Helper functions */
function __(str) { console.log(str); }
function _r($min,$max) { $min = Math.ceil($min); $max = Math.floor($max); return Math.floor(Math.random() * ($max - $min + 1)) + $min; }
/* jQuery routines for nmd.eozyo.info */
$(document).ready(function($){ $('aside p a').click(function(e){ e.preventDefault(); $(this).parent().next().slideToggle('slow'); }); });
