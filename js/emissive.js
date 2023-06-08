const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(2, 2, 2);

var base = new THREE.TextureLoader().load('images/metal/base.jpg');
var emissive = new THREE.TextureLoader().load('images/metal/emissive.jpg');
var normal = new THREE.TextureLoader().load('images/metal/normal.jpg')

const material = new THREE.MeshStandardMaterial({
    map: base,
    emissiveMap : emissive,
    emissive: 0xffffff,
    normalMap: normal
});

var pointLight = new THREE.PointLight(0xffffff, 1); // Color: white, Intensity: 1
pointLight.position.set(0, 5, 0); // Set the position of the light
var pointLight1 = new THREE.PointLight(0xffffff, 1); // Color: white, Intensity: 1
pointLight1.position.set(0, 0, 5); // Set the position of the light
var pointLight2 = new THREE.PointLight(0xffffff, 1); // Color: white, Intensity: 1
pointLight2.position.set(5, 0, 0); // Set the position of the light
scene.add(pointLight);
scene.add(pointLight1);
scene.add(pointLight2);


scene.background = new THREE.Color(0xabcdef);
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
