var scene, camera, renderer, mesh;

var keyboard = {};
var player = { height: 1.8 };

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

    mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
    );

    scene.add(mesh);

    camera.position.set(0, player.height, -5);
    camera.lookAt(mesh.position);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;


    if (keyboard[37]) {
        camera.rotation.y += Math.PI * 0.01;
    }
    if (keyboard[39]) {
        camera.rotation.y -= Math.PI * 0.01;
    }

    renderer.render(scene, camera);
}

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;