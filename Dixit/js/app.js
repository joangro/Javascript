function APP(){
	this.canvasDiv = null;
	this.currentPlayers = null;
	this.gameStarted = false;
	this.countdownTimer == false;
	
}

APP.prototype.initAll = function(){
		
}


APP.prototype.updatePlayers = function(){
	newClient.currentRoomInfo(1);
	if (this.currentPlayers.length > 3 && this.gameStarted == false && this.countdownTimer == false){
		APP.startCountdown();
	}
	
}

APP.prototype.startCountdown = function(){
	this.countdownTimer == true;
	var timeleft = 30;
	initTimer(timeleft); 
	this.countdownTimer = true;
	if ( this.countdownTimer = false)
		APP.startGame();
	
}

APP.prototype.startGame = function(){
	userGame.initDeck();
	// 1. Repartir cartes - enviar missatges a tothom amb cartes
	var index = 0;
	for (var i=0; i < currentPlayers.length; i++){
		newClient.BuildAndSendMessage("dealFirstHand", newUser.myID, userGame.deck.slice(i*6, i*6 + 6), currentPlayers[i] );
	}
	i++;
	displayMyCards(userGame.deck.slice(i*6, i*6 + 6));
	
}

APP.prototype.displayMyCards= function(){
	// Dibuixa cartes a pantalla en una matriu 3x3
	var cardIndex = 0;
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			var square = new THREE.Geometry();	
			
			// ACABARRR
			
			// 1. Instantiate the geometry object 
			// 2. Add the vertices 
			// 3. Define the faces by setting the vertices indices 
			square.vertices.push(new THREE.Vector3(-1.0,  1.0, 0.0)); 
			square.vertices.push(new THREE.Vector3( 1.0,  1.0, 0.0)); 
			square.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0)); 
			square.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0)); 
			square.faces.push(new THREE.Face3(0, 1, 2)); 
			square.faces.push(new THREE.Face3(0, 2, 3)); 
			GFX.scene.add(square);
			texture = THREE.ImageUtils.loadTexture('texture/cards/image_' +	cardIndex, {}, function() {
				GFX.render.render(GFX.scene);
			})
		}
	}
	
}

APP.prototype.resetGame = function(){
	// reset all game variables for a new game when this one ends

}
function initTimer(time){
	var downloadTimer = setInterval(function(){
	    time--;
	    printTimer(time);
	    if(time <= 0){
			clearInterval(downloadTimer);
			this.countdownTimer = false;
	    }
	    // Send new time to other clients
	    newClient.BuildAndSendMessage("updateTimer", newUser.myID, time);
	},1000);
	
}

function printTimer(time){
	document.getElementById("timer").textContent = time;
	
}

APP = new APP();
GFX = new GFX();

APP.initAll();

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	GFX.render.render( GFX.scene, GFX.camera );
}




