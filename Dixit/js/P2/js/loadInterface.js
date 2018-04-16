var interface = new Interface();

function Interface (){
	
	this.buttonHeight = document.getElementById("btt_height");
	this.buttonAngle  = document.getElementById("btt_angle");
	this.buttonRadius = document.getElementById("btt_radius");
	this.buttonChip   = document.getElementById("btt_chip");
	this.buttonMove   = document.getElementById("btt_move");
	
	this.buttonHeight.addEventListener("click", function changeHeight(){
		camera.position.y = in_height.value*1;
	});
	
	this.buttonAngle.addEventListener("click", function changeAngle(){
		angle = (2*Math.PI)*in_angle.value/360;
		camera.position.x = Math.sin(angle)*radius+worldCenter;
		camera.position.z = Math.cos(angle)*radius+worldCenter;
	});
	
	this.buttonRadius.addEventListener("click", function changeRadius(){
		radius = in_radius.value;
		camera.position.x = Math.sin(angle)*radius+worldCenter;
		camera.position.z = Math.cos(angle)*radius+worldCenter;
	});
	
	this.buttonChip.addEventListener("click", function insertChip(){
		
		colorChip = in_Color.value;
		material = changeColor(colorChip);
		
		posx = in_PosX.value;
		posy = in_PosY.value;
		
		idx = translateMatrix(posx,posy);
		scene.children[idx].material = material;
		fallChip(idx);
		matrixInfo[idx] = material.id;
		server.sendMessage({type:"updateAll", content: matrixInfo});
		
	});
	
	this.buttonMove.getElementById("btt_move").addEventListener("click", function setMovement(){
		(moveB == false) ? (moveB = true) : (moveB = false);
	});
}