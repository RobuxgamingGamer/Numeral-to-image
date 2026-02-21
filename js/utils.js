// ===============================================================
// Numeral Voxel Engine - Shared Utilities
// utils.js
// Clean, purpose-built, no filler
// ===============================================================

"use strict";

const Utils = (function () {

    // ===========================================================
    // CONSTANTS
    // ===========================================================

    const BYTE_MIN = 0;
    const BYTE_MAX = 255;

    // ===========================================================
    // BASIC HELPERS
    // ===========================================================

    function clamp(value, min = BYTE_MIN, max = BYTE_MAX) {
        return Math.min(Math.max(value, min), max);
    }

    function toInteger(value) {
        const n = Number(value);
        return Number.isInteger(n) ? n : null;
    }

    // ===========================================================
    // COLOR CONVERSION
    // ===========================================================

    function componentToHex(c) {
        const hex = clamp(c).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return (
            "#" +
            componentToHex(r) +
            componentToHex(g) +
            componentToHex(b)
        );
    }

    function hexToRgb(hex) {
        if (!/^#([0-9a-fA-F]{6})$/.test(hex)) return null;

        const bigint = parseInt(hex.slice(1), 16);

        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }

    // ===========================================================
    // FORMAT VALIDATION
    // ===========================================================

    function validateBinary(v) {
        return /^[01]{8}$/.test(v);
    }

    function validateDecimal(v) {
        const n = toInteger(v);
        return n !== null && n >= BYTE_MIN && n <= BYTE_MAX;
    }

    function validateHex(v) {
        return /^[0-9a-fA-F]{1,2}$/.test(v);
    }

    function validateOctal(v) {
        if (!/^[0-7]{1,3}$/.test(v)) return false;
        const n = parseInt(v, 8);
        return n >= BYTE_MIN && n <= BYTE_MAX;
    }

    function validateMorse(v) {
        return /^[\.\-]{8}$/.test(v);
    }

    function validateColorCode(v) {
        return /^#([0-9a-fA-F]{6})$/.test(v);
    }

    // ===========================================================
    // BYTE PARSER (FORMAT ROUTER)
    // ===========================================================

    function parseByte(token, format) {

        switch (format) {

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
                const bin = token
                    .replace(/-/g, "1")
                    .replace(/\./g, "0");
                return parseInt(bin, 2);

            default:
                return null;
        }
    }

    // ===========================================================
    // TOKEN UTILITIES
    // ===========================================================

    function tokenize(input) {
        if (!input) return [];
        return input.trim().split(/\s+/);
    }

    function expectedTokenCount(width, height, depth, format) {

        const pixelCount = depth
            ? width * height * depth
            : width * height;

        if (format === "colorcode") {
            return pixelCount;
        }

        return pixelCount * 3;
    }

    // ===========================================================
    // STRESS GENERATOR
    // ===========================================================

    function randomByte() {
        return Math.floor(Math.random() * 256);
    }

    function encodeByte(byte, format) {

        switch (format) {

            case "binary":
                return byte.toString(2).padStart(8, "0");

            case "decimal":
                return byte.toString(10);

            case "hex":
                return byte.toString(16).toUpperCase();

            case "octal":
                return byte.toString(8);

            case "morse":
                return byte
                    .toString(2)
                    .padStart(8, "0")
                    .replace(/1/g, "-")
                    .replace(/0/g, ".");

            default:
                return "";
        }
    }

    function stressGenerate(format, count) {

        const output = [];

        for (let i = 0; i < count; i++) {

            if (format === "colorcode") {

                const r = randomByte();
                const g = randomByte();
                const b = randomByte();
                output.push(rgbToHex(r, g, b));

            } else {

                for (let c = 0; c < 3; c++) {
                    const byte = randomByte();
                    output.push(encodeByte(byte, format));
                }
            }
        }

        return output.join(" ");
    }

    // ===========================================================
    // PERFORMANCE STATS
    // ===========================================================

    function calculateStats(startTime) {

        const end = performance.now();
        const delta = end - startTime;

        const ms = delta.toFixed(2) + " ms";
        const fps = delta > 0
            ? (1000 / delta).toFixed(2)
            : "∞";

        return { ms, fps };
    }

    // ===========================================================
    // SIZE PARSERS
    // ===========================================================

    function parse2DSize(raw, max) {

        const parts = raw.split("-");
        if (parts.length !== 2) return null;

        const x = toInteger(parts[0]);
        const y = toInteger(parts[1]);

        if (x === null || y === null) return null;
        if (x < 1 || y < 1) return null;
        if (x > max || y > max) return null;

        return { x, y };
    }

    function parse3DSize(raw, max) {

        const parts = raw.split("-");
        if (parts.length !== 3) return null;

        const x = toInteger(parts[0]);
        const y = toInteger(parts[1]);
        const z = toInteger(parts[2]);

        if (x === null || y === null || z === null) return null;
        if (x < 1 || y < 1 || z < 1) return null;
        if (x > max || y > max || z > max) return null;

        return { x, y, z };
    }

    // ===========================================================
    // DOM HELPERS
    // ===========================================================

    function byId(id) {
        return document.getElementById(id);
    }

    function setText(id, text) {
        const el = byId(id);
        if (el) el.textContent = text;
    }

    function setValue(id, value) {
        const el = byId(id);
        if (el) el.value = value;
    }

    function show(id) {
        const el = byId(id);
        if (el) el.style.display = "block";
    }

    function hide(id) {
        const el = byId(id);
        if (el) el.style.display = "none";
    }

    // ===========================================================
    // EXPORTS
    // ===========================================================

    return {
        clamp,
        rgbToHex,
        hexToRgb,

        validateBinary,
        validateDecimal,
        validateHex,
        validateOctal,
        validateMorse,
        validateColorCode,

        parseByte,
        tokenize,
        expectedTokenCount,

        stressGenerate,

        calculateStats,

        parse2DSize,
        parse3DSize,

        byId,
        setText,
        setValue,
        show,
        hide
    };

})();