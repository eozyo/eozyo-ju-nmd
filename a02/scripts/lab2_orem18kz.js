/**
*
*  title	: Lab02, Client-side programming
*  author	: orem18kz
*  email	: orem18kz@student.ju.se
*
*/

window.onload = function () {
	var start_button  = document.getElementById("start");
	var stats  = document.getElementById("stats");
	var highlight_button = document.getElementById("highlight"); 
	start_button.onclick = function() { start_game(); }
}


/* start the game */
function start_game ($levels=7,$chances=2) {
	console.log("Game started");
	var ctrl= 0;
	var turn= 0;
	var pts = 0;
	var msg = "Welcome to Lab02: Hurdle Game!\n\nThe goal of the game is to guess the correct answer\nin order to move forward in the game.\n\nYou will have " + $chances + " chances per question to guess\nthe correct answer.";
	var answer,
		breadcrumbs,
		bc_prmpt,
		confrm,
		d;	

	console.log("\tWelcome message.");
	alert(msg);
	
	while(turn < $levels) {

	if(!breadcrumbs) { breadcrumbs = ""; }
		msg 	 = ($chances==2 && ctrl==0) ? _do_question(turn) : msg;
		d 		 = ($chances==2) ? "--": "×-";
		bc_prmpt = breadcrumbs + d + (turn+1) + _close_breadcrumbs($levels,turn);

		console.log("\to" + bc_prmpt + "\n\tQuestion " + turn+1 + ": " + msg[1]);
		answer = ($chances==2 && ctrl==0) ? prompt("\o" + bc_prmpt + "\n\n" + msg[0]+msg[1]) : prompt("\o" + bc_prmpt + "\n\n" + msg[1]);
		if(answer) {
			if (answer.toLowerCase().replace(/\s/g, "") == msg[2].replace(/\s/g, "")) {
				console.log("\tCorrect answer: " + answer);
				alert("YES! Correct!");
				turn++; breadcrumbs += d + "o"; pts += ($chances==2) ? 2 : 1; $chances=2,ctrl=0; 
			} else {
				console.log("\tWrong answer: " + answer);
				alert ("No sorry, error. Try again.");
				if($chances==2) {
					$chances--;
				} else {
					console.log("\t2 answers wrong.");
					end_game(0,"\tUser out of chances. Game Over\nGame ends",pts);
					alert("Sorry you didn't get the correct answer.\nGAME OVER!");
					break;
				}
			}
		}
		else {
			console.log("\tCancel button pressed");
			confrm = confirm("Are you sure you want to exit the game?");
			if(confrm) {
				end_game(1,"\tExit game confirmed. Game Over\nGame ends.",0);
				return;
				break;
			} else {
				ctrl = 1;
			}
		}
	}
	if(answer.toLowerCase().replace(/\s/g, "") == msg[2]) {
		end_game(2,"\tUser won. Game over.\nGame ends.",pts);
		alert("Congratulations!\nYou have WON!");
	}
}

/* end game */
function end_game($reason,$msg,$pts) { 
	switch($reason) {
		case 0: break;
		case 1: break;
		case 2: break;
	}
	_do_li($reason,$pts);
	console.log($reason,$msg,$pts); 
}

/* in-game routines */	
function _close_breadcrumbs($levels,$turn) {
	var i,d;
	var d="";
	for(i=0;i<$levels;++i) { 
		if(i>$turn) { d += "--" + (i+1); }
	}
	return d;
}
function _do_question($turn) { 
	var r = _random(0,2);
	var d = [];
	var h,q,a,t;
	switch($turn) {
		case 0:
			h = "Let's start easy.\n\nCategory: General Knowledge.\nQuestion " + ($turn+1) + ": ";
			q = "What is the capital of the UK?||When was founded\nJönköping University?||Tomatoes are fruits, true or false?";
			a = "london||1977||true";
		break;
		case 1:
			h = "Nice, nice. Keep going.\n\nCategory: Math.\nQuestion " + ($turn+1) + ": ";
			q = "How do you call a triangle\nwith 3 equal sides?||How many equal sides has\nan isosceles triangle?||A triangle with three unequal sides\nis called scalene, true or false?";
			a = "equilateral||2||true";
		break;
		case 2:
			h = "Very good, you must be getting all warmed up.\n\nCategory: Traveling.\nQuestion " + ($turn+1) + ": ";
			q = "Enter the three-letter code\nfor the United States Dollar.||According to Wikipedia, in what\nposition is Jönköping on the list of most\npopulous cities in Sweden?||Norway is part of the EU,\ntrue or false?";
			a = "usd||10||false";
		break;
		case 3:
			h = "You are in a roll!.\n\nCategory: Sports.\nQuestion " + ($turn+1) + ": ";
			q = "Who hosted the 2018 FIFA World Cup?||In what year started the modern\nSummer Olympic Games?||The first country to host\nthe modern Olympic Games was Greece,\ntrue or false?";
			a = "russia||1896||true";
		break;
		case 4:
			h = "OMG, you are entering the final stretch!\n\nCategory: Music.\nQuestion " + ($turn+1) + ": ";
			q = "Who is the King of Pop?||In what year did Michael Jackson die?||Michael Jackson was awarded 13 Grammy Awards,\ntrue or false?";
			a = "michael jackson||2009||true";
		break;
		case 5:
			h = "Fantastic! After this question, straight to the finals.\n\nCategory: Movies.\nQuestion " + ($turn+1) + ": ";
			q = "What city is considered\nthe Mecca of movies?||In what year was awarded\nthe first Academy Award?||Katharine Hepburn is the person with more\nAcademy Awards received,\ntrue or false?";
			a = "hollywood||1929||true";
		break;
		case 6:
			h = "Amazing! You reach the last question,\nGood luck!!!\n\nCategory: Random.\nQuestion " + ($turn+1) + ": ";
			q = "In one word,\nwhat is the root of all evil?||The sum of all the angles in a triangle\nalways totals, how many degrees?||According to recent findings in Quantum Mechanics,\nwe could be living in a computer-generated virtual reality.\nTrue or false?";
			a = "money||180||true";
		break;
	}
	q = q.split("||");
	a = a.split("||");
	d = [h,q[r],a[r]];
	return d;
}
function _do_li($result,$pts) {
	var scoreboard_ul = document.getElementById("scoreboard");
	var li_element	= document.createElement("li");
	
	li_text = document.createTextNode("Game " + (scoreboard_ul.children.length+1) + ", score: " + $pts);
		li_element.setAttribute("class", "result-" + $result);
		li_element.setAttribute("data-result", $result);
		li_element.setAttribute("data-score", $pts);
		li_element.appendChild(li_text);
		scoreboard_ul.appendChild(li_element);
	
}

/* help functions */
function _random($min,$max) {
	var r = ($min<0) ? $min + Math.random()*(Math.abs($min)+$max) : $min + Math.random()*$max;
	return Math.round(r);
}
