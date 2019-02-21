window.onload = function() { document.getElementById("start").onclick = function () { startGame(); } }

function startGame($lowLimit=1,$highLimit=80,$chances=5) {
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
		//debugger;
		switch(true) {
			case (!isNaN(parseInt(guess)) && guess >= $lowLimit && guess <= $highLimit):
				guess = parseInt(guess);
				if(guess == rndm) { msg = "You Won! the number was indeed " + rndm; var win = true; quit = true; }
				else {
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
					msg = msg + "\nSorry, (" + guess + ") was incorrect, try with a " + ((sign > 0) ? "lower" : "higher") + " number. :";
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
					case (guess < $lowLimit)  : msg += "lower than "  + $lowLimit  + ". "; break;
					case (guess > $highLimit) : msg += "higher than " + $highLimit + ". "; break;
									default	  : msg = "Something went wrong.\n"
				}
			break;
			case (isNaN(guess)): 
				msg = "Sorry, (" + guess + ") does not seem to be a valid character. ";
			break;
			
			default: msg = "Something went wrong. ";
		}	
		if(win===true && quit === true) { turn++; break; } else
		if(quit===true) { break; }
		if(count=== true) { turn++; count = false; }
	}
	record(win,rndm,(turn),guess,$chances)
	alert(msg);
}
function record($win,$rndm,$turn,$guess,$chances){
	debugger;
	var records = document.getElementById("records");
	var average = document.getElementById("average");
	var li		= document.createElement("li");
	var won		= document.getElementsByClassName("game-won");
	var sum		= 0;
	
	$guess = ($guess==null) ? "x" : $guess;
	if(records.childElementCount>0) { li.setAttribute("id","game-"+records.childElementCount); } else { li.setAttribute("id","game-0"); }
	switch(true) {
		case $win:
			_("user won");
			li.setAttribute("class","game-won");
			li.innerText = "Game Won. Congrats! In " + $turn + " turn" + (($turn>1) ? "s":"") + " you guessed the random number " + $rndm + ".";
		break;
		case ($win==null && $turn==$chances):
			_("user lost"); 
			li.setAttribute("class","game-lost");
			li.innerText = "Game Lost. You could not guess the random number " + $rndm + " after " + $turn + " turn" + (($turn>1) ? "s":"") + ".";
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
	records.appendChild(li);
	
	if(won.length>0){
		for (i = 0; i < won.length; i++) {
			sum += +won[i].dataset.attempts;
		}
		average.firstElementChild.innerHTML = (sum/won.length).toFixed(2);
		average.style.display="block";
	} else { average.firstElementChild.innerHTML = li.dataset.toFixed(2); }
	
}

function _start_game($lowLimit=1,$highLimit=80,$chances=10) { 
	console.log("User started the game.");
	var turn	= 1;
	var random	= _random($lowLimit,$highLimit);
	var prmpt	= 'Please, enter a number between ' + $lowLimit + ' and ' + $highLimit,$lowLimit;
	var guess	= _validate_prompt(prompt(prmpt,$lowLimit),lguess,turn,random);
	var lguess	= [guess];
	var msg		= "WOW! That's fantastic!!!\nYou've guessed at the first attempt!";
	var r_msg	= [];
	var diff,sign,r;
	if(guess==null) { console.log("Game Ended"); return false; }
	if(guess === random) { _end_game(1,turn,lguess,random); alert(msg); }
	else {
		while( guess != random && turn <= $chances) {
			diff	= Math.abs (guess - random);
			sign= Math.sign(guess - random);
			if(turn==$chances) { msg   = "Sorry you've used all your turns!\nYou've lost :("; }
			else {
				switch(true) {
					case diff <=  5: msg = "Very Hot! You just missed it!"; break;
					case diff <= 10: msg = "Hot! You are really close!"; break;
					case diff <= 15: msg = "Warm! You are in the ballpark!"; break;
					case diff <= 20: msg = "Cold! Your number was far."; break;
					case diff <= 25: msg = "BRRR Freezing! You're a bit far away."; break;
					default: msg = "I can't help you, the number is very, very far.";
				}
				prmpt = ((sign > 0) ? " high, lower " : " low, raise ");
			}	
			if(turn <= $chances) {
				alert(msg + " " + random + ":" + turn);
				++turn;
				if(turn <= $chances) {
					guess = _validate_prompt(prompt("Your last guess (" + guess + ") was too" + prmpt + "your choice:",lguess[turn-2]),lguess,turn,random);
					if(guess==null) { console.log("Game Ended"); return false; }
					console.log("Player selected choice " + turn + ": (" + guess +")");
					lguess.push(guess);
					console.log("lguess: " + lguess);
				}
			} else { alert(msg); }
		}
	}
	r 		= (guess!==random && turn > $chances) ? 0 : 1;
	r_msg 	= [(guess!==random && turn > $chances) ? "You lost! Your last choice," : "You Won!",(guess!==random && turn > $chances) ? ", didn't match" : "matches"];
	turn 	= (turn > $chances) ? 10 : turn;
	_end_game(r,turn,lguess,random);
	alert( r_msg[0] + " " + guess + " " + r_msg[1] + " the random number (" + random + "). Attempts: " + turn);
}
function _end_game($result,$turn,$lguess,$random) {
	var average		= document.getElementById("average");
	var stats_ul	= document.getElementById("stats");
	var li_element	= document.createElement("li");
	var games_won	= document.getElementsByClassName("game-won");
	var sum			= 0;
	var li_text,games_won;
	
	if(stats_ul.children.length == 0) {
		if(games_won){ average.innerHTML = $turn; average.parentNode.style="display:block;"; }
		li_text = document.createTextNode("Game 1: " + ($result == 0 ? "Lost" : "Won") + " (" + $turn + " attempts, random number: " + $random + ").");
		li_element.setAttribute("class", ($result == 0 ? "game-lost" : "game-won"));
		li_element.setAttribute("data-attempts", $turn);
		li_element.appendChild(li_text);
		stats_ul.appendChild(li_element);
	} else {
		li_text = document.createTextNode("Game " + (stats_ul.children.length+1) + ": " + ($result == 0 ? "Lost" : "Won") + " (" + $turn + " attempts, random number: " + $random + ").");
		li_element.setAttribute("class", ($result == 0 ? "game-lost" : "game-won"));
		li_element.setAttribute("data-attempts", $turn);
		li_element.appendChild(li_text);
		stats_ul.appendChild(li_element);

		if(games_won){
			for (i = 0; i < games_won.length; i++) {
				sum += +games_won[i].dataset.attempts;
				console.log(sum);
			}
			average.innerHTML = (sum/games_won.length).toFixed(2);
		}
	}
	console.log($result,$turn,$lguess,$random);
	console.log("Game Ended");
	return;
}
function _validate_prompt(guess,lguess,turn,random,lowLimit=1,highLimit=80) {
	if(guess != null){
		var err = [];
		while(isNaN(guess)|| guess === "" || guess.replace(/\s/g, "").length<1) {
			guess = _validate_prompt(prompt("You didn't enter any number.\n\nPlease, enter a number between " + lowLimit + ' and ' + highLimit + ".",lowLimit),guess,lguess,turn,random);
		}
		if (guess < lowLimit||guess > highLimit) {
			switch(true) {
				case (guess < lowLimit) : err.push("lower","inferior");  break; 
				case (guess > highLimit): err.push("higher","superior"); break;
			}
			guess = _validate_prompt(prompt("Your number is " + err[0] + " than the " + err[1] + " limit.\n\nPlease, enter a number between " + lowLimit + ' and ' + highLimit + ".",lowLimit),guess,lguess,turn,random);
		}	
		return guess;
	} else {
		var confirm_exit = confirm("Are you sure you want to exit the game?");
		if(confirm_exit==true) {
			console.log("Player canceled the game.");
			_end_game(0,turn,lguess,random);
			return;
		}
		else {
			console.log("Player decided not to cancel the game.");
			console.log("lguess: "+ lguess + " turn: " + turn);
			guess = (lguess != null ? lguess[turn-2]:1);
			guess = _validate_prompt(prompt("Your last guess was (" + guess + "), try a new number:",guess),lguess,turn,random);
			return guess;
		}
	}
}

/* Helper functions */
function _random($lowerLimit,$higherLimit) { var random = Math.floor((Math.random()*$higherLimit)+$lowerLimit); return random; }
function _(str) { console.log(str); }