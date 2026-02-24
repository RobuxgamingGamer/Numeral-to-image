// ======================================================
// NUMERAL VOXEL ENGINE — APPLICATION CONTROLLER
// Connects UI to Engine2D + Engine3D
// ======================================================

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // ENGINE INIT
    // ==================================================

    Engine2D.init("canvas2D");
    Engine3D.init("threeContainer");

    let current3DMode = "cube"; // cube | faces

    // ==================================================
    // ENGINE SWITCHING
    // ==================================================

    const section2D = document.getElementById("engine2D");
    const section3D = document.getElementById("engine3D");

    document.getElementById("mode2D").onclick = () => {
        section2D.style.display = "block";
        section3D.style.display = "none";
    };

    document.getElementById("mode3D").onclick = () => {
        section2D.style.display = "none";
        section3D.style.display = "block";
    };

    // ==================================================
    // 2D ENGINE
    // ==================================================

    const size2D = document.getElementById("size2D");
    const format2D = document.getElementById("format2D");
    const input2D = document.getElementById("input2D");
    const stats2D = document.getElementById("stats2D");

    document.getElementById("convert2D").onclick = () => {

        try {

            const result = Engine2D.render(
                size2D.value,
                format2D.value,
                input2D.value
            );

            stats2D.textContent =
                `${result.ms} ms | ${result.fps} FPS`;

        } catch (err) {
            alert(err.message);
        }
    };

    document.getElementById("stress2D").onclick = () => {

        input2D.value = Engine2D.stress(
            size2D.value,
            format2D.value
        );

        document.getElementById("convert2D").click();
    };

    document.getElementById("download2D").onclick = () => {
        Engine2D.download();
    };

    // ==================================================
    // 3D MODE SWITCHING
    // ==================================================

    const facesUI = document.getElementById("facesUI");
    const cubeInput = document.getElementById("input3D");

    document.getElementById("editCubeBtn").onclick = () => {
        current3DMode = "cube";
        facesUI.style.display = "none";
        cubeInput.style.display = "block";
    };

    document.getElementById("editFacesBtn").onclick = () => {
        current3DMode = "faces";
        facesUI.style.display = "block";
        cubeInput.style.display = "none";
    };

    // ==================================================
    // 3D ENGINE
    // ==================================================

    const size3D = document.getElementById("size3D");
    const format3D = document.getElementById("format3D");
    const input3D = document.getElementById("input3D");
    const stats3D = document.getElementById("stats3D");

    const alphaSlider = document.getElementById("alpha3D");
    const glossSlider = document.getElementById("gloss3D");

    document.getElementById("convert3D").onclick = () => {

        try {

            let inputData;

            if (current3DMode === "cube") {

                inputData = input3D.value;

            } else {

                const faces = [
                    document.getElementById("faceFront").value,
                    document.getElementById("faceBack").value,
                    document.getElementById("faceLeft").value,
                    document.getElementById("faceRight").value,
                    document.getElementById("faceTop").value,
                    document.getElementById("faceBottom").value
                ];

                inputData = faces.join(" ");
            }

            const result = Engine3D.render(
                current3DMode,
                size3D.value,
                format3D.value,
                inputData,
                parseFloat(alphaSlider.value),
                parseInt(glossSlider.value)
            );

            stats3D.textContent =
                `${result.ms} ms | ${result.fps} FPS`;

        } catch (err) {
            alert(err.message);
        }
    };

    // ==================================================
    // 3D STRESS
    // ==================================================

    document.getElementById("stress3D").onclick = () => {

        const generated = Engine3D.stress(
            current3DMode,
            size3D.value,
            format3D.value
        );

        if (current3DMode === "cube") {

            input3D.value = generated;

        } else {

            const parts = generated.split(/\s+/);
            const perFace = Math.floor(parts.length / 6);

            document.getElementById("faceFront").value =
                parts.slice(0, perFace).join(" ");
            document.getElementById("faceBack").value =
                parts.slice(perFace, perFace * 2).join(" ");
            document.getElementById("faceLeft").value =
                parts.slice(perFace * 2, perFace * 3).join(" ");
            document.getElementById("faceRight").value =
                parts.slice(perFace * 3, perFace * 4).join(" ");
            document.getElementById("faceTop").value =
                parts.slice(perFace * 4, perFace * 5).join(" ");
            document.getElementById("faceBottom").value =
                parts.slice(perFace * 5).join(" ");
        }

        document.getElementById("convert3D").click();
    };

    // ==================================================
    // LIVE MATERIAL UPDATES
    // ==================================================

    glossSlider.oninput = () => {
        Engine3D.updateGloss(parseInt(glossSlider.value));
    };

    alphaSlider.oninput = () => {
        Engine3D.updateAlpha(parseFloat(alphaSlider.value));
    };

});