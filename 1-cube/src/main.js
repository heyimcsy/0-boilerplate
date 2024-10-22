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
    // transparent: true,
    // opacity: 0.5,
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

  const clock = new THREE.Clock();
  render();
  //재귀적으로 함수를 실행시켜 돌아가는 애니메이션 만든다.
  function render() {
    //각도의 기준은 radian
    // cube.rotation.x = THREE.MathUtils.degToRad(45);
    // cube.rotation.x += 0.01;

    //Date.now 만 넣어줄 시 ms 단위로 값이 변화해서 겁나 도는 큐브가 나온다.
    // cube.rotation.x = Date.now() / 1000;

    //THREE.js 내장 함수
    // cube.rotation.x = clock.getElapsedTime();
    cube.rotation.x += clock.getDelta();

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
