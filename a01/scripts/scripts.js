/**
*
*  title	: Lab01, Client-side Programming I && II
*  author	: orem18kz
*  email	: orem18kz[@]student,ju,se
*
*/
window.onload = function() { document.getElementById("start").onclick = function () { startGame(); } }
function startGame($lowLimit=1,$highLimit=80,$chances=10) {
	var rndm  = _random($lowLimit,$highLimit);
	var msg	  = "Welcome to Guess the Number."
	var prmpt = "\nPlease, enter a number between " + $lowLimit + " and " + $highLimit + ".";
	var tabs  = [];
	var turn  = 0;
	var quit  = false;
	var count = false;
	var diff,guess,sign;
	while(turn<$chances) {
		guess = (prompt(msg + prmpt));
		switch(true) {
			case (!isNaN(parseInt(guess)) && guess >= $lowLimit && guess <= $highLimit):
				guess = parseInt(guess);
				if(guess == rndm) { msg = "You Won! the number was indeed " + rndm; var win = true; quit = true; }
				else {
					if(turn+1 !== $chances) {
						diff = Math.abs (guess-rndm);
						sign = Math.sign(guess-rndm);
						switch(true) {
							case diff <=  5	: msg = "Very Hot! You just missed it!"; break;
							case diff <= 10	: msg = "Hot! You are really close!"; break;
							case diff <= 15	: msg = "Warm! You are in the ballpark!"; break;
							case diff <= 20	: msg = "Cold! Your number was far."; break;
							case diff <= 25	: msg = "BRRR Freezing! You're a bit far away."; break;
									default	: msg = "Sorry, I can't help you. Your number is just very, very far.";
						}
						msg = msg + "\nSorry, (" + guess + ") was incorrect, try with a " + ((sign > 0) ? "lower" : "higher") + " number.";
					} else { msg = "Sorry, you ran out of your " + $chances + " chances.\nGame over."; }
					tabs.push(guess);
					count = true;
				}
			break;
			case (guess==null || !guess):
				if(guess==null) {
					var confirm_exit = confirm("Are you sure you want to exit the game?");
					if(confirm_exit===true) { msg = "User canceled the game"; quit = true; }
				} else {
					msg = "(It seems that you forgot to enter a number.)\n"+msg;
				}
			break;
			case (!isNaN(guess)):
				msg = "Sorry, you cannot enter numbers ";
				switch(true) {
					case (guess < $lowLimit)  : msg += "lower than "  + $lowLimit  + "."; break;
					case (guess > $highLimit) : msg += "higher than " + $highLimit + "."; break;
									default	  : msg = "Something went wrong.\n"
				}
			break;
			case (isNaN(guess)): msg = "Sorry, (" + guess + ") does not seem to be a valid character."; break;
			default: msg = "Something went wrong. ";
		}
		if(win===true && quit === true) { turn++; break; } else
		if(quit===true) { break; }
		if(count=== true) { turn++; count = false; }
	}
	record(win,rndm,turn,guess,tabs.toString(),$chances)
	alert(msg);
}
function record($win,$rndm,$turn,$guess,$tabs,$chances){
	var record = document.getElementById("record");
	var average = document.getElementById("average");
	var li		= document.createElement("li");
	var won		= document.getElementsByClassName("game-won");
	var sum		= 0;
	$guess = ($guess==null) ? "x" : $guess;
	if(record.childElementCount>0) { li.setAttribute("id","game-"+record.childElementCount); } else { li.setAttribute("id","game-0"); }
	switch(true) {
		case $win:
			_("user won");
			li.setAttribute("class","game-won");
			li.innerText = "You Won. Congrats! In " + $turn + " turn" + (($turn>1) ? "s":"") + " you guessed the random number " + $rndm + ".";
		break;
		case ($win==null && $turn==$chances):
			_("user lost");
			li.setAttribute("class","game-lost");
			li.innerText = "You Lost. You did not guess the random number " + $rndm + " after " + $turn + " turn" + (($turn>1) ? "s":"") + ".";
		break;
		case $win==null:
			if($win==null) {
				_("user canceled");
				li.setAttribute("class","game-canceled");
				li.innerText = "Game Canceled after " + $turn + " attempt" + (($turn>1) ? "s":"") + ". The random number was " + $rndm + ".";
			}
		break;
		default:
			_("An error has ocurred");
			li.setAttribute("class","error");
			li.innerText = "Game error. Game stopped after " + $turn + " attempt" + (($turn>1) ? "s":"") + ". The random number was " + $rndm + ".";
	}
	li.setAttribute("data-attempts",$turn);
	li.setAttribute("data-random",$rndm);
	li.setAttribute("data-guess",$guess);
	li.setAttribute("title", (($tabs!="") ? "[Your wrong guesses were: " + $tabs +"]" : "There were no guesses.") );
	record.appendChild(li);
	if(won.length>0){
		for (i = 0; i < won.length; i++) { sum += +won[i].dataset.attempts; }
		average.firstElementChild.innerHTML = (sum/won.length).toFixed(2);
		average.style.display="block";
	} else { average.firstElementChild.innerHTML = li.dataset.attempts; }
}
/* Helper functions */
function _random($lowerLimit,$higherLimit) { var random = Math.floor((Math.random()*$higherLimit)+$lowerLimit); return random; }
function _(str) { console.log(str); }
/* jQuery routines for nmd.eozyo.info */
$(document).ready(function($){
	$('aside p a').click(function(e){
		e.preventDefault();
		$(this).parent().next().slideToggle('slow');
  });
});
