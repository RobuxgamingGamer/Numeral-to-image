/* ============================================================
   NUMERAL ENGINE — 2D CORE SYSTEM (FULL REBUILD)

   Max Resolution: 1500-1500
   Formats:
     - binary
     - decimal
     - hex
     - octal
     - morse
     - colorcode

   Performance:
     - Measured ONLY during Convert
     - Frozen stats
     - No frame updates

   Architecture Goals:
     - Strict validation
     - Deterministic pixel writing
     - Zero silent failure
     - Clear error isolation
     - Layout-safe scaling
   ============================================================ */


/* ============================================================
   DOM REFERENCES
============================================================ */

const canvas2D = document.getElementById("canvas2D");
const ctx2D = canvas2D.getContext("2d");

const input2D = document.getElementById("input2D");
const size2DInput = document.getElementById("size2D");
const format2DSelect = document.getElementById("format2D");

const stress2DBtn = document.getElementById("stress2DBtn");
const convert2DBtn = document.getElementById("convert2DBtn");

const error2D = document.getElementById("error2D");
const stats2D = document.getElementById("stats2D");


/* ============================================================
   CONSTANTS
============================================================ */

const MAX_2D_SIZE = 1500;
const MAX_CANVAS_DISPLAY = 500;


/* ============================================================
   STATE OBJECT
============================================================ */

const state2D = {
    width: 0,
    height: 0,
    format: "binary"
};


/* ============================================================
   INITIALIZATION
============================================================ */

function init2DEngine() {

    stress2DBtn.addEventListener("click", stress2D);
    convert2DBtn.addEventListener("click", convert2D);

    format2DSelect.addEventListener("change", () => {
        state2D.format = format2DSelect.value;
    });

    state2D.format = format2DSelect.value;
}

init2DEngine();


/* ============================================================
   SIZE VALIDATION
============================================================ */

function parseSize2D() {

    const raw = size2DInput.value.trim();
    const parts = raw.split("-");

    if (parts.length !== 2) {
        show2DError("Size must be X-Y format.");
        return null;
    }

    const w = parseInt(parts[0], 10);
    const h = parseInt(parts[1], 10);

    if (!Number.isInteger(w) || !Number.isInteger(h)) {
        show2DError("Size must be integers.");
        return null;
    }

    if (w <= 0 || h <= 0) {
        show2DError("Size must be positive.");
        return null;
    }

    if (w > MAX_2D_SIZE || h > MAX_2D_SIZE) {
        show2DError("Max size is 1500-1500.");
        return null;
    }

    state2D.width = w;
    state2D.height = h;

    return { w, h };
}


/* ============================================================
   FORMAT PARSING LAYER
============================================================ */

function parseByte2D(token, format) {

    switch (format) {

        case "binary":
            if (!/^[01]{8}$/.test(token)) return null;
            return parseInt(token, 2);

        case "decimal":
            if (!/^\d+$/.test(token)) return null;
            const d = parseInt(token, 10);
            return (d >= 0 && d <= 255) ? d : null;

        case "hex":
            if (!/^[0-9a-fA-F]{1,2}$/.test(token)) return null;
            return parseInt(token, 16);

        case "octal":
            if (!/^[0-7]{1,3}$/.test(token)) return null;
            return parseInt(token, 8);

        case "morse":
            if (!/^[\.\-]{8}$/.test(token)) return null;
            const binary = token
                .replace(/-/g, "1")
                .replace(/\./g, "0");
            return parseInt(binary, 2);

        default:
            return null;
    }
}


/* ============================================================
   STRESS MODE GENERATOR
============================================================ */

function stress2D() {

    clear2DError();
    clear2DStats();

    const size = parseSize2D();
    if (!size) return;

    const { w, h } = size;
    const totalPixels = w * h;
    const format = state2D.format;

    const output = [];

    for (let i = 0; i < totalPixels; i++) {

        if (format === "colorcode") {

            const r = randomByte();
            const g = randomByte();
            const b = randomByte();

            output.push(
                "#" +
                r.toString(16).padStart(2, "0") +
                g.toString(16).padStart(2, "0") +
                b.toString(16).padStart(2, "0")
            );

        } else {

            for (let c = 0; c < 3; c++) {

                const value = randomByte();

                switch (format) {
                    case "binary":
                        output.push(value.toString(2).padStart(8, "0"));
                        break;
                    case "decimal":
                        output.push(value.toString());
                        break;
                    case "hex":
                        output.push(value.toString(16).toUpperCase());
                        break;
                    case "octal":
                        output.push(value.toString(8));
                        break;
                    case "morse":
                        const bin = value.toString(2).padStart(8, "0");
                        output.push(
                            bin.replace(/1/g, "-")
                               .replace(/0/g, ".")
                        );
                        break;
                }
            }
        }
    }

    input2D.value = output.join(" ");
}


/* ============================================================
   CONVERT CORE
============================================================ */

function convert2D() {

    clear2DError();
    clear2DStats();

    const startTime = performance.now();

    const size = parseSize2D();
    if (!size) return;

    const { w, h } = size;
    const format = state2D.format;

    const rawInput = input2D.value.trim();
    if (!rawInput) {
        show2DError("Input is empty.");
        return;
    }

    const tokens = rawInput.split(/\s+/);

    const expectedTokenCount =
        format === "colorcode"
        ? w * h
        : w * h * 3;

    if (tokens.length !== expectedTokenCount) {
        show2DError(
            "Expected " + expectedTokenCount +
            " values. Got " + tokens.length + "."
        );
        return;
    }

    canvas2D.width = w;
    canvas2D.height = h;

    const imageData = ctx2D.createImageData(w, h);
    const data = imageData.data;

    let tokenIndex = 0;
    let pixelIndex = 0;

    for (let i = 0; i < w * h; i++) {

        let r, g, b;

        if (format === "colorcode") {

            const hex = tokens[tokenIndex++].replace("#", "");

            if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
                show2DError("Invalid colorcode detected.");
                return;
            }

            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);

        } else {

            r = parseByte2D(tokens[tokenIndex++], format);
            g = parseByte2D(tokens[tokenIndex++], format);
            b = parseByte2D(tokens[tokenIndex++], format);

            if (r === null || g === null || b === null) {
                show2DError("Invalid numeric value detected.");
                return;
            }
        }

        data[pixelIndex++] = r;
        data[pixelIndex++] = g;
        data[pixelIndex++] = b;
        data[pixelIndex++] = 255;
    }

    ctx2D.putImageData(imageData, 0, 0);

    scaleCanvas2D();

    const endTime = performance.now();
    const renderTime = endTime - startTime;
    const fps = 1000 / renderTime;

    stats2D.textContent =
        "Render Time: " +
        renderTime.toFixed(2) +
        " ms | FPS: " +
        fps.toFixed(2);
}


/* ============================================================
   SAFE SCALING
============================================================ */

function scaleCanvas2D() {

    const scaleW = MAX_CANVAS_DISPLAY / canvas2D.width;
    const scaleH = MAX_CANVAS_DISPLAY / canvas2D.height;

    const scale = Math.min(scaleW, scaleH);

    canvas2D.style.width =
        (canvas2D.width * scale) + "px";

    canvas2D.style.height =
        (canvas2D.height * scale) + "px";
}


/* ============================================================
   UTILITIES
============================================================ */

function randomByte() {
    return Math.floor(Math.random() * 256);
}

function show2DError(msg) {
    error2D.textContent = msg;
}

function clear2DError() {
    error2D.textContent = "";
}

function clear2DStats() {
    stats2D.textContent = "";
}