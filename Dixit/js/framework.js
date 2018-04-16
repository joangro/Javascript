
function userClient(){
	this.client   = new SillyClient();
	this.roomName = "DIXIT";
	this.roomNum  = "";
	this.serverIP = "84.89.136.194"
	this.serverPort = "9000"
	this.debug = true;
	this.oldestUser = null;
}

userClient.prototype.connectClient = function(){
	this.client.connect( this.serverIP + ":" + this.serverPort,
						  this.roomName);

	this.client.on_ready = function( id ){
		console.log("I'm connected with id " + id );
		newUser.server_id = id;
		
		newClient.currentRoomInfo(0);
	};
	this.client.on_message = function( author_id, msg ){
		msgParsed = JSON.parse(msg);
		switch (msgParsed.type){
			case "message":
				chat.writeMessage(msg);
				break;
			case "scores":
				chat.writeScores(msg);
			break;
			case "update":
			case "updateAll":
				break;

			case "getRoomStatus":
				newClient.sendMatrixInfo(msgParsed.user);
				break;
			case "updateTimer":
			    // Print new time
				printTimer(msgParsed.content);
				break;
			default:
				newClient.GameMessages(author_id, msg);
				break;
		}
	};
	
	this.client.on_user_connected = function(msg){
	// User connected
		if (newUser.server_id == this.oldestUser){
			APP.updatePlayers();
		}
	if (newUser.server_id == newClient.oldestUser){

	}
	};

	this.client.on_room_info = function(info){
    //to know which users are inside
	};

	this.client.on_close = function(){
	//this methods is called when the server gets closed (its shutdown)
	console.log("Host left dep dewp ");
	};

}

userClient.prototype.GameMessages = function(author_id, msg){
	msgParsed = JSON.parse(msg);
	switch (msgParsed.type){
		case "sendPlayerInfo":
				player = new Player(msgParsed.content, msgParsed.user_id);
				userGame.addPlayer(player);
			break;
			
		case "startGame":
				userGame.startGame();
			break;
		case "sendFirstHand":
				
				playerClient.cards = msgParsed.content;
			break;
		case "sendRoles":
				playerClient.rol = msgParsed.content;
				if (msgParsed.content == 0){
					console.log("You are the listener ;-)");
					console.log("Your cards are: " + playerClient.cards);
					playerClient.rol = 0;
					inputClueUX();
					
				}
				if (msgParsed.content==1){
					console.log("You are the storyteller ;-)");
					console.log("Your cards are: " + playerClient.cards);
					console.log("Choose your card");
					console.log("Choose your clue");
					playerClient.rol = 1;
					inputClueUXStoryteller();
				}
			break;
			
		case "storytellerCard":
			$('#inputClue').append('<p id="clueValue"></p>');
			var stCard = 'Clue: ' + msgParsed.content;
			var stId = msgParsed.user_id;
			$('#clueValue').text(stCard);
			break;
		case "storytellerCard2":
			var card1 = {player:msgParsed.user_id, value:msgParsed.content};
			if (playerClient.server_id == newClient.oldestUser){
				userGame.mixCards(card1);
			}
			break;
		case "listenerCard":
			var clientcard = msgParsed.content;
			var clientID = msgParsed.user_id;
			var card1 = {player:clientID, value:clientcard};
			// Randomize listener and not listener selected cards
			if (playerClient.server_id == newClient.oldestUser){
				userGame.mixCards(card1);
			} else{
				
			}
			break;
		case "sendCardsForGuessing":
			var cards = msgParsed.content;
			var numberOfCards = cards.length;
			removeCardsDisplayed();
			var k = 0;
			for (var i=0; i<3; i++){
				for (var j=0; j<2; j++){
					sendCardPosition(i, j, cards[k].value);
					k += 1;
				}
				if (k == numberOfCards){
					$('#padre').append('<div id="inputCluetwo"></div>');
					$("#inputCluetwo").append('<input type="email" class="form-control" id="clue-inputtwo" placeholder="Enter vote">');
					$('#inputCluetwo').append('<button type="button" id="sendCluetwo" class="btn btn-xl">Send vote</button>');
					var guessValue = document.getElementById('clue-inputtwo');
					document.getElementById('sendCluetwo').addEventListener("click", function getGuessValue(){
							newClient.BuildAndSendMessage("guessCard",playerClient.game_id, guessValue.value, newClient.oldestUser);
							$("#sendCluetwo").remove();
							$("#clue-inputtwo").remove();
							$("#inputCluetwo").remove();
						if(userGame.players[0].rol != 0){
							/*
							userGame.voteFunction(7, playerClient.game_id);*/
							newClient.BuildAndSendMessage("guessCard",playerClient.game_id, guessValue.value, newClient.oldestUser);
						}
					});
					break;
				}
				break;
			}
			break;
			
		case "guessCard":
			var guessCard = msgParsed.content;
			var game_id = msgParsed.user_id;
			userGame.voteFunction(guessCard, game_id);
			break;
		case "sendGameId":
			var userGameId = msgParsed.content;
			playerClient = new LocalPlayer();
			playerClient.game_id = userGameId;
			var userServerId = msgParsed.user_id;
			playerClient.server_id = userServerId;
			break;
		case "clearInputs":
			clearInputs();
			break;
		case "sendNewCard":
			var newCard = msgParsed.content;
			for (var i = 0; i < playerClient.cards.length; i++){
				if (playerClient.cards[i] == 420){
					playerClient.cards[i] = newCard;
				}
			}
			break;
	}
}

userClient.prototype.BuildAndSendMessage = function(messageType, user_id_in = newUser.server_id, messageContent = "", userID = 0){
	if (userID == 0){
	this.client.sendMessage({type: messageType, 
						 user_id: user_id_in, 
						 content:messageContent});
	}else{
	this.client.sendMessage({type: messageType, 
						 user_id: user_id_in, 
						 content:messageContent}, 
						 userID);
	}
}


userClient.prototype.currentRoomInfo = function( opt ){
	
	this.client.getRoomInfo( this.roomName, function(room_info) { 
		
		checkUsersConnected(room_info.clients, opt ); 
		
	});
	
}

userClient.prototype.getSceneStatus = function(oldestUser){
	newClient.BuildAndSendMessage("getCardIndex", newUser.server_id, "", oldestUser);

}

userClient.prototype.sendMatrixInfo = function(user){
	newClient.BuildAndSendMessage("update", newUser.server_id, matrixInfo, user);

}

userClient.prototype.updateAllClients = function(){
	newClient.BuildAndSendMessage("updateAll", newUser.server_id, matrixInfo);

}
	
	
function checkUsersConnected(usersConnected, opt){
	switch(opt){
		case 0:
			newClient.oldestUser = Math.min.apply(null, usersConnected);
			if ( usersConnected.length > 1 ) {
				newClient.BuildAndSendMessage("sendPlayerInfo", newUser.server_id, newUser.username, newClient.oldestUser);
			}
			
			if ( usersConnected.length == 1){
				console.log("Ets l'host");
				userGame = new Game();
				player = new Player(newUser.username,newUser.server_id );
				userGame.addPlayer(player);
			}
			if ( usersConnected.length == 6){
				newClient.BuildAndSendMessage("startGame", newUser.server_id, newUser.username, newClient.oldestUser);
			}
			break;
		case 1: //To just update number of players
			APP.currentPlayers = usersConnected;
			break;
	}
}

function removeCardsDisplayed(){
	var k = 0;
	var nomID = 'currentCard';
	var nomIDandNum = "";
	while (k<6){
		nomIDandNum = nomID + k;
		document.getElementById(nomIDandNum).remove();
		k+=1;
	}
}