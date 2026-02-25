"use strict";

const Utils = {

    byId(id) {
        const el = document.getElementById(id);
        if (!el) console.error("Missing element:", id);
        return el;
    },

    show(id) {
        this.byId(id).style.display = "block";
    },

    hide(id) {
        this.byId(id).style.display = "none";
    }

};