var newClient = new userClient();

function userClient(){
	this.client   = new SillyClient();
	this.roomName = "DIXIT";
	this.roomNum  = null;
	this.serverIP = "84.89.136.194"
	this.serverPort = "9000"
	this.debug = false;

}

userClient.prototype.connectClient = function(){
	this.client.connect( this.serverIP + ":" + this.serverPort,
						  this.roomName);
		
	this.client.on_ready = function( id ){
		if(this.debug) console.log("I'm connected with id " + id );
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
			
		}
	};
	
	this.client.on_user_connected = function(msg){
	// User connected
	};

	this.client.on_room_info = function(info){
    //to know which users are inside
	};

	this.client.on_close = function(){
	//this methods is called when the server gets closed (its shutdown)
	};

}

userClient.prototype.currentRoomInfo = function(){
	
	this.client.getRoomInfo( this.roomName, function(room_info) { 
		checkUsersConnected(room_info.clients); 
	});
	
}

userClient.prototype.getSceneStatus = function(oldestUser){

	this.client.sendMessage({type: "getRoomStatus", 
							 username: newUser.myID, 
							 content:""}, 
							 oldestUser);
}

userClient.prototype.sendMatrixInfo = function(user){
	
	this.client.sendMessage({type: "update", 
							 username: newUser.myID, 
							 content:matrixInfo}, 
							 user);

}

userClient.prototype.updateAllClients = function(){
	
	this.client.sendMessage({type:"updateAll", 
							 content: matrixInfo});

}

function checkUsersConnected(usersConnected){

	if ( usersConnected.length > 1 ) 
		newClient.getSceneStatus(usersConnected.min);
}

newClient.connectClient();

