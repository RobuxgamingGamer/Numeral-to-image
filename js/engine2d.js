const canvas=document.getElementById("canvas2D");
const ctx=canvas.getContext("2d");
const stats2D=document.getElementById("stats2D");

function generate2D(){
let size=document.getElementById("size2D").value.split("-");
let w=parseInt(size[0]);
let h=parseInt(size[1]);
let total=w*h;

let mode=document.getElementById("mode2DSelect").value;

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

document.getElementById("input2D").value=data.join(" ");
}

function convert2D(){

let start=performance.now();

let size=document.getElementById("size2D").value.split("-");
let w=parseInt(size[0]);
let h=parseInt(size[1]);

canvas.width=w;
canvas.height=h;

let img=ctx.createImageData(w,h);
let values=document.getElementById("input2D")
.value.trim().split(/\s+/);

for(let i=0;i<w*h;i++){
img.data[i*4]=parseInt(values[i*3]);
img.data[i*4+1]=parseInt(values[i*3+1]);
img.data[i*4+2]=parseInt(values[i*3+2]);
img.data[i*4+3]=255;
}

ctx.putImageData(img,0,0);
canvas.style.width="350px";
canvas.style.height="350px";

let ms=(performance.now()-start).toFixed(2);
let fps=(1000/ms).toFixed(1);

stats2D.textContent="Render: "+ms+" ms | FPS: "+fps;
}