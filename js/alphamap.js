const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(1,32, 32);

var opacity = new THREE.TextureLoader().load('images/lace/opacity.jpg');

const material = new THREE.MeshStandardMaterial({
    alphaMap : opacity,
    alphaTest: 0.5,
    transparent : 1,
    side : THREE.DoubleSide,
    opacity : 1
})


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
