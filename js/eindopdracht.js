var scene, camera, renderer, mesh;
var meshFloor;

var keyboard = {};
var player = { height: 3.5, speed: 0.4, turnSpeed: Math.PI * 0.02 };

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    //Bovenste Cilinder
    mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 5, 32),
        new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: false })

    );

    mesh.position.y += 4;
    mesh.position.z += 16;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

    //Bovenste onderste Cilinder
    mesh2 = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 3, 32),
        new THREE.MeshPhongMaterial({ color: 0xDC143C, wireframe: false })

    );

    mesh2.position.y += 1;
    mesh2.position.z += 16.45;
    mesh2.receiveShadow = true;
    mesh2.castShadow = true;
    scene.add(mesh2);

    //Backboard
    mesh3 = new THREE.Mesh(
        new THREE.CubeGeometry(2.5, 1.5, 0.2),
        backboardMaterials = [
            new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide }),
            new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide }),
            new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide }),
            new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide }),
            new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide }),
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/img/backboard.jpg'), side: THREE.DoubleSide })
        ]

    );

    mesh3.position.y += 6;
    mesh3.position.z += 15.5;
    mesh3.receiveShadow = false;
    mesh3.castShadow = true;
    scene.add(mesh3);

    //Ring
    mesh4 = new THREE.Mesh(
        new THREE.TorusGeometry(0.55, 0.02, 0.1, 100),
        new THREE.MeshPhongMaterial({ color: 0xFF8C00, wireframe: false })

    );

    mesh4.position.y += 5.6;
    mesh4.position.z += 14.8;
    mesh4.rotation.x += 99;
    mesh4.receiveShadow = false;
    mesh4.castShadow = true;
    scene.add(mesh4);


    //Basketbal
    ball = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 60, 60),
        sphereMaterials = [
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/img/basketball.jpg'), side: THREE.DoubleSide })
        ]


    );

    ball.position.z += 4;
    ball.position.y += 2;
    ball.castShadow = true;
    scene.add(ball);


    //Vloer
    meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(28, 50, 10, 10),
        meshFloorMaterials = [
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/img/court.jpg'), side: THREE.DoubleSide })
        ]

    );
    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.position.z += -8;
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    light = new THREE.PointLight(0xffffff, 1.5, 55);
    light.position.set(-5, 30, -5);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 50;
    scene.add(light);




    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    document.body.appendChild(renderer.domElement);

    //Camera beweging roteren
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    //Bal beweging slepen
    dragControls = new THREE.DragControls([ball], camera, renderer.domElement);
    dragControls.addEventListener('dragstart', function (event) {
        event.object.material.opacity = 0.33
        orbitControls.enabled = false
    });
    dragControls.addEventListener('dragend', function (event) {
        event.object.material.opacity = 1
        orbitControls.enabled = true
    });


    camera.position.set(0, player.height, 0);
    camera.rotation.y += 3.15;


    animate();
}

function animate() {
    requestAnimationFrame(animate);

    ball.rotation.x += 0.03;
    ball.rotation.y += 0.03;

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