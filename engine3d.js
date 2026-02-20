let scene, camera, renderer, mesh, outline;
let animationId;

function init3D() {

const container = document.getElementById("canvasContainer");
container.innerHTML = "";

scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

camera = new THREE.PerspectiveCamera(
75,
container.clientWidth / container.clientHeight,
0.1,
1000
);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

camera.position.z = 6;

createBox(2,2,2);

function animate(){
animationId = requestAnimationFrame(animate);
if(mesh){
mesh.rotation.x += 0.01;
mesh.rotation.y += 0.01;
}
renderer.render(scene, camera);
}

animate();
}

function createBox(w,h,t){

if(mesh){
scene.remove(mesh);
scene.remove(outline);
mesh.geometry.dispose();
}

const geometry = new THREE.BoxGeometry(w,h,t);

const material = new THREE.MeshStandardMaterial({
color: 0x00ff88,
metalness: 0.4,
roughness: 0.4
});

mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Outline
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
outline = new THREE.LineSegments(edges, lineMaterial);
scene.add(outline);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,5,5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);
}

function updateShape(){

const input = document.getElementById("size3d").value.split("-");

let w = parseFloat(input[0]);
let h = parseFloat(input[1]);
let t = parseFloat(input[2]);

if(!w || !h || !t) return;

createBox(w,h,t);
}