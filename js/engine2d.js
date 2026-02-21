const canvas2D = document.getElementById("canvas2D");
const ctx = canvas2D.getContext("2d");

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

function generateStress(){

if(document.getElementById("modeSelect").value!=="stress") return;

let size=document.getElementById("size").value.split("-");
let w=parseInt(size[0]);
let h=parseInt(size[1]);
let format=document.getElementById("format").value;

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
if(format==="hex") output+=val.toString(16).padStart(2,"0")+" ";
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

function renderImage(){

let size=document.getElementById("size").value.split("-");
let w=parseInt(size[0]);
let h=parseInt(size[1]);
let format=document.getElementById("format").value;

canvas2D.width=w;
canvas2D.height=h;

let imgData=ctx.createImageData(w,h);
let values=document.getElementById("inputData").value.trim().split(/\s+/);

if(format==="colorcode"){

if(values.length!==w*h) return;

for(let i=0;i<w*h;i++){
let hex=values[i].replace("#","");
let r=parseInt(hex.substring(0,2),16);
let g=parseInt(hex.substring(2,4),16);
let b=parseInt(hex.substring(4,6),16);

imgData.data[i*4]=r;
imgData.data[i*4+1]=g;
imgData.data[i*4+2]=b;
imgData.data[i*4+3]=255;
}

}else{

if(values.length!==w*h*3) return;

for(let i=0;i<w*h;i++){

let r=parseValue(values[i*3],format);
let g=parseValue(values[i*3+1],format);
let b=parseValue(values[i*3+2],format);

if(r===null||g===null||b===null) return;

imgData.data[i*4]=r;
imgData.data[i*4+1]=g;
imgData.data[i*4+2]=b;
imgData.data[i*4+3]=255;
}
}

ctx.putImageData(imgData,0,0);
canvas2D.style.width="300px";
canvas2D.style.height="300px";
}