/* ============================================================
   NUMERAL VOXEL ENGINE — 3D GOLD CORE
   ------------------------------------------------------------
   Edit Cube:
      - Solid Volume
      - Max 10-10-10
      - Fills entire volume

   Edit Faces:
      - Hollow Surface Only
      - Max 25-25-25
      - 6 independent faces

   Formats:
      - binary
      - decimal
      - hex
      - octal
      - morse
      - colorcode

   FPS + ms measured ONLY during Convert
   No frame flicker
   No geometry disappearance
   Proper centering
   Stable orbit controls
   Clean transparency
   ============================================================ */


/* ============================================================
   GLOBAL STATE
============================================================ */

let scene3D;
let camera3D;
let renderer3D;
let controls3D;

let voxels3D = [];
let isInitialized3D = false;

let currentMode3D = "cube";   // cube | faces
let globalOpacity3D = 1;

const MAX_CUBE = 10;
const MAX_FACES = 25;


/* ============================================================
   DOM REFERENCES
============================================================ */

const container3D = document.getElementById("threeContainer");
const sizeInput3D = document.getElementById("size3D");
const formatSelect3D = document.getElementById("format3D");
const error3D = document.getElementById("error3D");
const stats3D = document.getElementById("stats3D");

const cubeInputBlock = document.getElementById("cubeInputBlock");
const facesInputBlock = document.getElementById("facesInputBlock");

const cubeMainInput = document.getElementById("input3D");

const faceInputs = {
    front: document.getElementById("faceFront"),
    back: document.getElementById("faceBack"),
    left: document.getElementById("faceLeft"),
    right: document.getElementById("faceRight"),
    top: document.getElementById("faceTop"),
    bottom: document.getElementById("faceBottom")
};

const opacitySlider = document.getElementById("opacitySlider");


/* ============================================================
   INITIALIZATION
============================================================ */

function init3D() {

    if (isInitialized3D) return;

    scene3D = new THREE.Scene();
    scene3D.background = new THREE.Color(0x000000);

    camera3D = new THREE.PerspectiveCamera(
        70,
        container3D.clientWidth / container3D.clientHeight,
        0.5,
        200
    );

    camera3D.position.set(12, 12, 18);

    renderer3D = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
    });

    renderer3D.setSize(
        container3D.clientWidth,
        container3D.clientHeight
    );

    renderer3D.setPixelRatio(window.devicePixelRatio);

    container3D.innerHTML = "";
    container3D.appendChild(renderer3D.domElement);

    controls3D = new THREE.OrbitControls(
        camera3D,
        renderer3D.domElement
    );

    controls3D.enableDamping = true;
    controls3D.dampingFactor = 0.08;
    controls3D.rotateSpeed = 0.8;
    controls3D.zoomSpeed = 0.8;

    window.addEventListener("resize", resize3D);

    isInitialized3D = true;
    animate3D();
}


function resize3D() {
    camera3D.aspect =
        container3D.clientWidth /
        container3D.clientHeight;

    camera3D.updateProjectionMatrix();

    renderer3D.setSize(
        container3D.clientWidth,
        container3D.clientHeight
    );
}


function animate3D() {
    requestAnimationFrame(animate3D);
    controls3D.update();
    renderer3D.render(scene3D, camera3D);
}


/* ============================================================
   MODE SWITCHING
============================================================ */

function set3DMode(mode) {

    currentMode3D = mode;

    if (mode === "cube") {
        cubeInputBlock.classList.remove("hidden");
        facesInputBlock.classList.add("hidden");
    } else {
        cubeInputBlock.classList.add("hidden");
        facesInputBlock.classList.remove("hidden");
    }
}


/* ============================================================
   SIZE VALIDATION
============================================================ */

function get3DSize() {

    const raw = sizeInput3D.value.trim();
    const parts = raw.split("-");

    if (parts.length !== 3) {
        show3DError("Size must be X-Y-Z.");
        return null;
    }

    const x = parseInt(parts[0], 10);
    const y = parseInt(parts[1], 10);
    const z = parseInt(parts[2], 10);

    if (!Number.isInteger(x) ||
        !Number.isInteger(y) ||
        !Number.isInteger(z)) {

        show3DError("Size must be integers.");
        return null;
    }

    if (x <= 0 || y <= 0 || z <= 0) {
        show3DError("Size must be positive.");
        return null;
    }

    if (currentMode3D === "cube") {
        if (x > MAX_CUBE ||
            y > MAX_CUBE ||
            z > MAX_CUBE) {

            show3DError("Cube max is 10-10-10.");
            return null;
        }
    }

    if (currentMode3D === "faces") {
        if (x > MAX_FACES ||
            y > MAX_FACES ||
            z > MAX_FACES) {

            show3DError("Faces max is 25-25-25.");
            return null;
        }
    }

    return { x, y, z };
}


/* ============================================================
   FORMAT PARSING
============================================================ */

function parseByte3D(value, format) {

    switch (format) {

        case "binary":
            if (!/^[01]{8}$/.test(value)) return null;
            return parseInt(value, 2);

        case "decimal":
            if (!/^\d+$/.test(value)) return null;
            const d = parseInt(value, 10);
            return (d >= 0 && d <= 255) ? d : null;

        case "hex":
            if (!/^[0-9a-fA-F]{1,2}$/.test(value)) return null;
            return parseInt(value, 16);

        case "octal":
            if (!/^[0-7]{1,3}$/.test(value)) return null;
            return parseInt(value, 8);

        case "morse":
            if (!/^[\.\-]{8}$/.test(value)) return null;
            const bin = value.replace(/-/g, "1")
                             .replace(/\./g, "0");
            return parseInt(bin, 2);

        default:
            return null;
    }
}


/* ============================================================
   STRESS MODE
============================================================ */

function stress3D() {

    clear3DError();
    clear3DStats();

    const size = get3DSize();
    if (!size) return;

    const { x, y, z } = size;
    const format = formatSelect3D.value;

    if (currentMode3D === "cube") {

        const total = x * y * z;
        cubeMainInput.value =
            generateStressValues3D(total, format);

    } else {

        const faceCount = x * y;

        for (let key in faceInputs) {
            faceInputs[key].value =
                generateStressValues3D(faceCount, format);
        }
    }
}


function generateStressValues3D(count, format) {

    let output = [];

    for (let i = 0; i < count; i++) {

        if (format === "colorcode") {

            const r = randByte();
            const g = randByte();
            const b = randByte();

            output.push(
                "#" +
                r.toString(16).padStart(2,"0") +
                g.toString(16).padStart(2,"0") +
                b.toString(16).padStart(2,"0")
            );

        } else {

            for (let c = 0; c < 3; c++) {

                const v = randByte();

                if (format === "binary")
                    output.push(v.toString(2).padStart(8,"0"));

                if (format === "decimal")
                    output.push(v.toString());

                if (format === "hex")
                    output.push(v.toString(16).toUpperCase());

                if (format === "octal")
                    output.push(v.toString(8));

                if (format === "morse") {
                    const b = v.toString(2).padStart(8,"0");
                    output.push(
                        b.replace(/1/g,"-")
                         .replace(/0/g,".")
                    );
                }
            }
        }
    }

    return output.join(" ");
}


/* ============================================================
   CONVERT (CORE RENDER)
============================================================ */

function convert3D() {

    clear3DError();
    clear3DStats();

    init3D();

    const start = performance.now();

    const size = get3DSize();
    if (!size) return;

    const { x, y, z } = size;
    const format = formatSelect3D.value;

    clearScene3D();

    if (currentMode3D === "cube") {
        buildSolidCube(x, y, z, format);
    } else {
        buildHollowCube(x, y, z, format);
    }

    const end = performance.now();
    const time = end - start;
    const fps = 1000 / time;

    stats3D.textContent =
        "Render Time: " +
        time.toFixed(2) +
        " ms | FPS: " +
        fps.toFixed(2);
}


/* ============================================================
   SOLID CUBE BUILD
============================================================ */

function buildSolidCube(x, y, z, format) {

    const tokens = cubeMainInput.value.trim().split(/\s+/);

    const expected =
        format === "colorcode"
        ? x * y * z
        : x * y * z * 3;

    if (tokens.length !== expected) {
        show3DError("Incorrect cube value count.");
        return;
    }

    const spacing = 6;
    const dx = spacing / x;
    const dy = spacing / y;
    const dz = spacing / z;

    let tokenIndex = 0;

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            for (let k = 0; k < z; k++) {

                const color =
                    extractColor3D(tokens, format, tokenIndex);

                if (color === null) {
                    show3DError("Invalid value.");
                    return;
                }

                tokenIndex +=
                    (format === "colorcode") ? 1 : 3;

                createVoxel3D(
                    i, j, k,
                    x, y, z,
                    dx, dy, dz,
                    color
                );
            }
        }
    }
}


/* ============================================================
   HOLLOW BUILD (ALL 6 SIDES)
============================================================ */

function buildHollowCube(x, y, z, format) {

    const spacing = 6;
    const dx = spacing / x;
    const dy = spacing / y;
    const dz = spacing / z;

    buildFace("front", 0, x, y, z, dx, dy, dz, format);
    buildFace("back", 1, x, y, z, dx, dy, dz, format);
    buildFace("left", 2, x, y, z, dx, dy, dz, format);
    buildFace("right", 3, x, y, z, dx, dy, dz, format);
    buildFace("top", 4, x, y, z, dx, dy, dz, format);
    buildFace("bottom", 5, x, y, z, dx, dy, dz, format);
}


function buildFace(name, index,
                   x, y, z,
                   dx, dy, dz,
                   format) {

    const tokens =
        faceInputs[name]
        .value.trim()
        .split(/\s+/);

    const expected =
        format === "colorcode"
        ? x * y
        : x * y * 3;

    if (tokens.length !== expected) {
        show3DError(
            "Incorrect value count in " + name
        );
        return;
    }

    let tokenIndex = 0;

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {

            const color =
                extractColor3D(tokens, format, tokenIndex);

            if (color === null) {
                show3DError("Invalid value.");
                return;
            }

            tokenIndex +=
                (format === "colorcode") ? 1 : 3;

            let px = i;
            let py = j;
            let pz = 0;

            switch(index) {

                case 0: pz = 0; break;          // front
                case 1: pz = z-1; break;        // back
                case 2: px = 0; pz = i; break;  // left
                case 3: px = x-1; pz = i; break;// right
                case 4: py = y-1; pz = j; break;// top
                case 5: py = 0; pz = j; break;  // bottom
            }

            createVoxel3D(
                px, py, pz,
                x, y, z,
                dx, dy, dz,
                color
            );
        }
    }
}


/* ============================================================
   VOXEL CREATION
============================================================ */

function createVoxel3D(
    i, j, k,
    x, y, z,
    dx, dy, dz,
    color) {

    const geo =
        new THREE.BoxGeometry(dx, dy, dz);

    const mat =
        new THREE.MeshBasicMaterial({
            color: color,
            transparent: globalOpacity3D < 1,
            opacity: globalOpacity3D
        });

    const cube =
        new THREE.Mesh(geo, mat);

    cube.position.set(
        (i - x/2) * dx + dx/2,
        (j - y/2) * dy + dy/2,
        (k - z/2) * dz + dz/2
    );

    scene3D.add(cube);
    voxels3D.push(cube);
}


/* ============================================================
   COLOR EXTRACTION
============================================================ */

function extractColor3D(tokens, format, index) {

    if (format === "colorcode") {

        const hex =
            tokens[index].replace("#","");

        if (!/^[0-9a-fA-F]{6}$/.test(hex))
            return null;

        return parseInt(hex, 16);
    }

    const r = parseByte3D(tokens[index], format);
    const g = parseByte3D(tokens[index+1], format);
    const b = parseByte3D(tokens[index+2], format);

    if (r === null ||
        g === null ||
        b === null)
        return null;

    return (r<<16) | (g<<8) | b;
}


/* ============================================================
   CLEANUP
============================================================ */

function clearScene3D() {

    voxels3D.forEach(v => {
        scene3D.remove(v);
        v.geometry.dispose();
        v.material.dispose();
    });

    voxels3D = [];
}


function show3DError(msg) {
    error3D.textContent = msg;
}

function clear3DError() {
    error3D.textContent = "";
}

function clear3DStats() {
    stats3D.textContent = "";
}

function randByte() {
    return Math.floor(Math.random()*256);
}


/* ============================================================
   TRANSPARENCY
============================================================ */

opacitySlider.addEventListener("input", function() {

    globalOpacity3D =
        parseFloat(this.value);

    voxels3D.forEach(v => {
        v.material.opacity =
            globalOpacity3D;

        v.material.transparent =
            globalOpacity3D < 1;
    });
});