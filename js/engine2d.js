/* ============================================================
   NUMERAL VOXEL ENGINE — 2D ENGINE (GOLD ARCHITECTURE)
   Max Size: 1500-1500
   Formats:
     - binary
     - decimal
     - hex
     - octal
     - morse
     - colorcode
   Performance measured ONLY during convert.
   ============================================================ */

const canvas2D = document.getElementById("canvas2D");
const ctx2D = canvas2D.getContext("2d");
const input2D = document.getElementById("input2D");
const size2DInput = document.getElementById("size2D");
const format2DSelect = document.getElementById("format2D");
const error2D = document.getElementById("error2D");
const stats2D = document.getElementById("stats2D");

const MAX_2D = 1500;

/* ===============================
   SIZE VALIDATION
=================================*/

function get2DSize() {

    const raw = size2DInput.value.trim();
    const parts = raw.split("-");

    if (parts.length !== 2) {
        show2DError("Size must be X-Y.");
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

    if (w > MAX_2D || h > MAX_2D) {
        show2DError("Max size is 1500-1500.");
        return null;
    }

    return { w, h };
}

/* ===============================
   FORMAT PARSING
=================================*/

function parseByte(value, format) {

    switch (format) {

        case "binary":
            if (!/^[01]{8}$/.test(value)) return null;
            return parseInt(value, 2);

        case "decimal":
            if (!/^\d+$/.test(value)) return null;
            const d = parseInt(value, 10);
            return (d >= 0 && d <= 255) ? d : null;

        case "hex":
            if (!/^[0-9a-fA-F]{1,2}$/.test(value)) return null;
            return parseInt(value, 16);

        case "octal":
            if (!/^[0-7]{1,3}$/.test(value)) return null;
            return parseInt(value, 8);

        case "morse":
            if (!/^[\.\-]{8}$/.test(value)) return null;
            const binary = value.replace(/-/g, "1").replace(/\./g, "0");
            return parseInt(binary, 2);

        default:
            return null;
    }
}

/* ===============================
   STRESS MODE
=================================*/

function stress2D() {

    clear2DError();
    clear2DStats();

    const size = get2DSize();
    if (!size) return;

    const { w, h } = size;
    const total = w * h;
    const format = format2DSelect.value;

    let output = [];

    for (let i = 0; i < total; i++) {

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

                const val = randomByte();

                if (format === "binary")
                    output.push(val.toString(2).padStart(8, "0"));

                if (format === "decimal")
                    output.push(val.toString());

                if (format === "hex")
                    output.push(val.toString(16).toUpperCase());

                if (format === "octal")
                    output.push(val.toString(8));

                if (format === "morse") {
                    const bin = val.toString(2).padStart(8, "0");
                    output.push(bin.replace(/1/g, "-").replace(/0/g, "."));
                }
            }
        }
    }

    input2D.value = output.join(" ");
}

/* ===============================
   CONVERT
=================================*/

function convert2D() {

    clear2DError();
    clear2DStats();

    const start = performance.now();

    const size = get2DSize();
    if (!size) return;

    const { w, h } = size;
    const format = format2DSelect.value;

    const tokens = input2D.value.trim().split(/\s+/);

    const expected =
        format === "colorcode"
        ? w * h
        : w * h * 3;

    if (tokens.length !== expected) {
        show2DError("Incorrect number of values.");
        return;
    }

    canvas2D.width = w;
    canvas2D.height = h;

    const img = ctx2D.createImageData(w, h);
    const data = img.data;

    let index = 0;
    let tokenIndex = 0;

    for (let i = 0; i < w * h; i++) {

        let r, g, b;

        if (format === "colorcode") {

            const hex = tokens[tokenIndex++].replace("#", "");

            if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
                show2DError("Invalid colorcode.");
                return;
            }

            r = parseInt(hex.substring(0,2),16);
            g = parseInt(hex.substring(2,4),16);
            b = parseInt(hex.substring(4,6),16);

        } else {

            r = parseByte(tokens[tokenIndex++], format);
            g = parseByte(tokens[tokenIndex++], format);
            b = parseByte(tokens[tokenIndex++], format);

            if (r === null || g === null || b === null) {
                show2DError("Invalid numeric value.");
                return;
            }
        }

        data[index++] = r;
        data[index++] = g;
        data[index++] = b;
        data[index++] = 255;
    }

    ctx2D.putImageData(img, 0, 0);
    scaleCanvasToFit();

    const end = performance.now();
    const time = end - start;
    const fps = 1000 / time;

    stats2D.textContent =
        "Render Time: " + time.toFixed(2) + " ms | FPS: " + fps.toFixed(2);
}

/* ===============================
   SAFE SCALING
=================================*/

function scaleCanvasToFit() {

    const maxSize = 450;

    const scaleW = maxSize / canvas2D.width;
    const scaleH = maxSize / canvas2D.height;

    const scale = Math.min(scaleW, scaleH);

    canvas2D.style.width =
        canvas2D.width * scale + "px";

    canvas2D.style.height =
        canvas2D.height * scale + "px";
}

/* ===============================
   UTIL
=================================*/

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