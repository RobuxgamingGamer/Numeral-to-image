"use strict";

document.addEventListener("DOMContentLoaded", () => {

    console.log("App booted.");

    // =============================
    // ENGINE INIT
    // =============================

    if (window.Engine2D) {
        Engine2D.init("canvas2D");
    }

    if (window.Engine3D) {
        Engine3D.init("threeContainer");
    }

    // =============================
    // MODE SWITCH
    // =============================

    document.getElementById("btn2D").addEventListener("click", () => {
        document.getElementById("section2D").style.display = "block";
        document.getElementById("section3D").style.display = "none";
    });

    document.getElementById("btn3D").addEventListener("click", () => {
        document.getElementById("section2D").style.display = "none";
        document.getElementById("section3D").style.display = "block";
    });

    // =============================
    // 2D BUTTONS
    // =============================

    document.getElementById("convert2D").addEventListener("click", () => {
        Engine2D.convert(
            document.getElementById("size2D").value,
            document.getElementById("format2D").value,
            document.getElementById("input2D").value
        );
    });

    document.getElementById("stress2D").addEventListener("click", () => {
        Engine2D.stress(
            document.getElementById("size2D").value,
            document.getElementById("format2D").value
        );
    });

    document.getElementById("download2D").addEventListener("click", () => {
        Engine2D.download();
    });

    // =============================
    // 3D BUTTONS
    // =============================

    document.getElementById("convert3D").addEventListener("click", () => {
        Engine3D.convert(
            document.getElementById("size3D").value,
            document.getElementById("format3D").value,
            document.getElementById("input3D").value,
            document.getElementById("alpha3D").value,
            document.getElementById("gloss3D").value
        );
    });

    document.getElementById("stress3D").addEventListener("click", () => {
        Engine3D.stress(
            document.getElementById("size3D").value,
            document.getElementById("format3D").value
        );
    });

    // =============================
    // 3D FACE MODE
    // =============================

    document.getElementById("editFacesBtn").addEventListener("click", () => {
        document.getElementById("facesUI").style.display = "block";
    });

    document.getElementById("editCubeBtn").addEventListener("click", () => {
        document.getElementById("facesUI").style.display = "none";
    });

});