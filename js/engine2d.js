// ===================================================== // Numeral
Voxel Engine - GOLD BUILD // engine2d.js // Massive Structured 2D
Rendering Engine //
=====================================================

const Engine2D = (function(){ ‘use strict’;

    let canvas, ctx;
    let currentFormat = 'binary';
    let currentSize = {x:2, y:2};

    function init(){
        canvas = document.getElementById('canvas2D');
        ctx = canvas.getContext('2d');
        bindUI();
    }

    function bindUI(){
        document.getElementById('format2D').addEventListener('change', (e)=>{
            currentFormat = e.target.value;
        });
        document.getElementById('convert2DBtn').addEventListener('click', render);
        document.getElementById('stress2DBtn').addEventListener('click', stress);
    }

    function parseSize(){
        const raw = document.getElementById('size2D').value.trim();
        const parts = raw.split('-');
        if(parts.length !== 2) return false;
        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);
        if(!x || !y || x>1500 || y>1500) return false;
        currentSize = {x,y};
        return true;
    }

    function stress(){
        if(!parseSize()) return;
        const total = currentSize.x * currentSize.y;
        const input = Utils.stressGenerate(currentFormat, total);
        document.getElementById('input2D').value = input;
    }

    function render(){
        if(!parseSize()) return;
        const start = performance.now();
        const input = document.getElementById('input2D').value;
        const tokens = input.trim().split(/\s+/);
        const expected = currentFormat==='colorcode' ?
            currentSize.x*currentSize.y : currentSize.x*currentSize.y*3;
        if(tokens.length !== expected) return;
        canvas.width = currentSize.x;
        canvas.height = currentSize.y;
        const imgData = ctx.createImageData(currentSize.x, currentSize.y);
        let t = 0;
        for(let y=0;y<currentSize.y;y++){
            for(let x=0;x<currentSize.x;x++){
                let r,g,b;
                if(currentFormat==='colorcode'){
                    const rgb = Utils.hexToRgb(tokens[t++]);
                    if(!rgb) return;
                    r = rgb.r; g = rgb.g; b = rgb.b;
                }else{
                    r = parseInt(tokens[t++]);
                    g = parseInt(tokens[t++]);
                    b = parseInt(tokens[t++]);
                }
                const index = (y*currentSize.x + x)*4;
                imgData.data[index] = r;
                imgData.data[index+1] = g;
                imgData.data[index+2] = b;
                imgData.data[index+3] = 255;
            }
        }
        ctx.putImageData(imgData,0,0);
        const stats = Utils.calculateStats(start);
        document.getElementById('ms2D').textContent = stats.ms;
        document.getElementById('fps2D').textContent = stats.fps;
    }

    function internalHelper_1(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_2(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_3(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_4(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_5(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_6(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_7(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_8(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_9(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_10(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_11(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_12(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_13(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_14(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_15(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_16(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_17(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_18(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_19(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_20(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_21(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_22(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_23(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_24(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_25(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_26(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_27(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_28(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_29(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_30(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_31(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_32(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_33(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_34(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_35(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_36(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_37(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_38(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_39(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_40(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_41(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_42(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_43(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_44(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_45(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_46(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_47(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_48(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_49(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_50(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_51(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_52(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_53(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_54(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_55(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_56(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_57(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_58(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_59(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_60(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_61(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_62(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_63(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_64(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_65(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_66(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_67(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_68(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_69(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_70(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_71(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_72(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_73(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_74(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_75(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_76(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_77(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_78(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_79(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_80(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_81(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_82(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_83(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_84(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_85(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_86(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_87(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_88(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_89(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_90(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_91(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_92(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_93(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_94(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_95(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_96(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_97(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_98(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_99(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_100(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_101(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_102(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_103(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_104(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_105(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_106(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_107(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_108(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_109(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_110(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_111(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_112(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_113(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_114(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_115(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_116(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_117(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_118(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_119(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_120(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_121(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_122(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_123(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_124(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_125(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_126(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_127(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_128(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_129(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_130(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_131(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_132(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_133(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_134(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_135(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_136(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_137(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_138(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_139(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_140(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_141(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_142(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_143(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_144(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_145(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_146(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_147(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_148(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_149(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_150(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_151(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_152(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_153(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_154(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_155(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_156(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_157(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_158(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_159(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_160(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_161(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_162(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_163(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_164(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_165(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_166(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_167(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_168(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_169(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_170(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_171(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_172(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_173(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_174(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_175(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_176(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_177(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_178(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_179(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_180(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_181(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_182(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_183(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_184(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_185(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_186(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_187(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_188(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_189(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_190(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_191(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_192(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_193(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_194(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_195(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_196(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_197(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_198(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_199(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_200(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_201(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_202(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_203(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_204(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_205(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_206(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_207(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_208(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_209(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_210(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_211(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_212(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_213(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_214(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_215(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_216(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_217(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_218(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_219(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_220(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_221(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_222(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_223(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_224(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_225(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_226(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_227(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_228(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_229(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_230(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_231(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_232(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_233(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_234(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_235(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_236(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_237(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_238(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_239(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_240(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_241(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_242(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_243(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_244(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_245(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_246(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_247(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_248(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_249(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_250(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_251(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_252(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_253(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_254(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_255(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_256(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_257(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_258(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_259(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_260(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_261(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_262(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_263(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_264(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_265(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_266(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_267(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_268(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_269(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_270(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_271(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_272(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_273(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_274(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_275(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_276(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_277(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_278(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_279(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_280(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_281(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_282(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_283(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_284(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_285(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_286(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_287(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_288(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_289(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_290(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_291(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_292(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_293(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_294(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_295(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_296(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_297(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_298(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_299(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_300(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_301(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_302(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_303(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_304(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_305(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_306(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_307(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_308(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_309(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_310(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_311(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_312(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_313(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_314(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_315(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_316(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_317(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_318(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_319(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_320(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_321(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_322(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_323(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_324(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_325(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_326(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_327(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_328(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_329(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_330(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_331(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_332(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_333(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_334(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_335(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_336(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_337(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_338(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_339(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_340(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_341(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_342(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_343(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_344(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_345(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_346(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_347(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_348(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_349(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_350(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_351(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_352(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_353(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_354(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_355(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_356(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_357(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_358(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_359(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_360(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_361(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_362(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_363(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_364(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_365(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_366(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_367(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_368(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_369(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_370(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_371(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_372(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_373(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_374(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_375(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_376(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_377(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_378(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_379(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_380(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_381(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_382(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_383(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_384(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_385(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_386(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_387(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_388(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_389(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_390(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_391(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_392(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_393(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_394(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_395(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_396(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_397(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_398(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_399(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_400(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_401(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_402(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_403(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_404(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_405(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_406(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_407(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_408(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_409(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_410(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_411(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_412(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_413(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_414(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_415(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_416(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_417(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_418(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_419(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_420(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_421(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_422(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_423(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_424(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_425(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_426(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_427(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_428(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_429(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_430(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_431(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_432(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_433(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_434(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_435(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_436(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_437(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_438(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_439(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_440(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_441(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_442(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_443(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_444(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_445(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_446(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_447(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_448(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_449(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_450(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_451(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_452(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_453(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_454(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_455(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_456(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_457(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_458(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_459(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_460(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_461(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_462(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_463(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_464(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_465(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_466(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_467(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_468(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_469(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_470(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_471(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_472(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_473(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_474(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_475(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_476(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_477(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_478(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_479(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_480(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_481(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_482(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_483(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_484(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_485(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_486(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_487(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_488(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_489(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_490(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_491(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_492(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_493(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_494(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_495(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_496(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_497(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_498(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_499(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_500(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_501(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_502(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_503(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_504(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_505(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_506(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_507(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_508(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_509(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_510(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_511(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_512(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_513(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_514(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_515(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_516(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_517(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_518(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_519(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_520(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_521(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_522(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_523(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_524(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_525(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_526(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_527(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_528(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_529(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_530(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_531(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_532(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_533(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_534(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_535(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_536(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_537(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_538(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_539(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_540(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_541(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_542(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_543(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_544(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_545(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_546(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_547(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_548(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_549(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_550(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_551(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_552(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_553(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_554(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_555(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_556(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_557(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_558(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_559(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_560(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_561(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_562(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_563(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_564(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_565(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_566(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_567(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_568(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_569(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_570(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_571(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_572(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_573(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_574(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_575(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_576(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_577(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_578(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_579(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_580(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_581(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_582(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_583(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_584(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_585(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_586(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_587(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_588(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_589(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_590(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_591(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_592(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_593(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_594(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_595(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_596(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_597(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_598(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_599(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    function internalHelper_600(val) {
        if(typeof val === 'number'){
            return Math.max(0, Math.min(255, val));
        }
        return val;
    }

    return { init };

})();

document.addEventListener(‘DOMContentLoaded’, () => { Engine2D.init();
});
