let scene,camera,renderer,controls;
let initialized=false;
let voxels=[];
let editMode="cube";
let globalOpacity=1;

const container=document.getElementById("threeContainer");
const stats3D=document.getElementById("stats3D");

function setEditMode(mode){
editMode=mode;
}

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
stats3D.textContent="Frame: "+delta.toFixed(2)+" ms | FPS: "+fps;
}

function clearScene(){
voxels.forEach(v=>scene.remove(v));
voxels=[];
}

function createMaterial(){
return new THREE.MeshBasicMaterial({
color:0x00ff88,
transparent:true,
opacity:globalOpacity,
depthWrite:true
});
}

function generate3D(){

let size=document.getElementById("size3D").value.split("-");
let x=parseInt(size[0]);
let y=parseInt(size[1]);
let z=parseInt(size[2]);

let mode=document.getElementById("mode3DSelect").value;

let total=(editMode==="cube")
? x*y*z
: (2*(x*y + y*z + x*z));

let data=[];

for(let i=0;i<total;i++){
if(mode==="stress"){
data.push(
Math.floor(Math.random()*256),
Math.floor(Math.random()*256),
Math.floor(Math.random()*256)
);
}else{
data.push(0,255,0);
}
}

document.getElementById("input3D").value=data.join(" ");
}

function convert3D(){

init3D();
clearScene();

let size=document.getElementById("size3D").value.split("-");
let x=parseInt(size[0]);
let y=parseInt(size[1]);
let z=parseInt(size[2]);

let values=document.getElementById("input3D")
.value.trim().split(/\s+/);

let sizeBase=4;
let dx=sizeBase/x;
let dy=sizeBase/y;
let dz=sizeBase/z;

let index=0;

for(let i=0;i<x;i++){
for(let j=0;j<y;j++){
for(let k=0;k<z;k++){

let isSurface=
i===0||i===x-1||
j===0||j===y-1||
k===0||k===z-1;

if(editMode==="faces" && !isSurface)continue;

let r=parseInt(values[index*3]);
let g=parseInt(values[index*3+1]);
let b=parseInt(values[index*3+2]);

let color=(r<<16)|(g<<8)|b;

let cube=new THREE.Mesh(
new THREE.BoxGeometry(dx,dy,dz),
new THREE.MeshBasicMaterial({
color:color,
transparent:true,
opacity:globalOpacity,
depthWrite:true
})
);

cube.position.set(
(i-x/2)*dx+dx/2,
(j-y/2)*dy+dy/2,
(k-z/2)*dz+dz/2
);

scene.add(cube);
voxels.push(cube);
index++;

}}}
}

document.getElementById("opacitySlider")
.addEventListener("input",function(){
globalOpacity=parseFloat(this.value);
voxels.forEach(v=>{
v.material.opacity=globalOpacity;
});
});