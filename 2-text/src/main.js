import * as THREE from 'three';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
// 내가 원하는 폰트를 사용하고 싶으면 헤당 폰트를  facetype 사이트에서 변환을 해주어야 한다.
import typeface from './assets/fonts/The Jamsil 3 Regular_Regular.json'
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

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

  camera.position.z = 5;

  /** Font */
  const fontLoader = new FontLoader()
//두가지 방법으로 가져올 수 있다. load 함수와 parse 함수

  // fontLoader.load('./assets/fonts/The Jamsil 3 Regular_Regular.json',
  //     font => {
  //   console.log('load', font)
  // },
  //   event=> {
  //   console.log('progress', event)
  //   },
  //   error => {
  //   console.log('error', error)
  //   }
  //   )
//인자 첫번째 가져올 폰트 경로, 두번째 콜백함수 , 세번째 onProgress , 네번째 onError 시 사용할 함수

  const font =  fontLoader.parse(typeface)

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
