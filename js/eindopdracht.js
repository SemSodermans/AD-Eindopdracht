Physijs.scripts.worker = 'js/physijs_worker.js';

var scene, camera, renderer, mesh;
var clock = new THREE.Clock();
var meshFloor;

var keyboard = {};
var player = { height: 4, speed: 0.4, turnSpeed: Math.PI * 0.02 };


function init() {
    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0, -1, 0));
    camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    document.body.appendChild(renderer.domElement);


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


    //Basketballen
    var ballGeometry = new THREE.SphereGeometry(0.35, 60, 60);
    var ballMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/img/basketball.jpg'), side: THREE.DoubleSide });
    var ball = new Physijs.SphereMesh(ballGeometry, ballMaterial);

    ball.position.set(6, 2, 4);
    ball.castShadow = true;
    scene.add(ball);

    ball2 = ball.clone();
    ball2.position.set(6.5, 2, 3.5);
    ball2.castShadow = true;
    scene.add(ball2);

    ball3 = ball.clone();
    ball3.position.set(7, 2, 3);
    ball3.castShadow = true;
    scene.add(ball3);

    ball4 = ball.clone();
    ball4.position.set(7.5, 2, 2.5);
    ball4.castShadow = true;
    scene.add(ball4);

    ball5 = ball.clone();
    ball5.position.set(8, 2, 2);
    ball5.castShadow = true;
    scene.add(ball5);

    ball6 = ball.clone();
    ball6.position.set(0, 2, 2);
    ball6.castShadow = true;
    scene.add(ball6);



    //ballenrek
    mesh5 = new THREE.Mesh(
        new THREE.CubeGeometry(1, 2, 3.5),
        new THREE.MeshPhongMaterial({ color: 0xDC143C, wireframe: false })


    );

    mesh5.position.set(7, .65, 3),
        mesh5.rotation.y = 11.8;
    mesh5.castShadow = true;
    scene.add(mesh5);


    //skybox
    mesh6 = new THREE.Mesh(
        new THREE.CubeGeometry(1000, 1000, 1000),
        backboardMaterials = [
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/img/skybox.jpg'), side: THREE.DoubleSide }),
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/img/skybox.jpg'), side: THREE.DoubleSide }),
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/img/skybox.jpg'), side: THREE.DoubleSide }),
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/img/skybox.jpg'), side: THREE.DoubleSide }),
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/img/skybox.jpg'), side: THREE.DoubleSide }),
            new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/img/skybox.jpg'), side: THREE.DoubleSide })
        ]

    );

    mesh6.position.set(0, 0, 0),
        mesh6.castShadow = true;
    scene.add(mesh6);




    //Vloer
    meshFloor = new Physijs.BoxMesh(
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


    camera.position.set(0, player.height, -8);


    //Camera beweging roteren
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    scene.simulate();

    //Bal beweging slepen
    dragControls = new THREE.DragControls([ball, ball2, ball3, ball4, ball5, ball6], camera, renderer.domElement);
    dragControls.addEventListener('dragstart', function (event) {
        event.object.material.opacity = 0.33
        orbitControls.enabled = false
    });
    dragControls.addEventListener('dragend', function (event) {
        event.object.material.opacity = 1
        orbitControls.enabled = true
    });

    animate();




}





function animate() {
    requestAnimationFrame(animate);

    //roteren van de middelste bal
    ball6.rotation.x += 0.02;
    ball6.rotation.y += 0.02;


    //toetsenbord beweging
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