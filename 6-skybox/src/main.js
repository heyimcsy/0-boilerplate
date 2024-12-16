import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

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

  camera.position.z = 5;

  const controls = new OrbitControls(camera, renderer.domElement);

  controls.minDistance = 5;
  controls.maxDistance = 100;

  const textureLoader = new THREE.TextureLoader().setPath('assets/textures/Yokohama/');

  //positive, negative 양의 방향 음의 방향 x축에 대한 양의방향 음의 방향 을 뜻함
  const images = [
    'posx.jpg', 'negx.jpg',
    'posy.jpg', 'negy.jpg',
    'posz.jpg', 'negz.jpg',
  ];

  const geometry = new THREE.BoxGeometry(5000, 5000,5000);
  // const material = new THREE.MeshPhongMaterial({
  //   color: 0xaaccee,
  //   side:  THREE.BackSide,
  // });

  //MeshPhong으로 하면 빛의 영향을 받아 모서리 부분이 음영이 진다. 그래서 빛의 영향을 받지 않는 MeshBasic으로 변경
  const materials = images.map(image => new THREE.MeshBasicMaterial({
    map: textureLoader.load(image),
    side: THREE.BackSide,
  }));

  //material 을 배열로 보내줄 수 있다. [material1, material2 ,,,,]
  const skybox = new THREE.Mesh(geometry, materials);
  scene.add(skybox);

  render();

  function render() {
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
}
