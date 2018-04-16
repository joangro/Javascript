var playerClient = null;

class Player{
	constructor(name, id){
		this.username = name;
		this.server_id = id;
		this.game_id = -1;
		this.rol = -1;
		this.cards = new Array;
		this.lastPlayed = 0;
		this.points = 0;
			
	}
	
	playCard(){
		var idx = Math.floor(Math.random() * 6);
		this.lastPlayed = idx;
		
		var card1 = {player:this.username, value:this.cards[idx]};
		return card1;
	}
	
	getCard(card){
		this.cards[this.lastPlayed] = card;
	}

	
	getPoints(p){
		this.points = this.points + p;
	}
}

class LocalPlayer{
	constructor(){
		this.rol = -1;
		this.cards = new Array;
		this.lastPlayed = 0;
		this.points = 0;
		this.tableCards = null;
		this.game_id = -1;
		this.server_id = -1;
	}
	
	playCard(){
		var idx = Math.floor(Math.random() * 6);
		this.lastPlayed = idx;
		
		var card1 = {player:this.username, value:this.cards[idx]};
		return card1;
	}
	
	getCard(card){
		this.cards[this.lastPlayed] = card;
	}
	
	voteCard(){
		var nPlayers = 4
		var idx = Math.floor(Math.random() * nPlayers);
		if (this.rol == 1)
			return nPlayers;
		else
			return idx;

	}
	
	getPoints(p){
		this.points = this.points + p;
	}
	
	chooseAndSendCard(){
		
	}
}