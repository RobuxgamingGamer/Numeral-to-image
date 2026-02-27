"use strict";

document.addEventListener("DOMContentLoaded", () => {
document.addEventListener("DOMContentLoaded", () => {

    // ---- ENGINE INIT ----
    if (window.Engine2D) Engine2D.init("canvas2D");
    if (window.Engine3D) Engine3D.init("threeContainer");

    // =========================
    // 2D BUTTONS
    // =========================

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

    // =========================
    // 3D BUTTONS
    // =========================

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

});
    console.log("App booted.");

    // Engine Init
    if (typeof Engine2D !== "undefined")
        Engine2D.init("canvas2D");

    if (typeof Engine3D !== "undefined")
        Engine3D.init("threeContainer");

    // Mode Switch
    Utils.byId("btn2D").onclick = () => {
        Utils.show("section2D");
        Utils.hide("section3D");
    };

    Utils.byId("btn3D").onclick = () => {
        Utils.hide("section2D");
        Utils.show("section3D");
    };

    // 3D Faces Toggle
    Utils.byId("editFacesBtn").onclick = () => {
        Utils.show("facesUI");
    };

    Utils.byId("editCubeBtn").onclick = () => {
        Utils.hide("facesUI");
    };

});