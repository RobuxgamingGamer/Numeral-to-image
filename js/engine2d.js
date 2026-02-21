/* ============================================================
   NUMERAL VOXEL ENGINE — 2D GOLD BUILD
   Hard Limit: 1500 x 1500
   Static Performance Measurement
   Full Format Parser
   Strict Validation
   ============================================================ */

const canvas2D = document.getElementById("canvas2D");
const ctx2D = canvas2D.getContext("2d");

const error2D = document.getElementById("error2D");
const stats2D = document.getElementById("stats2D");

const MAX_2D_SIZE = 1500;

/* ============================================================
   FORMAT PARSER
   ============================================================ */

function parseValue2D(value, format) {

    if (format === "binary") {
        if (!/^[01]{8}$/.test(value)) return null;
        return parseInt(value, 2);
    }

    if (format === "decimal") {
        if (!/^\d+$/.test(value)) return null;
        const n = parseInt(value, 10);
        return (n >= 0 && n <= 255) ? n : null;
    }

    if (format === "hex") {
        if (!/^[0-9a-fA-F]{1,2}$/.test(value)) return null;
        const n = parseInt(value, 16);
        return (n >= 0 && n <= 255) ? n : null;
    }

    if (format === "octal") {
        if (!/^[0-7]{1,3}$/.test(value)) return null;
        const n = parseInt(value, 8);
        return (n >= 0 && n <= 255) ? n : null;
    }

    if (format === "morse") {
        if (!/^[\.\-]{8}$/.test(value)) return null;
        const binary = value.replace(/-/g, "1").replace(/\./g, "0");
        return parseInt(binary, 2);
    }

    return null;
}

/* ============================================================
   STRESS TEST MODE
   ============================================================ */

function stress2D() {

    clear2DError();

    const size = get2DSize();
    if (!size) return;

    const { w, h } = size;
    const format = document.getElementById("format2D").value;

    const totalPixels = w * h;
    let output = [];

    for (let i = 0; i < totalPixels; i++) {

        if (format === "colorcode") {
            const r = randomByte().toString(16).padStart(2, "0");
            const g = randomByte().toString(16).padStart(2, "0");
            const b = randomByte().toString(16).padStart(2, "0");
            output.push("#" + r + g + b);
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

    document.getElementById("input2D").value = output.join(" ");
}

/* ============================================================
   CONVERT
   ============================================================ */

function convert2D() {

    clear2DError();
    clear2DStats();

    const startTime = performance.now();

    const size = get2DSize();
    if (!size) return;

    const { w, h } = size;
    const format = document.getElementById("format2D").value;

    const rawInput = document.getElementById("input2D").value.trim();
    if (!rawInput) {
        show2DError("Input is empty.");
        return;
    }

    const tokens = rawInput.split(/\s+/);
    const totalPixels = w * h;

    if (format === "colorcode") {

        if (tokens.length !== totalPixels) {
            show2DError(`Expected ${totalPixels} color codes.`);
            return;
        }

    } else {

        if (tokens.length !== totalPixels * 3) {
            show2DError(`Expected ${totalPixels * 3} values (R G B per pixel).`);
            return;
        }
    }

    canvas2D.width = w;
    canvas2D.height = h;

    const imageData = ctx2D.createImageData(w, h);
    const data = imageData.data;

    for (let i = 0; i < totalPixels; i++) {

        let r, g, b;

        if (format === "colorcode") {

            const hex = tokens[i].replace("#", "");
            if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
                show2DError("Invalid color code detected.");
                return;
            }

            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);

        } else {

            r = parseValue2D(tokens[i * 3], format);
            g = parseValue2D(tokens[i * 3 + 1], format);
            b = parseValue2D(tokens[i * 3 + 2], format);

            if (r === null || g === null || b === null) {
                show2DError("Invalid numeric value detected.");
                return;
            }
        }

        const index = i * 4;
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = 255;
    }

    ctx2D.putImageData(imageData, 0, 0);

    scaleCanvas(w);

    const endTime = performance.now();
    const renderTime = endTime - startTime;
    const fps = 1000 / renderTime;

    stats2D.textContent =
        "Render Time: " + renderTime.toFixed(2) + " ms | FPS: " + fps.toFixed(2);
}

/* ============================================================
   SIZE VALIDATION
   ============================================================ */

function get2DSize() {

    const raw = document.getElementById("size2D").value.trim();
    const parts = raw.split("-");

    if (parts.length !== 2) {
        show2DError("Size must be in X-Y format.");
        return null;
    }

    const w = parseInt(parts[0], 10);
    const h = parseInt(parts[1], 10);

    if (!Number.isInteger(w) || !Number.isInteger(h)) {
        show2DError("Size must be integers.");
        return null;
    }

    if (w <= 0 || h <= 0) {
        show2DError("Size must be greater than 0.");
        return null;
    }

    if (w > MAX_2D_SIZE || h > MAX_2D_SIZE) {
        show2DError(`Maximum size is ${MAX_2D_SIZE}-${MAX_2D_SIZE}.`);
        return null;
    }

    return { w, h };
}

/* ============================================================
   HELPERS
   ============================================================ */

function randomByte() {
    return Math.floor(Math.random() * 256);
}

function scaleCanvas(w) {
    const scale = 400 / w;
    canvas2D.style.width = (w * scale) + "px";
    canvas2D.style.height = (canvas2D.height * scale) + "px";
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