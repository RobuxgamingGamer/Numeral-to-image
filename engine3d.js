// =======================
// REAL 3D VOXEL ENGINE
// =======================

const canvas3D = document.getElementById("canvas3D");
const gl = canvas3D.getContext("webgl2");

if(!gl){
alert("WebGL2 not supported.");
}

// ---------- Resize ----------
function resize(){
canvas3D.width = canvas3D.clientWidth;
canvas3D.height = canvas3D.clientHeight;
gl.viewport(0,0,canvas3D.width,canvas3D.height);
}
window.addEventListener("resize", resize);
resize();

gl.enable(gl.DEPTH_TEST);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

// ---------- Compile ----------
function compile(type, source){
let shader = gl.createShader(type);
gl.shaderSource(shader, source);
gl.compileShader(shader);
return shader;
}

const vs = compile(gl.VERTEX_SHADER, vertexShaderSource);
const fs = compile(gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
gl.useProgram(program);

// ---------- Cube Geometry ----------
function createCube(x,y,z,size,color){

let s = size/2;

let positions = [
x-s,y-s,z-s,  x+s,y-s,z-s,  x+s,y+s,z-s,  x-s,y+s,z-s,
x-s,y-s,z+s,  x+s,y-s,z+s,  x+s,y+s,z+s,  x-s,y+s,z+s
];

let indices = [
0,1,2, 0,2,3,
4,5,6, 4,6,7,
0,1,5, 0,5,4,
2,3,7, 2,7,6,
0,3,7, 0,7,4,
1,2,6, 1,6,5
];

let normals = [
0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
0,0,1, 0,0,1, 0,0,1, 0,0,1
];

let colors = [];
for(let i=0;i<8;i++){
colors.push(color[0],color[1],color[2]);
}

return {positions, indices, normals, colors};
}

// ---------- Simple Voxel Grid ----------
let voxels = [];

function generateVoxelGrid(){

voxels = [];

let size = 10;

for(let x=-2;x<=2;x++){
for(let y=-2;y<=2;y++){
for(let z=-2;z<=2;z++){

let color = [
Math.random(),
Math.random(),
Math.random()
];

voxels.push(createCube(x,y,z,0.9,color));

}
}
}
}

generateVoxelGrid();

// ---------- Camera ----------
let angleX = 0;
let angleY = 0;
let zoom = -20;

canvas3D.addEventListener("mousemove", e=>{
if(e.buttons===1){
angleY += e.movementX * 0.01;
angleX += e.movementY * 0.01;
}
});

canvas3D.addEventListener("wheel", e=>{
zoom += e.deltaY * 0.01;
});

// ---------- Matrices ----------
function perspective(fov, aspect, near, far){
let f = 1/Math.tan(fov/2);
return new Float32Array([
f/aspect,0,0,0,
0,f,0,0,
0,0,(far+near)/(near-far),-1,
0,0,(2*far*near)/(near-far),0
]);
}

function identity(){
return new Float32Array([
1,0,0,0,
0,1,0,0,
0,0,1,0,
0,0,0,1
]);
}

function translate(m,z){
m[14] = z;
return m;
}

// ---------- Render ----------
function render(){

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

let projection = perspective(Math.PI/4, canvas3D.width/canvas3D.height, 0.1, 100);
let view = identity();
view[14] = zoom;

let model = identity();

gl.uniformMatrix4fv(gl.getUniformLocation(program,"uProjection"), false, projection);
gl.uniformMatrix4fv(gl.getUniformLocation(program,"uView"), false, view);
gl.uniformMatrix4fv(gl.getUniformLocation(program,"uModel"), false, model);

gl.uniform3f(gl.getUniformLocation(program,"uLightPos"), 5,5,5);
gl.uniform1f(gl.getUniformLocation(program,"uTransparency"), 0.9);
gl.uniform1i(gl.getUniformLocation(program,"uGlossy"), 1);

voxels.forEach(v=>{

let posBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,posBuffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(v.positions),gl.STATIC_DRAW);

let loc = gl.getAttribLocation(program,"aPosition");
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc,3,gl.FLOAT,false,0,0);

gl.drawArrays(gl.TRIANGLES,0,36);

});

requestAnimationFrame(render);
}

render();