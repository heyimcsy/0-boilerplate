import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
// 내가 원하는 폰트를 사용하고 싶으면 헤당 폰트를  facetype 사이트에서 변환을 해주어야 한다.
// import typeface from './assets/fonts/The Jamsil 3 Regular_Regular.json'
import GUI from 'lil-gui'

window.addEventListener('load', function () {
  init();
});

async function init() {
  const gui = new GUI();
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

  camera.position.z = 5;

  new OrbitControls(camera, renderer.domElement);

  /** Font */
  const fontLoader = new FontLoader()
//두가지 방법으로 가져올 수 있다. load 함수와 parse 함수

  const font = await fontLoader.loadAsync('./assets/fonts/The Jamsil 3 Regular_Regular.json')

  const textGeometry = new TextGeometry('안녕, 친구들',{
    font,
    size: 0.5,
    height: 0.1
  });

  const textMaterial = new THREE.MeshPhongMaterial({color: 0x00c896});
  const text =new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);
//인자 첫번째 가져올 폰트 경로, 두번째 콜백함수 , 세번째 onProgress , 네번째 onError 시 사용할 함수

  // const font =  fontLoader.parse(typeface)

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  /** Pont Light */
  const pointLight = new THREE.PointLight(0xffffff, 0.8);
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);

  pointLight.position.set(3,0,2);
  scene.add(pointLight, pointLightHelper);

  gui.add(pointLight.position, 'x').min(-3).max(3).step(0.1)

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
