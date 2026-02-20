let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias:true });

const container = document.getElementById("threeContainer");

renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

camera.position.z = 6;

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(5,5,5);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

let geometry;
let material = new THREE.MeshStandardMaterial({
    color:0x00ff88,
    transparent:true,
    opacity:1,
    metalness:0.3,
    roughness:0.4
});

let mesh;

function createMesh(w,h,t){

    if(mesh){
        scene.remove(mesh);
    }

    geometry = new THREE.BoxGeometry(w,h,t);
    mesh = new THREE.Mesh(geometry,material);

    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({color:0x00ff88})
    );

    mesh.add(line);

    scene.add(mesh);
}

createMesh(2,2,2);

function updateShape(){
    let val = document.getElementById("size3D").value.split("-");
    let w=parseFloat(val[0])||2;
    let h=parseFloat(val[1])||2;
    let t=parseFloat(val[2])||2;
    createMesh(w,h,t);
}

document.getElementById("opacitySlider")
.addEventListener("input",function(){
    material.opacity=parseFloat(this.value);
});

const controls = new THREE.OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
controls.dampingFactor=0.08;
controls.enablePan=false;

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}
animate();