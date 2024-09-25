import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';
import { CSS3DRenderer, CSS3DObject } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/renderers/CSS3DRenderer.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;
let objToRender = '3D_Objects/laptop.glb';
let cssRenderer, cssObject;

const loader = new GLTFLoader();

function turnOn(content){
    new TWEEN.Tween(content.style)
    .to({opacity: '1'}, 2000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start()
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
    cssObject.scale.set(0.01, 0.01, 0.1);
    scene.add(cssObject);

    setTimeout(turnOn(htmlContent), 1000);
}

async function loadHTMLContent() {
    const iframe = document.createElement('iframe');
    iframe.src = 'screen.html'; 
    iframe.style.width = '99%';
    iframe.style.height = '99%';
    return iframe;
}

loader.load(
    objToRender,
    function (gltf) {
        object = gltf.scene;
        object.scale.set(10, 10, 10);
        object.position.set(0, -15, 15);
        scene.add(object);
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
renderer.setClearColor(0x61edf7, 1);
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

function resetCameraPosition(from, to, duration, callback) {
    const startTime = Date.now();
    const endTime = startTime + duration;

    function animate() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        camera.position.lerpVectors(from, to, progress);
        controls.target.set(0, 5, -15);
        controls.update();
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            if (callback) setTimeout(callback, 500);
        }
    }

    animate();
}

function zoomInToScreen(callback) {
    const targetPosition = new THREE.Vector3(0, 5, 80);

    new TWEEN.Tween(camera.position)
        .to(targetPosition, 2000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
            if (callback) callback();
        })
        .start();
}


window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (cssRenderer) cssRenderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const currPos = camera.position.clone();
        const originPos = new THREE.Vector3(0, 5, 160);
        const duration = 1500;
        resetCameraPosition(currPos, originPos, duration, function () {
            zoomInToScreen(() => {
                createHTMLTexture();
            });
        });
    }
});

animate();
