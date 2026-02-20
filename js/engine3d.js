let container = document.getElementById("threeContainer");

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

let renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

camera.position.z = 6;

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(5,5,5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

let material = new THREE.MeshStandardMaterial({
    color:0x00ff88,
    transparent:true,
    opacity:1,
    metalness:0.3,
    roughness:0.4
});

let mesh;

function createMesh(w,h,t){
    if(mesh) scene.remove(mesh);

    let geometry = new THREE.BoxGeometry(w,h,t);
    mesh = new THREE.Mesh(geometry,material);

    let edges = new THREE.EdgesGeometry(geometry);
    let outline = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({color:0x00ff88})
    );

    mesh.add(outline);
    scene.add(mesh);
}

createMesh(2,2,2);

function updateShape(){
    let v = document.getElementById("size3D").value.split("-");
    createMesh(
        parseFloat(v[0])||2,
        parseFloat(v[1])||2,
        parseFloat(v[2])||2
    );
}

document.getElementById("opacitySlider")
.addEventListener("input",function(){
    material.opacity=parseFloat(this.value);
});

const controls = new THREE.OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}
animate();

window.addEventListener("resize",()=>{
    camera.aspect = container.clientWidth/container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth,container.clientHeight);
});