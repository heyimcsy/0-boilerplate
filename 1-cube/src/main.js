import * as THREE from 'three';

window.addEventListener('load', function () {
  init();
});

function init() {
  const renderer = new THREE.WebGLRenderer({
    // alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

  //박스모양의 지오메트리 인자 순서대로 각각 높이 너비 깊이
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  /**
   *  MeshBasicMaterial은 조명에 영향을 받지 않는다. 조명이 없어도 가시적으로 확인이 가능
   *  MeshStandardMaterial은 조명에 영향을 받는다.
   */
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xcc99ff),
    transparent: true,
    opacity: 0.5,
    // visible: false,
    // wireframe: true,
    //side : THREE.FrontSide, THREE.BackSide, THREE.DoubleSide
    // side: THREE.DoubleSide,
  });

  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);

  // camera.position.z = 5;
  camera.position.set(1, 2, 2);

  //lookAt을 넣어주면 항상 해당 오브젝트가 중심으로 보이게 된다.
  camera.lookAt(cube.position);

  //인자 순서 조명의 색, 강도 조절
  const directionalLight = new THREE.DirectionalLight(0xf0f0f0, 1);
  directionalLight.position.set(-1, 2, 3);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  renderer.render(scene, camera);

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', handleResize);
}
