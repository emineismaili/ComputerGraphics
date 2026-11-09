import *  as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();

scene.background = new THREE.Color(0xcccccc);

const camera = new THREE.PerspectiveCamera(
  55, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  100
);

camera.position.set(3,2,5)

const renderer = new THREE.WebGLRenderer({antialias: true});  //antialias: true to make the edges of the objects smoother

// Set the renderer size to the browser window
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the HTML page
document.body.appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);


const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);

// Set the position of the directional light
directionalLight.position.set(5,8,4)

// Add both lights to the scene
scene.add(ambientLight, directionalLight);


const positions = new Float32Array([
    0,1.5, 0, //vertex 0 - top
    0,-1.5,0, //vertex 1 - bottom
    1,0,0,    //vertex 2 - right
    0,0,1,    //vertex 3 - front
    -1,0,0,   // vertex 4 - left
    0,0,-1    //vertex 5 - back
])

const index = [
    // Upper four triangular faces
    0, 3, 2, 
    0, 4, 3,
    0, 5, 4,
    0, 2, 5,

    // Lower four triangular faces
    1, 2, 3,
    1, 3, 4,
    1, 4, 5,
    1, 5, 2
]

const geometry = new THREE.BufferGeometry()

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Define how the vertices are connected to form triangles
geometry.setIndex(index)

// Calculate vertex normals for correct lighting and shading
geometry.computeVertexNormals();

const mesh = new THREE.Mesh(geometry,
    new THREE.MeshStandardMaterial({
    color: 0xf759a8,
    roughness: 0.4,
    side: THREE.FrontSide
})
)

// Add the object to the scene
scene.add(mesh)

const nonIndexed = geometry.toNonIndexed()

// Recalculate normals for the non-indexed geometry
nonIndexed.computeVertexNormals()

console.log('Vertices:' , geometry.attributes.position.count, 'Faces', index.length/3)
console.log('Vertices:' , nonIndexed.attributes.position.count, 'Faces', index.length/3)

// Listen for keyboard input
window.addEventListener('keydown', (e)=> {

    // When the user presses the F key
    if (e.key == 'f')
    { 
        // Switch between indexed and non-indexed geometry
        mesh.geometry = mesh.geometry == geometry ? nonIndexed : geometry
    }
})

// Allow the user to rotate and zoom the camera with the mouse
const control = new OrbitControls(camera, renderer.domElement)

// Animation loop
function animate()
{
    // Continuously call the animate function
    requestAnimationFrame(animate)

    // Update camera controls
    control.update()

    // Slowly rotate the object around the Y axis
    mesh.rotation.y +=0.005

    // Render the scene using the camera
    renderer.render(scene, camera)
}

// Start the animation
animate()
