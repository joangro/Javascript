//ECV EXAMPLE APP
//*****************

/*
 *
 *	INIT. SERVER
 *
 */
 
 // Default room name
var room_name = "patata";

//Create server and connect
var server = new SillyClient();
server.connect("84.89.136.194:9000", room_name);
var my_id = 0;

//this method is called when the user gets connected to the server
server.on_ready = function( id ){
	// console.log("I'm connected with id " + id );
	my_id = id;
};

//this methods receives messages from other users (author_id its an unique identifier)
server.on_message = function( author_id, msg ){
	//Create div 
	var element = document.createElement("div");
	element.id = "received-message-id";
	// Parse received message
	msgParsed = JSON.parse(msg);
	if (msgParsed.type != "message"){
		// Check that the message type is "message"
		return 0;	
	}
	if (msg.includes("mouse"))
	{
		// Canvas 
	    ctx.lineTo(msgParsed.x, msgParsed.y);
    	ctx.stroke();

	}else{
		// Message 
		if (msgParsed.content){
			// If message is not null
		    if (showID == false){
				// In case we don't want to display user ID
				element.innerHTML = "<img class='rounded-circle' id='chat-pictures' src='"+ msgParsed.avatar +
									"'</img><span class='span-username'><b id ='b-username'></b></span>" + 
									"<span id=\"span-text\" style=\"color:"+msgParsed.color+";\"></span>";
				// Append HTML element to DOM
				chat.appendChild(element);
				//Add Username
				document.getElementById("b-username").innerText = msgParsed.username + " : ";

			}else{
				// Otherwise display ID
				element.innerHTML = "<img class='rounded-circle' id='chat-pictures' src='"+ msgParsed.avatar 
									+"'</img><span class='span-username'><bid ='b-username'></b></span>" + 
									"<span id=\"span-text\" style=\"color:"+msgParsed.color+";\"></span>";
				chat.appendChild(element);
				// Add username + ID
				document.getElementById("b-username").innerText = msgParsed.username + "#" + msgParsed.id + " : ";
		}
			// Remove ID's from created elements
			document.getElementById("b-username").removeAttribute("id");
			document.getElementById("span-text").innerText = msgParsed.content;
			document.getElementById("span-text").removeAttribute("id");
		}
	}
	autoscrollChat();
}	
	
//this methods is called when a new user is connected
server.on_user_connected = function(msg){
	// User connected
}

server.on_room_info = function(info){
  //to know which users are inside
}

server.on_close = function(){
	//this methods is called when the server gets closed (its shutdown)
	//console.log("server with roomname", room.value, "closed!");
};


// BUTTONS
var button_login = document.getElementById("btt_login");			// Login
var button_send  = document.getElementById("btt_send"); 			// Send message
var button_room  = document.getElementById("btt_room"); 			// Change room
var button_avatar = document.getElementById("upload-avatar");       // Upload avatar
var button_commands = document.getElementById("commands-button");   // Commands
var button_changeavatar = document.getElementById("avatar-button"); // Random Avatar
var button_link_avatar = document.getElementById("update-avatar");  // Upload avatar
var button_lights = document.getElementById("lights-button");       // Change style


// USER DATA
var username = document.getElementById("in_username");
var message  = document.getElementById("in_message");
var chat = document.getElementById("chat")
var room = document.getElementById("in_room")
var profile = document.getElementById("profile-container");
var div_profile = document.getElementById("div-profile-container");
var user_name = document.getElementById("user-name");
var room_title = document.getElementById("room-name");
var hack = document.getElementById("hack-container");
var audio = document.getElementById("audio");
var link_avatar = document.getElementById("upload-avatar");
var user_picture = document.getElementById("user-picture");

// EVENTS
button_login.addEventListener("click", logIn);
button_send.addEventListener("click", sendMessage);
button_room.addEventListener("click", changeRoom);
button_commands.addEventListener("click", showHelp);
button_changeavatar.addEventListener("click", randomAvatar);
button_link_avatar.addEventListener("click", linkAvatar);
button_lights.addEventListener("click", changeLight);

// GLOBAL VARIABLES
var oldTopic = "";					// Used to compare topic names
var log_state = false;				// For login button
var textColor = "#000000";			// User text color
room_title.innerText = room_name; 	//init room name
var hack_on = false;				// Hack state
var default_avatar = "imgs/default.jpg";	// Default user avatar
var random_start = 0;				// Var for the random avatar
var lights = false;					// Lights state
var showID = false;					// Show ID on messages state

// PAINT
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);

function random()
{
	return Math.floor(Math.random() * 13) + 1;
}

function autoscrollChat()
{
	chat.scrollTop = chat.scrollHeight;
}

function randomAvatar()
{
	var ran = random();
	if (ran != random_start){
		default_avatar = "imgs/randomavatars/" + ran;
		default_avatar = default_avatar+ ".png";
		loadProfile();
		return;
	}
	randomAvatar();
}

function changeLight()
{
	if (lights == false){
		document.getElementById("modal-upload").setAttribute("style", "background-color: #F8F8FF;");
		document.getElementById("avatar-button").setAttribute("style", "background-color: #F0FFFF;");
		document.getElementById("commands-button").setAttribute("style", "background-color: #F8F8FF;");
		document.getElementById("lights-button").setAttribute("style", "background-color: #F0FFFF	;");
		document.getElementById("body-all").style.background = "#FFFFFF";
		document.getElementById("form-container").style.background = "#F5F5DC";
		document.getElementById("profile-container").style.background = "#F5F5DC";
		document.getElementById("username-title").style.color = "#000000";
		document.getElementById("page-title").style.color = "#000000";
		document.getElementById("page-title2").style.color = "#000000";
		document.getElementById("room-name-title").style.color = "#000000";
		document.getElementById("lights-button").innerText = "Turn off the lights";
		document.getElementById("top-navbar").style.background ="#F5F5F5";
		document.getElementById("myCanvas").style.background = "#C7CEC9";
		lights = true;
		return 0;
	}
	document.getElementById("modal-upload").setAttribute("style", "background-color: #909293;");
	document.getElementById("avatar-button").setAttribute("style", "background-color: #CED1D3;");
	document.getElementById("commands-button").setAttribute("style", "background-color: #909293;");
	document.getElementById("lights-button").setAttribute("style", "background-color: #CED1D3;");
	document.getElementById("body-all").style.background = "#2c3e50";
	document.getElementById("form-container").style.background = "#5D6D7E";
	document.getElementById("profile-container").style.background = "#5D6D7E";
	document.getElementById("username-title").style.color = "#F5F7F4";
	document.getElementById("page-title").style.color = "#F5F7F4";
	document.getElementById("page-title2").style.color = "#F5F7F4";
	document.getElementById("room-name-title").style.color = "#F5F7F4";
	document.getElementById("lights-button").innerText = "Turn on the lights";
	document.getElementById("top-navbar").style.background ="#1a252f";
	document.getElementById("myCanvas").style.background = "#FFFFFF";
	lights = false;
}

//Pressing enter, sends the message
function logIn()
{
	if (log_state == false)
	{
		if (username.value == ""){
			chat.innerHTML = "Please enter a valid username";
			username.value = "";
			return 0;
		}
		if (username.value.length > 20){
			chat.innerHTML = "Username too long";
			username.value = "";
			return 0;

		}
		button_login.value = "Logout";
		button_login.className = "btn btn-danger btn-block"
		log_state = true;
		message.placeholder = "Write some messages"
		chat.innerHTML += "<br>Welcome to the chatroom, <b>" + username.value + "</b>!";
		message.disabled = false;	
		username.setAttribute("disabled","disabled");
		createUser();
		loadProfile();
	}
	else
	{
		button_login.value = "Login";
		button_login.className = "btn btn-success btn-block"
		log_state = false;
		message.placeholder = "Please Log In!"
		message.disabled = true;	
		username.removeAttribute("disabled");
	}
}

function createUser()
{
	//server.getRoomInfo( room_name, function(room_info) { console.log(room_info); } );
	server.storeData("user", username.value + my_id);
	server.loadData("user", function(data) { console.log(data); }); //should print mydata
	
	
}

function linkAvatar()
{
	console.log(link_avatar.value);
	if (link_avatar.value.includes(".jpg") || link_avatar.value.includes(".jpeg") || link_avatar.value.includes(".png")){
		default_avatar = link_avatar.value;
		
		loadProfile();
		return;
	}
	chat.innerHTML = "<b style='color:red'>Please check that the image url contains one of the extensions (.jpg, .jpeg, .png)</b>";
	chat.scrollTop = chat.scrollHeight;

}

function showHelp()
{
	chat.innerHTML += 	"<br><b><i>SYSTEM:</i> Chat commands </b><br><p>&emsp;<b>!topic <topic name></b>\
						: Change room topic</p><p>&emsp;<b>!clear </b>: Clear chat</p><p><b>&emsp;pm&ltUSER_ID\
						&gt</b> : Send Private Message to User ID</p>";
	chat.innerHTML += 	"<p>&emsp;<b>!server</b> : List of connected user ID's</p>\
						<p>&emsp;<b>!color #FFFFFF </b>:  Change your text color</p>";
	chat.innerHTML += 	"<p>&emsp;<b>!hack </b>: Activate hack</p><p>&emsp;<b>!userID </b>: Show user IDs on user messages</p>";
	chat.innerHTML += 	"<b>Canvas commands </b><p>&emsp;<b>!new </b>: Clear canvas</p>";
	autoscrollChat();
}

function sendMessage()
{
	//Check user is logged
	if (log_state == true)
	{
		//Check message contents something
		if (in_message.value != "")
		{
			// Create div element to incrustate HTML 
			var element = document.createElement("div");
			// ID per pintar fons missatge
			element.id = "my-message-id";
			switch (true)
			{
				// CHANGE TOPIC
				case(in_message.value.includes("!topic")):
					changeTopic(in_message.value);
					break;
				// CLEAR CHAT
				case (in_message.value.includes("!clear")):
					chat.innerHTML = "Chat cleared";
					break;
				// CLEAR CANVAS
				case (in_message.value.includes("!new")):
					clearCanvas();	
					break;
				// SHOW USER IDs
				case (in_message.value.includes("!userID")):
					showIDs();
					break;
				// SHOW USERS IN SERVER
				case (in_message.value.includes("!server")):
					var userids = server.getRoomInfo( room_name, function(room_info) { console.log(room_info) } );	
					break;
				// CHANGE TEXT COLOR
				case (in_message.value.includes("!color")):
					changeColor(in_message.value);
					break;
				// PRIVATE MESSAGE
				case (in_message.value.startsWith("pm<")):
					sendPM(in_message.value);
					break;			
				// HACK
				case (in_message.value.includes("!hack")):
					activateHack();
					break;
				// DEFAULT: SEND MESSAGE TO SERVER
				default:
					sendMessageToServer(in_message.value);
					break;
			}
			chat.appendChild(element);
			//chat.scrollIntoView(false);
			autoscrollChat();
			in_message.value = "";
		}
	}
}

/*
	SWITCH FUNCTIONS
*/
function changeTopic(topicmsg){
	// Change topic function
	var topicmsg_1 = topicmsg.replace("!topic", "");
	var topicmsg_2 = topicmsg_1.replace(" ", "");
	if (oldTopic == topicmsg_2){
		chat.innerHTML += "<br><b>Topic is already " + oldTopic + "!";
		return 0;
	}
	chat.innerHTML += "<br><p>Topic is now <b>" + topicmsg_2 +"</b></p>";
	oldTopic = topicmsg_2;
}

function showIDs(){
	if (showID == false){
		showID = true;
		chat.innerHTML += "<br><p>User ID's will now be shown after it's name</p>";
		return;
	}
	showID = false;
	chat.innerHTML += "<br><p>User ID's disabled</p>"; 
}

function changeColor(new_color){
	var r = new_color.replace(" ","");
	var i = r.replace("!color", "");
	textColor = i;
}

function sendPM(msg){
	var pos1;
	pos1   = msg.indexOf(">");
	userPm = msg.substring(3,pos1);
	msgPm  = msg.substr(pos1+1);			
	element.innerHTML = "<span class='span-username'><b>" + username.value + " to " + userPm +" </b></span>" + "<span id='span-text'></span>";
	chat.appendChild(element);
	document.getElementById("span-text").innerText = msgPm;
	document.getElementById("span-text").removeAttribute("id");
	msgPm = "(From: " + my_id + ") " +msgPm;
	// Send message to server
	server.sendMessage({type:"message", username: username.value, content:msgPm, color: textColor, avatar: default_avatar,id: my_id},userPm)
}

function activateHack(){
	if (hack_on == false){
		hack.removeAttribute("style");
		audio.play();
		hack_on = true;
		return;
	}
	hack.setAttribute("style", "visibility: hidden;");
	audio.pause();
	hack_on = false;
}

function sendMessageToServer(msg){
	if ((msg.length) > 200){
		element.innerHTML = "<p style=\"color: red\"> SYSTEM: Message over the limit! (200 characters) </p>";
		break;
	}
	element.innerHTML = "<img class='rounded-circle' id='chat-pictures' src='"+ default_avatar +
						"'</img><span class='span-username'><b>" + username.value + ": </b></span>" + 
						"<span id='span-text' style=\"color:"+textColor+";\"></span>";
	chat.appendChild(element);
	document.getElementById("span-text").innerText = msg;
	document.getElementById("span-text").removeAttribute("id");
	server.sendMessage({type:"message", username: username.value, content:msg, color: textColor, avatar: default_avatar,id: my_id})
}
/*
	END SWITCH FUNCTIONS
*/

function loadProfile()
{
	// Load default avatar
	user_picture.setAttribute("src", default_avatar);
	// Load username and ID
	user_name.innerHTML = "<b>"+ username.value +"</b>#"+my_id;
	// Remove visibility:noone on style
	div_profile.removeAttribute("style");
}

function changeRoom()
{
	if (room.value != "")
	{
		document.getElementById("room-name").innerText = room.value;
		server = new SillyClient();
		server.connect("84.89.136.194:9000", room.value);
		var element = document.createElement("div");
		element.innerHTML = "<span>Room changed to " + 	room.value + "!</span>";
		chat.appendChild(element);
		room_name = room.value;
		
	}
	
	server.on_ready = function( id ){
		console.log("I'm connected with id " + id );
		my_id = id;
	};
	
	server.on_ready = function( id ){  my_id = id; };
	
	server.on_message = function( author_id, msg ){
		var element = document.createElement("div");
		element.id = "received-message-id";
		msgParsed = JSON.parse(msg);
		if (msgParsed.type != "message"){
			return 0;	
		}
		if (msg.includes("mouse"))
		{
			ctx.lineTo(msgParsed.x, msgParsed.y);
			ctx.stroke();
	
		}else{
			if (msgParsed.content){
				if (showID == false){
					element.innerHTML = "<img class='rounded-circle' id='chat-pictures' src='"+ msgParsed.avatar +
										"'</img><span class='span-username'><b id ='b-username'></b></span>" + 
										"<span id=\"span-text\" style=\"color:"+msgParsed.color+";\"></span>";
					chat.appendChild(element);
					document.getElementById("b-username").innerText = msgParsed.username + " : ";
	
				}else{
					element.innerHTML = "<img class='rounded-circle' id='chat-pictures' src='"+ msgParsed.avatar 
										+"'</img><span class='span-username'><bid ='b-username'></b></span>" + 
										"<span id=\"span-text\" style=\"color:"+msgParsed.color+";\"></span>";
					chat.appendChild(element);
					document.getElementById("b-username").innerText = msgParsed.username + "#" + msgParsed.id + " : ";
			}
				document.getElementById("b-username").removeAttribute("id");
				document.getElementById("span-text").innerText = msgParsed.content;
				document.getElementById("span-text").removeAttribute("id");
			}
		}
		autoscrollChat();
	}	
		
	server.on_user_connected = function(msg){	}
	
	server.on_room_info = function(info){	}
	
	server.on_close = function(){	};

}



document.getElementById("in_message").addEventListener
("keyup", function(event) 
	{
		event.preventDefault();
		if (event.keyCode == 13) 
			{
				document.getElementById("btt_send").click();
				in_message.value="";
			}
	}	
);

/*
 CANVAS FUNCTIONS
 */
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = {x: 0, y: 0};
 
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#00CC99';
 
canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
 
    canvas.addEventListener('mousemove', onPaint, false);
}, false);
 
canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);
 
var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
    mouse.name = "mouse";
    server.sendMessage(JSON.stringify(mouse));
};

function clearCanvas() 
{
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	chat.innerHTML += "<br><p>Canvas cleared</p>";
};


/* example to store and retrieve permament data

//to store data
$.getJSON("http://84.89.136.194/redis.php", { action:"store", key:"name", value:"javi" }, function (result) {
	console.log(result);
});

//to recove data
$.getJSON("http://84.89.136.194/redis.php", { action:"load", key:"name" }, function (result) {
	console.log(result);
});

*/