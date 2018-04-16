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
	this.z = 1;

}

Login.prototype.clearScreen = function(){
	this.server.on_close = function(){
	//this methods is called when the server gets closed (its shutdown)
	};	
	newUser = new Player();
	newUser.username = this.username.value;
	newClient = new userClient();
	newClient.connectClient();

	//create new page with canvas
	loadDomElements();
	GFX.init();
	animate();
	
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
			if (holdUsers < 9){
				dixitRooms.push({room: key,
								users: holdUsers});
			}
		}
	}
	//console.log(dixitRooms);
	//userLogin.clearScreen();
}
function loadDomElements(){
	// Clear current parent div and change it's id (for style)
	$('#opacity-container').empty();    
	$('#opacity-container').attr("id","padre"); 
	// Create div for chat
	$('#padre').append('<div id="chat"></div>');
	$('#padre').append('<div id="chatControl"></div>');	
	$('#chatControl').append('<div id="input"></div>');
	$('#input').append('<textarea class="form-control" id="inputText">');
	$('#chatControl').append('<div id="sendButton"></div>');
	$('#sendButton').append('<button type="button" id="sendB" class="btn btn-xl"></button>');
	//$('#sendB').innerHTML += '<img id = "sendIcon" src="texture/theme/send-icon.png" >';
	// Create div for canvas
	$('#padre').append('<div id="myScene"></div>');
	chat = new Chat();
	chat.initChat();
	
}

function inputClueUX(){
	console.log("ITS IN");
	$('#padre').append('<div id="inputClue"></div>');
	$("#inputClue").append('<input type="email" class="form-control" id="clue-input" placeholder="Enter vote">');
	$('#inputClue').append('<button type="button" id="sendClue" class="btn btn-xl">Send vote</button>');
	var cardIndex = document.getElementById("clue-input");
	document.getElementById('sendClue').addEventListener("click", function getCardIndexGuess(){
			if (playerClient.server_id*1 == newClient.oldestUser){
				var card1 = {player: playerClient.server_id, value: playerClient.cards[cardIndex.value-1]};
				userGame.mixCards(card1);
			}
			newClient.BuildAndSendMessage("listenerCard",newUser.server_id, playerClient.cards[cardIndex.value-1], newClient.oldestUser);
			
			playerClient.cards[cardIndex.value-1] = 420;
			$("#sendClue").remove();
			$("#clue-input").remove();
			$("#inputClue").remove();
		
	});
	var padreDiv = document.getElementById("padre");
	var k = 0;
	for (var i=0; i<3; i++){
		for (var j=0; j<2; j++){
			var cardNum = playerClient.cards[k];
			sendCardPosition(i, j, cardNum, k);
			k=k+1;
		}
	}
}

function inputClueUXStoryteller(){
	$('#padre').append('<div id="inputClue"></div>');
	$("#inputClue").append('<input type="email" class="form-control" id="card-number-input" placeholder="Enter card number">');
	$("#inputClue").append('<input type="email" class="form-control" id="clue-input" placeholder="Enter clue">');
	$('#inputClue').append('<button type="button" id="sendClue" class="btn btn-xl">Send!</button>');
	var cardNumberInput = document.getElementById("card-number-input");
	var clueInput = document.getElementById("clue-input");
	document.getElementById('sendClue').addEventListener("click", function getUsernameTwo(){
			if (playerClient.server_id == newClient.oldestUser){
				var card1 = {player:playerClient.server_id,value:playerClient.cards[cardNumberInput.value-1]};
				userGame.mixCards(card1);
			}
			newClient.BuildAndSendMessage("storytellerCard",playerClient.cards[cardNumberInput.value-1], clueInput.value);
			newClient.BuildAndSendMessage("storytellerCard2",playerClient.cards[cardNumberInput.value-1], clueInput.value, newClient.oldestUser);

			playerClient.cards[cardNumberInput.value-1] = 420;
			cardNumberInput.value  = "";
			clueInput.value  = "";
			$("#sendClue").remove();
			$("#clue-input").remove();
			$("#card-number-input").remove();
			$("#inputClue").remove();
	});
	var padreDiv = document.getElementById("padre");
	var k = 0;
	for (var i=0; i<3; i++){
		for (var j=0; j<2; j++){
			var cardNum = playerClient.cards[k];
			sendCardPosition(i, j, cardNum, k);
			k=k+1;
		}
	}
}

function sendCardPosition(i, j, cardNum, hi){
	var h = hi;
	var VDist = 300;
	var HDist = 220;
	var VBias = 40;
	var HBias = 330;
	var imageName = "/students/2018/patata/DIXIT2/texture/cards/image_";
	if (cardNum < 10){
		imageName += "00" + cardNum;
	} else if (cardNum<100){
		imageName += "0" + cardNum;
	}else{
		imageName +=  cardNum;
	}
	imageName += ".jpg";
	var cardID = "currentCard" + cardNum;
	
	$('#padre').append('<img src="" id="currentCard">');
	var totalH = HDist*i + HBias;
	var totalV = VDist*j + VBias;
	var stylesheet = "position: absolute;left:" + totalH +
					 "px;top:"+ totalV +
					 "px;z-index:"+ userLogin.z +";max-width:200px;max-height:500px;";
	$("#currentCard").attr("src",imageName);

	$("#currentCard").attr("style",stylesheet);
	var newID = "currentCard" + h;
	$('#currentCard').attr("id",newID);
	
	/*
	var currentCardHighlightID = document.getElementById(cardID);
	currentCardHighlightID.addEventListener("click", function(){
		//Highlight card
			var kk = "#"+currentCardHighlightID;
		//$(kk).css("-webkit-filter"," brightness(1.1) contrast(1.2) drop-shadow(5px 5px 20px black) opacity(1)");

	});*/
	this.z += 1;
}



