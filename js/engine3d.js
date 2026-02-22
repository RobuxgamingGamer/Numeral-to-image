// ============================================
// NUMERAL VOXEL ENGINE — 3D CORE
// ============================================

const MAX_CUBE = 10;      // solid mode
const MAX_FACES = 25;     // hollow faces mode

let scene, camera, renderer;
let container = document.getElementById("threeContainer");
let voxelGroup = new THREE.Group();
let currentMode = "cube";

initThree();
animate();

// ============================================
// INITIALIZE THREE
// ============================================

function initThree() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / 500,
        0.1,
        1000
    );
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, 500);
    container.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 20, 10);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    scene.add(voxelGroup);

    window.addEventListener("resize", () => {
        renderer.setSize(container.clientWidth, 500);
        camera.aspect = container.clientWidth / 500;
        camera.updateProjectionMatrix();
    });
}

function animate() {
    requestAnimationFrame(animate);
    voxelGroup.rotation.y += 0.005;
    renderer.render(scene, camera);
}

// ============================================
// SIZE PARSER
// ============================================

function parseSize3D() {
    const raw = document.getElementById("size3D").value.trim();
    const parts = raw.split("-");
    if (parts.length !== 3) throw "Invalid size format";

    const x = parseInt(parts[0]);
    const y = parseInt(parts[1]);
    const z = parseInt(parts[2]);

    if (isNaN(x) || isNaN(y) || isNaN(z))
        throw "Size must be numbers";

    if (x <= 0 || y <= 0 || z <= 0)
        throw "Size must be positive";

    if (currentMode === "cube") {
        if (x > MAX_CUBE || y > MAX_CUBE || z > MAX_CUBE)
            throw "Cube mode max 10-10-10";
    }

    if (currentMode === "faces") {
        if (x > MAX_FACES || y > MAX_FACES || z > MAX_FACES)
            throw "Faces mode max 25-25-25";
    }

    return [x, y, z];
}

// ============================================
// BYTE PARSERS
// ============================================

function parseBinary(v) {
    if (!/^[01]{8}$/.test(v)) throw "Invalid binary byte";
    return parseInt(v, 2);
}

function parseDecimal(v) {
    const n = parseInt(v);
    if (isNaN(n) || n < 0 || n > 255) throw "Invalid decimal byte";
    return n;
}

function parseHex(v) {
    if (!/^[0-9A-Fa-f]{2}$/.test(v)) throw "Invalid hex byte";
    return parseInt(v, 16);
}

function parseOctal(v) {
    if (!/^[0-7]{3}$/.test(v)) throw "Invalid octal byte";
    return parseInt(v, 8);
}

function parseMorse(v) {
    if (!/^[\.\-]{8}$/.test(v)) throw "Invalid Morse byte";
    let bin = "";
    for (let c of v) bin += (c === "-") ? "1" : "0";
    return parseInt(bin, 2);
}

function parseColor(v) {
    if (!/^#[0-9A-Fa-f]{6}$/.test(v)) throw "Invalid color";
    return v;
}

// ============================================
// CLEAR VOXELS
// ============================================

function clearVoxels() {
    while (voxelGroup.children.length > 0) {
        voxelGroup.remove(voxelGroup.children[0]);
    }
}

// ============================================
// BUILD SOLID CUBE
// ============================================

function buildCube(values, format, x, y, z) {

    let index = 0;
    const alpha = parseFloat(document.getElementById("alpha3D").value);

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            for (let k = 0; k < z; k++) {

                let color;

                if (format === "color") {
                    color = parseColor(values[index++]);
                } else {
                    let r, g, b;

                    if (format === "binary") {
                        r = parseBinary(values[index++]);
                        g = parseBinary(values[index++]);
                        b = parseBinary(values[index++]);
                    }
                    if (format === "decimal") {
                        r = parseDecimal(values[index++]);
                        g = parseDecimal(values[index++]);
                        b = parseDecimal(values[index++]);
                    }
                    if (format === "hex") {
                        r = parseHex(values[index++]);
                        g = parseHex(values[index++]);
                        b = parseHex(values[index++]);
                    }
                    if (format === "octal") {
                        r = parseOctal(values[index++]);
                        g = parseOctal(values[index++]);
                        b = parseOctal(values[index++]);
                    }
                    if (format === "morse") {
                        r = parseMorse(values[index++]);
                        g = parseMorse(values[index++]);
                        b = parseMorse(values[index++]);
                    }

                    color = `rgb(${r},${g},${b})`;
                }

                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshPhongMaterial({
                    color: color,
                    transparent: true,
                    opacity: alpha
                });

                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(
                    i - x / 2,
                    j - y / 2,
                    k - z / 2
                );

                voxelGroup.add(cube);
            }
        }
    }
}

// ============================================
// BUILD FACES (HOLLOW)
// ============================================

function buildFaces(values, format, x, y, z) {

    let index = 0;
    const alpha = parseFloat(document.getElementById("alpha3D").value);

    function addVoxel(i, j, k, color) {

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: alpha
        });

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
            i - x / 2,
            j - y / 2,
            k - z / 2
        );

        voxelGroup.add(cube);
    }

    const faces = [
        "faceFront",
        "faceBack",
        "faceLeft",
        "faceRight",
        "faceTop",
        "faceBottom"
    ];

    for (let face of faces) {

        const raw = document.getElementById(face).value.trim();
        if (!raw) continue;

        const values = raw.split(/\s+/);
        let idx = 0;

        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {

                let color;

                if (format === "color") {
                    color = parseColor(values[idx++]);
                } else {
                    let r, g, b;

                    r = parseDecimal(values[idx++]);
                    g = parseDecimal(values[idx++]);
                    b = parseDecimal(values[idx++]);
                    color = `rgb(${r},${g},${b})`;
                }

                if (face === "faceFront") addVoxel(i, j, z - 1, color);
                if (face === "faceBack") addVoxel(i, j, 0, color);
                if (face === "faceLeft") addVoxel(0, i, j, color);
                if (face === "faceRight") addVoxel(x - 1, i, j, color);
                if (face === "faceTop") addVoxel(i, y - 1, j, color);
                if (face === "faceBottom") addVoxel(i, 0, j, color);
            }
        }
    }
}

// ============================================
// CONVERT
// ============================================

document.getElementById("convert3D").onclick = () => {

    try {

        const start = performance.now();

        clearVoxels();

        const format = document.getElementById("format3D").value;
        const [x, y, z] = parseSize3D();

        if (currentMode === "cube") {

            const raw = document.getElementById("input3D").value.trim();
            const values = raw.split(/\s+/);

            const required = (format === "color")
                ? x * y * z
                : x * y * z * 3;

            if (values.length !== required)
                throw `Expected ${required} values`;

            buildCube(values, format, x, y, z);
        }

        if (currentMode === "faces") {
            buildFaces([], format, x, y, z);
        }

        const end = performance.now();
        const ms = (end - start).toFixed(2);
        const fps = (1000 / (end - start)).toFixed(2);

        document.getElementById("stats3D").textContent =
            `${ms} ms | ${fps} FPS`;

    } catch (e) {
        alert("3D ERROR:\n" + e);
    }
};

// ============================================
// MODE SWITCH
// ============================================

document.getElementById("modeCube").onclick = () => {
    currentMode = "cube";
    document.getElementById("facesBlock").style.display = "none";
    document.getElementById("modeCube").classList.add("active");
    document.getElementById("modeFaces").classList.remove("active");
};

document.getElementById("modeFaces").onclick = () => {
    currentMode = "faces";
    document.getElementById("facesBlock").style.display = "block";
    document.getElementById("modeCube").classList.remove("active");
    document.getElementById("modeFaces").classList.add("active");
};