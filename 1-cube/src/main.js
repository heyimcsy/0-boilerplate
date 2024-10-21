import * as THREE from 'three';

window.addEventListener('load', function () {
  init();
});

function init() {
  const renderer = new THREE.WebGLRenderer({
    // alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

  //박스모양의 지오메트리 인자 순서대로 각각 높이 너비 깊이
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const material = new THREE.MeshBasicMaterial({ color: 0xcc99ff });

  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);

  // camera.position.z = 5;
  camera.position.set(1, 2, 5);

  //lookAt을 넣어주면 항상 해당 오브젝트가 중심으로 보이게 된다.
  camera.lookAt(cube.position);

  renderer.render(scene, camera);
}
