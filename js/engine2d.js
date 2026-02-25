// ======================================================
// NUMERAL VOXEL ENGINE — 2D CORE
// Pure rendering engine (no UI control)
// ======================================================

"use strict";
window.Engine2D = (function () {

    let canvas, ctx;

    function init(canvasId) {
        canvas = document.getElementById(canvasId);
        ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
    }

    // ==================================================
    // FORMAT PARSER
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
    // RENDER
    // ==================================================

    function render(sizeStr, format, inputStr) {

        const start = performance.now();

        const parts = sizeStr.split("-");
        const width = parseInt(parts[0]);
        const height = parseInt(parts[1]);

        canvas.width = width;
        canvas.height = height;

        const imgData = ctx.createImageData(width, height);
        const values = inputStr.trim().split(/\s+/);

        const totalPixels = width * height;

        if (format === "color") {
            if (values.length !== totalPixels) {
                throw new Error("Incorrect number of color codes.");
            }
        } else {
            if (values.length !== totalPixels * 3) {
                throw new Error("Incorrect number of values.");
            }
        }

        for (let i = 0; i < totalPixels; i++) {

            let r, g, b;

            if (format === "color") {
                const hex = values[i].replace("#", "");
                if (hex.length !== 6) {
                    throw new Error("Invalid color code.");
                }
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
            } else {
                r = parseByte(values[i * 3], format);
                g = parseByte(values[i * 3 + 1], format);
                b = parseByte(values[i * 3 + 2], format);

                if (r === null || g === null || b === null) {
                    throw new Error("Invalid numeric value detected.");
                }
            }

            imgData.data[i * 4] = r;
            imgData.data[i * 4 + 1] = g;
            imgData.data[i * 4 + 2] = b;
            imgData.data[i * 4 + 3] = 255;
        }

        ctx.putImageData(imgData, 0, 0);

        const scale = Math.min(500 / width, 500 / height);
        canvas.style.width = (width * scale) + "px";
        canvas.style.height = (height * scale) + "px";

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

    function stress(sizeStr, format) {

        const parts = sizeStr.split("-");
        const width = parseInt(parts[0]);
        const height = parseInt(parts[1]);

        const totalPixels = width * height;
        let arr = [];

        function randomByte() {
            return Math.floor(Math.random() * 256);
        }

        for (let i = 0; i < totalPixels; i++) {

            if (format === "color") {
                arr.push("#" + randomByte().toString(16).padStart(2, "0") +
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
    // PNG DOWNLOAD
    // ==================================================

    function download() {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }

    return {
        init,
        render,
        stress,
        download
    };

})();