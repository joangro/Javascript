var chat = null;
var element = null;

function Chat(){
	this.chatBox = null;
	this.sendButton = null;
	this.inMessage = null;
	this.chatDisplay = null;
}

Chat.prototype.initChat = function(){
	chat.chatDisplay = document.getElementById('chat');
	chat.chatBox = document.getElementById('inputText');
	chat.sendButton = document.getElementById('sendB');
	chat.sendButton.addEventListener("click", chat.sendMessage);
	chat.chatBox.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById("sendB").click();
		}
	});
	chat.inMessage = $('#input');
	
}

Chat.prototype.writeMessage = function(msg){
	var msgParsed = JSON.parse(msg);
	if (msgParsed.content){
		var element = document.createElement("div");
		element.id = "my-message-id";
		element.innerHTML = "<span class='span-username'><b id ='b-username'></b></span>" + 
							"<span id=\"span-text\"></span>";
		chat.chatDisplay.appendChild(element);
		document.getElementById("b-username").innerText = msgParsed.username + ": ";
		// Remove ID's from created elements
		document.getElementById("b-username").removeAttribute("id");
		document.getElementById("span-text").innerText = msgParsed.content;
		document.getElementById("span-text").removeAttribute("id");
	}
	autoscrollChat();
	
}

Chat.prototype.writeScores= function(msg){
	var msgParsed = JSON.parse(msg);
	if (msgParsed.content){
		var element = document.createElement("div");
		element.id = "my-message-id";
		element.innerHTML = "<span class='span-username'><b id ='b-username'></b></span>" + 
							"<span id=\"span-text\"></span>";
		chat.chatDisplay.appendChild(element);
		for (var i = 0; i < msgParsed.content.length; i++){
			var username = msgParsed.content[i].username;
			var score = msgParsed.content[i].points;
			document.getElementById("b-username").innerText = username + " has " + score + " points!";
			document.getElementById("b-username").innerHTML += "\n";
		}
		// Remove ID's from created elements
		document.getElementById("b-username").removeAttribute("id");
		document.getElementById("span-text").removeAttribute("id");
	}
	autoscrollChat();
	
}

Chat.prototype.sendMessage = function(){
	if (chat.chatBox.value != ""){
	var element = document.createElement("div");
	element.id = "my-message-id";
	chat.sendMessageToServer(chat.chatBox.value);	
	autoscrollChat();
	chat.chatBox.value = "";
	}
}
Chat.prototype.sendMessageToServer = function(msg){
	var element = document.createElement("div");
	element.id = "my-message-id";
	if ((msg.length) > 200){
		element.innerHTML = "<p style=\"color: red\"> SYSTEM: Message over the limit! (200 characters) </p>";
		return 0;
	}
	element.innerHTML = "<span class='span-username'><b id ='b-username'></b></span>" + 
						"<span id=\"span-text\"></span>";
	chat.chatDisplay.appendChild(element);
	document.getElementById("b-username").innerText = newUser.username + ": ";
	document.getElementById("span-text").innerText = msg;
	document.getElementById("b-username").removeAttribute("id");
	document.getElementById("span-text").removeAttribute("id");
	newClient.BuildAndSendMessage("message", newUser.username, msg );
}


function autoscrollChat()
{
	chat.chatDisplay.scrollTop = chat.chatDisplay.scrollHeight;
	
}
