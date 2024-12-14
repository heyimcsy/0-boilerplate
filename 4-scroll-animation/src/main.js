import * as THREE from 'three';
import {GUI} from 'lil-gui';

window.addEventListener('load', function () {
  init();
});

function init() {
  const gui = new GUI()
  const canvas = document.querySelector('#canvas');
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas ,
  });


  renderer.setSize(window.innerWidth, window.innerHeight);


  const scene = new THREE.Scene();

  scene.fog = new THREE.Fog('0xf0f0f0', 0.1, 500);
  // scene.fog = new THREE.FogExp2(0xf0f0f0, 0.005);

  // gui.add(scene.fog, 'near')
  //   .min(0)
  //   .max(100)
  //   .step(0.1);
  //
  // gui.add(scene.fog, 'far')
  //   .min(100)
  //   .max(500)
  //   .step(0.1);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

  camera.position.set(0,25,150);

  const waveGeometry = new THREE.PlaneGeometry(1500, 1500, 150, 150);
  const waveMaterial = new THREE.MeshStandardMaterial({
    color: '#00ffff'
  });

  const wave = new THREE.Mesh(waveGeometry,  waveMaterial);
  wave.rotation.x = -Math.PI / 2;

  const waveHeight = 2.5;

  // for (let i = 0; i< waveGeometry.attributes.position.array.length; i += 3){
  //   waveGeometry.attributes.position.array[i + 2] += (Math.random() - 0.5) * waveHeight;
  // }

  const initialZPositions = [];

  for (let i = 0; i< waveGeometry.attributes.position.count; i ++){
    const z = waveGeometry.attributes.position.getZ(i) +  (Math.random() - 0.5) * waveHeight;

    waveGeometry.attributes.position.setZ(i, z);
    initialZPositions.push(z);
  }

  wave.update = function (){
    const elapsedTime = clock.getElapsedTime();

    for(let i = 0; i < waveGeometry.attributes.position.count; i ++){
      const z = initialZPositions[i] +  Math.sin(elapsedTime * 3 + i ** 2) * waveHeight;
      waveGeometry.attributes.position.setZ(i, z);

    }

    waveGeometry.attributes.position.needsUpdate = true;
  }
  scene.add(wave);

  const pointLight = new THREE.PointLight(0xffffff, 4000);
  pointLight.position.set(15,15,15);

  scene.add(pointLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

  directionalLight.position.set(-15, 15, 15);

  scene.add(directionalLight);

  const clock = new THREE.Clock();

  render();

  function render() {
    wave.update();

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
