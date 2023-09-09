
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );
// const hud = document.createElement("canvas");
// const draw = hud.getContext('2d');
// let CW = document.documentElement.clientWidth;
// let CH = document.documentElement.clientHeight;
// hud.width = CW;
// hud.height = CH;
// hud.style.position = "absolute;";
// draw.fillStyle = "rgba(255,255,255,1);";
// draw.fillRect(0,0,CW,CH);
// document.body.appendChild( hud );
scene.background = new THREE.CubeTextureLoader()
	.setPath( 'textures/cubeMaps/skybox/' )
	.load( [
		'bg.png',
		'bg.png',
		'bg.png',
		'bg.png',
		'bg.png',
		'bg.png'
	] );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const loader = new THREE.TextureLoader();
geometry = new THREE.BoxGeometry();
material = new THREE.MeshPhysicalMaterial( { map: loader.load('dirt.jpg')} );
cube = new THREE.Mesh( this.geometry, this.material );
const selectionEdge = new THREE.LineSegments( new THREE.EdgesGeometry(new THREE.BoxGeometry( 1, 1, 1 )), new THREE.LineBasicMaterial( { color: 0x000000} ) );
selectionEdge.position.y =  0.5;// = new THREE.Vector3(0,2,0);
selectionEdge.material.transparent = true;
selectionEdge.material.opacity = 0;
const selectionRay = new THREE.Ray();
console.log(selectionEdge);
scene.add( selectionEdge );

//Sunlight

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
scene.add( directionalLight );
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 512;
directionalLight.shadow.mapSize.height = 512;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.target = cube;
const pGeometry = new THREE.PlaneGeometry( 40, 40, 32 );
const pMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff,map: loader.load('sun.png'), side: THREE.DoubleSide} );
const sun = new THREE.Mesh( pGeometry, pMaterial );
scene.add( sun );

//Hemisphere Light

const hLight = new THREE.HemisphereLight( 0xffffff, 0x555555, 0.4 );
scene.add( hLight );
scene.add(hLight.target);

/**const light = new THREE.PointLight( 0xffffff, 1, 50 );
light.position.set( 10, 0, 0 );
light.castShadow = true; // default false
scene.add( light );
/**const pGeometry = new THREE.PlaneGeometry( 100, 100, 32 );
const pMaterial = new THREE.MeshPhysicalMaterial( { color: 0xffffff,map: loader.load('dirt.jpg'), function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 2, 2 );}
, side: THREE.DoubleSide} );
/**const plane = new THREE.Mesh( pGeometry, pMaterial );
scene.add( plane );
plane.position.x = 1;
plane.position.y = 0;
plane.position.z = 1;
console.log(loader);
//plane.material.map.wrapS = 16;
plane.lookAt(plane.position.x,plane.position.y+1,plane.position.z);
//plane.rotation.x = pi/2;*/
/**const light2 = new THREE.PointLight( 0xffffff, 1, 100 );
light2.position.set( 0, 0, 10 );
light2.castShadow = true; // default false
scene.add( light2 );
const light3 = new THREE.PointLight( 0xffffff, 1, 100 );
light3.position.set( 0, 0, -10 );
light3.castShadow = true; // default false
scene.add( light3 );
const light4 = new THREE.PointLight( 0xffffff, 1, 100 );
light4.position.set( -10, 0, 0 );
light4.castShadow = true; // default false
scene.add( light4 );*/
camera.position.z = -5;
camera.position.y = 1.5
//var cubeI = 0;
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

    //cube.position.x = 1.5*sin(cubeI*2);
    //cube.position.y = cos(cubeI);
    //cube.position.z = tan(cubeI/1.5);
    //cube.rotation.x = sin(cubeI);
    //cube.rotation.y = cos(cubeI);
    //cube.rotation.z += 0.01;//tan(cubeI);
    //cubeI += pi/180;
}
animate();
var block = function(){
    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshPhysicalMaterial( { map: loader.load('dirt.jpg')} );
    this.cube = new THREE.Mesh( this.geometry, this.material );
    this.box = new THREE.Box3();
}
var blockArr = [];
function newBlock(x,y,z,block){
    //this.block = new block;
    scene.add(block.cube);
    block.cube.name = blockArr.length;
    block.cube.position.x = x;
    block.cube.position.y = y;
    block.cube.position.z = z;
    block.cube.castShadow = true;
    block.cube.receiveShadow = true;
    block.box.setFromCenterAndSize(block.cube.position, new THREE.Vector3( 1, 1, 1 ));
    blockArr.push(block);
}
const noise = new perlinNoise3d();
for(l=-10;l<10;l++){
    for(w=-10;w<10;w++){
        newBlock(l,floor(2*sin((l+2*(noise.get(l,w)-0.5))/12)+2*sin((w+2*(noise.get(l,w)-0.5))/15)+(6*noise.get(l/15,w/15))),w,new block);
    }
}