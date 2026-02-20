// ===== 2D ENGINE =====

const canvas2D = document.getElementById("canvas2D");
const ctx = canvas2D.getContext("2d");

function resize2D(){
canvas2D.width = canvas2D.clientWidth;
canvas2D.height = canvas2D.clientHeight;
}
window.addEventListener("resize", resize2D);
resize2D();

// ================= PARSER =================

function parseValue(value, format){

if(format==="binary"){
if(!/^[01]{8}$/.test(value)) return null;
return parseInt(value,2);
}

if(format==="decimal"){
let n=parseInt(value,10);
return (n>=0 && n<=255)?n:null;
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

// ================= STRESS MODE =================

function generateStress(){

if(document.getElementById("modeSelect").value!=="stress") return;

let size=document.getElementById("size").value.split("-");
let w=parseInt(size[0]);
let h=parseInt(size[1]);
let format=document.getElementById("format").value;

if(!w||!h||w<1||h<1||w>1500||h>1500){
document.getElementById("error").textContent="Invalid size.";
return;
}

let total=w*h;
let output="";

for(let i=0;i<total;i++){

if(format==="colorcode"){
let r=Math.floor(Math.random()*256).toString(16).padStart(2,"0");
let g=Math.floor(Math.random()*256).toString(16).padStart(2,"0");
let b=Math.floor(Math.random()*256).toString(16).padStart(2,"0");
output+="#"+r+g+b+" ";
}else{
for(let j=0;j<3;j++){
let val=Math.floor(Math.random()*256);

if(format==="binary") output+=val.toString(2).padStart(8,"0")+" ";
if(format==="decimal") output+=val+" ";
if(format==="hex") output+=val.toString(16).toUpperCase()+" ";
if(format==="octal") output+=val.toString(8)+" ";
if(format==="morse"){
let bin=val.toString(2).padStart(8,"0");
output+=bin.replace(/1/g,"-").replace(/0/g,".")+" ";
}
}
}
}

document.getElementById("inputData").value=output.trim();
}

// ================= RENDER =================

function renderImage(){

let startTime = performance.now();

document.getElementById("error").textContent="";
document.getElementById("warning").textContent="";
document.getElementById("stats").textContent="";

let size=document.getElementById("size").value.split("-");
let w=parseInt(size[0]);
let h=parseInt(size[1]);
let format=document.getElementById("format").value;

if(!w||!h||w<1||h<1||w>1500||h>1500){
document.getElementById("error").textContent="Invalid size.";
return;
}

if(w>=500 || h>=500){
document.getElementById("warning").textContent="⚠ High resolution may consume significant memory.";
}

let total=w*h;

canvas2D.width=w;
canvas2D.height=h;

let imgData=ctx.createImageData(w,h);
let values=document.getElementById("inputData").value.trim().split(/\s+/);

if(format==="colorcode"){
if(values.length!==total){
document.getElementById("error").textContent="Incorrect number of color codes.";
return;
}
}else{
if(values.length!==total*3){
document.getElementById("error").textContent="Incorrect number of values.";
return;
}
}

for(let i=0;i<total;i++){

let r,g,b;

if(format==="colorcode"){
let hex=values[i].replace("#","");
r=parseInt(hex.substring(0,2),16);
g=parseInt(hex.substring(2,4),16);
b=parseInt(hex.substring(4,6),16);
}else{
r=parseValue(values[i*3],format);
g=parseValue(values[i*3+1],format);
b=parseValue(values[i*3+2],format);
}

imgData.data[i*4]=r;
imgData.data[i*4+1]=g;
imgData.data[i*4+2]=b;
imgData.data[i*4+3]=255;
}

ctx.putImageData(imgData,0,0);

let scale=300/w;
canvas2D.style.width=(w*scale)+"px";
canvas2D.style.height=(h*scale)+"px";

let endTime = performance.now();
let renderTime = (endTime - startTime).toFixed(2);

document.getElementById("stats").textContent =
"Pixels: " + total.toLocaleString() +
" | Render Time: " + renderTime + " ms";
}

// ================= PNG DOWNLOAD =================

function downloadPNG(){
let link=document.createElement("a");
link.download="rgb-image.png";
link.href=canvas2D.toDataURL("image/png");
link.click();
}