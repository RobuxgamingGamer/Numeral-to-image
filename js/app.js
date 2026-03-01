"use strict";

document.addEventListener("DOMContentLoaded", function () {

    console.log("APP LOADED");

    // ===============================
    // SAFE GETTER
    // ===============================

    function $(id) {
        return document.getElementById(id);
    }

    // ===============================
    // ENGINE INIT
    // ===============================

    if (window.Engine2D && $("canvas2D")) {
        Engine2D.init("canvas2D");
    }

    if (window.Engine3D && $("threeContainer")) {
        Engine3D.init("threeContainer");
    }

    // ===============================
    // MODE SWITCH
    // ===============================

    if ($("mode2D") && $("mode3D")) {

        $("mode2D").addEventListener("click", function () {
            $("engine2D").style.display = "block";
            $("engine3D").style.display = "none";
        });

        $("mode3D").addEventListener("click", function () {
            $("engine2D").style.display = "none";
            $("engine3D").style.display = "block";
        });

    }

    // ===============================
    // 2D ENGINE BUTTONS
    // ===============================

    if ($("convert2D")) {

        $("convert2D").addEventListener("click", function () {

            try {

                const result = Engine2D.render(
                    $("size2D").value,
                    $("format2D").value,
                    $("input2D").value
                );

                $("stats2D").textContent =
                    result.ms + " ms | " + result.fps + " FPS";

            } catch (e) {
                $("stats2D").textContent = "ERROR: " + e.message;
            }

        });
    }

    if ($("stress2D")) {

        $("stress2D").addEventListener("click", function () {

            try {

                const generated = Engine2D.stress(
                    $("size2D").value,
                    $("format2D").value
                );

                $("input2D").value = generated;

            } catch (e) {
                $("stats2D").textContent = "ERROR: " + e.message;
            }

        });
    }

    if ($("download2D")) {

        $("download2D").addEventListener("click", function () {
            Engine2D.download();
        });

    }

    // ===============================
    // 3D ENGINE BUTTONS
    // ===============================

    if ($("convert3D")) {

        $("convert3D").addEventListener("click", function () {

            try {

                const result = Engine3D.render(
                    $("size3D").value,
                    $("format3D").value,
                    $("input3D").value,
                    $("alpha3D").value,
                    $("gloss3D").value
                );

                $("stats3D").textContent =
                    result.ms + " ms | " + result.fps + " FPS";

            } catch (e) {
                $("stats3D").textContent = "ERROR: " + e.message;
            }

        });
    }

    if ($("stress3D")) {

        $("stress3D").addEventListener("click", function () {

            try {

                const generated = Engine3D.stress(
                    $("size3D").value,
                    $("format3D").value
                );

                $("input3D").value = generated;

            } catch (e) {
                $("stats3D").textContent = "ERROR: " + e.message;
            }

        });
    }

    // ===============================
    // 3D MODE TOGGLE (Cube / Faces)
    // ===============================

    if ($("editFacesBtn") && $("editCubeBtn")) {

        $("editFacesBtn").addEventListener("click", function () {
            $("facesUI").style.display = "block";
        });

        $("editCubeBtn").addEventListener("click", function () {
            $("facesUI").style.display = "none";
        });

    }

});