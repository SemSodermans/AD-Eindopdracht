var scene, camera, renderer, mesh;
var meshFloor;

var keyboard = {};
var player = { height: 1.8, speed: 0.2, turnSpeed: Math.PI * 0.02 };

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

    mesh = new THREE.Mesh(
        new THREE.CubeGeometry(1, 1, 1),
        new THREE.MeshPhongMaterial({ color: 0x432BD7, wireframe: false })

    );

    mesh.position.y += 1;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

    meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 10, 10, 10),
        new THREE.MeshPhongMaterial({ color: 0xFB6D6D, wireframe: false })
    );
    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    light = new THREE.PointLight(0xffffff, 1.5, 20);
    light.position.set(-1, 5, -2);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add(light);

    camera.position.set(0, player.height, -5);
    camera.lookAt(new THREE.Vector3(0, player.height, 0));

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    document.body.appendChild(renderer.domElement);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    if (keyboard[87]) {
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;

    }

    if (keyboard[83]) {
        camera.position.x += Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * player.speed;

    }

    if (keyboard[65]) {
        camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;

    }

    if (keyboard[68]) {
        camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;

    }


    if (keyboard[37]) {
        camera.rotation.y -= player.turnSpeed;
    }
    if (keyboard[39]) {
        camera.rotation.y += player.turnSpeed;
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