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
    const elapsedTime = clock.getElapsedTime();

    cube.rotation.x = elapsedTime;
    cube.rotation.y = elapsedTime;

    skeleton.rotation.x = elapsedTime * 1.5;
    skeleton.rotation.y = elapsedTime * 1.5;

    // cube.rotation.y = Math.sin(cube.rotation.x);
    // cube.scale.x = Math.cos(cube.rotation.x);
    renderer.render(scene, camera);

    //주의점 유저가 보는 환경에 따라 애니메이션의 재생 속도가 달라질 수 있다
    //그래서 Date.now() 를 사용해서 보정을 해준다. 동일한 시간에 동일한 장면을 보여주는 것
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
