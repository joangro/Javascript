/*

SERVER

*/

var server = new SillyClient();
var room_name = "patata";
server.connect("84.89.136.194:9000", room_name);
var oldest_user = 999999;
var my_id = 0;

server.on_ready = function( id ){
	console.log("I'm connected with id " + id );
	my_id = id;
	server.getRoomInfo( room_name, function(room_info) { 
		checkUsersConnected(room_info.clients); 
	} );
};

function checkUsersConnected(users){
	if (users.length < 2){
		return 0;
	}
	for(var i =0; i < users.length;i++ ){
		if (users[i]<oldest_user){
			oldest_user = users[i];
		}
	}
	getSceneStatus();
}

function getSceneStatus(){

	server.sendMessage({type: "getRoomStatus", username: my_id, content:""}, oldest_user);
}

server.on_message = function( author_id, msg ){
	// Parse received message
	msgParsed = JSON.parse(msg);
	if (msgParsed.type == "update"){
		matrixInfo = msgParsed.content;
		printMatrixInfo(matrixInfo);
	}else if (msgParsed.type == "getRoomStatus"){
		actual_scene = matrixInfo;
		server.sendMessage({type:"update", username: my_id, content: actual_scene}, msgParsed.user);
	}else if (msgParsed.type == "update_all"){
		matrixInfo = msgParsed.content;
		printMatrixInfo(matrixInfo);
	}
}


server.on_user_connected = function(msg){
	// User connected
}

server.on_room_info = function(info){
  //to know which users are inside
}

server.on_close = function(){
	//this methods is called when the server gets closed (its shutdown)
};
