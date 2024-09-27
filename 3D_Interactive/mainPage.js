import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';
import { CSS3DRenderer, CSS3DObject } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/renderers/CSS3DRenderer.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);

let object1;
let object2;
let object3;
let laptop = '3D_Objects/laptop.glb';
let cup = '3D_Objects/coffeeCup.glb';
let headphones = '3D_Objects/HeadPhones.glb';
let cssRenderer, cssObject;
let pos = 0

const loader = new GLTFLoader();

function turnOn(content){
    new TWEEN.Tween(content.style)
    .to({opacity: '1'}, 2000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start()
}

async function loadHTMLContent() {
    const iframe = document.createElement('iframe');
    iframe.src = 'screen.html'; 
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    return iframe;
}

async function createHTMLTexture() {
    const htmlContent = await loadHTMLContent();
    cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = '0';
    cssRenderer.domElement.style.left = '0';
    cssRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(cssRenderer.domElement);

    cssObject = new CSS3DObject(htmlContent);
    cssObject.position.set(0, 5.1, -20);
    cssObject.scale.set(0.04, 0.04, 0.1);
    scene.add(cssObject);

    setTimeout(turnOn(htmlContent), 1000);
}

loader.load(
    laptop,
    function (gltf) {
        object1 = gltf.scene;
        object1.scale.set(10, 10, 10);
        object1.position.set(0, -15, 15);
        scene.add(object1);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log(error);
    }
);

loader.load(
    headphones,
    function (gltf) {
        object2 = gltf.scene;
        object2.scale.set(10, 10, 10);
        object2.position.set(1150, -15, 0);
        scene.add(object2);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log(error);
    }
);

loader.load(
    cup,
    function (gltf) {
        object3 = gltf.scene;
        object3.scale.set(10, 10, 10);
        object3.position.set(-1150, -15, 0);
        scene.add(object3);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log(error);
    }
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x5d6d7e, 1);
renderer.setPixelRatio( window.devicePixelRatio );
let controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
controls.maxDistance = 450;

document.getElementById("3dContainer").appendChild(renderer.domElement);

camera.position.z = 250;

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(100, 100, 100);
topLight.intensity = 2;
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
ambientLight.position.set(-100, -100, -100);
ambientLight.intensity = 0.6;
ambientLight.castShadow = true;
scene.add(ambientLight);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    TWEEN.update(); 
    if (cssRenderer) cssRenderer.render(scene, camera);
}

function changeTarget(pos, event){
    let vector;
    if (!object1 || !object2 || !object3) {
        console.log("Objects not fully loaded yet.");
        return { pos, vector: null };
    }
    const objects = [object1, object2, object3];
    
    switch (event.code){
        case 'ArrowRight':
            if (pos != 1){
                pos = (pos + 1) % 3;
            }
            break;
        case 'ArrowLeft':
            if (pos != 2){
                pos = (pos - 1 + 3) % 3
            }
            break;
    }
    
    
    let laptopOriginOffset = new THREE.Vector3(0,15,-30);
    let camOffset = new THREE.Vector3(0,0,250);
    if (pos == 0){
        vector = objects[pos].position.clone().add(laptopOriginOffset);   
    } else {
        vector = objects[pos].position;
    }
    const cameraPosition = vector.clone().add(camOffset);
    return { pos, vector, cameraPosition };
}


// function resetCameraPosition(from, to, duration, callback) {
//     const startTime = Date.now();
//     const endTime = startTime + duration;

//     function animate() {
//         const now = Date.now();
//         const elapsed = now - startTime;
//         const progress = Math.min(elapsed / duration, 1);

//         camera.position.lerpVectors(from, to, progress);
//         controls.update();
//         camera.updateProjectionMatrix();
//         renderer.render(scene, camera);

//         if (progress < 1) {
//             requestAnimationFrame(animate);
//         } else {
//             if (callback) setTimeout(callback, 500);
//         }
//     }

//     animate();
// }

// function zoomInToScreen(callback) {
//     const targetPosition = new THREE.Vector3(0, 5, 80);

//     new TWEEN.Tween(camera.position)
//         .to(targetPosition, 2000)
//         .easing(TWEEN.Easing.Quadratic.Out)
//         .onComplete(() => {
//             if (callback) callback();
//         })
//         .start();
// }


window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (cssRenderer) cssRenderer.setSize(window.innerWidth, window.innerHeight);
});

// window.addEventListener('keydown', function (event) {
//     if (event.key === 'Enter') {
//         const currPos = camera.position.clone();
//         const originPos = new THREE.Vector3(1150, 5, 250);
//         const duration = 1500;
//         resetCameraPosition(currPos, originPos, duration, function () {
//         });
//     }
// });


window.addEventListener('keydown', function(event){
    const result = changeTarget(pos, event);
    pos = result.pos;
    if (result.vector) {
        // Use TWEEN to smoothly move the camera and update controls
        new TWEEN.Tween(controls.target)
            .to(result.vector, 900)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        
        new TWEEN.Tween(camera.position)
            .to(result.cameraPosition, 900)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
    }
});

// camera.position.set(0, 0, 50);
// controls.target.copy(objectPositions[0].position);

animate();
