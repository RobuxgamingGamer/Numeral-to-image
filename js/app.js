// ===============================================================
// Numeral Voxel Engine - Application Controller
// app.js
// UI coordination layer (no rendering logic)
// ===============================================================

"use strict";

const App = (function () {

    // ===========================================================
    // STATE
    // ===========================================================

    const LIMITS = {
        twoD: 1500,
        cube3D: 10,
        faces3D: 25
    };

    let currentEngine = "2d";     // "2d" | "3d"
    let current3DMode = "cube";   // "cube" | "faces"

    // ===========================================================
    // INITIALIZATION
    // ===========================================================

    function init() {
        bindUI();
        activate2D();
    }

    function bindUI() {

        // Engine Switch
        Utils.byId("switch2D").addEventListener("click", activate2D);
        Utils.byId("switch3D").addEventListener("click", activate3D);

        // 3D Mode Switch
        Utils.byId("editCubeBtn").addEventListener("click", () => {
            set3DMode("cube");
        });

        Utils.byId("editFacesBtn").addEventListener("click", () => {
            set3DMode("faces");
        });

        // Validate sizes when changed
        Utils.byId("size2D").addEventListener("blur", enforce2DLimit);
        Utils.byId("size3D").addEventListener("blur", enforce3DLimit);
    }

    // ===========================================================
    // ENGINE SWITCHING
    // ===========================================================

    function activate2D() {
        currentEngine = "2d";

        Utils.show("section2D");
        Utils.hide("section3D");

        Utils.byId("switch2D").classList.add("active");
        Utils.byId("switch3D").classList.remove("active");
    }

    function activate3D() {
        currentEngine = "3d";

        Utils.hide("section2D");
        Utils.show("section3D");

        Utils.byId("switch3D").classList.add("active");
        Utils.byId("switch2D").classList.remove("active");

        set3DMode(current3DMode);
    }

    // ===========================================================
    // 3D MODE CONTROL
    // ===========================================================

    function set3DMode(mode) {

        current3DMode = mode;

        if (mode === "cube") {
            Utils.hide("facesPanel");
            Utils.show("cubePanel");
            Utils.byId("editCubeBtn").classList.add("active");
            Utils.byId("editFacesBtn").classList.remove("active");
        } else {
            Utils.show("facesPanel");
            Utils.hide("cubePanel");
            Utils.byId("editFacesBtn").classList.add("active");
            Utils.byId("editCubeBtn").classList.remove("active");
        }

        enforce3DLimit();
    }

    // ===========================================================
    // SIZE LIMIT ENFORCEMENT
    // ===========================================================

    function enforce2DLimit() {

        const raw = Utils.byId("size2D").value;
        const parsed = Utils.parse2DSize(raw, LIMITS.twoD);

        if (!parsed) {
            Utils.setText("warning2D",
                "Size must be between 1 and " + LIMITS.twoD);
            return;
        }

        Utils.setText("warning2D", "");
    }

    function enforce3DLimit() {

        const raw = Utils.byId("size3D").value;
        const limit = current3DMode === "cube"
            ? LIMITS.cube3D
            : LIMITS.faces3D;

        const parsed = Utils.parse3DSize(raw, limit);

        if (!parsed) {
            Utils.setText(
                "warning3D",
                "Size must be between 1 and " + limit +
                " in " + current3DMode + " mode."
            );
            return;
        }

        Utils.setText("warning3D", "");
    }

    // ===========================================================
    // PUBLIC API
    // ===========================================================

    return {
        init
    };

})();

// ===============================================================
// BOOTSTRAP
// ===============================================================

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});