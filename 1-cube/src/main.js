import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';

window.addEventListener('load', function () {
  init();
});

function init() {
  const options = {
    color: 0x00ffff,
  };
  const emissiveOptions = {
    color: 0x11111,
  };
  const renderer = new THREE.WebGLRenderer({
    // alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  // controls.autoRotateSpeed = 30;
  controls.enableDamping = true;
  // controls.dampingFactor = 0.01;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.maxDistance = 50;
  controls.minDistance = 10;
  // controls.maxPolarAngle = Math.PI / 2;
  // controls.minPolarAngle = Math.PI / 3;
  // controls.maxAzimuthAngle = Math.PI / 2;
  // controls.minAzimuthAngle = Math.PI / 3;

  const axisHelper = new THREE.AxesHelper(5);
  scene.add(axisHelper);
  //박스모양의 지오메트리 인자 순서대로 각각 높이 너비 깊이
  const cubeGeometry = new THREE.IcosahedronGeometry(1);

  /**
   *  MeshBasicMaterial은 조명에 영향을 받지 않는다. 조명이 없어도 가시적으로 확인이 가능
   *  MeshStandardMaterial은 조명에 영향을 받는다.
   */
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    emissive: 0x11111,
  });

  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  const skeletonGeometry = new THREE.IcosahedronGeometry(2);
  const skeletonMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    color: 0xaaaaaa,
  });
  const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMaterial);

  scene.add(cube);
  scene.add(skeleton);

  camera.position.z = 5;

  //인자 순서 조명의 색, 강도 조절
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

  scene.add(directionalLight);
  const clock = new THREE.Clock();
  render();
  //재귀적으로 함수를 실행시켜 돌아가는 애니메이션 만든다.
  function render() {
    // const elapsedTime = clock.getElapsedTime();

    // cube.rotation.x = elapsedTime;
    // cube.rotation.y = elapsedTime;

    // skeleton.rotation.x = elapsedTime * 1.5;
    // skeleton.rotation.y = elapsedTime * 1.5;

    renderer.render(scene, camera);

    controls.update();

    //주의점 유저가 보는 환경에 따라 애니메이션의 재생 속도가 달라질 수 있다
    //그래서 Date.now() 를 사용해서 보정을 해준다. 동일한 시간에 동일한 장면을 보여주는 것
    requestAnimationFrame(render);
  }
  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    controls.update();
  }

  window.addEventListener('resize', handleResize);

  const gui = new GUI();

  // gui.add(cube.position, 'y', -3, 3, 0.1);
  // gui.add(cube.position, 'x', -3, 3);

  gui.add(cube.position, 'y').min(-3).max(3).step(0.1);
  gui.add(cube, 'visible');
  //color 지정은 따로 addcolor 로 명시해줘야 한다.
  gui.addColor(options, 'color').onChange((value) => {
    cube.material.color.set(value);
    cube.material.emissive.set(value);
  });
  gui.addColor(emissiveOptions, 'color').onChange((value) => {
    cube.material.emissive.set(value);
  });
}
