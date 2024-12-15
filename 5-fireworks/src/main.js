import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Firework from './Firework.js';
import firework from './Firework.js';

window.addEventListener('load', function () {
  init();
});

function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

  camera.position.z = 8000;

  // new OrbitControls(camera, renderer.domElement);

  // const geometry = new THREE.BufferGeometry();
  //
  // const count = 10000;
  //
  // const positions = new Float32Array(count * 3);
  // const colors = new Float32Array(count * 3);
  //
  // for (let i = 0 ; i < count ; i++){
  //   // positions[i * 3] = Math.random() - 0.5;
  //   // positions[i * 3 + 1] = Math.random() - 0.5;
  //   // positions[i * 3 + 2] = Math.random() - 0.5;
  //   //해당 Math.random() 함수처럼 사용할 수 있는 내장함수 randomFloatSpread 함수
  //   positions[i * 3] = THREE.MathUtils.randFloatSpread(10);
  //   positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(10);
  //   positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(10);
  //
  //   colors[i * 3] = Math.random();
  //   colors[i * 3 + 1] = Math.random();
  //   colors[i * 3 + 2] = Math.random();
  // }
  //
  // // 3 부분은 3개의 정보가 모여서 점하나의 정보를 담고있다고 알려주는 것
  // geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  // geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  //
  // const material = new THREE.PointsMaterial({
  //   color: 0xccaaff,
  //   size: 0.1,
  //   vertexColors: true,
  //   // sizeAttenuation: false,
  // });
  //
  // const textureLoader = new THREE.TextureLoader();
  //
  // const texture = textureLoader.load('./assets/textures/particle.png');
  //
  // //넣어준 particle의 이미지가 배경까지 부자연스럽게 보여줘 해결해주는 속성값들
  // material.alphaMap = texture;
  // material.transparent = true;
  // material.depthWrite = false;
  //
  // const points = new THREE.Points(geometry, material);
  //
  // scene.add(points);

  const fireworks = [];

  fireworks.update = function (){
    for(let i = 0; i < this.length; i++){
      const firework = fireworks[i];

      firework.update();
    }
  }

  const firework = new Firework({x:0 , Y: 0});

  scene.add(firework.points);

  fireworks.push(firework);

  render();

  function render() {
    fireworks.update();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', handleResize);

  function handleMouseDown() {
    const firework = new Firework({
      x : THREE.MathUtils.randFloatSpread(8000),
      y : THREE.MathUtils.randFloatSpread(8000)
    });

    scene.add(firework.points);

    fireworks.push(firework);
  }

  window.addEventListener('mousedown', handleMouseDown);
}
