function APP(){
	this.canvasDiv = null;
}

APP.prototype.initAll = function(){
	
	this.initCanvas();
	
}

APP.prototype.initCanvas = function(){
	console.log("Iee");
}

APP.prototype.init = function(){
	
}

APP = new APP();
GFX = new GFX();

GFX.init();
APP.initAll();

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	GFX.render.render( GFX.scene, GFX.camera );
}

animate();


