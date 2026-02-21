let scene, camera, renderer, controls;
let initialized=false;
let container=document.getElementById("threeContainer");

let editMode="cube";
let voxels=[];
let mainMesh=null;
let globalOpacity=1;

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

controls=new THREE.OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;

animate();
initialized=true;
}

function animate(){
requestAnimationFrame(animate);
if(controls) controls.update();
if(renderer) renderer.render(scene,camera);
}

function setEditMode(mode){
editMode=mode;

document.getElementById("cubeEditor").style.display=
mode==="cube"?"block":"none";

document.getElementById("faceEditor").style.display=
mode==="faces"?"block":"none";
}

function clearScene(){
while(scene.children.length>0){
scene.remove(scene.children[0]);
}
voxels=[];
mainMesh=null;
}

function buildVoxelGrid(x,y,z){

if(x>10||y>10||z>10){
alert("Voxel limit is 10-10-10 max.");
return false;
}

clearScene();

let size=2;
let dx=size/x;
let dy=size/y;
let dz=size/z;

for(let i=0;i<x;i++){
for(let j=0;j<y;j++){
for(let k=0;k<z;k++){

let geometry=new THREE.BoxGeometry(dx,dy,dz);
let material=new THREE.MeshBasicMaterial({
color:0x003322,
transparent:true,
opacity:globalOpacity
});

let cube=new THREE.Mesh(geometry,material);

cube.position.set(
(i-x/2)*dx+dx/2,
(j-y/2)*dy+dy/2,
(k-z/2)*dz+dz/2
);

scene.add(cube);
voxels.push(cube);
}
}
}

return true;
}

function buildFaceCube(){

clearScene();

let geometry=new THREE.BoxGeometry(2,2,2);

let materials=new Array(6).fill(
new THREE.MeshBasicMaterial({
color:0x003322,
transparent:true,
opacity:globalOpacity
})
);

mainMesh=new THREE.Mesh(geometry,materials);
scene.add(mainMesh);
}

function parseValue(value, format){

if(format==="binary"){
if(!/^[01]{8}$/.test(value)) return null;
return parseInt(value,2);
}

if(format==="decimal"){
let n=parseInt(value,10);
return (n>=0&&n<=255)?n:null;
}

if(format==="hex"){
if(!/^[0-9a-fA-F]{1,2}$/.test(value)) return null;
return parseInt(value,16);
}

if(format==="octal"){
if(!/^[0-7]{1,3}$/.test(value)) return null;
let n=parseInt(value,8);
return (n<=255)?n:null;
}

if(format==="morse"){
if(!/^[\.\-]{8}$/.test(value)) return null;
let b=value.replace(/-/g,"1").replace(/\./g,"0");
return parseInt(b,2);
}

return null;
}

function convert3D(){

init3D();

let format=document.getElementById("format3D").value;
let size=document.getElementById("size3D").value.split("-");
let x=parseInt(size[0]);
let y=parseInt(size[1]);
let z=parseInt(size[2]);

if(editMode==="cube"){

if(!buildVoxelGrid(x,y,z)) return;

let values=document.getElementById("inputData3D")
.value.trim().split(/\s+/);

if(format==="colorcode"){

if(values.length!==x*y*z){
alert("Need X*Y*Z values.");
return;
}

for(let i=0;i<voxels.length;i++){
voxels[i].material.color.set(values[i]);
}

}else{

if(values.length!==x*y*z*3){
alert("Need X*Y*Z*3 values.");
return;
}

for(let i=0;i<voxels.length;i++){

let r=parseValue(values[i*3],format);
let g=parseValue(values[i*3+1],format);
let b=parseValue(values[i*3+2],format);

if(r===null||g===null||b===null){
alert("Invalid numeric.");
return;
}

voxels[i].material.color.setRGB(
r/255,g/255,b/255
);
}
}

}else{

buildFaceCube();

let faceIds=[
"faceRight","faceLeft",
"faceTop","faceBottom",
"faceFront","faceBack"
];

if(format==="colorcode"){

for(let i=0;i<6;i++){
let val=document.getElementById(faceIds[i]).value;
mainMesh.material[i]=new THREE.MeshBasicMaterial({
color:val,
transparent:true,
opacity:globalOpacity
});
}

}else{

for(let i=0;i<6;i++){

let input=document.getElementById(faceIds[i])
.value.trim().split(/\s+/);

if(input.length!==3){
alert("Each face needs 3 values.");
return;
}

let r=parseValue(input[0],format);
let g=parseValue(input[1],format);
let b=parseValue(input[2],format);

mainMesh.material[i]=new THREE.MeshBasicMaterial({
color:new THREE.Color(r/255,g/255,b/255),
transparent:true,
opacity:globalOpacity
});
}
}
}
}

function generateStress3D(){

if(document.getElementById("modeSelect3D").value!=="stress") return;

let format=document.getElementById("format3D").value;
let size=document.getElementById("size3D").value.split("-");
let x=parseInt(size[0]);
let y=parseInt(size[1]);
let z=parseInt(size[2]);

let total=x*y*z;
let output=[];

for(let i=0;i<total;i++){

if(format==="colorcode"){
let r=Math.floor(Math.random()*256).toString(16).padStart(2,"0");
let g=Math.floor(Math.random()*256).toString(16).padStart(2,"0");
let b=Math.floor(Math.random()*256).toString(16).padStart(2,"0");
output.push("#"+r+g+b);
}else{
for(let j=0;j<3;j++){
let val=Math.floor(Math.random()*256);

if(format==="binary") output.push(val.toString(2).padStart(8,"0"));
if(format==="decimal") output.push(val);
if(format==="hex") output.push(val.toString(16).padStart(2,"0"));
if(format==="octal") output.push(val.toString(8));
if(format==="morse"){
let bin=val.toString(2).padStart(8,"0");
output.push(bin.replace(/1/g,"-").replace(/0/g,"."));
}
}
}
}

document.getElementById("inputData3D")
.value=output.join(" ");
}

document.getElementById("opacitySlider")
.addEventListener("input",function(){
globalOpacity=parseFloat(this.value);

if(voxels.length>0){
voxels.forEach(v=>v.material.opacity=globalOpacity);
}

if(mainMesh){
mainMesh.material.forEach(m=>m.opacity=globalOpacity);
}
});