let scene, camera, renderer, controls, mesh, material;
let initialized=false;
const container=document.getElementById("threeContainer");

function init3D(){

if(initialized) return;

if(container.offsetHeight===0){
setTimeout(init3D,100);
return;
}

scene=new THREE.Scene();

camera=new THREE.PerspectiveCamera(
75,
container.offsetWidth/container.offsetHeight,
0.1,
1000
);

renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.offsetWidth,container.offsetHeight);

container.innerHTML="";
container.appendChild(renderer.domElement);

camera.position.z=6;

/* NO LIGHTS AT ALL */

material=new THREE.MeshBasicMaterial({
color:0x006633,   // much darker green
transparent:true,
opacity:1
});

createMesh(2,2,2);

controls=new THREE.OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;

animate();
initialized=true;
}

function createMesh(x,y,z){

if(mesh) scene.remove(mesh);

let geometry=new THREE.BoxGeometry(x,y,z);

mesh=new THREE.Mesh(geometry,material);

let edges=new THREE.EdgesGeometry(geometry);
let outline=new THREE.LineSegments(
edges,
new THREE.LineBasicMaterial({color:0x00ff88})
);

mesh.add(outline);
scene.add(mesh);
}

function updateShape(){
if(!initialized) init3D();
let v=document.getElementById("size3D").value.split("-");
createMesh(
parseFloat(v[0])||2,
parseFloat(v[1])||2,
parseFloat(v[2])||2
);
}

document.getElementById("opacitySlider")
.addEventListener("input",function(){
if(material) material.opacity=parseFloat(this.value);
});

function animate(){
requestAnimationFrame(animate);
if(controls) controls.update();
if(renderer) renderer.render(scene,camera);
}