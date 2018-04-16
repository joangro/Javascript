function GFX(){
	
	this.camera = null;
	this.scene = null;
	this.render = null;
	this.worldCenter = 0;
	this.container = null;
	// Skybox parameters
	this.cubeSize = 1000;
	
	this.ambientLight = null;
	this.pointLight = null;
}

GFX.prototype.init = function () {
	
	this.initScene();
	this.initSkyBox();
	this.initRender();
	this.initCamera();
	this.initLight();

}

GFX.prototype.initCamera = function (){
	this.camera = new THREE.PerspectiveCamera( 45, this.container.offsetWidth / this.container.offsetHeight , 1, 20000 );
	this.camera.position.x = this.worldCenter;
	this.camera.position.y = this.worldCenter;
	this.camera.position.z = this.worldCenter;

}

GFX.prototype.initScene = function (){
	this.scene = new THREE.Scene();
	this.container = document.getElementById("myScene");

}

GFX.prototype.initSkyBox = function (){
	
    var geometry = new THREE.CubeGeometry( this.cubeSize,  this.cubeSize, this.cubeSize);
    var cubematerials = [
	new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('texture/skybox/front.jpg'), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('texture/skybox/back.jpg'), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('texture/skybox/up.jpg'), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('texture/skybox/down.jpg'), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('texture/skybox/right.jpg'), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('texture/skybox/left.jpg'), side: THREE.DoubleSide})];
    var cubeMaterial = new THREE.MeshFaceMaterial(cubematerials);
    var cube = new THREE.Mesh(geometry, cubeMaterial);
	cube.position.x = this.worldCenter;
	cube.position.y = this.worldCenter;
	cube.position.z = this.worldCenter;
    this.scene.add(cube);	
	
}

GFX.prototype.initRender = function (){
	this.render = new THREE.WebGLRenderer();
	this.render.setPixelRatio( window.devicePixelRatio );
	//this.render.setSize( $("#myScene").width(), $("#myScene").height());
	this.render.setSize( this.container.offsetWidth, this.container.offsetHeight);
	this.container.appendChild( this.render.domElement );
}

GFX.prototype.initLight = function (){
	this.ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	this.scene.add( this.ambientLight );
	this.pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	this.camera.add( this.pointLight );
	this.scene.add( this.camera );

}


function onWindowResize() {
	var spaceLeft = 1;
	GFX.camera.aspect = window.innerWidth*spaceLeft / window.innerHeight*spaceLeft;
	GFX.camera.updateProjectionMatrix();
	GFX.render.setSize( window.innerWidth*spaceLeft, window.innerHeight*spaceLeft );
}

window.addEventListener( 'resize', onWindowResize, false );
	
	

