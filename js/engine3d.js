let scene, camera, renderer, controls, mesh, material;

const container = document.getElementById("threeContainer");

function init3D(){

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
75,
container.clientWidth/container.clientHeight,
0.1,
1000
);

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth,container.clientHeight);

container.innerHTML="";
container.appendChild(renderer.domElement);

camera.position.z=6;

const light=new THREE.DirectionalLight(0xffffff,1);
light.position.set(5,5,5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

material=new THREE.MeshStandardMaterial({
color:0x00ff88,
transparent:true,
opacity:1
});

createMesh(2,2,2);

controls=new THREE.OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;

animate();
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
controls.update();
renderer.render(scene,camera);
}

window.addEventListener("load",()=>{
setTimeout(init3D,200);
});