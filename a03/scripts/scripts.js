window.onload = function() { 	
	var start_button = document.getElementById("start");
	start_button.onclick = function () { StartGame(); }
}

function StartGame() {
	//debugger
	console.clear();
	console.log("Player started game");
	var player	 = { position:0, tool:0 };
	var gameOver = false;
	var breaker	 = 0;
	var rOptions = ["1","2","3","4"];
	var rooms 	 = generateRooms();
	var room;
	var quit;	
	
	while(gameOver==false) {
		console.log("\tInstructions provided");
		player.position = prompt(sendInstructions(player,rooms,rOptions));
		// User clicks on the cancel button
		if(player.position==null) {
			console.log("\tPlayer clicked cancel");
			quit = confirm("Are you sure you want to quit?");
			// User confirms exit
			if(quit==true) {
				console.log("\tPlayer canceled the game.");
				gameOver = true;
				console.log("Game Over");
				alert("You canceled the game.\n\nGame Over.")
				break;
			} 
			// User decides to continue
			else {
				console.log("\tPlayer did not cancel the game");
			}
			
		} 
		// User inputs something
		else {
			// User selects a valid room number.
			if(rOptions.indexOf(player.position) != "-1") {
				console.log("\tPlayer entered room: " + player.position);
				room = rooms[player.position];
				// the player has enough tools to defeat a boss or to escape
				if( room.boss - player.tool == 0 ) {
					alert(room.sMsg);
					room.boss = 0; // remove the boss (if any)
					player.tool++;
				} 
				else
				// the player does not have enough tools to defeat a boss or to escape
				if (room.boss - player.tool > 0) {
					// user goes to the exit without enough tools
					if(player.position == 4) {
						console.log("\t" + room.uMsg);
						alert(room.uMsg);
					} else {
						console.log("\tPlayer entered in the wrong sequence.");
						alert(room.uMsg);
						gameOver = true;
						console.log("Game Over");
						alert("Game Over!\n\nBetter luck next time.");
						break;
					}
				} else {
					alert("You have already entered in this room, silly man.");
				}
				// if user has all tools, user wins. Game Over.
				if(player.tool==4) { 
					gameOver = true; 
					console.log("\tPlayer won.\n\nGame Over.");
					alert("You Won!\n\nGame Over."); 
				}
				// else user exits the room and comes back to the center
				else { 
					console.log("\tPlayer comes back to center.");
					player.position = 0;
				}
			} 
			// User selects invalid room number.
			else {
				console.log("\tPlayer entered an invalid room number (" + player.position + ")");
				console.log("\tPlayer comes back to center.");
				alert("Sorry, (" + player.position + ") is not a valid number\nPlease try again.");
				player.position = 0; // player goes back to the center
			}
		}		
	}
}
	
function sendInstructions($player,$rooms) {
	//debugger;
	var msg;
	$player.position = (isNaN($player.position) || $player.position == null) ? 0 : $player.position;
	msg = ($player.position == 0 && $player.tool == 0) ? $rooms[$player.position].uMsg : $rooms[$player.position].sMsg;
	return msg;
}

function generateRooms() {
	//debugger;
	var room = [
		{
			sMsg : "This room looks like a storage room, there is not much here. However, there is an overall in the back and it has an ID. You decide to put it on and try to blend in if you cross someone's road.",
			uMsg : "You already entered in this room, there's nothing else to do here.",
			boss : 0
		},
		{
			sMsg : "As you opened the door, a robotic female voice requests you to place your ID card on the reader. You use the ID on the overall and, success! A cabinet with weapons opens: arm yourself up for the party!",
			uMsg : "As you opened the door, a robotic female voice requests you to place your ID card on the reader and, since you have none, an alarm is triggered and lasers coming out of the wall slice you up.",
			boss : 1,
		},
		{
			sMsg : "As soon as you open the door, you face 3 guards behind their desks. Stranged by your prescense, they request your ID and you hand them the ID on the stolen overall. However, before they realize you are not the person on the ID picture, you take your guns out and execute every motherfuckin' last one of the guards. Searching for clues, you spot a \"Procedures\" book and, there you go! the elevator access code.",
			uMsg : "As soon as you open the door, you face 3 guards behind their desks. Stranged by your prescense, they request your ID but as soon as you failed to provide one they shoot you on the spot.",
			boss : 2
		}
	];
	
	// this function randomizes the array indexes; to2do add "lives" to user.
	//room.sort( function(a, b){return 0.5 - Math.random()} );
	
	room.unshift({
			sMsg : "Remember, the only way out is through the elevator you entered. What would you like to do?\n\nPress (1) to open the door to the left.\nPress (2) to open the door in front of you.\nPress (3) to open the door to the right.\nPress (4) to input code in the elevator keypad.",
			uMsg : "The elevator doors open up, and as soon as you step out they close\nand let you trapped in a small lobby. The lobby has, besides the elevator's, 3 other doors. The only way out is through the elevator you entered. What would you like to do?\n\nPress (1) to open the door to the left.\nPress (2) to open the door in front of you.\nPress (3) to open the door to the right.\nPress (4) to input code in the elevator keypad.",
			boss : 0
		});
	
	room.push({
			sMsg : "Congratulations, you are now able to escape!",
			uMsg : "Sorry, you do not have the sufficient permissions to open this door.",
			boss : 3
		});
	
	
	console.log("\tRooms created");
	console.table(room);
	
	return room;
}




function _random($min,$max) {
	var r = ($min<0) ? $min + Math.random()*(Math.abs($min)+$max) : $min + Math.random()*$max;
	return Math.round(r);
}
	

