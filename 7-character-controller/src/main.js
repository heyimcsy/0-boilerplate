import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

window.addEventListener('load', function () {
  init();
});

async function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,

  });

  renderer.outputEncoding = THREE.sRGBEncoding;

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

  camera.position.set(0,5,20);

  const progressBar = document.querySelector('#progress-bar');
  const progressBarContainer = document.querySelector('#progress-bar-container')

  const loadingManager = new THREE.LoadingManager();

  loadingManager.onProgress = (url, loaded, total) => {
    progressBar.value = (loaded / total) * 100;
  };

  loadingManager.onLoad = () => {
    progressBarContainer.style.display = 'none';
  }
  const gltfLoader = new GLTFLoader(loadingManager);

   // 모델을 불러오는 시간이 걸려서 흰 화면이 보여지고 있다.
  const gltf = await gltfLoader.loadAsync('models/character.gltf');

  const model = gltf.scene;

  model.scale.set(0.1,0.1,0.1);

  scene.add(model);

  camera.lookAt(model.position);

  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x333333);

  scene.add(hemisphereLight);

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
