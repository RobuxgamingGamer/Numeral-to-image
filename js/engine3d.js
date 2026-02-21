/* ============================================================
   NUMERAL ENGINE — 3D CORE SYSTEM (FULL REBUILD)

   Modes:
     - Cube Mode (solid)
       Max 10-10-10

     - Faces Mode (hollow)
       Max 25-25-25

   Formats:
     - binary
     - decimal
     - hex
     - octal
     - morse
     - colorcode

   Performance:
     - Measured ONLY during convert
     - Frozen stats

   Architecture:
     - Deterministic rebuild
     - Strict state machine
     - Explicit mode switching
     - Full geometry disposal
   ============================================================ */


/* ============================================================
   DOM REFERENCES
============================================================ */

const size3DInput = document.getElementById("size3D");
const format3DSelect = document.getElementById("format3D");

const cubeModeBtn = document.getElementById("cubeModeBtn");
const facesModeBtn = document.getElementById("facesModeBtn");

const stress3DBtn = document.getElementById("stress3DBtn");
const convert3DBtn = document.getElementById("convert3DBtn");

const input3D = document.getElementById("input3D");

const faceFront = document.getElementById("faceFront");
const faceBack = document.getElementById("faceBack");
const faceLeft = document.getElementById("faceLeft");
const faceRight = document.getElementById("faceRight");
const faceTop = document.getElementById("faceTop");
const faceBottom = document.getElementById("faceBottom");

const cubeInputBlock = document.getElementById("cubeInputBlock");
const facesInputBlock = document.getElementById("facesInputBlock");

const error3D = document.getElementById("error3D");
const stats3D = document.getElementById("stats3D");

const opacitySlider = document.getElementById("opacitySlider");

const threeContainer = document.getElementById("threeContainer");


/* ============================================================
   CONSTANTS
============================================================ */

const MAX_CUBE_SOLID = 10;
const MAX_CUBE_FACES = 25;


/* ============================================================
   STATE
============================================================ */

const state3D = {
    mode: "cube",     // cube | faces
    format: "binary",
    x: 2,
    y: 2,
    z: 2
};


/* ============================================================
   THREE.JS SETUP
============================================================ */

let scene, camera, renderer, controls;
let voxelGroup = new THREE.Group();

initThree();

function initThree() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(
        75,
        threeContainer.clientWidth / threeContainer.clientHeight,
        0.1,
        1000
    );

    camera.position.set(6,6,6);

    renderer = new THREE.WebGLRenderer({ antialias:true });
    renderer.setSize(
        threeContainer.clientWidth,
        threeContainer.clientHeight
    );

    threeContainer.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5,10,7);
    scene.add(directional);

    scene.add(voxelGroup);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}


/* ============================================================
   MODE SWITCHING
============================================================ */

cubeModeBtn.addEventListener("click", () => {
    state3D.mode = "cube";
    cubeModeBtn.classList.add("active");
    facesModeBtn.classList.remove("active");
    cubeInputBlock.classList.remove("hidden");
    facesInputBlock.classList.add("hidden");
});

facesModeBtn.addEventListener("click", () => {
    state3D.mode = "faces";
    facesModeBtn.classList.add("active");
    cubeModeBtn.classList.remove("active");
    facesInputBlock.classList.remove("hidden");
    cubeInputBlock.classList.add("hidden");
});


format3DSelect.addEventListener("change", () => {
    state3D.format = format3DSelect.value;
});

opacitySlider.addEventListener("input", () => {
    voxelGroup.traverse(obj => {
        if(obj.isMesh){
            obj.material.opacity = parseFloat(opacitySlider.value);
            obj.material.transparent = true;
        }
    });
});


/* ============================================================
   SIZE PARSER
============================================================ */

function parseSize3D() {

    const raw = size3DInput.value.trim();
    const parts = raw.split("-");

    if(parts.length !== 3){
        show3DError("Size must be X-Y-Z.");
        return null;
    }

    const x = parseInt(parts[0],10);
    const y = parseInt(parts[1],10);
    const z = parseInt(parts[2],10);

    if(!Number.isInteger(x) || !Number.isInteger(y) || !Number.isInteger(z)){
        show3DError("Size must be integers.");
        return null;
    }

    if(x<=0||y<=0||z<=0){
        show3DError("Size must be positive.");
        return null;
    }

    if(state3D.mode==="cube"){
        if(x>MAX_CUBE_SOLID||y>MAX_CUBE_SOLID||z>MAX_CUBE_SOLID){
            show3DError("Cube mode max is 10-10-10.");
            return null;
        }
    }

    if(state3D.mode==="faces"){
        if(x>MAX_CUBE_FACES||y>MAX_CUBE_FACES||z>MAX_CUBE_FACES){
            show3DError("Faces mode max is 25-25-25.");
            return null;
        }
    }

    state3D.x=x;
    state3D.y=y;
    state3D.z=z;

    return {x,y,z};
}


/* ============================================================
   FORMAT PARSER
============================================================ */

function parseByte3D(token){

    const format = state3D.format;

    switch(format){

        case "binary":
            if(!/^[01]{8}$/.test(token)) return null;
            return parseInt(token,2);

        case "decimal":
            if(!/^\d+$/.test(token)) return null;
            const d=parseInt(token,10);
            return (d>=0&&d<=255)?d:null;

        case "hex":
            if(!/^[0-9a-fA-F]{1,2}$/.test(token)) return null;
            return parseInt(token,16);

        case "octal":
            if(!/^[0-7]{1,3}$/.test(token)) return null;
            return parseInt(token,8);

        case "morse":
            if(!/^[\.\-]{8}$/.test(token)) return null;
            const bin=token.replace(/-/g,"1").replace(/\./g,"0");
            return parseInt(bin,2);

        default:
            return null;
    }
}


/* ============================================================
   GEOMETRY CLEANUP
============================================================ */

function clearScene(){

    while(voxelGroup.children.length>0){
        const obj = voxelGroup.children[0];
        obj.geometry.dispose();
        obj.material.dispose();
        voxelGroup.remove(obj);
    }
}


/* ============================================================
   VOXEL CREATION
============================================================ */

function createVoxel(px,py,pz,color){

    const geometry = new THREE.BoxGeometry(1,1,1);

    const material = new THREE.MeshStandardMaterial({
        color: color,
        transparent:true,
        opacity: parseFloat(opacitySlider.value)
    });

    const cube = new THREE.Mesh(geometry,material);

    cube.position.set(
        px - state3D.x/2 + 0.5,
        py - state3D.y/2 + 0.5,
        pz - state3D.z/2 + 0.5
    );

    voxelGroup.add(cube);
}


/* ============================================================
   STRESS MODE
============================================================ */

stress3DBtn.addEventListener("click", () => {

    clear3DError();
    clear3DStats();

    const size = parseSize3D();
    if(!size) return;

    const {x,y,z} = size;
    const total = x*y*z;
    const format = state3D.format;

    let output=[];

    for(let i=0;i<total;i++){

        if(format==="colorcode"){

            const r=randomByte();
            const g=randomByte();
            const b=randomByte();

            output.push(
                "#"+
                r.toString(16).padStart(2,"0")+
                g.toString(16).padStart(2,"0")+
                b.toString(16).padStart(2,"0")
            );

        }else{

            for(let c=0;c<3;c++){
                const val=randomByte();
                output.push(val.toString());
            }
        }
    }

    input3D.value=output.join(" ");
});


/* ============================================================
   CONVERT
============================================================ */

convert3DBtn.addEventListener("click", convert3D);

function convert3D(){

    clear3DError();
    clear3DStats();

    const start=performance.now();

    const size=parseSize3D();
    if(!size) return;

    clearScene();

    const {x,y,z}=size;
    const format=state3D.format;

    if(state3D.mode==="cube"){

        const tokens=input3D.value.trim().split(/\s+/);

        const expected=(format==="colorcode")
            ? x*y*z
            : x*y*z*3;

        if(tokens.length!==expected){
            show3DError("Incorrect number of values.");
            return;
        }

        let t=0;

        for(let i=0;i<x;i++){
            for(let j=0;j<y;j++){
                for(let k=0;k<z;k++){

                    let r,g,b;

                    if(format==="colorcode"){

                        const hex=tokens[t++].replace("#","");
                        r=parseInt(hex.substring(0,2),16);
                        g=parseInt(hex.substring(2,4),16);
                        b=parseInt(hex.substring(4,6),16);

                    }else{

                        r=parseByte3D(tokens[t++]);
                        g=parseByte3D(tokens[t++]);
                        b=parseByte3D(tokens[t++]);

                        if(r===null||g===null||b===null){
                            show3DError("Invalid value.");
                            return;
                        }
                    }

                    const color=new THREE.Color(
                        r/255,g/255,b/255
                    );

                    createVoxel(i,j,k,color);
                }
            }
        }
    }

    const end=performance.now();
    const time=end-start;
    const fps=1000/time;

    stats3D.textContent=
        "Render Time: "+
        time.toFixed(2)+" ms | FPS: "+
        fps.toFixed(2);
}


/* ============================================================
   UTILITIES
============================================================ */

function randomByte(){
    return Math.floor(Math.random()*256);
}

function show3DError(msg){
    error3D.textContent=msg;
}

function clear3DError(){
    error3D.textContent="";
}

function clear3DStats(){
    stats3D.textContent="";
}