"use strict";

window.Engine3D = (function () {

    let scene;
    let camera;
    let renderer;
    let container;
    let group;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    // ======================================
    // INIT
    // ======================================

    function init(containerId) {

        container = document.getElementById(containerId);

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / 500,
            0.1,
            1000
        );

        camera.position.set(6, 6, 6);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, 500);
        container.appendChild(renderer.domElement);

        const light1 = new THREE.DirectionalLight(0xffffff, 1);
        light1.position.set(20, 20, 20);
        scene.add(light1);

        const light2 = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(light2);

        group = new THREE.Group();
        scene.add(group);

        enableSwipe();

        animate();
    }

    // ======================================
    // SWIPE ROTATION
    // ======================================

  function enableSwipe() {

    renderer.domElement.style.touchAction = "none";

    renderer.domElement.addEventListener("pointerdown", (e) => {
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
    });

    renderer.domElement.addEventListener("pointerup", () => {
        isDragging = false;
    });

    renderer.domElement.addEventListener("pointermove", (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;

        group.rotation.y += deltaX * 0.005;
        group.rotation.x += deltaY * 0.005;

        // clamp vertical rotation
        group.rotation.x = Math.max(
            -Math.PI / 2,
            Math.min(Math.PI / 2, group.rotation.x)
        );

        lastX = e.clientX;
        lastY = e.clientY;
    });
}
    // ======================================
    // CLEAR
    // ======================================

    function clear() {
        while (group.children.length > 0) {
            group.remove(group.children[0]);
        }
    }

    // ======================================
    // PARSE BYTE
    // ======================================

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
            const bin = value.replace(/-/g, "1").replace(/\./g, "0");
            return parseInt(bin, 2);
        }

        return 0;
    }

    // ======================================
    // RENDER
    // ======================================

    function render(sizeStr, format, inputStr, alpha, gloss) {

        const start = performance.now();

        clear();

        const parts = sizeStr.split("-");
        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);
        const z = parseInt(parts[2]);

        const values = inputStr.trim().split(/\s+/);

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

                    const geometry = new THREE.BoxGeometry(1, 1, 1);

                    const material = new THREE.MeshStandardMaterial({
    color: color,
    transparent: true,
    opacity: parseFloat(alpha),
    roughness: 1 - Math.min(parseFloat(gloss) / 200, 1),
    metalness: 0.5
});

                    const cube = new THREE.Mesh(geometry, material);

                    cube.position.set(
                        i - x / 2,
                        j - y / 2,
                        k - z / 2
                    );

                    group.add(cube);
                }
            }
        }

        const end = performance.now();
        const delta = end - start || 0.0001;

        return {
            ms: delta.toFixed(2),
            fps: (1000 / delta).toFixed(2)
        };
    }

    // ======================================
    // STRESS
    // ======================================

    function stress(sizeStr, format) {

        const parts = sizeStr.split("-");
        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);
        const z = parseInt(parts[2]);

        const total = format === "color"
            ? x * y * z
            : x * y * z * 3;

        let arr = [];

        for (let i = 0; i < total; i++) {

            const val = Math.floor(Math.random() * 256);

            if (format === "binary")
                arr.push(val.toString(2).padStart(8, "0"));

            else if (format === "decimal")
                arr.push(val.toString());

            else if (format === "hex")
                arr.push(val.toString(16).toUpperCase());

            else if (format === "octal")
                arr.push(val.toString(8));

            else if (format === "morse")
                arr.push(val.toString(2).padStart(8, "0")
                    .replace(/1/g, "-")
                    .replace(/0/g, "."));

            else if (format === "color")
                arr.push("#" + val.toString(16).padStart(2, "0")
                    + val.toString(16).padStart(2, "0")
                    + val.toString(16).padStart(2, "0"));
        }

        return arr.join(" ");
    }

    // ======================================
    // ANIMATION LOOP
    // ======================================

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
function resize() {
    if (!renderer || !camera) return;

    const width = container.clientWidth;
    const height = 400;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}
    return {
        init,
        render,
        stress,
        resize
    };

})();