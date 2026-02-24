// ========================================================
// NUMERAL VOXEL ENGINE — 3D ADVANCED CORE
// ========================================================

const MAX_CUBE = 10;
const MAX_FACES = 25;

let scene, camera, renderer;
let voxelGroup = new THREE.Group();
let container = document.getElementById("threeContainer");

let currentMode = "cube";
let isDragging = false;
let previousTouchDistance = null;

let rotationX = 0;
let rotationY = 0;

initThree();
animate();

// ========================================================
// INITIALIZE THREE
// ========================================================

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

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, 500);
    container.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(20, 30, 20);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    scene.add(voxelGroup);

    enableCameraControls();
}

// ========================================================
// CAMERA CONTROLS (Swipe + Zoom)
// ========================================================

function enableCameraControls() {

    renderer.domElement.addEventListener("mousedown", () => isDragging = true);
    renderer.domElement.addEventListener("mouseup", () => isDragging = false);
    renderer.domElement.addEventListener("mouseleave", () => isDragging = false);

    renderer.domElement.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        rotationY += e.movementX * 0.01;
        rotationX += e.movementY * 0.01;
    });

    // Scroll zoom
    renderer.domElement.addEventListener("wheel", (e) => {
        camera.position.multiplyScalar(e.deltaY > 0 ? 1.1 : 0.9);
    });

    // Touch controls
    renderer.domElement.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
        }
        if (e.touches.length === 2) {
            previousTouchDistance = getTouchDistance(e);
        }
    });

    renderer.domElement.addEventListener("touchmove", (e) => {

        if (e.touches.length === 1 && isDragging) {
            rotationY += e.touches[0].movementX * 0.01;
            rotationX += e.touches[0].movementY * 0.01;
        }

        if (e.touches.length === 2) {
            const newDist = getTouchDistance(e);
            if (previousTouchDistance) {
                const scale = newDist / previousTouchDistance;
                camera.position.multiplyScalar(scale < 1 ? 1.05 : 0.95);
            }
            previousTouchDistance = newDist;
        }
    });

    renderer.domElement.addEventListener("touchend", () => {
        isDragging = false;
        previousTouchDistance = null;
    });
}

function getTouchDistance(e) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

// ========================================================
// ANIMATION LOOP
// ========================================================

function animate() {
    requestAnimationFrame(animate);

    voxelGroup.rotation.x = rotationX;
    voxelGroup.rotation.y = rotationY;

    renderer.render(scene, camera);
}

// ========================================================
// CLEAR VOXELS
// ========================================================

function clearVoxels() {
    while (voxelGroup.children.length > 0) {
        voxelGroup.remove(voxelGroup.children[0]);
    }
}

// ========================================================
// PARSERS (ALL FORMATS)
// ========================================================

function parseByte(value, format) {

    if (format === "binary")
        return parseInt(value, 2);

    if (format === "decimal")
        return parseInt(value);

    if (format === "hex")
        return parseInt(value, 16);

    if (format === "octal")
        return parseInt(value, 8);

    if (format === "morse") {
        let bin = "";
        for (let c of value)
            bin += (c === "-") ? "1" : "0";
        return parseInt(bin, 2);
    }
}

// ========================================================
// BUILD SOLID CUBE
// ========================================================

function buildCube(values, format, x, y, z) {

    let index = 0;
    const alpha = parseFloat(document.getElementById("alpha3D").value);
    const gloss = parseInt(document.getElementById("gloss3D").value);

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            for (let k = 0; k < z; k++) {

                let color;

                if (format === "color") {
                    color = values[index++];
                } else {
                    const r = parseByte(values[index++], format);
                    const g = parseByte(values[index++], format);
                    const b = parseByte(values[index++], format);
                    color = `rgb(${r},${g},${b})`;
                }

                const geometry = new THREE.BoxGeometry(1, 1, 1);

                const material = new THREE.MeshPhongMaterial({
                    color: color,
                    shininess: gloss,
                    transparent: alpha < 1,
                    opacity: alpha,
                    depthWrite: alpha === 1
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

// ========================================================
// CONVERT
// ========================================================

document.getElementById("convert3D").onclick = () => {

    const start = performance.now();

    clearVoxels();

    const format = document.getElementById("format3D").value;
    const size = document.getElementById("size3D").value.split("-");
    const x = parseInt(size[0]);
    const y = parseInt(size[1]);
    const z = parseInt(size[2]);

    const raw = document.getElementById("input3D").value.trim();
    const values = raw.split(/\s+/);

    buildCube(values, format, x, y, z);

    const end = performance.now();
    const ms = (end - start).toFixed(2);
    const fps = (1000 / (end - start)).toFixed(2);

    document.getElementById("stats3D").textContent =
        `${ms} ms | ${fps} FPS`;
};

// ========================================================
// STRESS MODE
// ========================================================

document.getElementById("stress3D").onclick = () => {

    const format = document.getElementById("format3D").value;
    const size = document.getElementById("size3D").value.split("-");
    const x = parseInt(size[0]);
    const y = parseInt(size[1]);
    const z = parseInt(size[2]);

    const total = format === "color"
        ? x * y * z
        : x * y * z * 3;

    let arr = [];

    for (let i = 0; i < total; i++) {

        if (format === "color") {
            arr.push("#" + Math.floor(Math.random() * 16777215)
                .toString(16).padStart(6, "0"));
        } else {
            arr.push(Math.floor(Math.random() * 256).toString());
        }
    }

    document.getElementById("input3D").value = arr.join(" ");
};