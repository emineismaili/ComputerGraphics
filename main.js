import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { roughness } from 'three/tsl';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(6,5,8)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const control = new OrbitControls(camera, renderer.domElement); 


const pointLight = new THREE.PointLight(0xffffff, 400, 0, 1.6);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
scene.add(pointLight, ambientLight);


const geometry = new THREE.SphereGeometry(2, 32, 24);
const material = new THREE.MeshStandardMaterial({ color: 0xFFB627, emissive: 0xFF5500, emissiveIntensity: 6 });
const sun = new THREE.Mesh(geometry, material);
scene.add(sun);

const earthOrbit = new THREE.Object3D();
sun.add(earthOrbit); 

const marsOrbit = new THREE.Object3D();
sun.add(marsOrbit);

// Add an axes helper to the earthOrbit object to visualize its orientation.
// earthOrbit.add(new THREE.AxesHelper(7));

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0x2266CC, roughness: 0.9 })
);
earth.position.x = 6
earthOrbit.add(earth);  

const mars = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0xC1440E, roughness: 0.9 })
);
mars.position.x = 10
marsOrbit.add(mars);

// earth.add(new THREE.AxesHelper(7));

const moonOrbit = new THREE.Object3D();
earth.add(moonOrbit);

// moonOrbit.add(new THREE.AxesHelper(7));

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0xC0C0C0 })
);
moon.position.x = 1.5;
moonOrbit.add(moon);

const phobosOrbit = new THREE.Object3D();
mars.add(phobosOrbit);

const phobos = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0xA9A9A9 })
);
phobos.position.x = 1.2;
phobosOrbit.add(phobos);

// moon.add(new THREE.AxesHelper(7));


for (let i = 0; i < 5000; i++) {
    const star = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );

    star.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
    );

    scene.add(star);
}

function animate(){
    requestAnimationFrame(animate);
    control.update();  

    earthOrbit.rotation.y += 0.01; 
    moonOrbit.rotation.y += 0.04;
    earth.rotation.y += 0.05;
    sun.rotation.y += 0.005;
    marsOrbit.rotation.y += 0.006;
    phobosOrbit.rotation.y += 0.005;
    mars.rotation.y += 0.003;

    renderer.render(scene, camera);
}
animate();

addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
})