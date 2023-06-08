const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(2, 2, 2);

// Seperated Texture
// const loader = new THREE.TextureLoader();
// const textures = [
//     loader.load('images/metal/base.jpg'),
//     loader.load('images/lace/base.jpg'),
//     loader.load('images/earth/base.jpg'),
//     loader.load('images/crystal/base.jpg'),
//     loader.load('images/pebles/base.png'),
//     loader.load('images/Rock.jpg')
// ];

// const material = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));

// Using CubeTexture
const loader = new THREE.CubeTextureLoader();
loader.setPath('images/');
const textureCube = loader.load([
    'metal/base.jpg',
    'lace/base.jpg',
    'Wood.jpg',
    'crystal/base.jpg',
    'pebles/base.png',
    'Rock.jpg'
]);

const material = new THREE.MeshBasicMaterial({ envMap: textureCube });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lights setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Camera setup
camera.position.z = 5;


        