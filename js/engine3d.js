// ===============================================================
// Numeral Voxel Engine - GOLD BUILD
// engine3d.js
// REAL ARCHITECTURE VERSION (No Fluff)
// ===============================================================

'use strict';

// ===============================================================
// ENGINE CONSTANTS
// ===============================================================

const ENGINE3D_CONSTANTS = {
    MAX_CUBE: 10,
    MAX_FACES: 25,
    DEFAULT_SIZE: { x: 2, y: 2, z: 2 },
    CLEAR_COLOR: 0x000000
};

// ===============================================================
// FORMAT VALIDATION + PARSING LAYER
// ===============================================================

const FormatParser3D = {

    validateBinary(v) { return /^[01]{8}$/.test(v); },
    validateDecimal(v) {
        const n = Number(v);
        return Number.isInteger(n) && n >= 0 && n <= 255;
    },
    validateHex(v) { return /^[0-9a-fA-F]{1,2}$/.test(v); },
    validateOctal(v) {
        if (!/^[0-7]{1,3}$/.test(v)) return false;
        return parseInt(v, 8) <= 255;
    },
    validateMorse(v) { return /^[\.-]{8}$/.test(v); },
    validateColorCode(v) { return /^#([0-9a-fA-F]{6})$/.test(v); },

    parseByte(token, format) {

        switch (format) {

            case "binary":
                if (!this.validateBinary(token)) return null;
                return parseInt(token, 2);

            case "decimal":
                if (!this.validateDecimal(token)) return null;
                return parseInt(token, 10);

            case "hex":
                if (!this.validateHex(token)) return null;
                return parseInt(token, 16);

            case "octal":
                if (!this.validateOctal(token)) return null;
                return parseInt(token, 8);

            case "morse":
                if (!this.validateMorse(token)) return null;
                const bin = token.replace(/-/g, "1").replace(/\./g, "0");
                return parseInt(bin, 2);

            default:
                return null;
        }
    },

    parseColorCode(token) {
        if (!this.validateColorCode(token)) return null;
        return Utils.hexToRgb(token);
    }
};

// ===============================================================
// STRESS GENERATOR (REAL IMPLEMENTATION)
// ===============================================================

const StressGenerator3D = {

    randomByte() {
        return Math.floor(Math.random() * 256);
    },

    generate(format, pixelCount) {

        const output = [];

        for (let i = 0; i < pixelCount; i++) {

            if (format === "colorcode") {
                const r = this.randomByte();
                const g = this.randomByte();
                const b = this.randomByte();
                output.push(Utils.rgbToHex(r, g, b));
            } else {
                for (let c = 0; c < 3; c++) {
                    const byte = this.randomByte();
                    output.push(this.encodeByte(byte, format));
                }
            }
        }

        return output.join(" ");
    },

    encodeByte(byte, format) {

        switch (format) {
            case "binary": return byte.toString(2).padStart(8, "0");
            case "decimal": return byte.toString(10);
            case "hex": return byte.toString(16).toUpperCase();
            case "octal": return byte.toString(8);
            case "morse":
                return byte.toString(2)
                    .padStart(8, "0")
                    .replace(/1/g, "-")
                    .replace(/0/g, ".");
            default:
                return "";
        }
    }
};

// ===============================================================
// VOXEL FACTORY (NO DUPLICATE MATERIAL LEAKS)
// ===============================================================

class VoxelFactory {

    constructor(scene) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.scene.add(this.group);
        this.materialCache = new Map();
    }

    clear() {
        while (this.group.children.length) {
            const obj = this.group.children[0];
            obj.geometry.dispose();
            obj.material.dispose();
            this.group.remove(obj);
        }
        this.materialCache.clear();
    }

    createMaterial(color, opacity) {

        const key = color.getHex() + "_" + opacity;

        if (this.materialCache.has(key)) {
            return this.materialCache.get(key);
        }

        const material = new THREE.MeshStandardMaterial({
            color: color,
            transparent: opacity < 1,
            opacity: opacity
        });

        this.materialCache.set(key, material);
        return material;
    }

    createVoxel(x, y, z, size, color, opacity) {

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = this.createMaterial(color, opacity);

        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(
            x - size.x / 2 + 0.5,
            y - size.y / 2 + 0.5,
            z - size.z / 2 + 0.5
        );

        this.group.add(mesh);
    }
}

// ===============================================================
// CUBE BUILDER (SOLID)
// ===============================================================

const CubeBuilder = {

    build(factory, size, tokens, format, opacity) {

        let t = 0;
        const multiplier = format === "colorcode" ? 1 : 3;

        for (let x = 0; x < size.x; x++) {
            for (let y = 0; y < size.y; y++) {
                for (let z = 0; z < size.z; z++) {

                    let r, g, b;

                    if (format === "colorcode") {

                        const rgb = FormatParser3D.parseColorCode(tokens[t++]);
                        if (!rgb) return false;

                        r = rgb.r;
                        g = rgb.g;
                        b = rgb.b;

                    } else {

                        r = FormatParser3D.parseByte(tokens[t++], format);
                        g = FormatParser3D.parseByte(tokens[t++], format);
                        b = FormatParser3D.parseByte(tokens[t++], format);

                        if (r === null || g === null || b === null) return false;
                    }

                    const color = new THREE.Color(r / 255, g / 255, b / 255);
                    factory.createVoxel(x, y, z, size, color, opacity);
                }
            }
        }

        return true;
    }
};

// ===============================================================
// FACES BUILDER (HOLLOW SURFACE ONLY)
// ===============================================================

const FacesBuilder = {

    build(factory, size, faceInputs, format, opacity) {

        const faceDefinitions = [
            { name: "front",  getPos: (i, j) => ({ x: i, y: j, z: size.z - 1 }), width: size.x, height: size.y },
            { name: "back",   getPos: (i, j) => ({ x: i, y: j, z: 0 }), width: size.x, height: size.y },
            { name: "left",   getPos: (i, j) => ({ x: 0, y: j, z: i }), width: size.z, height: size.y },
            { name: "right",  getPos: (i, j) => ({ x: size.x - 1, y: j, z: i }), width: size.z, height: size.y },
            { name: "top",    getPos: (i, j) => ({ x: i, y: size.y - 1, z: j }), width: size.x, height: size.z },
            { name: "bottom", getPos: (i, j) => ({ x: i, y: 0, z: j }), width: size.x, height: size.z }
        ];

        for (const face of faceDefinitions) {

            const tokens = faceInputs[face.name];
            const multiplier = format === "colorcode" ? 1 : 3;
            const expected = face.width * face.height * multiplier;

            if (tokens.length !== expected) return false;

            let t = 0;

            for (let i = 0; i < face.width; i++) {
                for (let j = 0; j < face.height; j++) {

                    let r, g, b;

                    if (format === "colorcode") {

                        const rgb = FormatParser3D.parseColorCode(tokens[t++]);
                        if (!rgb) return false;

                        r = rgb.r;
                        g = rgb.g;
                        b = rgb.b;

                    } else {

                        r = FormatParser3D.parseByte(tokens[t++], format);
                        g = FormatParser3D.parseByte(tokens[t++], format);
                        b = FormatParser3D.parseByte(tokens[t++], format);

                        if (r === null || g === null || b === null) return false;
                    }

                    const pos = face.getPos(i, j);
                    const color = new THREE.Color(r / 255, g / 255, b / 255);
                    factory.createVoxel(pos.x, pos.y, pos.z, size, color, opacity);
                }
            }
        }

        return true;
    }
};

// ===============================================================
// MAIN ENGINE CLASS
// ===============================================================

class Engine3D {

    constructor() {

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(ENGINE3D_CONSTANTS.CLEAR_COLOR);

        this.container = document.getElementById("threeContainer");

        this.camera = new THREE.PerspectiveCamera(
            70,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );

        this.camera.position.set(6, 6, 6);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );

        this.container.appendChild(this.renderer.domElement);

        const ambient = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambient);

        const dir = new THREE.DirectionalLight(0xffffff, 0.6);
        dir.position.set(5, 10, 7);
        this.scene.add(dir);

        this.factory = new VoxelFactory(this.scene);

        this.size = ENGINE3D_CONSTANTS.DEFAULT_SIZE;
        this.format = "binary";
        this.mode = "cube";

        this.opacity = 1;

        this.bindUI();
        this.animate();
        this.handleResize();
    }

    bindUI() {

        document.getElementById("format3D")
            .addEventListener("change", e => this.format = e.target.value);

        document.getElementById("editCubeBtn")
            .addEventListener("click", () => this.mode = "cube");

        document.getElementById("editFacesBtn")
            .addEventListener("click", () => this.mode = "faces");

        document.getElementById("convert3DBtn")
            .addEventListener("click", () => this.convert());

        document.getElementById("stress3DBtn")
            .addEventListener("click", () => this.stress());

        document.getElementById("transparency3D")
            .addEventListener("input", e => {
                this.opacity = parseFloat(e.target.value);
                this.updateTransparency();
            });

        window.addEventListener("resize", () => this.handleResize());
    }

    handleResize() {

        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

    parseSize() {

        const raw = document.getElementById("size3D").value.trim();
        const parts = raw.split("-");

        if (parts.length !== 3) return false;

        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);
        const z = parseInt(parts[2]);

        if (!x || !y || !z) return false;

        if (this.mode === "cube" &&
            (x > ENGINE3D_CONSTANTS.MAX_CUBE ||
             y > ENGINE3D_CONSTANTS.MAX_CUBE ||
             z > ENGINE3D_CONSTANTS.MAX_CUBE)) return false;

        if (this.mode === "faces" &&
            (x > ENGINE3D_CONSTANTS.MAX_FACES ||
             y > ENGINE3D_CONSTANTS.MAX_FACES ||
             z > ENGINE3D_CONSTANTS.MAX_FACES)) return false;

        this.size = { x, y, z };
        return true;
    }

    convert() {

        if (!this.parseSize()) return;

        const start = performance.now();

        this.factory.clear();

        if (this.mode === "cube") {

            const tokens = document.getElementById("input3D")
                .value.trim().split(/\s+/);

            const multiplier = this.format === "colorcode" ? 1 : 3;
            const expected = this.size.x * this.size.y * this.size.z * multiplier;

            if (tokens.length !== expected) return;

            const ok = CubeBuilder.build(
                this.factory,
                this.size,
                tokens,
                this.format,
                this.opacity
            );

            if (!ok) return;

        } else {

            const faceInputs = {
                front: document.getElementById("faceFront").value.trim().split(/\s+/),
                back: document.getElementById("faceBack").value.trim().split(/\s+/),
                left: document.getElementById("faceLeft").value.trim().split(/\s+/),
                right: document.getElementById("faceRight").value.trim().split(/\s+/),
                top: document.getElementById("faceTop").value.trim().split(/\s+/),
                bottom: document.getElementById("faceBottom").value.trim().split(/\s+/)
            };

            const ok = FacesBuilder.build(
                this.factory,
                this.size,
                faceInputs,
                this.format,
                this.opacity
            );

            if (!ok) return;
        }

        const stats = Utils.calculateStats(start);
        document.getElementById("ms3D").textContent = stats.ms;
        document.getElementById("fps3D").textContent = stats.fps;
    }

    stress() {

        if (!this.parseSize()) return;

        if (this.mode === "cube") {

            const total = this.size.x * this.size.y * this.size.z;
            document.getElementById("input3D").value =
                StressGenerator3D.generate(this.format, total);

        } else {

            const faces = {
                front: this.size.x * this.size.y,
                back: this.size.x * this.size.y,
                left: this.size.z * this.size.y,
                right: this.size.z * this.size.y,
                top: this.size.x * this.size.z,
                bottom: this.size.x * this.size.z
            };

            for (const key in faces) {
                document.getElementById("face" + key.charAt(0).toUpperCase() + key.slice(1))
                    .value = StressGenerator3D.generate(this.format, faces[key]);
            }
        }
    }

    updateTransparency() {
        this.factory.group.traverse(obj => {
            if (obj.isMesh) {
                obj.material.opacity = this.opacity;
                obj.material.transparent = this.opacity < 1;
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }
}

// ===============================================================
// BOOTSTRAP
// ===============================================================

document.addEventListener("DOMContentLoaded", () => {
    new Engine3D();
});
