const canvas=document.getElementById("canvas2D");
const ctx=canvas.getContext("2d");
const stats=document.getElementById("stats2D");

function renderImage(){

let start=performance.now();

let size=document.getElementById("size").value.split("-");
let w=parseInt(size[0]);
let h=parseInt(size[1]);

canvas.width=w;
canvas.height=h;

let imgData=ctx.createImageData(w,h);
let values=document.getElementById("inputData")
.value.trim().split(/\s+/);

let format=document.getElementById("format").value;

for(let i=0;i<w*h;i++){

let r,g,b;

if(format==="colorcode"){
let hex=values[i].replace("#","");
r=parseInt(hex.substring(0,2),16);
g=parseInt(hex.substring(2,4),16);
b=parseInt(hex.substring(4,6),16);
}else{
r=parseInt(values[i*3]);
g=parseInt(values[i*3+1]);
b=parseInt(values[i*3+2]);
}

imgData.data[i*4]=r;
imgData.data[i*4+1]=g;
imgData.data[i*4+2]=b;
imgData.data[i*4+3]=255;
}

ctx.putImageData(imgData,0,0);

canvas.style.width="350px";
canvas.style.height="350px";

let end=performance.now();
let ms=(end-start).toFixed(2);
let fps=(1000/ms).toFixed(1);

stats.textContent="Render: "+ms+" ms | FPS: "+fps;
}