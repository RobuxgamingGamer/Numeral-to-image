"use strict";

document.addEventListener("DOMContentLoaded", function () {

    console.log("APP LOADED");

    // ======================
    // ENGINE INIT
    // ======================

    if (window.Engine2D) {
        Engine2D.init("canvas2D");
    }

    if (window.Engine3D && typeof THREE !== "undefined") {
        Engine3D.init("threeContainer");
    }

    // ======================
    // MODE SWITCH
    // ======================

    const btn2D = document.getElementById("mode2D");
    const btn3D = document.getElementById("mode3D");

    const section2D = document.getElementById("engine2D");
    const section3D = document.getElementById("engine3D");

   btn3D.onclick = () => {
    section2D.style.display = "none";
    section3D.style.display = "block";

    if (typeof Engine3D !== "undefined") {
        Engine3D.resize();
    }
};

    btn3D.onclick = function () {
        section2D.style.display = "none";
        section3D.style.display = "block";
    };

    // ======================
    // 2D BUTTONS
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
    // 3D BUTTONS
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

    // ======================
    // FACE MODE TOGGLE
    // ======================

    document.getElementById("editCubeBtn").onclick = function () {
        document.getElementById("facesUI").style.display = "none";
    };

    document.getElementById("editFacesBtn").onclick = function () {
        document.getElementById("facesUI").style.display = "block";
    };

});