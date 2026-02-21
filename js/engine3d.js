let scene,camera,renderer,controls;
let initialized=false;
let voxels=[];
let globalOpacity=1;

const container=document.getElementById("threeContainer");
const stats3D=document.getElementById("stats3D");

function init3D(){

if(initialized)return;

scene=new THREE.Scene();
scene.background=new THREE.Color(0x000000);

camera=new THREE.PerspectiveCamera(
75,
container.offsetWidth/container.offsetHeight,
0.1,
2000
);

camera.position.set(6,6,10);

renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(container.offsetWidth,container.offsetHeight);

container.innerHTML="";
container.appendChild(renderer.domElement);

controls=new THREE.OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;

initialized=true;
animate();
}

let lastTime=performance.now();

function animate(){
requestAnimationFrame(animate);

let now=performance.now();
let delta=now-lastTime;
lastTime=now;

controls.update();
renderer.render(scene,camera);

let fps=(1000/delta).toFixed(1);
stats3D.textContent=
"Frame: "+delta.toFixed(2)+" ms | FPS: "+fps;
}

function clearScene(){
while(scene.children.length>0){
scene.remove(scene.children[0]);
}
voxels=[];
}

function createMat(color){
return new THREE.MeshBasicMaterial({
color:color,
transparent:true,
opacity:globalOpacity,
depthWrite:globalOpacity===1
});
}

function convert3D(){

init3D();
clearScene();

let size=document.getElementById("size3D").value.split("-");
let x=parseInt(size[0]);
let y=parseInt(size[1]);
let z=parseInt(size[2]);

let solid=document.getElementById("modeSelect3D").value==="normal";

let sizeBase=4;
let dx=sizeBase/x;
let dy=sizeBase/y;
let dz=sizeBase/z;

for(let i=0;i<x;i++){
for(let j=0;j<y;j++){
for(let k=0;k<z;k++){

let isSurface=
i===0||i===x-1||
j===0||j===y-1||
k===0||k===z-1;

if(!solid && !isSurface)continue;

let geo=new THREE.BoxGeometry(dx,dy,dz);
let cube=new THREE.Mesh(geo,createMat(0x003322));

cube.position.set(
(i-x/2)*dx+dx/2,
(j-y/2)*dy+dy/2,
(k-z/2)*dz+dz/2
);

scene.add(cube);
voxels.push(cube);

}}}
}

document.getElementById("opacitySlider")
.addEventListener("input",function(){
globalOpacity=parseFloat(this.value);
voxels.forEach(v=>{
v.material.opacity=globalOpacity;
v.material.depthWrite=globalOpacity===1;
});
});