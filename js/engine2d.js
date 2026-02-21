function generateStress(){

if(document.getElementById("modeSelect").value!=="stress") return;

let size=document.getElementById("size").value.split("-");
let w=parseInt(size[0]);
let h=parseInt(size[1]);
let format=document.getElementById("format").value;

if(!w||!h) return;

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

if(format==="binary")
output+=val.toString(2).padStart(8,"0")+" ";

if(format==="decimal")
output+=val+" ";

if(format==="hex")
output+=val.toString(16).padStart(2,"0")+" ";

if(format==="octal")
output+=val.toString(8)+" ";

if(format==="morse"){
let bin=val.toString(2).padStart(8,"0");
output+=bin.replace(/1/g,"-").replace(/0/g,".")+" ";
}

}

}

}

document.getElementById("inputData").value=output.trim();
}