
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const width = 512;
const height = 512;
const depth = 100;

const size = width * height;
const data = new Uint8Array( 4 * size * depth );

for ( let i = 0; i < depth; i ++ ) {
	const color = new THREE.Color( Math.random(), Math.random(), Math.random() );
	const r = Math.floor( color.r * 255 );
	const g = Math.floor( color.g * 255 );
	const b = Math.floor( color.b * 255 );

	for ( let j = 0; j < size; j ++ ) {
		const stride = ( i * size + j ) * 4;
		data[ stride ] = r;
		data[ stride + 1 ] = g;
		data[ stride + 2 ] = b;
		data[ stride + 3 ] = 255;
	}
}

// used the buffer to create a DataArrayTexture
const texture = new THREE.DataArrayTexture( data, width, height, depth );
texture.needsUpdate = true;
const geometry = new THREE.BoxGeometry( 2, 2, 2 );


const vertex = `

	out vec2 vUv;

	void main()
	{
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
`

const fragment = `
		
	precision highp sampler2DArray;
	precision mediump float;

	in vec2 vUv;

	uniform sampler2DArray uTexture;
	uniform int uDepth;
	uniform float uIntensity;

	void main()
	{
		float voxel = texture(uTexture, vec3( vUv, uDepth )).r;
		gl_FragColor.r = voxel * uIntensity;
	}

`


const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);

const renderTarget = new THREE.WebGLRenderTarget(width, height);
renderTarget.texture.format = THREE.RGBAFormat;

const postProcessMaterial = new THREE.ShaderMaterial( {
	uniforms: {
		uTexture: { value: texture },
		uDepth: { value: 55 },
		uIntensity: { value: 1.0 }
	},
	vertexShader: vertex,
	fragmentShader: fragment
} );


const cube = new THREE.Mesh( geometry, postProcessMaterial );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();