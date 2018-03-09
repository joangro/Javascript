var userLogin = new Login();
var newClient = null;

function Login(){
	this.username = document.getElementById("username-input");
	this.loginButton  = document.getElementById("login-button");
	this.loginDiv =  document.getElementById("login-parameters");
	this.loginButton.addEventListener("click", function getUsername(){
		userLogin.username.value != "" ? userLogin.clearScreen() :  displayError(1);
	});
	
	this.server = new SillyClient();
	this.server.connect( "84.89.136.194:9000", "CheckRooms");
	this.server.getReport( function(report) { userLogin.PrintGameRooms(report); } );


}

Login.prototype.clearScreen = function(){
	this.server.on_close = function(){
	//this methods is called when the server gets closed (its shutdown)
	};	
	newUser.username = this.username.value;
	newClient = new userClient();
	newClient.connectClient();

	
}

Login.prototype.PrintGameRooms = function(report){
	var dixitRooms = [];
	for (var key in report.rooms){
		var holdUsers = 0;
		if(key.indexOf("DIXIT") == 0){
			for (var user in report.clients){
				if (key == report.clients[user].room)
					holdUsers += 1;
			}
			dixitRooms.push({room: key,
							 users: holdUsers});
		}
	}
	console.log(dixitRooms);
}

function displayError(value){
	switch(value){
		case 1:
				if(	document.getElementById("holdID"))
					break;
				var newElement = document.createElement("div");
				newElement.id = "holdID";
				newElement.className  = "alert alert-danger";
				newElement.innerText = "Invalid username";
				userLogin.loginDiv.appendChild(newElement);
			break;
	}
}
