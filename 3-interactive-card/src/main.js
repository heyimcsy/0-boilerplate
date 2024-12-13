import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Card from './Card.js';

window.addEventListener('load', function () {
  init();
});

function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  // renderer.setClearAlpha()  0~1까지 투명도를 조정할 수 있다.
  //setClearColor 배경색과 투명도를 조절할 수 있다.
  // renderer.setClearColor(0x00aaff,0.5)
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // const textureLoader = new THREE.TextureLoader()
  // const texture = textureLoader.load('https://plus.unsplash.com/premium_photo-1725408062872-c3692746be35?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29mdCUyMHNreXxlbnwwfHwwfHx8MA%3D%3D')
  // scene.background = texture;
  // scene.background = new THREE.Color(0xffaa00);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

  camera.position.z = 25;

  const controls = new OrbitControls(camera, renderer.domElement);

  const card = new Card({
    width: 10,
    height:15.8,
    color: '#0077ff'
    });

 scene.add( card.mesh);

 const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
 ambientLight.position.set(-5, -5, -5);

 scene.add(ambientLight);
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
