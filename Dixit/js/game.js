userGame = null;

class Game{
	constructor(){
		this.deck = null;
		this.tableCards = new Array();
		this.tableCardsAux = new Array();
		this.players = new Array();
		this.numOfPlayers = 0;
		this.cardsPerPlayer = 6;
		this.n = 0;
		this.storyTeller = 0;
		this.play = true;
		this.votes = new Array();
		
	}	
	
	addPlayer(player){
		var i = this.numOfPlayers;
		this.players[i] = player;
		this.players[i].game_id = i;
		newClient.BuildAndSendMessage("sendGameId",this.players[i].server_id, i, userGame.players[i].server_id);
		this.numOfPlayers = this.numOfPlayers+1;
	}
		
	dealFirstHand(){
		var n = this.n;
		for (var i=0; i<this.numOfPlayers; i++){
			for (var j=0; j<this.cardsPerPlayer; j++){
				this.players[i].cards[j] = this.deck[n];
				n = n+1;
			}
			if (i == 0){
				playerClient = new LocalPlayer();
				playerClient.cards = this.players[0].cards
				playerClient.server_id = newUser.server_id;
			}
			newClient.BuildAndSendMessage("sendFirstHand", '', this.players[i].cards, this.players[i].server_id);
		}
		this.n = n;
	}
	
	nextPlayer(){
		if (this.storyTeller==this.numOfPlayers-1){
			this.storyTeller = 0;
		}else{
			this.storyTeller = this.storyTeller+1;
		}	
	}
	
	checkEnd(){
		if (this.n == 108)
			return false;
		else
			return true;
	}
	
	endRound(){
		startGame();
	}
	
	countPoints(){
	// count votes
	var cardsVoted = new Array(this.numOfPlayers);
	for (var i=0; i<this.numOfPlayers; i++){
		cardsVoted[i] = countVotes(i,this.votes);	
	}
	// evaluate results
	var stPos = nameToId(this.players[this.storyTeller].server_id,this.tableCards)
		if (cardsVoted[stPos] == 0 || cardsVoted[stPos] == this.numOfPlayers-1)
		{// 2 puntos
			for (var i=0; i<this.numOfPlayers; i++){
				if (i!=this.storyTeller)
					this.players[i].getPoints(2);
			}
		}
		else
		{// 3 puntos
			this.players[this.storyTeller].getPoints(3);
			for (var i=0; i<this.numOfPlayers; i++){
				if (i!=this.storyTeller && this.votes[i] == stPos)
					this.players[i].getPoints(3);
			}
		}
		//extra points
		var plPos
		for (var i=0; i<this.numOfPlayers; i++){
			if (i!=this.storyTeller)
			{
				plPos = nameToId(this.players[i].server_id,this.tableCards);
				this.players[i].getPoints(cardsVoted[plPos]);
			}
		}
		// show points
		for (var i=0; i<this.numOfPlayers; i++){
			console.log("player "+i+": "+this.players[i].points);
			newClient.BuildAndSendMessage("scores", '', this.players);
		}
		
		// end round
		// RESET VARIABLES
		this.resetVariables();

		clearInputs();
		newClient.BuildAndSendMessage("clearInputs");
		this.nextPlayer();
		this.play = this.checkEnd();	
		for (var i=0; i<this.numOfPlayers; i++){
			newClient.BuildAndSendMessage("sendNewCard", "", this.deck[this.n],this.players[i].server_id);
			this.n += 1;
		}
		for (var i = 0; i < 6; i++){
			if (playerClient.cards[i] == 420){
				playerClient.cards[i] = this.deck[this.n];
				this.n += 1;
			}
		}
		
		if (this.play == true){
			this.startRound();
		}else{
			this.endRound();
		}
	}
	
	startGame(){
		this.deck = createRandomArray(108);
		//this.numOfPlayers = this.numOfPlayers+1;
		this.dealFirstHand();
		this.tableCards = new Array(this.numOfPlayers);
		this.votes = new Array(this.numOfPlayers); 
		var n = this.n;
		// start rounds
		this.startRound();
	}
	
	resetVariables(){
		this.tableCards = new Array(this.numOfPlayers);
		this.tableCardsAux = new Array();
		this.votes = new Array(this.numOfPlayers); 
	}
	
	startRound(){
		// ASSIGN ROLES
		for (var i=0; i<this.numOfPlayers; i++){
			this.players[i].rol = 0;
		}
		this.players[this.storyTeller].rol = 1;
		for (var i=0; i<this.numOfPlayers; i++){
			if (i != this.storyTeller){
				newClient.BuildAndSendMessage("sendRoles", '', 0, this.players[i].server_id);
			}
		}
		
		newClient.BuildAndSendMessage("sendRoles", '', 1, this.players[this.storyTeller].server_id);
		if (this.players[0].rol == 0){
			console.log("You are the listener ;-)");
			console.log("Your cards are: " + this.players[0].cards);
			console.log("Wait for the storyteller card ;-)");
			playerClient.rol = 0;
			inputClueUX();
		}
		if (this.players[0].rol == 1){
			console.log("You are the storyteller ;-)");
			console.log("Your cards are: " + this.players[0].cards);
			console.log("Choose your card");
			console.log("Choose your clue");
			playerClient.rol = 1;
			inputClueUXStoryteller();
		}
	
	}
	
	mixCards(newCard){
		var n = this.n;
		this.tableCardsAux.push(newCard);
		if (this.tableCardsAux.length == this.numOfPlayers){
			var randomIdx = createRandomArray(this.numOfPlayers);
			for (var i=0; i<this.numOfPlayers; i++){
				var idxCard = randomIdx[i];
				this.tableCards[idxCard] = this.tableCardsAux[i];
				this.players[i].getCard(this.deck[n]);
				n=n+1;
			}
			this.tableCardsAux = new Array();
			newClient.BuildAndSendMessage("sendCardsForGuessing", 0, this.tableCards);
			removeCardsDisplayed();
			var k = 0;
			for (var i=0; i<3; i++){
				for (var j=0; j<2; j++){
					sendCardPosition(i, j, this.tableCards[k].value);
					k += 1;
					if (k == this.tableCards.length){
						break;
					}					
				}
				if (k == this.tableCards.length){
					break;
				}				
			}
			
			if(playerClient.rol == 0){
				$('#padre').append('<div id="inputClue"></div>');
				$("#inputClue").append('<input type="email" class="form-control" id="clue-input" placeholder="Enter vote">');
				$('#inputClue').append('<button type="button" id="sendClue" class="btn btn-xl">Send vote</button>');
				var guessValue = document.getElementById('clue-input').value;
				document.getElementById('sendClue').addEventListener("click", function getUsernameOne(){
					voteFunction(guessValue, userGame.players[0].game_id);
					$("#sendClue").remove();
					$("#clue-input").remove();
				});
				}else{
					this.voteFunction(7, userGame.players[0].game_id);
				}
			
		}
		this.n = n;
	}
	
	
	voteFunction(guessCard, game_id){
		// vote cards
		this.votes[game_id] = guessCard*1;
		if (this.votes.includes(undefined) == false){
			this.countPoints();
		}
	}
	
	
}


startCountdown = function(){
	this.countdownTimer == true;
	var timeleft = 30;
	initTimer(timeleft); 
	this.countdownTimer = true;
	if ( this.countdownTimer = false)
		APP.startGame();
	
}

function clearInputs(){
	if($("#inputClue")!=undefined){
		$("#inputClue").remove();
	}
}

