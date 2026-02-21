/* ============================================================
   NUMERAL VOXEL ENGINE — 3D GOLD BUILD
   Cube Mode Max: 10-10-10
   Faces Mode Max: 25-25-25 (surface only)
   Static Performance Measurement
   6 Separate Face Inputs
   ============================================================ */

let scene, camera, renderer, controls;
let initialized = false;

let editMode = "cube";   // "cube" or "faces"
let voxels = [];
let globalOpacity = 1;

const MAX_CUBE = 10;
const MAX_FACES = 25;

const container = document.getElementById("threeContainer");
const error3D = document.getElementById("error3D");
const stats3D = document.getElementById("stats3D");

/* ============================================================
   INITIALIZATION
   ============================================================ */

function init3D() {

    if (initialized) return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.5,
        100
    );

    camera.position.set(8, 8, 12);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    window.addEventListener("resize", onResize);

    initialized = true;
    animate();
}

function onResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

/* ============================================================
   MODE CONTROL
   ============================================================ */

function setMode(mode) {

    editMode = mode;

    document.getElementById("cubeBtn").classList.remove("activeMode");
    document.getElementById("facesBtn").classList.remove("activeMode");

    if (mode === "cube") {
        document.getElementById("cubeBtn").classList.add("activeMode");
        document.getElementById("cubeInputBlock").classList.remove("hidden");
        document.getElementById("facesInputBlock").classList.add("hidden");
    } else {
        document.getElementById("facesBtn").classList.add("activeMode");
        document.getElementById("cubeInputBlock").classList.add("hidden");
        document.getElementById("facesInputBlock").classList.remove("hidden");
    }
}

/* ============================================================
   FORMAT PARSER
   ============================================================ */

function parseValue3D(value, format) {

    if (format === "binary") {
        if (!/^[01]{8}$/.test(value)) return null;
        return parseInt(value, 2);
    }

    if (format === "decimal") {
        if (!/^\d+$/.test(value)) return null;
        const n = parseInt(value, 10);
        return (n >= 0 && n <= 255) ? n : null;
    }

    if (format === "hex") {
        if (!/^[0-9a-fA-F]{1,2}$/.test(value)) return null;
        const n = parseInt(value, 16);
        return (n >= 0 && n <= 255) ? n : null;
    }

    if (format === "octal") {
        if (!/^[0-7]{1,3}$/.test(value)) return null;
        const n = parseInt(value, 8);
        return (n >= 0 && n <= 255) ? n : null;
    }

    if (format === "morse") {
        if (!/^[\.\-]{8}$/.test(value)) return null;
        const binary = value.replace(/-/g, "1").replace(/\./g, "0");
        return parseInt(binary, 2);
    }

    return null;
}

/* ============================================================
   SIZE VALIDATION
   ============================================================ */

function get3DSize() {

    const raw = document.getElementById("size3D").value.trim();
    const parts = raw.split("-");

    if (parts.length !== 3) {
        show3DError("Size must be in X-Y-Z format.");
        return null;
    }

    const x = parseInt(parts[0], 10);
    const y = parseInt(parts[1], 10);
    const z = parseInt(parts[2], 10);

    if (!Number.isInteger(x) || !Number.isInteger(y) || !Number.isInteger(z)) {
        show3DError("Size must be integers.");
        return null;
    }

    if (x <= 0 || y <= 0 || z <= 0) {
        show3DError("Size must be greater than 0.");
        return null;
    }

    if (editMode === "cube") {
        if (x > MAX_CUBE || y > MAX_CUBE || z > MAX_CUBE) {
            show3DError(`Cube mode max is ${MAX_CUBE}-${MAX_CUBE}-${MAX_CUBE}.`);
            return null;
        }
    }

    if (editMode === "faces") {
        if (x > MAX_FACES || y > MAX_FACES || z > MAX_FACES) {
            show3DError(`Faces mode max is ${MAX_FACES}-${MAX_FACES}-${MAX_FACES}.`);
            return null;
        }
    }

    return { x, y, z };
}

/* ============================================================
   STRESS MODE
   ============================================================ */

function stress3D() {

    clear3DError();

    const size = get3DSize();
    if (!size) return;

    const { x, y, z } = size;
    const format = document.getElementById("format3D").value;

    if (editMode === "cube") {

        const total = x * y * z;
        const output = generateStressValues(total, format);
        document.getElementById("input3D").value = output;

    } else {

        const faceCount = x * y; // each face has x*y cells

        document.getElementById("faceFront").value =
            generateStressValues(faceCount, format);

        document.getElementById("faceBack").value =
            generateStressValues(faceCount, format);

        document.getElementById("faceLeft").value =
            generateStressValues(faceCount, format);

        document.getElementById("faceRight").value =
            generateStressValues(faceCount, format);

        document.getElementById("faceTop").value =
            generateStressValues(faceCount, format);

        document.getElementById("faceBottom").value =
            generateStressValues(faceCount, format);
    }
}

function generateStressValues(count, format) {

    let output = [];

    for (let i = 0; i < count; i++) {

        if (format === "colorcode") {
            const r = randomByte().toString(16).padStart(2, "0");
            const g = randomByte().toString(16).padStart(2, "0");
            const b = randomByte().toString(16).padStart(2, "0");
            output.push("#" + r + g + b);
        } else {
            for (let c = 0; c < 3; c++) {
                const val = randomByte();

                if (format === "binary")
                    output.push(val.toString(2).padStart(8, "0"));

                if (format === "decimal")
                    output.push(val.toString());

                if (format === "hex")
                    output.push(val.toString(16).toUpperCase());

                if (format === "octal")
                    output.push(val.toString(8));

                if (format === "morse") {
                    const bin = val.toString(2).padStart(8, "0");
                    output.push(bin.replace(/1/g, "-").replace(/0/g, "."));
                }
            }
        }
    }

    return output.join(" ");
}

/* ============================================================
   CONVERT
   ============================================================ */

function convert3D() {

    clear3DError();
    clear3DStats();
    init3D();

    const startTime = performance.now();

    const size = get3DSize();
    if (!size) return;

    const { x, y, z } = size;
    const format = document.getElementById("format3D").value;

    clearScene();

    if (editMode === "cube") {
        buildCubeVolume(x, y, z, format);
    } else {
        buildFacesSurface(x, y, z, format);
    }

    const endTime = performance.now();
    const renderTime = endTime - startTime;
    const fps = 1000 / renderTime;

    stats3D.textContent =
        "Render Time: " + renderTime.toFixed(2) +
        " ms | FPS: " + fps.toFixed(2);
}

/* ============================================================
   BUILD SOLID CUBE
   ============================================================ */

function buildCubeVolume(x, y, z, format) {

    const tokens = document.getElementById("input3D").value.trim().split(/\s+/);

    const expected = (format === "colorcode")
        ? x * y * z
        : x * y * z * 3;

    if (tokens.length !== expected) {
        show3DError("Incorrect number of values for cube mode.");
        return;
    }

    const spacing = 4;
    const dx = spacing / x;
    const dy = spacing / y;
    const dz = spacing / z;

    let tokenIndex = 0;

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            for (let k = 0; k < z; k++) {

                const color = extractColor(tokens, format, tokenIndex);
                if (!color) {
                    show3DError("Invalid value detected.");
                    return;
                }

                tokenIndex += (format === "colorcode") ? 1 : 3;

                createVoxel(i, j, k, x, y, z, dx, dy, dz, color);
            }
        }
    }
}

/* ============================================================
   BUILD HOLLOW SURFACE
   ============================================================ */

function buildFacesSurface(x, y, z, format) {

    const spacing = 4;
    const dx = spacing / x;
    const dy = spacing / y;
    const dz = spacing / z;

    buildSingleFace("faceFront", 0, x, y, z, dx, dy, dz, format);
    buildSingleFace("faceBack", 1, x, y, z, dx, dy, dz, format);
    buildSingleFace("faceLeft", 2, x, y, z, dx, dy, dz, format);
    buildSingleFace("faceRight", 3, x, y, z, dx, dy, dz, format);
    buildSingleFace("faceTop", 4, x, y, z, dx, dy, dz, format);
    buildSingleFace("faceBottom", 5, x, y, z, dx, dy, dz, format);
}

function buildSingleFace(id, faceIndex, x, y, z, dx, dy, dz, format) {

    const tokens = document.getElementById(id).value.trim().split(/\s+/);
    const expected = (format === "colorcode") ? x * y : x * y * 3;

    if (tokens.length !== expected) {
        show3DError("Incorrect number of values in " + id);
        return;
    }

    let tokenIndex = 0;

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {

            const color = extractColor(tokens, format, tokenIndex);
            if (!color) {
                show3DError("Invalid value in " + id);
                return;
            }

            tokenIndex += (format === "colorcode") ? 1 : 3;

            let k = 0;

            if (faceIndex === 0) k = 0;              // front
            if (faceIndex === 1) k = z - 1;          // back

            createVoxel(i, j, k, x, y, z, dx, dy, dz, color);
        }
    }
}

/* ============================================================
   VOXEL CREATION
   ============================================================ */

function createVoxel(i, j, k, x, y, z, dx, dy, dz, color) {

    const geometry = new THREE.BoxGeometry(dx, dy, dz);

    const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: globalOpacity < 1,
        opacity: globalOpacity
    });

    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(
        (i - x / 2) * dx + dx / 2,
        (j - y / 2) * dy + dy / 2,
        (k - z / 2) * dz + dz / 2
    );

    scene.add(cube);
    voxels.push(cube);
}

/* ============================================================
   COLOR EXTRACTION
   ============================================================ */

function extractColor(tokens, format, index) {

    if (format === "colorcode") {

        const hex = tokens[index].replace("#", "");
        if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;
        return parseInt(hex, 16);
    }

    const r = parseValue3D(tokens[index], format);
    const g = parseValue3D(tokens[index + 1], format);
    const b = parseValue3D(tokens[index + 2], format);

    if (r === null || g === null || b === null) return null;

    return (r << 16) | (g << 8) | b;
}

/* ============================================================
   CLEANUP
   ============================================================ */

function clearScene() {
    voxels.forEach(v => scene.remove(v));
    voxels = [];
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

function randomByte() {
    return Math.floor(Math.random() * 256);
}

/* ============================================================
   TRANSPARENCY
   ============================================================ */

document.getElementById("opacitySlider")
.addEventListener("input", function () {

    globalOpacity = parseFloat(this.value);

    voxels.forEach(v => {
        v.material.opacity = globalOpacity;
        v.material.transparent = globalOpacity < 1;
    });
});