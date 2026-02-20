let canvas2D;
let ctx;

window.addEventListener("DOMContentLoaded", () => {
canvas2D = document.getElementById("canvas2D");
ctx = canvas2D.getContext("2d");
});

function parseValue(value, format){
if(format==="binary"){ if(!/^[01]{8}$/.test(value)) return null; return parseInt(value,2); }
if(format==="decimal"){ let n=parseInt(value,10); return (n>=0&&n<=255)?n:null; }
if(format==="hex"){ if(!/^[0-9a-fA-F]{1,2}$/.test(value)) return null; return parseInt(value,16); }
if(format==="octal"){ if(!/^[0-7]{1,3}$/.test(value)) return null; let n=parseInt(value,8); return (n<=255)?n:null; }
if(format==="morse"){ if(!/^[\.\-]{8}$/.test(value)) return null; let b=value.replace(/-/g,"1").replace(/\./g,"0"); return parseInt(b,2); }
return null;
}

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

if(w>=500||h>=500){
document.getElementById("warning").textContent="⚠ High resolution may consume significant memory.";
}

let total=w*h;

canvas2D.width=w;
canvas2D.height=h;

let imgData=ctx.createImageData(w,h);
let values=document.getElementById("inputData").value.trim().split(/\s+/);

if(format==="colorcode"){
if(values.length!==total){ document.getElementById("error").textContent="Incorrect number of color codes."; return; }
}else{
if(values.length!==total*3){ document.getElementById("error").textContent="Incorrect number of values."; return; }
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
if(r===null||g===null||b===null){
document.getElementById("error").textContent="Invalid value detected.";
return;
}
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

let renderTime=(performance.now()-startTime);
let fps = renderTime>0?(1000/renderTime).toFixed(2):"Max";

document.getElementById("stats").textContent=
"Pixels: "+total.toLocaleString()+
" | Render Time: "+renderTime.toFixed(2)+" ms"+
" | FPS: "+fps;
}

function downloadPNG(){
let link=document.createElement("a");
link.download="rgb-image.png";
link.href=canvas2D.toDataURL("image/png");
link.click();
}