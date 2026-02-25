// ======================================================
// NUMERAL VOXEL ENGINE — 3D CORE
// Clean, modular, no UI control, no fluff
// ======================================================

"use strict";

window.Engine3D = (function () {

    let scene, camera, renderer;
    let container;
    let voxelGroup;
    let materials = [];

    let rotationX = 0;
    let rotationY = 0;

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastPinchDist = null;

    const MAX_CUBE = 10;
    const MAX_FACES = 25;

    // ==================================================
    // INIT
    // ==================================================

    function init(containerId) {

        container = document.getElementById(containerId);

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / 500,
            0.1,
            2000
        );

        camera.position.set(15, 15, 15);

        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        });

        renderer.setSize(container.clientWidth, 500);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        voxelGroup = new THREE.Group();
        scene.add(voxelGroup);

        const light = new THREE.DirectionalLight(0xffffff, 1.2);
        light.position.set(20, 30, 20);
        scene.add(light);

        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambient);

        enableControls();
        renderFrame();
    }

    // ==================================================
    // CAMERA CONTROLS (Swipe + Pinch)
    // ==================================================

    function enableControls() {

        const dom = renderer.domElement;

        dom.addEventListener("mousedown", (e) => {
            dragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
        });

        dom.addEventListener("mouseup", () => dragging = false);
        dom.addEventListener("mouseleave", () => dragging = false);

        dom.addEventListener("mousemove", (e) => {
            if (!dragging) return;

            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;

            rotationY += dx * 0.01;
            rotationX += dy * 0.01;

            lastX = e.clientX;
            lastY = e.clientY;
        });

        dom.addEventListener("wheel", (e) => {
            camera.position.multiplyScalar(e.deltaY > 0 ? 1.1 : 0.9);
        });

        dom.addEventListener("touchstart", (e) => {

            if (e.touches.length === 1) {
                dragging = true;
                lastX = e.touches[0].clientX;
                lastY = e.touches[0].clientY;
            }

            if (e.touches.length === 2) {
                lastPinchDist = getPinchDistance(e);
            }
        });

        dom.addEventListener("touchmove", (e) => {

            if (e.touches.length === 1 && dragging) {

                const dx = e.touches[0].clientX - lastX;
                const dy = e.touches[0].clientY - lastY;

                rotationY += dx * 0.01;
                rotationX += dy * 0.01;

                lastX = e.touches[0].clientX;
                lastY = e.touches[0].clientY;
            }

            if (e.touches.length === 2) {

                const newDist = getPinchDistance(e);

                if (lastPinchDist) {
                    const scale = newDist / lastPinchDist;
                    camera.position.multiplyScalar(scale < 1 ? 1.05 : 0.95);
                }

                lastPinchDist = newDist;
            }
        });

        dom.addEventListener("touchend", () => {
            dragging = false;
            lastPinchDist = null;
        });
    }

    function getPinchDistance(e) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // ==================================================
    // CLEAR
    // ==================================================

    function clear() {
        while (voxelGroup.children.length > 0) {
            const obj = voxelGroup.children[0];
            voxelGroup.remove(obj);
        }
        materials = [];
    }

    // ==================================================
    // FORMAT PARSER
    // ==================================================

    function parseByte(value, format) {

        if (format === "binary") return parseInt(value, 2);
        if (format === "decimal") return parseInt(value);
        if (format === "hex") return parseInt(value, 16);
        if (format === "octal") return parseInt(value, 8);

        if (format === "morse") {
            const bin = value.replace(/-/g, "1").replace(/\./g, "0");
            return parseInt(bin, 2);
        }

        return null;
    }

    // ==================================================
    // BUILD SOLID CUBE
    // ==================================================

    function buildCube(values, format, x, y, z, alpha, gloss) {

        const total = x * y * z;
        let index = 0;

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

                    if (alpha <= 0) continue;

                    const material = new THREE.MeshPhongMaterial({
                        color: color,
                        shininess: gloss,
                        transparent: alpha < 1,
                        opacity: alpha,
                        depthWrite: alpha === 1
                    });

                    materials.push(material);

                    const cube = new THREE.Mesh(
                        new THREE.BoxGeometry(1, 1, 1),
                        material
                    );

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

    // ==================================================
    // BUILD 6 FACES (HOLLOW)
    // ==================================================

    function buildFaces(values, format, x, y, z, alpha, gloss) {

        let index = 0;

        function placeVoxel(i, j, k, color) {

            if (alpha <= 0) return;

            const material = new THREE.MeshPhongMaterial({
                color: color,
                shininess: gloss,
                transparent: alpha < 1,
                opacity: alpha,
                depthWrite: alpha === 1
            });

            materials.push(material);

            const cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                material
            );

            cube.position.set(
                i - x / 2,
                j - y / 2,
                k - z / 2
            );

            voxelGroup.add(cube);
        }

        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                for (let k = 0; k < z; k++) {

                    const isEdge =
                        i === 0 || i === x - 1 ||
                        j === 0 || j === y - 1 ||
                        k === 0 || k === z - 1;

                    if (!isEdge) continue;

                    let color;

                    if (format === "color") {
                        color = values[index++];
                    } else {
                        const r = parseByte(values[index++], format);
                        const g = parseByte(values[index++], format);
                        const b = parseByte(values[index++], format);
                        color = `rgb(${r},${g},${b})`;
                    }

                    placeVoxel(i, j, k, color);
                }
            }
        }
    }

    // ==================================================
    // RENDER ENTRY
    // ==================================================

    function render(mode, sizeStr, format, inputStr, alpha, gloss) {

        const start = performance.now();

        clear();

        const parts = sizeStr.split("-");
        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);
        const z = parseInt(parts[2]);

        const values = inputStr.trim().split(/\s+/);

        if (mode === "cube") {
            buildCube(values, format, x, y, z, alpha, gloss);
        } else {
            buildFaces(values, format, x, y, z, alpha, gloss);
        }

        renderFrame();

        const end = performance.now();
        const delta = end - start || 0.0001;

        return {
            ms: delta.toFixed(2),
            fps: (1000 / delta).toFixed(2)
        };
    }

    // ==================================================
    // STRESS
    // ==================================================

    function stress(mode, sizeStr, format) {

        const parts = sizeStr.split("-");
        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);
        const z = parseInt(parts[2]);

        const total = mode === "cube"
            ? x * y * z
            : (x * y * z);

        let arr = [];

        function randomByte() {
            return Math.floor(Math.random() * 256);
        }

        for (let i = 0; i < total; i++) {

            if (format === "color") {
                arr.push("#" +
                    randomByte().toString(16).padStart(2, "0") +
                    randomByte().toString(16).padStart(2, "0") +
                    randomByte().toString(16).padStart(2, "0"));
            } else {

                for (let j = 0; j < 3; j++) {

                    const val = randomByte();

                    if (format === "binary")
                        arr.push(val.toString(2).padStart(8, "0"));

                    else if (format === "decimal")
                        arr.push(val.toString());

                    else if (format === "hex")
                        arr.push(val.toString(16).toUpperCase());

                    else if (format === "octal")
                        arr.push(val.toString(8));

                    else if (format === "morse")
                        arr.push(val.toString(2)
                            .padStart(8, "0")
                            .replace(/1/g, "-")
                            .replace(/0/g, "."));
                }
            }
        }

        return arr.join(" ");
    }

    // ==================================================
    // LIVE GLOSS UPDATE
    // ==================================================

    function updateGloss(gloss) {
        materials.forEach(mat => mat.shininess = gloss);
        renderFrame();
    }

    function updateAlpha(alpha) {
        materials.forEach(mat => {
            mat.opacity = alpha;
            mat.transparent = alpha < 1;
            mat.depthWrite = alpha === 1;
        });
        renderFrame();
    }

    // ==================================================
    // FRAME RENDER
    // ==================================================

    function renderFrame() {
        voxelGroup.rotation.x = rotationX;
        voxelGroup.rotation.y = rotationY;
        renderer.render(scene, camera);
    }

    return {
        init,
        render,
        stress,
        updateGloss,
        updateAlpha
    };

})();