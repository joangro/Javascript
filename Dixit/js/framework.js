
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
		newUser.myID = id;
		
		newClient.currentRoomInfo();
	};
	this.client.on_message = function( author_id, msg ){
		msgParsed = JSON.parse(msg);
		switch (msgParsed.type){
			case "message":
				break;
				
			case "update":
			case "updateAll":
				printMatrixInfo(msgParsed.content);
				break;

			case "getRoomStatus":
				newClient.sendMatrixInfo(msgParsed.user);
				break;
			case "":
				break;
			default:
				newClient.GameMessages(author_id, msg);
				break;
		}
	};
	
	this.client.on_user_connected = function(msg){
	// User connected
		if (newUser.myID == this.oldestUser){
			console.log("I'm in " + newUser.myID);
		}
	};

	this.client.on_room_info = function(info){
    //to know which users are inside
	};

	this.client.on_close = function(){
	//this methods is called when the server gets closed (its shutdown)
	};

}

userClient.prototype.GameMessages = function(author_id, msg){
	msgParsed = JSON.parse(msg);
	switch (msgParsed.type){
		case "getCardIndex":
			userGame.GetIndex( msgParsed.content );
			break;
	}
}

userClient.prototype.BuildAndSendMessage = function(messageType, usernameValue = newUser.myID, messageContent = "", userID = 0){
	if (userID == 0){
	this.client.sendMessage({type: messageType, 
						 username: usernameValue, 
						 content:messageContent});
	}else{
	this.client.sendMessage({type: messageType, 
						 username: usernameValue, 
						 content:messageContent}, 
						 userID);
	}
}


userClient.prototype.currentRoomInfo = function(){
	
	this.client.getRoomInfo( this.roomName, function(room_info) { 
		
		checkUsersConnected(room_info.clients); 
		
	});
	
}

userClient.prototype.getSceneStatus = function(oldestUser){
	this.newClient.BuildAndSendMessage("getCardIndex", newUser.myID, "", this.oldestUser);

}

userClient.prototype.sendMatrixInfo = function(user){
	this.newClient.BuildAndSendMessage("update", newUser.myID, matrixInfo, user);

}

userClient.prototype.updateAllClients = function(){
	this.newClient.BuildAndSendMessage("updateAll", newUser.myID, matrixInfo);

}

function checkUsersConnected(usersConnected){
	newClient.oldestUser = Math.min.apply(null, usersConnected);
	console.log("min " + newClient.oldestUser);
	if ( usersConnected.length > 1 ) 
		newClient.getSceneStatus(usersConnected.min);
	
	if ( usersConnected.length == 1){
		userGame.initDeck();
	}else if ( usersConnected.length > 1){
		this.newClient.BuildAndSendMessage("getCardIndex", newUser.myID, "6", oldestUser);
		
		userGame.currentIndex = userGame.GetIndex( 6 );
	}
}


