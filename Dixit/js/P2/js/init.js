var APP = {
	
	camera: null,
	renderer: null,
	scene: null,
	
	init: function init() {
	console.log("INIT");
	// VARIABLES
	height = worldCenter*2;
	angle = 0;
	radius = 600;
		
	// SCENE
	scene = this.scene = new THREE.Scene();
	skyBox();
	
	// CAMERA
	camera = this.camera = new THREE.PerspectiveCamera( 45, canvasDiv.offsetWidth / 700, 1, 20000 );
	camera.position.x = worldCenter
	camera.position.y = height
	camera.position.z = radius+worldCenter
	
	// RENDER
	renderer = this.renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( canvasDiv.offsetWidth, 700);
	document.getElementById("myScene").appendChild( renderer.domElement );
	
	// LIGHT		
	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );
	var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	camera.add( pointLight );
	scene.add( camera );
	
	// SCENE
	geometry = new THREE.SphereGeometry( shpereSize, shpereSize, shpereSize );
	material1 = new THREE.MeshBasicMaterial( color1  ); material1.transparent = true;
	material2 = new THREE.MeshBasicMaterial( color2  ); material2.transparent = true;
	material3 = new THREE.MeshBasicMaterial( color3  ); material3.transparent = true;
	material1.opacity = opacity1;
	material2.opacity = opacity1;
	material3.opacity = opacity2;
		//AUX
		px = 0;
		py = 0;
		pz = 0;
		chipIdx = 2;
		for (var i=0;i<=n-1;i++)
		{matrixCounter[i] = new Array(n-1)}
		
		
	// CREATION
	for (var i=1;i<=n;i++)
	{
		for (var j=1;j<=n;j++)
		{
			for (var k=1;k<=n;k++)
			{
			py = (i-1)*distance;
			px = (j-1)*distance;
			pz = (k-1)*distance;
			sphere   = new THREE.Mesh( geometry, material3);
			sphere.position.set(px,py,pz);
			scene.add( sphere );
			// CHIP IDX
			if (i==1){matrixCounter[k-1][j-1] = chipIdx};
			chipIdx = chipIdx + 1;
			}
		}
	}

	// LISTENER
	window.addEventListener( 'resize', onWindowResize, false );
	
	}
};