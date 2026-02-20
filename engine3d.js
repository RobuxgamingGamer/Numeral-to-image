const canvas3D=document.getElementById("canvas3D");
const gl=canvas3D.getContext("webgl2");

if(gl){

canvas3D.width=canvas3D.clientWidth;
canvas3D.height=canvas3D.clientHeight;

gl.viewport(0,0,canvas3D.width,canvas3D.height);
gl.enable(gl.DEPTH_TEST);

function compile(type,src){
let s=gl.createShader(type);
gl.shaderSource(s,src);
gl.compileShader(s);
return s;
}

const vs=compile(gl.VERTEX_SHADER,vertexShaderSource);
const fs=compile(gl.FRAGMENT_SHADER,fragmentShaderSource);

const program=gl.createProgram();
gl.attachShader(program,vs);
gl.attachShader(program,fs);
gl.linkProgram(program);
gl.useProgram(program);

const cube=new Float32Array([
-1,-1,-1, 1,-1,-1, 1,1,-1,
-1,-1,-1, 1,1,-1, -1,1,-1
]);

const buf=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buf);
gl.bufferData(gl.ARRAY_BUFFER,cube,gl.STATIC_DRAW);

const loc=gl.getAttribLocation(program,"aPos");
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc,3,gl.FLOAT,false,0,0);

const projLoc=gl.getUniformLocation(program,"uProj");
const viewLoc=gl.getUniformLocation(program,"uView");

function perspective(fov,aspect,near,far){
let f=1/Math.tan(fov/2);
return new Float32Array([
f/aspect,0,0,0,
0,f,0,0,
0,0,(far+near)/(near-far),-1,
0,0,(2*far*near)/(near-far),0
]);
}

let angle=0;

function render(){
gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

let proj=perspective(Math.PI/4,canvas3D.width/canvas3D.height,0.1,100);
gl.uniformMatrix4fv(projLoc,false,proj);

let view=new Float32Array([
Math.cos(angle),0,Math.sin(angle),0,
0,1,0,0,
-Math.sin(angle),0,Math.cos(angle),0,
0,0,-6,1
]);
gl.uniformMatrix4fv(viewLoc,false,view);

gl.drawArrays(gl.TRIANGLES,0,6);
angle+=0.01;

requestAnimationFrame(render);
}
render();
}