const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl2");

let alpha = 1.0;
let glossy = false;

let rotationX = 0;
let rotationY = 0;
let zoom = 5;

function resize(){
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
gl.viewport(0,0,canvas.width,canvas.height);
}
window.addEventListener("resize",resize);
resize();

function createShader(type,source){
const shader = gl.createShader(type);
gl.shaderSource(shader,source);
gl.compileShader(shader);
return shader;
}

const vs = createShader(gl.VERTEX_SHADER, vertexShaderSource);
const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = gl.createProgram();
gl.attachShader(program,vs);
gl.attachShader(program,fs);
gl.linkProgram(program);

gl.useProgram(program);

const cubeVertices = new Float32Array([
-1,-1,-1, 1,-1,-1, 1,1,-1,
-1,-1,-1, 1,1,-1, -1,1,-1
]);

const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, cubeVertices, gl.STATIC_DRAW);

const posLoc = gl.getAttribLocation(program,"aPosition");
gl.enableVertexAttribArray(posLoc);
gl.vertexAttribPointer(posLoc,3,gl.FLOAT,false,0,0);

const uProjection = gl.getUniformLocation(program,"uProjection");
const uView = gl.getUniformLocation(program,"uView");
const uModel = gl.getUniformLocation(program,"uModel");
const uAlpha = gl.getUniformLocation(program,"uAlpha");
const uGlossy = gl.getUniformLocation(program,"uGlossy");

function perspective(fov,aspect,near,far){
const f = 1.0/Math.tan(fov/2);
return new Float32Array([
f/aspect,0,0,0,
0,f,0,0,
0,0,(far+near)/(near-far),-1,
0,0,(2*far*near)/(near-far),0
]);
}

function render(){
gl.enable(gl.DEPTH_TEST);
gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

const projection = perspective(Math.PI/4, canvas.width/canvas.height, 0.1,100);
gl.uniformMatrix4fv(uProjection,false,projection);

const view = new Float32Array([
1,0,0,0,
0,1,0,0,
0,0,1,0,
0,0,-zoom,1
]);
gl.uniformMatrix4fv(uView,false,view);

const model = new Float32Array([
Math.cos(rotationY),0,Math.sin(rotationY),0,
0,1,0,0,
-Math.sin(rotationY),0,Math.cos(rotationY),0,
0,0,0,1
]);
gl.uniformMatrix4fv(uModel,false,model);

gl.uniform1f(uAlpha,alpha);
gl.uniform1i(uGlossy,glossy);

gl.drawArrays(gl.TRIANGLES,0,6);

requestAnimationFrame(render);
}

render();

canvas.addEventListener("mousemove",(e)=>{
if(e.buttons===1){
rotationY += e.movementX * 0.01;
rotationX += e.movementY * 0.01;
}
});

canvas.addEventListener("wheel",(e)=>{
zoom += e.deltaY * 0.01;
if(zoom<2) zoom=2;
if(zoom>20) zoom=20;
});

document.getElementById("alphaSlider").addEventListener("input",(e)=>{
alpha = parseFloat(e.target.value);
});

document.getElementById("glossyToggle").addEventListener("change",(e)=>{
glossy = e.target.checked;
});

document.getElementById("advancedToggle").addEventListener("click",()=>{
const panel = document.getElementById("advancedPanel");
panel.classList.toggle("collapsed");
});