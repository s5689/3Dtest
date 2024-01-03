import './main.css';
import * as THREE from 'three';
import { DDSLoader } from 'three/addons/loaders/DDSLoader.js';
import chessTexture from './chessTexture.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 1024 / 600, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(1024, 600);
document.body.appendChild(renderer.domElement);

const cubeLoader = new DDSLoader();

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    envMap: cubeLoader.load('./assets/Mountains_argb_nomip.dds', function (texture) {
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;
      texture.mapping = THREE.CubeReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      cube.needsUpdate = true;
    }),
  })
);

const ballTexture = new THREE.Texture(chessTexture());
ballTexture.needsUpdate = true;

const ball = new THREE.Mesh(
  new THREE.SphereGeometry(0.6, 32, 16),
  new THREE.MeshBasicMaterial({ map: ballTexture })
);

camera.position.z = 10;
ball.position.x = -7.2;
ball.position.y = -4;
cube.position.x = -5.5;
cube.position.y = -2.5;

scene.add(cube);
scene.add(ball);

function animate() {
  requestAnimationFrame(animate);

  ballAnimation();
  cubeAnimation();

  renderer.render(scene, camera);
}

let speed = 0.01;
let ballDir = 'r';
function ballAnimation() {
  // X = 7.2
  // Y = 4

  const x = ball.position.x;
  const y = ball.position.y;

  switch (ballDir) {
    case 'r': {
      if (x <= 2) {
        speed *= 1.01;
      } else {
        speed *= 0.982;
      }

      ball.rotation.y += speed * 1.5;
      ball.position.x += speed;

      if (x >= 7.15) {
        ballDir = 'u';
        speed = 0.01;
      }

      break;
    }

    case 'u': {
      if (y <= 1) {
        speed *= 1.01;
      } else {
        speed *= 0.982;
      }

      ball.rotation.x -= speed * 1.5;
      ball.position.y += speed;

      if (y >= 3.95) {
        ballDir = 'l';
        speed = 0.01;
      }

      break;
    }

    case 'l': {
      if (x >= -2) {
        speed *= 1.01;
      } else {
        speed *= 0.982;
      }

      ball.rotation.y -= speed * 1.5;
      ball.position.x -= speed;

      if (x <= -7.15) {
        ballDir = 'd';
        speed = 0.01;
      }

      break;
    }

    case 'd': {
      if (y >= -1) {
        speed *= 1.01;
      } else {
        speed *= 0.982;
      }

      ball.rotation.x += speed * 1.5;
      ball.position.y -= speed;

      if (y <= -3.95) {
        ballDir = 'r';
        speed = 0.01;
      }

      break;
    }
  }
}

let tics = 0;
let angleX = 0;
let angleY = 0;
let cubeDir = 'r';
function cubeAnimation() {
  // X = 5.5
  // Y = 2.5

  if (tics > 60) {
    switch (cubeDir) {
      case 'r': {
        angleX += 3;
        cube.rotation.y = 2 * Math.PI * (angleX / 360);
        cube.position.x += 0.0333333333;
        cube.position.x = Number(cube.position.x.toFixed(10));

        if (cube.position.x >= 5.49) {
          cubeDir = 'u';
        }

        break;
      }

      case 'u': {
        angleY -= 3;
        cube.rotation.x = 2 * Math.PI * (angleY / 360);
        cube.position.y += 0.0333333333;
        cube.position.y = Number(cube.position.y.toFixed(10));

        if (cube.position.y >= 2.49) {
          cubeDir = 'l';

          angleY = 0;
          cube.rotation.x = 0;
        }

        break;
      }

      case 'l': {
        angleX -= 3;
        cube.rotation.y = 2 * Math.PI * (angleX / 360);
        cube.position.x -= 0.0333333333;
        cube.position.x = Number(cube.position.x.toFixed(10));

        if (cube.position.x <= -5.49) {
          cubeDir = 'd';
        }

        break;
      }

      case 'd': {
        angleY += 3;
        cube.rotation.x = 2 * Math.PI * (angleY / 360);
        cube.position.y -= 0.0333333333;
        cube.position.y = Number(cube.position.y.toFixed(10));

        if (cube.position.y <= -2.49) {
          cubeDir = 'r';

          angleY = 0;
          cube.rotation.x = 0;
        }

        break;
      }
    }

    if (cubeDir === 'r') {
      if (angleX === 90 || angleX === 180 || angleX === 270 || angleX === 360) {
        tics = 0;

        if (angleX === 360) {
          angleX = 0;
        }
      }
    }

    if (cubeDir === 'u') {
      if (angleY === -90 || angleY === -180 || angleY === -270 || angleY === -360) {
        tics = 0;

        if (angleY === -360) {
          angleY = 0;
        }
      }
    }

    if (cubeDir === 'l') {
      if (angleX === 0 || angleX === 90 || angleX === 180 || angleX === 270) {
        tics = 0;

        if (angleX === 0) {
          angleX = 360;
        }
      }
    }

    if (cubeDir === 'd') {
      if (angleY === 90 || angleY === 180 || angleY === 270 || angleY === 360) {
        tics = 0;

        if (angleY === 360) {
          angleY = 0;
        }
      }
    }

    console.log('frame: ', tics);
    console.log('aX: ', angleX, ' | aY: ', angleY);
    console.log('X: ', cube.position.x, ' | Y: ', cube.position.y);
    console.log('--------------------------------');
  }

  tics++;
}

animate();
