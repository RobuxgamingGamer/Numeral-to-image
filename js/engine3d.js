let scene, camera, renderer, controls;
let initialized = false;
let container = document.getElementById("threeContainer");

let editMode = "cube";
let voxels = [];
let mainMesh = null;
let globalOpacity = 1;

// ================= INIT =================

function init3D(){

if(initialized) return;

if(container.offsetHeight === 0){
    setTimeout(init3D, 100);
    return;
}

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
    75,
    container.offsetWidth / container.offsetHeight,
    0.1,
    1000
);

renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.offsetWidth, container.offsetHeight);

container.innerHTML = "";
container.appendChild(renderer.domElement);

camera.position.set(4,4,6);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;

animate();
initialized = true;
}

function animate(){
requestAnimationFrame(animate);
if(controls) controls.update();
if(renderer && scene && camera) renderer.render(scene, camera);
}

// ================= MODE =================

function setEditMode(mode){
editMode = mode;

document.getElementById("cubeEditor").classList.toggle("hidden", mode !== "cube");
document.getElementById("faceEditor").classList.toggle("hidden", mode !== "faces");
}

// ================= CLEAN RESET =================

function clearScene(){
while(scene.children.length > 0){
    scene.remove(scene.children[0]);
}
voxels = [];
mainMesh = null;
}

// ================= MATERIAL FACTORY =================

function createMaterial(color){
return new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: globalOpacity,
    depthWrite: globalOpacity === 1
});
}

// ================= VOXEL BUILD =================

function buildVoxelGrid(x,y,z){

if(x>10 || y>10 || z>10){
    alert("Voxel limit is 10-10-10.");
    return false;
}

clearScene();

let size = 2;
let dx = size/x;
let dy = size/y;
let dz = size/z;

for(let i=0;i<x;i++){
for(let j=0;j<y;j++){
for(let k=0;k<z;k++){

let geo = new THREE.BoxGeometry(dx,dy,dz);
let mat = createMaterial(0x002b1a);

let cube = new THREE.Mesh(geo, mat);

cube.position.set(
    (i - x/2) * dx + dx/2,
    (j - y/2) * dy + dy/2,
    (k - z/2) * dz + dz/2
);

scene.add(cube);
voxels.push(cube);

}}}

return true;
}

// ================= FACE BUILD =================

function buildFaceCube(){

clearScene();

let geo = new THREE.BoxGeometry(2,2,2);

let materials = [];

for(let i=0;i<6;i++){
    materials.push(createMaterial(0x002b1a));
}

mainMesh = new THREE.Mesh(geo, materials);
scene.add(mainMesh);
}

// ================= PARSER =================

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

// ================= CONVERT =================

function convert3D(){

init3D();

let format = document.getElementById("format3D").value;
let size = document.getElementById("size3D").value.split("-");
let x=parseInt(size[0]);
let y=parseInt(size[1]);
let z=parseInt(size[2]);

if(editMode==="cube"){

if(!buildVoxelGrid(x,y,z)) return;

let values=document.getElementById("inputData3D")
.value.trim().split(/\s+/);

if(format==="colorcode"){

if(values.length !== x*y*z){
alert("Need X*Y*Z values.");
return;
}

for(let i=0;i<voxels.length;i++){
voxels[i].material.color.set(values[i]);
}

}else{

if(values.length !== x*y*z*3){
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

voxels[i].material.color.setRGB(r/255,g/255,b/255);
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
mainMesh.material[i]=createMaterial(val);
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

mainMesh.material[i]=createMaterial(
new THREE.Color(r/255,g/255,b/255)
);
}
}
}
}

// ================= STRESS MODE =================

function generateStress3D(){

if(document.getElementById("modeSelect3D").value!=="stress") return;

let format=document.getElementById("format3D").value;

if(editMode==="faces"){

let faceIds=[
"faceRight","faceLeft",
"faceTop","faceBottom",
"faceFront","faceBack"
];

for(let i=0;i<6;i++){

if(format==="colorcode"){

let r=Math.floor(Math.random()*256).toString(16).padStart(2,"0");
let g=Math.floor(Math.random()*256).toString(16).padStart(2,"0");
let b=Math.floor(Math.random()*256).toString(16).padStart(2,"0");

document.getElementById(faceIds[i]).value="#"+r+g+b;

}else{

let vals=[];

for(let j=0;j<3;j++){
let val=Math.floor(Math.random()*256);

if(format==="binary") vals.push(val.toString(2).padStart(8,"0"));
if(format==="decimal") vals.push(val);
if(format==="hex") vals.push(val.toString(16).padStart(2,"0"));
if(format==="octal") vals.push(val.toString(8));
if(format==="morse"){
let bin=val.toString(2).padStart(8,"0");
vals.push(bin.replace(/1/g,"-").replace(/0/g,"."));
}
}

document.getElementById(faceIds[i]).value=vals.join(" ");
}
}

}else{

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

document.getElementById("inputData3D").value=output.join(" ");
}
}

// ================= CLEAN TRANSPARENCY =================

document.getElementById("opacitySlider")
.addEventListener("input",function(){

globalOpacity=parseFloat(this.value);

if(voxels.length>0){
voxels.forEach(v=>{
v.material.opacity=globalOpacity;
v.material.depthWrite=globalOpacity===1;
});
}

if(mainMesh){
mainMesh.material.forEach(m=>{
m.opacity=globalOpacity;
m.depthWrite=globalOpacity===1;
});
}
});