window.onload = function() { 

	var start_button = document.getElementById("start");
	start_button.onclick = function () { _start_game(); }

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
	var diff,diffSign,r;
	//debugger;
	if(guess==null) { console.log("Game Ended"); return false; }
	console.log("Player selected choice " + turn + ": (" + guess + ").");
	if(guess === random) { _end_game(1,turn,lguess,random); alert(msg); }
	else {
		
		
		
		while( guess != random && turn <= $chances) {
			diff	= Math.abs (guess - random);
			diffSign= Math.sign(guess - random);
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
				prmpt = ((diffSign > 0) ? " high, lower " : " low, raise ");
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
				
			} else {
				alert(msg);
				
			}
		}
	}
	r = (guess!==random && turn > $chances) ? 0 : 1;
	r_msg = [(guess!==random && turn > $chances) ? "You lost! Your last choice," : "You Won!",(guess!==random && turn > $chances) ? ", didn't match" : "matches"];
	turn = (turn > $chances) ? 10 : turn;
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

		games_won = document.getElementsByClassName("game-won");
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
		
		console.log("User pressed the cancel button.");
		
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
function _random($lowerLimit,$higherLimit) { var random = Math.floor((Math.random()*$higherLimit)+$lowerLimit); return random; }