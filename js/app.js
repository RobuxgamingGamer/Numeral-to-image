"use strict";

document.addEventListener("DOMContentLoaded", function () {

    console.log("APP LOADED");

    if (window.Engine2D) {
        Engine2D.init("canvas2D");
    }

    if (window.Engine3D && typeof THREE !== "undefined") {
        Engine3D.init("threeContainer");
    }

    const btn2D = document.getElementById("mode2D");
    const btn3D = document.getElementById("mode3D");

    const section2D = document.getElementById("engine2D");
    const section3D = document.getElementById("engine3D");

    // 2D Toggle
    btn2D.onclick = function () {
        section2D.style.display = "block";
        section3D.style.display = "none";
    };

    // 3D Toggle
    btn3D.onclick = function () {
        section2D.style.display = "none";
        section3D.style.display = "block";

        if (Engine3D && Engine3D.resize) {
            Engine3D.resize();
        }
    };

    // ======================
    // 2D Buttons
    // ======================

    document.getElementById("convert2D").onclick = function () {
        const result = Engine2D.render(
            document.getElementById("size2D").value,
            document.getElementById("format2D").value,
            document.getElementById("input2D").value
        );

        document.getElementById("stats2D").textContent =
            result.ms + " ms | " + result.fps + " FPS";
    };

    document.getElementById("stress2D").onclick = function () {
        document.getElementById("input2D").value =
            Engine2D.stress(
                document.getElementById("size2D").value,
                document.getElementById("format2D").value
            );
    };

    document.getElementById("download2D").onclick = function () {
        Engine2D.download();
    };

    // ======================
    // 3D Buttons
    // ======================

    document.getElementById("convert3D").onclick = function () {
        const result = Engine3D.render(
            document.getElementById("size3D").value,
            document.getElementById("format3D").value,
            document.getElementById("input3D").value,
            document.getElementById("alpha3D").value,
            document.getElementById("gloss3D").value
        );

        document.getElementById("stats3D").textContent =
            result.ms + " ms | " + result.fps + " FPS";
    };

    document.getElementById("stress3D").onclick = function () {
        document.getElementById("input3D").value =
            Engine3D.stress(
                document.getElementById("size3D").value,
                document.getElementById("format3D").value
            );
    };

    document.getElementById("editCubeBtn").onclick = function () {
        document.getElementById("facesUI").style.display = "none";
    };

    document.getElementById("editFacesBtn").onclick = function () {
        document.getElementById("facesUI").style.display = "block";
    };

document.getElementById("stress3D").onclick = function () {

    const size = document.getElementById("size3D").value;
    const format = document.getElementById("format3D").value;

    const facesVisible =
        document.getElementById("facesUI").style.display === "block";

    if (facesVisible) {

        document.getElementById("faceFront").value = Engine3D.stress(size, format);
        document.getElementById("faceBack").value  = Engine3D.stress(size, format);
        document.getElementById("faceLeft").value  = Engine3D.stress(size, format);
        document.getElementById("faceRight").value = Engine3D.stress(size, format);
        document.getElementById("faceTop").value   = Engine3D.stress(size, format);
        document.getElementById("faceBottom").value= Engine3D.stress(size, format);

    } else {

        document.getElementById("input3D").value =
            Engine3D.stress(size, format);
    }
};

});