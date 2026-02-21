// =====================================================
// Numeral Voxel Engine - GOLD BUILD
// engine2d.js (NO FLUFF EDITION)
// ImageData-based high-performance renderer
// =====================================================

const Engine2D = (function () {
    "use strict";

    // ===============================
    // STATE
    // ===============================

    const MAX_SIZE = 1500;

    let canvas;
    let ctx;

    let currentFormat = "binary";
    let currentSize = { x: 2, y: 2 };

    // ===============================
    // INITIALIZATION
    // ===============================

    function init() {
        canvas = document.getElementById("canvas2D");
        ctx = canvas.getContext("2d", { willReadFrequently: false });

        bindUI();
        resizeCanvas();
    }

    function bindUI() {
        document.getElementById("format2D").addEventListener("change", (e) => {
            currentFormat = e.target.value;
        });

        document.getElementById("convert2DBtn").addEventListener("click", render);
        document.getElementById("stress2DBtn").addEventListener("click", stress);
        window.addEventListener("resize", resizeCanvas);
    }

    function resizeCanvas() {
        canvas.style.width = "100%";
        canvas.style.height = "auto";
    }

    // ===============================
    // SIZE PARSER
    // ===============================

    function parseSize() {
        const raw = document.getElementById("size2D").value.trim();
        const parts = raw.split("-");

        if (parts.length !== 2) {
            showError("Size must be X-Y.");
            return false;
        }

        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);

        if (
            isNaN(x) ||
            isNaN(y) ||
            x < 1 ||
            y < 1 ||
            x > MAX_SIZE ||
            y > MAX_SIZE
        ) {
            showError("Size must be between 1 and 1500.");
            return false;
        }

        currentSize = { x, y };
        return true;
    }

    // ===============================
    // FORMAT VALIDATORS
    // ===============================

    function validateBinary(v) {
        return /^[01]{8}$/.test(v);
    }

    function validateDecimal(v) {
        const n = Number(v);
        return Number.isInteger(n) && n >= 0 && n <= 255;
    }

    function validateHex(v) {
        return /^[0-9a-fA-F]{1,2}$/.test(v);
    }

    function validateOctal(v) {
        if (!/^[0-7]{1,3}$/.test(v)) return false;
        const n = parseInt(v, 8);
        return n <= 255;
    }

    function validateMorse(v) {
        return /^[\.\-]{8}$/.test(v);
    }

    function validateColorCode(v) {
        return /^#([0-9a-fA-F]{6})$/.test(v);
    }

    // ===============================
    // PARSERS
    // ===============================

    function parseByte(token) {
        switch (currentFormat) {
            case "binary":
                if (!validateBinary(token)) return null;
                return parseInt(token, 2);

            case "decimal":
                if (!validateDecimal(token)) return null;
                return parseInt(token, 10);

            case "hex":
                if (!validateHex(token)) return null;
                return parseInt(token, 16);

            case "octal":
                if (!validateOctal(token)) return null;
                return parseInt(token, 8);

            case "morse":
                if (!validateMorse(token)) return null;
                const bin = token.replace(/-/g, "1").replace(/\./g, "0");
                return parseInt(bin, 2);

            default:
                return null;
        }
    }

    function parseColorCode(token) {
        if (!validateColorCode(token)) return null;
        return Utils.hexToRgb(token);
    }

    // ===============================
    // STRESS GENERATOR
    // ===============================

    function stress() {
        if (!parseSize()) return;

        const total = currentSize.x * currentSize.y;
        const output = Utils.stressGenerate(currentFormat, total);

        document.getElementById("input2D").value = output;
    }

    // ===============================
    // RENDER CORE
    // ===============================

    function render() {
        clearError();

        if (!parseSize()) return;

        const start = performance.now();

        const input = document.getElementById("input2D").value.trim();
        if (!input) {
            showError("Input is empty.");
            return;
        }

        const tokens = input.split(/\s+/);

        const expected =
            currentFormat === "colorcode"
                ? currentSize.x * currentSize.y
                : currentSize.x * currentSize.y * 3;

        if (tokens.length !== expected) {
            showError("Incorrect number of values.");
            return;
        }

        canvas.width = currentSize.x;
        canvas.height = currentSize.y;

        const imageData = ctx.createImageData(
            currentSize.x,
            currentSize.y
        );

        let t = 0;

        for (let y = 0; y < currentSize.y; y++) {
            for (let x = 0; x < currentSize.x; x++) {

                let r, g, b;

                if (currentFormat === "colorcode") {
                    const rgb = parseColorCode(tokens[t++]);
                    if (!rgb) {
                        showError("Invalid color code detected.");
                        return;
                    }
                    r = rgb.r;
                    g = rgb.g;
                    b = rgb.b;
                } else {
                    r = parseByte(tokens[t++]);
                    g = parseByte(tokens[t++]);
                    b = parseByte(tokens[t++]);

                    if (r === null || g === null || b === null) {
                        showError("Invalid numeric value detected.");
                        return;
                    }
                }

                const index = (y * currentSize.x + x) * 4;

                imageData.data[index] = r;
                imageData.data[index + 1] = g;
                imageData.data[index + 2] = b;
                imageData.data[index + 3] = 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);

        updateStats(start);
    }

    // ===============================
    // STATS
    // ===============================

    function updateStats(start) {
        const stats = Utils.calculateStats(start);

        document.getElementById("ms2D").textContent = stats.ms;
        document.getElementById("fps2D").textContent = stats.fps;
    }

    // ===============================
    // ERROR HANDLING
    // ===============================

    function showError(msg) {
        console.warn(msg);
    }

    function clearError() {
        // Reserved for UI integration
    }

    // ===============================
    // PUBLIC API
    // ===============================

    return {
        init
    };

})();

// ===============================
// BOOTSTRAP
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    Engine2D.init();
});