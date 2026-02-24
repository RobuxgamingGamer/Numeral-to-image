// ======================================================
// NUMERAL VOXEL ENGINE — UTILITIES
// Shared logic for 2D and 3D engines
// No UI binding, no fluff
// ======================================================

"use strict";

const Utils = (function () {

    // ==================================================
    // BASIC HELPERS
    // ==================================================

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function isInt(n) {
        return Number.isInteger(Number(n));
    }

    function splitValues(input) {
        return input.trim().length === 0
            ? []
            : input.trim().split(/\s+/);
    }

    // ==================================================
    // SIZE PARSERS
    // ==================================================

    function parse2DSize(sizeStr, max) {

        const parts = sizeStr.split("-");
        if (parts.length !== 2) return null;

        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);

        if (!isInt(x) || !isInt(y)) return null;
        if (x < 1 || y < 1) return null;
        if (x > max || y > max) return null;

        return { x, y };
    }

    function parse3DSize(sizeStr, max) {

        const parts = sizeStr.split("-");
        if (parts.length !== 3) return null;

        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);
        const z = parseInt(parts[2]);

        if (!isInt(x) || !isInt(y) || !isInt(z)) return null;
        if (x < 1 || y < 1 || z < 1) return null;
        if (x > max || y > max || z > max) return null;

        return { x, y, z };
    }

    // ==================================================
    // BYTE PARSING
    // ==================================================

    function parseByte(value, format) {

        if (format === "binary") {
            if (!/^[01]{8}$/.test(value)) return null;
            return parseInt(value, 2);
        }

        if (format === "decimal") {
            const n = parseInt(value);
            return (n >= 0 && n <= 255) ? n : null;
        }

        if (format === "hex") {
            if (!/^[0-9a-fA-F]{1,2}$/.test(value)) return null;
            return parseInt(value, 16);
        }

        if (format === "octal") {
            if (!/^[0-7]{1,3}$/.test(value)) return null;
            const n = parseInt(value, 8);
            return (n <= 255) ? n : null;
        }

        if (format === "morse") {
            if (!/^[\.\-]{8}$/.test(value)) return null;
            const bin = value.replace(/-/g, "1").replace(/\./g, "0");
            return parseInt(bin, 2);
        }

        return null;
    }

    // ==================================================
    // FORMAT CONVERSIONS
    // ==================================================

    function byteToFormat(value, format) {

        value = clamp(value, 0, 255);

        if (format === "binary")
            return value.toString(2).padStart(8, "0");

        if (format === "decimal")
            return value.toString();

        if (format === "hex")
            return value.toString(16).toUpperCase();

        if (format === "octal")
            return value.toString(8);

        if (format === "morse")
            return value.toString(2)
                .padStart(8, "0")
                .replace(/1/g, "-")
                .replace(/0/g, ".");

        return null;
    }

    // ==================================================
    // RANDOM GENERATORS
    // ==================================================

    function randomByte() {
        return Math.floor(Math.random() * 256);
    }

    function randomColorCode() {
        return "#" +
            randomByte().toString(16).padStart(2, "0") +
            randomByte().toString(16).padStart(2, "0") +
            randomByte().toString(16).padStart(2, "0");
    }

    function generateStressData(totalPixels, format) {

        let arr = [];

        for (let i = 0; i < totalPixels; i++) {

            if (format === "color") {
                arr.push(randomColorCode());
            } else {

                for (let j = 0; j < 3; j++) {
                    const val = randomByte();
                    arr.push(byteToFormat(val, format));
                }
            }
        }

        return arr.join(" ");
    }

    // ==================================================
    // VALIDATION HELPERS
    // ==================================================

    function expectedValueCount2D(x, y, format) {
        return format === "color"
            ? x * y
            : x * y * 3;
    }

    function expectedValueCount3D(x, y, z, format) {
        return format === "color"
            ? x * y * z
            : x * y * z * 3;
    }

    function validateInputCount(valuesArray, expected) {
        return valuesArray.length === expected;
    }

    // ==================================================
    // EXPORT
    // ==================================================

    return {

        clamp,
        splitValues,

        parse2DSize,
        parse3DSize,

        parseByte,
        byteToFormat,

        randomByte,
        randomColorCode,
        generateStressData,

        expectedValueCount2D,
        expectedValueCount3D,
        validateInputCount

    };

})();