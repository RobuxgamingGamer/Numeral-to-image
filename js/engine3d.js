"use strict";

window.Engine3D = (function () {

    let scene, camera, renderer, container, group;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    // ================= INIT =================

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
        light1.position.set(10, 20, 10);
        scene.add(light1);

        const light2 = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(light2);

        group = new THREE.Group();
        scene.add(group);

        enableSwipe();
        animate();
    }

    // ================= SWIPE =================

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

            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;

            group.rotation.y += dx * 0.005;
            group.rotation.x += dy * 0.005;

            // clamp vertical
            group.rotation.x = Math.max(
                -Math.PI / 2,
                Math.min(Math.PI / 2, group.rotation.x)
            );

            lastX = e.clientX;
            lastY = e.clientY;
        });
    }

    // ================= CLEAR =================

    function clear() {
        while (group.children.length > 0) {
            group.remove(group.children[0]);
        }
    }

    // ================= PARSE =================

    function parseByte(v, f) {
        if (f === "binary") return parseInt(v, 2);
        if (f === "decimal") return parseInt(v);
        if (f === "hex") return parseInt(v, 16);
        if (f === "octal") return parseInt(v, 8);
        if (f === "morse") {
            return parseInt(v.replace(/-/g, "1").replace(/\./g, "0"), 2);
        }
        return 0;
    }

    // ================= BUILD =================

    function build(values, format, x, y, z, alpha, gloss) {

        let i = 0;

        for (let xi = 0; xi < x; xi++) {
            for (let yi = 0; yi < y; yi++) {
                for (let zi = 0; zi < z; zi++) {

                    let color;

                    if (format === "color") {
                        color = values[i++];
                    } else {
                        const r = parseByte(values[i++], format);
                        const g = parseByte(values[i++], format);
                        const b = parseByte(values[i++], format);
                        color = `rgb(${r},${g},${b})`;
                    }

                    const mat = new THREE.MeshStandardMaterial({
                        color,
                        transparent: true,
                        opacity: parseFloat(alpha),
                        roughness: 1 - Math.min(gloss / 200, 1),
                        metalness: 0.5
                    });

                    const cube = new THREE.Mesh(
                        new THREE.BoxGeometry(1, 1, 1),
                        mat
                    );

                    cube.position.set(
                        xi - x / 2,
                        yi - y / 2,
                        zi - z / 2
                    );

                    group.add(cube);
                }
            }
        }
    }

    // ================= RENDER =================

    function render(size, format, input, alpha, gloss) {

        const t0 = performance.now();

        clear();

        const [x, y, z] = size.split("-").map(Number);
        const values = input.trim().split(/\s+/);

        build(values, format, x, y, z, alpha, gloss);

        const dt = performance.now() - t0;

        return {
            ms: dt.toFixed(2),
            fps: (1000 / (dt || 0.001)).toFixed(2)
        };
    }

    // ================= STRESS =================

    function stress(size, format) {

        const [x, y, z] = size.split("-").map(Number);

        const total = format === "color"
            ? x * y * z
            : x * y * z * 3;

        let arr = [];

        for (let i = 0; i < total; i++) {

            const v = Math.floor(Math.random() * 256);

            if (format === "binary")
                arr.push(v.toString(2).padStart(8, "0"));

            else if (format === "decimal")
                arr.push(v.toString());

            else if (format === "hex")
                arr.push(v.toString(16));

            else if (format === "octal")
                arr.push(v.toString(8));

            else if (format === "morse")
                arr.push(v.toString(2).padStart(8, "0")
                    .replace(/1/g, "-")
                    .replace(/0/g, "."));

            else if (format === "color")
                arr.push("#" + v.toString(16).padStart(2, "0").repeat(3));
        }

        return arr.join(" ");
    }

    function resize() {
        if (!renderer) return;

        const w = container.clientWidth;
        const h = 500;

        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    return { init, render, stress, resize };

})();