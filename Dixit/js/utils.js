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

