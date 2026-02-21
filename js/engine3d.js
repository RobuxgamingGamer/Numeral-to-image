/* ==========================================================
   NUMERAL VOXEL ENGINE — 3D SYSTEM
   PART 1/3
   Core + Cube Mode
========================================================== */


/* ============================
   DOM REFERENCES
============================ */

const size3DInput = document.getElementById("size3D");
const format3DSelect = document.getElementById("format3D");

const cubeModeBtn = document.getElementById("cubeModeBtn");
const facesModeBtn = document.getElementById("facesModeBtn");

const stress3DBtn = document.getElementById("stress3DBtn");
const convert3DBtn = document.getElementById("convert3DBtn");

const input3D = document.getElementById("input3D");

const cubeInputBlock = document.getElementById("cubeInputBlock");
const facesInputBlock = document.getElementById("facesInputBlock");

const error3D = document.getElementById("error3D");
const stats3D = document.getElementById("stats3D");

const opacitySlider = document.getElementById("opacitySlider");
const threeContainer = document.getElementById("threeContainer");


/* ============================
   CONSTANTS
============================ */

const MAX_SOLID = 10;


/* ============================
   STATE
============================ */

const state3D = {
    mode: "cube",
    format: "binary",
    size: { x:2, y:2, z:2 }
};


/* ============================
   THREE SETUP
============================ */

let scene, camera, renderer, controls;
let voxelGroup = new THREE.Group();

init3D();

function init3D(){

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(
        70,
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

    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 0.7);
    light.position.set(5,10,7);
    scene.add(light);

    scene.add(voxelGroup);

    animate();
}

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}


/* ============================
   MODE SWITCHING
============================ */

cubeModeBtn.onclick = () => {
    state3D.mode = "cube";
    cubeModeBtn.classList.add("active");
    facesModeBtn.classList.remove("active");
    cubeInputBlock.classList.remove("hidden");
    facesInputBlock.classList.add("hidden");
};

facesModeBtn.onclick = () => {
    state3D.mode = "faces";
    facesModeBtn.classList.add("active");
    cubeModeBtn.classList.remove("active");
    facesInputBlock.classList.remove("hidden");
    cubeInputBlock.classList.add("hidden");
};

format3DSelect.onchange = () => {
    state3D.format = format3DSelect.value;
};


/* ============================
   SIZE PARSER
============================ */

function parseSize(){

    const raw = size3DInput.value.trim();
    const parts = raw.split("-");

    if(parts.length !== 3){
        return showError("Size must be X-Y-Z.");
    }

    const x = parseInt(parts[0]);
    const y = parseInt(parts[1]);
    const z = parseInt(parts[2]);

    if(!x || !y || !z){
        return showError("Invalid size.");
    }

    if(x>MAX_SOLID || y>MAX_SOLID || z>MAX_SOLID){
        return showError("Cube mode max 10-10-10.");
    }

    state3D.size = { x,y,z };
    return true;
}


/* ============================
   FORMAT PARSER
============================ */

function parseByte(token){

    switch(state3D.format){

        case "binary":
            if(!/^[01]{8}$/.test(token)) return null;
            return parseInt(token,2);

        case "decimal":
            if(!/^\d+$/.test(token)) return null;
            return parseInt(token,10);

        case "hex":
            if(!/^[0-9a-fA-F]{1,2}$/.test(token)) return null;
            return parseInt(token,16);

        case "octal":
            if(!/^[0-7]{1,3}$/.test(token)) return null;
            return parseInt(token,8);

        case "morse":
            if(!/^[\.\-]{8}$/.test(token)) return null;
            const bin = token.replace(/-/g,"1").replace(/\./g,"0");
            return parseInt(bin,2);

        default:
            return null;
    }
}


/* ============================
   SCENE MANAGEMENT
============================ */

function clearScene(){

    while(voxelGroup.children.length){
        const obj = voxelGroup.children[0];
        obj.geometry.dispose();
        obj.material.dispose();
        voxelGroup.remove(obj);
    }
}

function createVoxel(x,y,z,color){

    const geometry = new THREE.BoxGeometry(1,1,1);

    const material = new THREE.MeshStandardMaterial({
        color: color,
        transparent:true,
        opacity: parseFloat(opacitySlider.value)
    });

    const cube = new THREE.Mesh(geometry,material);

    cube.position.set(
        x - state3D.size.x/2 + 0.5,
        y - state3D.size.y/2 + 0.5,
        z - state3D.size.z/2 + 0.5
    );

    voxelGroup.add(cube);
}


/* ============================
   CONVERT (CUBE MODE)
============================ */

convert3DBtn.onclick = () => {

    clearError();
    clearStats();

    if(state3D.mode !== "cube"){
        return; // Faces handled in Part 2
    }

    if(!parseSize()) return;

    const {x,y,z} = state3D.size;

    const tokens = input3D.value.trim().split(/\s+/);

    const expected = (state3D.format==="colorcode")
        ? x*y*z
        : x*y*z*3;

    if(tokens.length !== expected){
        return showError("Incorrect number of values.");
    }

    const start = performance.now();
    clearScene();

    let t=0;

    for(let i=0;i<x;i++){
        for(let j=0;j<y;j++){
            for(let k=0;k<z;k++){

                let r,g,b;

                if(state3D.format==="colorcode"){

                    const hex = tokens[t++].replace("#","");
                    r = parseInt(hex.substring(0,2),16);
                    g = parseInt(hex.substring(2,4),16);
                    b = parseInt(hex.substring(4,6),16);

                }else{

                    r = parseByte(tokens[t++]);
                    g = parseByte(tokens[t++]);
                    b = parseByte(tokens[t++]);

                    if(r===null||g===null||b===null){
                        return showError("Invalid value.");
                    }
                }

                createVoxel(i,j,k,new THREE.Color(r/255,g/255,b/255));
            }
        }
    }

    const end = performance.now();
    const time = end-start;
    const fps = 1000/time;

    stats3D.textContent =
        "Render Time: " + time.toFixed(2) +
        " ms | FPS: " + fps.toFixed(2);
};


/* ============================
   TRANSPARENCY
============================ */

opacitySlider.oninput = () => {

    voxelGroup.traverse(obj=>{
        if(obj.isMesh){
            obj.material.opacity = parseFloat(opacitySlider.value);
        }
    });
};


/* ============================
   ERROR + STATS
============================ */

function showError(msg){
    error3D.textContent = msg;
}

function clearError(){
    error3D.textContent = "";
}

function clearStats(){
    stats3D.textContent = "";
}
/* ==========================================================
   PART 2/3 — FACES MODE (HOLLOW CUBE)
========================================================== */

const MAX_FACES = 25;

const faceFront  = document.getElementById("faceFront");
const faceBack   = document.getElementById("faceBack");
const faceLeft   = document.getElementById("faceLeft");
const faceRight  = document.getElementById("faceRight");
const faceTop    = document.getElementById("faceTop");
const faceBottom = document.getElementById("faceBottom");


/* ============================
   EXTENDED SIZE PARSER
============================ */

function parseSizeFaces(){

    const raw = size3DInput.value.trim();
    const parts = raw.split("-");

    if(parts.length !== 3){
        return showError("Size must be X-Y-Z.");
    }

    const x = parseInt(parts[0]);
    const y = parseInt(parts[1]);
    const z = parseInt(parts[2]);

    if(!x || !y || !z){
        return showError("Invalid size.");
    }

    if(x>MAX_FACES || y>MAX_FACES || z>MAX_FACES){
        return showError("Faces mode max 25-25-25.");
    }

    state3D.size = { x,y,z };
    return true;
}


/* ============================
   FACE TOKEN PARSER
============================ */

function parseFaceTokens(text, expectedCount){

    const tokens = text.trim().split(/\s+/);

    if(tokens.length !== expectedCount){
        return null;
    }

    return tokens;
}


/* ============================
   FACE COLOR PARSER
============================ */

function parseColorFromTokens(tokens, index){

    if(state3D.format === "colorcode"){

        const hex = tokens[index].replace("#","");
        return new THREE.Color(
            parseInt(hex.substring(0,2),16)/255,
            parseInt(hex.substring(2,4),16)/255,
            parseInt(hex.substring(4,6),16)/255
        );

    }else{

        const r = parseByte(tokens[index]);
        const g = parseByte(tokens[index+1]);
        const b = parseByte(tokens[index+2]);

        if(r===null || g===null || b===null){
            return null;
        }

        return new THREE.Color(r/255,g/255,b/255);
    }
}


/* ============================
   FACES MODE CONVERT EXTENSION
============================ */

const originalConvert = convert3DBtn.onclick;

convert3DBtn.onclick = () => {

    if(state3D.mode === "cube"){
        originalConvert();
        return;
    }

    clearError();
    clearStats();

    if(!parseSizeFaces()) return;

    const {x,y,z} = state3D.size;

    clearScene();

    const start = performance.now();

    const frontCount  = x*y;
    const backCount   = x*y;
    const leftCount   = z*y;
    const rightCount  = z*y;
    const topCount    = x*z;
    const bottomCount = x*z;

    const multiplier = (state3D.format==="colorcode") ? 1 : 3;

    const frontTokens  = parseFaceTokens(faceFront.value,  frontCount*multiplier);
    const backTokens   = parseFaceTokens(faceBack.value,   backCount*multiplier);
    const leftTokens   = parseFaceTokens(faceLeft.value,   leftCount*multiplier);
    const rightTokens  = parseFaceTokens(faceRight.value,  rightCount*multiplier);
    const topTokens    = parseFaceTokens(faceTop.value,    topCount*multiplier);
    const bottomTokens = parseFaceTokens(faceBottom.value, bottomCount*multiplier);

    if(!frontTokens || !backTokens || !leftTokens ||
       !rightTokens || !topTokens || !bottomTokens){
        return showError("Incorrect face input count.");
    }

    /* ================= FRONT ================= */
    let t=0;
    for(let i=0;i<x;i++){
        for(let j=0;j<y;j++){

            const index = t;
            const color = parseColorFromTokens(frontTokens, index);
            if(!color) return showError("Invalid value.");

            createVoxel(i,j,z-1,color);
            t += multiplier;
        }
    }

    /* ================= BACK ================= */
    t=0;
    for(let i=0;i<x;i++){
        for(let j=0;j<y;j++){

            const index = t;
            const color = parseColorFromTokens(backTokens, index);
            if(!color) return showError("Invalid value.");

            createVoxel(i,j,0,color);
            t += multiplier;
        }
    }

    /* ================= LEFT ================= */
    t=0;
    for(let k=0;k<z;k++){
        for(let j=0;j<y;j++){

            const index = t;
            const color = parseColorFromTokens(leftTokens, index);
            if(!color) return showError("Invalid value.");

            createVoxel(0,j,k,color);
            t += multiplier;
        }
    }

    /* ================= RIGHT ================= */
    t=0;
    for(let k=0;k<z;k++){
        for(let j=0;j<y;j++){

            const index = t;
            const color = parseColorFromTokens(rightTokens, index);
            if(!color) return showError("Invalid value.");

            createVoxel(x-1,j,k,color);
            t += multiplier;
        }
    }

    /* ================= TOP ================= */
    t=0;
    for(let i=0;i<x;i++){
        for(let k=0;k<z;k++){

            const index = t;
            const color = parseColorFromTokens(topTokens, index);
            if(!color) return showError("Invalid value.");

            createVoxel(i,y-1,k,color);
            t += multiplier;
        }
    }

    /* ================= BOTTOM ================= */
    t=0;
    for(let i=0;i<x;i++){
        for(let k=0;k<z;k++){

            const index = t;
            const color = parseColorFromTokens(bottomTokens, index);
            if(!color) return showError("Invalid value.");

            createVoxel(i,0,k,color);
            t += multiplier;
        }
    }

    const end = performance.now();
    const time = end-start;
    const fps = 1000/time;

    stats3D.textContent =
        "Render Time: " + time.toFixed(2) +
        " ms | FPS: " + fps.toFixed(2);
};
/* ==========================================================
   PART 3/3 — UNIVERSAL STRESS GENERATOR
   Works for Cube + Faces
   Works for ALL formats
========================================================== */


/* ============================
   RANDOM BYTE
============================ */

function randomByte(){
    return Math.floor(Math.random()*256);
}


/* ============================
   FORMAT ENCODER
============================ */

function encodeValue(byte){

    switch(state3D.format){

        case "binary":
            return byte.toString(2).padStart(8,"0");

        case "decimal":
            return byte.toString(10);

        case "hex":
            return byte.toString(16).toUpperCase();

        case "octal":
            return byte.toString(8);

        case "morse":
            const bin = byte.toString(2).padStart(8,"0");
            return bin.replace(/1/g,"-").replace(/0/g,".");

        case "colorcode":
            return null;

        default:
            return null;
    }
}


/* ============================
   GENERATE COLORCODE
============================ */

function generateColorCode(){

    const r = randomByte().toString(16).padStart(2,"0");
    const g = randomByte().toString(16).padStart(2,"0");
    const b = randomByte().toString(16).padStart(2,"0");

    return "#" + r + g + b;
}


/* ============================
   GENERATE TOKEN BLOCK
============================ */

function generateTokenBlock(pixelCount){

    const tokens = [];
    const multiplier = (state3D.format==="colorcode") ? 1 : 3;

    for(let i=0;i<pixelCount;i++){

        if(state3D.format==="colorcode"){

            tokens.push(generateColorCode());

        }else{

            for(let c=0;c<3;c++){
                const byte = randomByte();
                tokens.push(encodeValue(byte));
            }
        }
    }

    return tokens.join(" ");
}


/* ============================
   STRESS BUTTON LOGIC
============================ */

stress3DBtn.onclick = () => {

    clearError();
    clearStats();

    if(state3D.mode === "cube"){

        if(!parseSize()) return;

        const {x,y,z} = state3D.size;
        const totalPixels = x*y*z;

        input3D.value = generateTokenBlock(totalPixels);
        return;
    }

    if(state3D.mode === "faces"){

        if(!parseSizeFaces()) return;

        const {x,y,z} = state3D.size;

        const frontPixels  = x*y;
        const backPixels   = x*y;
        const leftPixels   = z*y;
        const rightPixels  = z*y;
        const topPixels    = x*z;
        const bottomPixels = x*z;

        faceFront.value  = generateTokenBlock(frontPixels);
        faceBack.value   = generateTokenBlock(backPixels);
        faceLeft.value   = generateTokenBlock(leftPixels);
        faceRight.value  = generateTokenBlock(rightPixels);
        faceTop.value    = generateTokenBlock(topPixels);
        faceBottom.value = generateTokenBlock(bottomPixels);

        return;
    }
};