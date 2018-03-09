var userGame = new gameController();

function gameController(){
	this.numCards = 108;
	this.deck = new Array(this.numCards);
	this.currentIndex = 0;
}

gameController.prototype.initDeck = function(){
	for (var i = 0; i < this.numCards; i++){
		this.deck[i] = i;
	}
	this.shuffleDeck();
	
}

gameController.prototype.shuffleDeck = function(){
	this.deck.sort(function() { return 0.5 - Math.random() });
	this.currentIndex = 0;
	
}

gameController.prototype.GetIndex= function( numCards ){
	this.currentIndex += numCards;
	if ( numCards > 1 ){
		
	}
	
	
}