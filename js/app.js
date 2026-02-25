document.body.insertAdjacentHTML("afterbegin",
"<div style='position:fixed;top:0;left:0;background:red;color:white;padding:5px;z-index:9999'>APP LOADED</div>");
"use strict";

document.addEventListener("DOMContentLoaded", () => {

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