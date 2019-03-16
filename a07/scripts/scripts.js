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
	["keypress","input","paste"].forEach(function($event) { guessTheNumber.html.input.addEventListener($event, function(e) { guessTheNumber.input(e); }) }
	guessTheNumber.html.input.addEventListener( "select", function(e) { guessTheNumber.erase(e); guessTheNumber.draw(); });
	guessTheNumber.html.input.setAttribute("min",guessTheNumber.data.lowLimit);
	guessTheNumber.html.input.setAttribute("max",guessTheNumber.data.highLimit);
	guessTheNumber.html.input.autofocus;
}

function GuessGame($inputTag="inputTag",$buttonTag="validate",$guessArea="guessArea",$lowLimit=1,$highLimit=10,$chances=10) {
	this.data 	= {
		lowLimit 		: $lowLimit,
		highLimit 	: $highLimit,
		chances 		: $chances,
		random 			: _random(1,10),
		validKeys 	: [48,49,50,51,52,53,54,55,56,57],
		guess				: null
	}
	this.html		= {
		input 			:	document.getElementById($inputTag),
		button			: document.getElementById($buttonTag),
		ul					: document.getElementById($guessArea),
		div_rdm			: document.getElementById("random"),
		get li() 		{ return this.ul.children; }
	}
	this.input	= function(e) {
		this.html.div_rdm.innerText=this.data.random;

		e.preventDefault();
		let inputSource 	= e;
		let initial_input	= this.html.input.value;

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
						_("a valid number, out ouf bounds, was entered");
					}
				} else { alert("Sorry, only numbers are allowed."); }
				break;
			case "input":
				if(this.html.input.value!="" && typeof +this.html.input.value == "number") {
					this.draw(this.html.input.value);
				} else { this.draw(); }
				break;
			default:
				alert("Please only use your keyboard to input numbers");
		}

	}
	this.draw		= function($amt=0) {
		let html = {
			circles		: document.querySelectorAll("#guessArea li"),
			li_guess	: document.querySelectorAll("li.guess")
		}

		html.li_guess.forEach(function(element) { element.classList.remove("guess"); });

		if($amt>0){
			if(this.html.button.hasAttribute("disabled")) { this.html.button.removeAttribute("disabled"); }

			html.circles.forEach(function(circle) {
				if(!circle.classList.contains("white")) {
					circle.classList.add("white");
				}
			})

			for(let i=0; i<$amt; i++) {
				html.circles[i].classList.add("guess");
			}

		} else {
				html.li_guess.forEach(function(el) { el.classList.remove("guess"); });
				this.html.button.setAttribute("disabled", "disabled")
		}
	}

	// inputs
/*this.input			= function(e) {
		this.data.keyPressed		= +e.charCode;
		let that								= this;
		let valuePressed				= this.data.validKeys.indexOf(this.data.keyPressed);
		let current_input				= { value : this.html.input.value, charCount : this.html.input.value.length }
		let sum, err_msg;
		if( !isNaN(this.data.keyPressed) && this.data.validKeys.includes(this.data.keyPressed) ) {
			_("Key pressed: " + this.data.keyPressed + ": valid : " + valuePressed);
			_("current current_input.charCount:" + current_input.charCount)

			sum 		= current_input.value;
			err_msg = " would not be ";

			sum += valuePressed;
			sum = parseInt(sum);

			if( sum>(this.data.lowLimit-1) && sum<(this.data.highLimit+1) ) {
				if(this.html.button.hasAttribute("disabled"))	{ this.html.button.removeAttribute("disabled"); }

				for(var i=0;i<this.html.ul.children.length;i++) {
					if(i<sum) { this.html.ul.children[i].className="guess"; }
					else 			{ this.html.ul.children[i].classList.remove("guess"); }
				}
				this.html.button.onclick = function(e) { that.validate(); }
			}
			else {
				e.preventDefault();

				if(!isNaN(this.data.keyPressed) && isNaN(sum)) {
					err_msg = "Something does not seem quite right";
					this.html.input.value="";
				} else {
					switch (true) {
						case sum<this.data.lowLimit:
							err_msg += "higher or equal to the low limit of " + this.data.lowLimit;
							break;
						case sum>this.data.highLimit:
							err_msg += "lower or equal to the high limit of " + this.data.highLimit;
							break;
						default:

					}
					err_msg = "Sorry, " + sum + err_msg;
				}
				alert(err_msg +".\nPlease try again.");
				this.html.input.setSelectionRange(0,this.html.input.value.length);
			}

		} else {
			e.preventDefault();
			alert("You can only enter numbers. Thanks.")
		}


	}
	// outputs
	this.output			= function(e) {
		_("this.output()")
		let no_val = (this.html.input.value=="") ? true : false;
		let curVal = (this.html.input.value!="") ? +this.html.input.value : 0;
		_(e);
		if( curVal<(this.data.lowLimit-1) || curVal>(this.data.highLimit+1) || no_val===true ) {
			this.html.button.setAttribute("disabled","disabled");
		}
		if(e.keyCode==8 || e.keyCode==46) {
			this.resetC();
		}
	}*/
	// erases
	this.erase			= function(e) {
		e.preventDefault();
		this.html.input.value="";
	}
	/*
	// validates
	this.validate		= function(e) {
		alert("here it will be validated");
		_(e);
	}
	// resets
	this.resetC			= function() {
		for (let i=0, l=this.html.ul.children.length; i<l; i++) {
			if(this.html.ul.children[i].classList.contains("guess")) {
				this.html.ul.children[i].classList.remove("guess");
				this.html.button.setAttribute("disabled","disabled");
			}
		}
	} /*
	// wheels
	this.wheel			= function(e) {
		if(this.html.input.value == "") { this.html.input.value = 0; }

		if (e.deltaY < 0) { if(this.html.input.value < this.data.highLimit) { this.html.input.value++; } }
		if (e.deltaY > 0) { if(this.html.input.value > this.data.lowLimit)  { this.html.input.value--; } }
	}
	*/
}
/* Helper functions */
function _random($min,$max) { var r = ($min<0) ? $min + Math.random()*(Math.abs($min)+$max) : $min + Math.random()*$max; return Math.round(r); }
function _(str) { console.log(str); }
/* jQuery routines for nmd.eozyo.info */
$(document).ready(function($){ $('aside p a').click(function(e){ e.preventDefault(); $(this).parent().next().slideToggle('slow'); }); });
