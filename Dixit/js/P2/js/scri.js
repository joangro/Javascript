// USER DATA
var in_height = document.getElementById("in_height");
var in_angle = document.getElementById("in_angle");
var in_radius = document.getElementById("in_radius");
var in_PosX  = document.getElementById("in_PosX");
var in_PosY  = document.getElementById("in_PosY");
var in_Color  = document.getElementById("in_Color");

// EVENTS
document.getElementById("btt_height").addEventListener("click", function changeHeight(){
	camera.position.y = in_height.value*1;
});


document.getElementById("btt_angle").addEventListener("click", function changeAngle(){
	angle = (2*Math.PI)*in_angle.value/360;
	camera.position.x = Math.sin(angle)*radius+worldCenter;
	camera.position.z = Math.cos(angle)*radius+worldCenter;
});

document.getElementById("btt_radius").addEventListener("click", function changeRadius(){
	radius = in_radius.value;
	camera.position.x = Math.sin(angle)*radius+worldCenter;
	camera.position.z = Math.cos(angle)*radius+worldCenter;
}
);

document.getElementById("btt_chip").addEventListener("click", function insertChip(){
	
	colorChip = in_Color.value;
	material = changeColor(colorChip);
	
	posx = in_PosX.value;
	posy = in_PosY.value;
	
	idx = translateMatrix(posx,posy);
	scene.children[idx].material = material;
	fallChip(idx);
	matrixInfo[idx] = material.id;
	newClient.updateAllClients();
	
});


document.getElementById("btt_move").addEventListener("click", function setMovement(){
	if (moveB == false) { 
		moveB = true;
	}else{ 
		moveB = false;
	}
});


// VARIABLES
var  sphere, geometry, material, material1, material2, material3, px, py, pz, angle, radius;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var n = 4;
var shpereSize = 32;
var distance = shpereSize*2+shpereSize/8;
var worldCenter = distance+distance/2;
var vectorWorld = new THREE.Vector3( worldCenter, worldCenter, worldCenter );
var color1 = {color: 0xffff00};
var color2 = {color: 0xFF2D00};
var color3 = {color: 0xFFFFFF};
var canvasDiv = document.getElementById("myScene");
var matrixCounter = new Array(n-1);
var matrixInfo = new Array(Math.pow(n,3)+2);
var opacity1 = 0.8;
var opacity2 = 0.1;
var moveB = false;
var cubeSize = 5000;
var dur = 1;
var fallSize = shpereSize*20;
var x1, x0, t1, t0, v, ti, idx;

// FUNCTIONS
APP.init();
animate();

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	
	if(moveB == true)
	{moveCamera();}
	chipMovement();
	camera.lookAt( vectorWorld );
	renderer.render( scene, camera );
}

function changeColor(index){
	if (index%2==0)
		{material=material1}
	else
		{material=material2}
	return material
}

function fallChip(idx){

	scene.children[idx].renderOrder = -1
	
	x1 = scene.children[idx].position.y;
	scene.children[idx].position.y = fallSize;
	x0 = scene.children[idx].position.y;
	
	t1 = performance.now()*0.001 + dur;
	t0 = performance.now()*0.001;
	ti = t0;
	
	v = (x1-x0)/(t1-t0);
	
}

function chipMovement(){
	if (ti <= t1)
	{
		ti = performance.now()*0.001;
		t = ti-t0;
		scene.children[idx].position.y = x0 + v*t;
	}
	
}

function translateMatrix(in_x,in_y){
	
	var idx = matrixCounter[in_x-1][in_y-1]+1;
	return idx = checkChip(idx);
}

function checkChip(idx){
	var idxCorrect = false;
	var opacityComp;
	while (idxCorrect == false)
	{
		opacityComp = scene.children[idx].material.opacity;
		if(opacityComp == opacity1)
			{idx = idx + 16;}
		else
			{idxCorrect = true;}
	}
	return idx
}

function moveCamera(){
	time = performance.now()*0.0005;
	camera.position.x = Math.sin(time)*radius+worldCenter;
	camera.position.z = Math.cos(time)*radius+worldCenter;	
}

function skyBox(){
    var geometry = new THREE.CubeGeometry( cubeSize, cubeSize, cubeSize);
    var cubematerials = [
	new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('skybox/front.jpg'), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('skybox/back.jpg'), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('skybox/up.jpg'), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('skybox/down.jpg'), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('skybox/right.jpg'), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('skybox/left.jpg'), side: THREE.DoubleSide})];
    var cubeMaterial = new THREE.MeshFaceMaterial(cubematerials);
    var cube = new THREE.Mesh(geometry, cubeMaterial);
	cube.position.x = worldCenter;
	cube.position.y = worldCenter;
	cube.position.z = worldCenter;
    scene.add(cube);	
}

function printMatrixInfo(matrixInfo_new){
    var materialId;
		for (var i = 2; i <= Math.pow(n,3)+2; i++)
		{
			materialId = matrixInfo_new[i];
			if (materialId == material1.id)
				scene.children[i].material = material1
			
			else if (materialId == material2.id)
				scene.children[i].material = material2
		}    
}








/*
 BASURILLA
*/
/*
var button_1 = document.getElementById("btt_1");
var button_2 = document.getElementById("btt_2"); 
var button_3 = document.getElementById("btt_3"); 
var button_4 = document.getElementById("btt_4"); 
var button_5 = document.getElementById("btt_5"); 
var button_6 = document.getElementById("btt_6"); 
var button_7 = document.getElementById("btt_7"); 
var button_8 = document.getElementById("btt_8"); 
var button_9 = document.getElementById("btt_9"); 
var button_10 = document.getElementById("btt_10"); 
var button_11 = document.getElementById("btt_11"); 
var button_12 = document.getElementById("btt_12"); 
var button_13 = document.getElementById("btt_13"); 
var button_14 = document.getElementById("btt_14"); 
var button_15 = document.getElementById("btt_15"); 
var button_16 = document.getElementById("btt_16"); 
*/
