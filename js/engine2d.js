// ===============================
// NUMERAL VOXEL ENGINE — 2D CORE
// ===============================

const canvas = document.getElementById("canvas2D");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const MAX_2D = 1500;

canvas.width = 800;
canvas.height = 800;

// ===============================
// INSTRUCTIONS PANEL
// ===============================

function get2DInstructions(format){
    const common =
`2D ENGINE RULES:

• Size format: X-Y (example: 16-16)
• Maximum: 1500-1500
• Values separated by spaces
• FPS + ms calculated only on Convert

`;

    const map = {
        binary:
`BINARY FORMAT:
Each pixel requires 3 values:
R G B

Example (red pixel):
11111111 00000000 00000000
`,

        decimal:
`DECIMAL FORMAT:
Each pixel requires 3 values (0-255):
R G B

Example:
255 0 0
`,

        hex:
`HEX FORMAT:
Each pixel requires 3 values (00-FF):
R G B

Example:
FF 00 00
`,

        octal:
`OCTAL FORMAT:
Each pixel requires 3 values (000-377):
R G B

Example:
377 000 000
`,

        morse:
`MORSE FORMAT:
Each pixel requires 3 Morse byte values.

Dot = .
Dash = -

Example for 255:
-------- (8 dashes)
`,

        color:
`COLORCODE FORMAT:
Each pixel requires 1 value:

#RRGGBB

Example:
#FF0000
`
    };

    return common + map[format];
}

// ===============================
// SIZE PARSER
// ===============================

function parseSize2D(){
    const raw = document.getElementById("size2D").value.trim();
    const parts = raw.split("-");
    if(parts.length !== 2) throw "Invalid size format";

    const w = parseInt(parts[0]);
    const h = parseInt(parts[1]);

    if(isNaN(w) || isNaN(h)) throw "Size must be numbers";
    if(w <= 0 || h <= 0) throw "Size must be positive";
    if(w > MAX_2D || h > MAX_2D) throw "Size exceeds 1500-1500";

    return [w,h];
}

// ===============================
// VALUE PARSERS
// ===============================

function parseBinary(v){
    if(!/^[01]{8}$/.test(v)) throw "Invalid binary byte";
    return parseInt(v,2);
}

function parseDecimal(v){
    const n = parseInt(v);
    if(isNaN(n) || n<0 || n>255) throw "Invalid decimal byte";
    return n;
}

function parseHex(v){
    if(!/^[0-9A-Fa-f]{2}$/.test(v)) throw "Invalid hex byte";
    return parseInt(v,16);
}

function parseOctal(v){
    if(!/^[0-7]{3}$/.test(v)) throw "Invalid octal byte";
    return parseInt(v,8);
}

function parseMorse(v){
    if(!/^[\.\-]{8}$/.test(v)) throw "Invalid Morse byte";
    let bin = "";
    for(let c of v){
        bin += (c === "-") ? "1" : "0";
    }
    return parseInt(bin,2);
}

function parseColor(v){
    if(!/^#[0-9A-Fa-f]{6}$/.test(v)) throw "Invalid color code";
    return v;
}

// ===============================
// MAIN RENDER
// ===============================

function render2D(values, w, h, format){

    const pixelW = canvas.width / w;
    const pixelH = canvas.height / h;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    let i = 0;

    for(let y=0;y<h;y++){
        for(let x=0;x<w;x++){

            let color;

            if(format === "color"){
                color = parseColor(values[i++]);
            } else {
                let r,g,b;

                if(format==="binary"){
                    r=parseBinary(values[i++]);
                    g=parseBinary(values[i++]);
                    b=parseBinary(values[i++]);
                }
                if(format==="decimal"){
                    r=parseDecimal(values[i++]);
                    g=parseDecimal(values[i++]);
                    b=parseDecimal(values[i++]);
                }
                if(format==="hex"){
                    r=parseHex(values[i++]);
                    g=parseHex(values[i++]);
                    b=parseHex(values[i++]);
                }
                if(format==="octal"){
                    r=parseOctal(values[i++]);
                    g=parseOctal(values[i++]);
                    b=parseOctal(values[i++]);
                }
                if(format==="morse"){
                    r=parseMorse(values[i++]);
                    g=parseMorse(values[i++]);
                    b=parseMorse(values[i++]);
                }

                color = `rgb(${r},${g},${b})`;
            }

            ctx.fillStyle = color;
            ctx.fillRect(x*pixelW, y*pixelH, pixelW, pixelH);
        }
    }
}

// ===============================
// CONVERT
// ===============================

document.getElementById("convert2D").onclick = () => {

    try{

        const start = performance.now();

        const format = document.getElementById("format2D").value;
        const [w,h] = parseSize2D();

        const raw = document.getElementById("input2D").value.trim();
        const values = raw.split(/\s+/);

        const required = (format==="color") ? w*h : w*h*3;

        if(values.length !== required)
            throw `Expected ${required} values`;

        render2D(values,w,h,format);

        const end = performance.now();
        const ms = (end-start).toFixed(2);
        const fps = (1000/(end-start)).toFixed(2);

        document.getElementById("stats2D").textContent =
            `${ms} ms | ${fps} FPS`;

    } catch(e){
        alert("2D ERROR:\n"+e);
    }

};

// ===============================
// STRESS MODE
// ===============================

document.getElementById("stress2D").onclick = () => {

    const format = document.getElementById("format2D").value;
    const [w,h] = parseSize2D();

    const total = (format==="color") ? w*h : w*h*3;

    let arr = [];

    for(let i=0;i<total;i++){

        if(format==="binary"){
            arr.push(Math.random()<0.5 ? "00000000" : "11111111");
        }

        if(format==="decimal"){
            arr.push(Math.floor(Math.random()*256));
        }

        if(format==="hex"){
            arr.push(Math.floor(Math.random()*256)
                .toString(16).padStart(2,"0").toUpperCase());
        }

        if(format==="octal"){
            arr.push(Math.floor(Math.random()*256)
                .toString(8).padStart(3,"0"));
        }

        if(format==="morse"){
            let v="";
            for(let b=0;b<8;b++){
                v+=Math.random()<0.5?".":"-";
            }
            arr.push(v);
        }

        if(format==="color"){
            arr.push("#"+Math.floor(Math.random()*16777215)
                .toString(16).padStart(6,"0"));
        }
    }

    document.getElementById("input2D").value = arr.join(" ");
};

// ===============================
// DOWNLOAD
// ===============================

document.getElementById("download2D").onclick = () => {
    const link = document.createElement("a");
    link.download = "numeral_render.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
};