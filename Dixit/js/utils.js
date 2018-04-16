// UTILS

var utils = new Utils();

function Utils(){
	this.DEG2RAD = 0.01745329252;
	this.RAD2DEG = 57.2957795130;
	
}

// EXTENDED LIBRARIES
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
// GAME
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function createRandomArray(n){
	var array1 = [];
	for (var i = 0; i < n; i++) {
		array1[i] = i;
	}
	
	array1 = shuffle(array1);

	return array1
}

function countVotes(idx,votes){
	var count = 0;
	for (var i=0; i<votes.length; i++){
		if(votes[i] == idx)
			count++;
	}
	return count
}

function nameToId(name,cards){
	var pos = 5;
	for (var i=0; i<cards.length; i++){
		if (cards[i].player == name)
			pos = i;
	}
	
	return pos
}


// DISPLAY ERROR MESSAGES
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

