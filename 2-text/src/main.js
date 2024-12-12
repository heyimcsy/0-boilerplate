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

  //그림자 사용 허용하는 코드
  renderer.shadowMap.enabled = true;

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

  camera.position.set(0,1,5);

  new OrbitControls(camera, renderer.domElement);

  /** Font */
  const fontLoader = new FontLoader();
//두가지 방법으로 가져올 수 있다. load 함수와 parse 함수

  const font = await fontLoader.loadAsync('./assets/fonts/The Jamsil 3 Regular_Regular.json');

  //bavel: 날카로운 text에 경사면을 줘 윤곽을 부드럽게 만든다
  const textGeometry = new TextGeometry('Three.js Interactive Web.',{
    font,
    size: 0.5,
    height: 0.1,
    bevelEnabled: true,
    bevelSegment: 5,
    bevelSize: 0.02,
    bevelThickness: 0.02
  });

  const textMaterial = new THREE.MeshPhongMaterial();
  const text =new THREE.Mesh(textGeometry, textMaterial);

  text.castShadow = true;

  //text material을 화면의 중간에 오게 하는 방법은 두가지가 있다. bounding box 계산해서 translate 하는 것과 center함수를 이용하는 것 이다.
  //bounding box 의 크기를 계산하는 computeBoundingBox를 먼저 실행을 해야 boundingBox의 값을 알 수 있다.
  // textGeometry.computeBoundingBox();
  // console.log('textGeometry', textGeometry.boundingBox);

  // textGeometry.translate(
  //   - (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x)*0.5,
  //   - (textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y)*0.5,
  //   - (textGeometry.boundingBox.max.z - textGeometry.boundingBox.min.z)*0.5,
  // )

  textGeometry.center()

  /** Texture */
  // const textureLoader = new THREE.TextureLoader();
  const textureLoader = new THREE.TextureLoader().setPath('./assets/textures/');

  const textTexture = textureLoader.load('holographic.jpeg')

  textMaterial.map =  textTexture
  scene.add(text);
//인자 첫번째 가져올 폰트 경로, 두번째 콜백함수 , 세번째 onProgress , 네번째 onError 시 사용할 함수

  // const font =  fontLoader.parse(typeface)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  /** Spot Light */
  const spotLight = new THREE.SpotLight(0xffffff, 30, 30, Math.PI*0.15, 0.2, 0.5 )
  // 빛의 색상, 빛의 강도 , 빛이 닿는 거리 , 퍼지는 각도, 감소하는 정도, 거리에  따라 어두워지는 양

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.radius = 10;

  spotLight.position.set(0,0,3);
  spotLight.target.position.set(0,0,-3);

  const spotLightTexture = textureLoader.load('gradient.jpeg');

  spotLight.map = spotLightTexture;

  scene.add(spotLight, spotLight.target);

  window.addEventListener('mousemove' , event => {
    //절대 값으로 값이 와서 window 창에 대한 상대값을 넣어줘야 한다.
    const x = ((event.clientX / window.innerWidth) - 0.5)*5;
    const y = -((event.clientY / window.innerHeight) - 0.5)*5;
    spotLight.target.position.set(x,y,-3)
  })

  /** Plane Geometry */
  const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
  const planeMaterial = new THREE.MeshPhongMaterial({color: 0x000000});

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.z = -10;
  plane.receiveShadow = true;

  scene.add(plane);

  // /** Pont Light */
  // const pointLight = new THREE.PointLight(0xffffff, 0.8);
  // // const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
  //
  // pointLight.position.set(3,0,2);
  // // scene.add(pointLight, pointLightHelper);
  // scene.add(pointLight);
  //
  // gui.add(pointLight.position, 'x').min(-3).max(3).step(0.1)

  // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  //
  // scene.add(spotLightHelper);

  const spotLightFolder = gui.addFolder('SpotLight');

  spotLightFolder
    .add(spotLight, 'angle')
    .min(0)
    .max(Math.PI /2)
    .step(0.01);

  spotLightFolder
    .add(spotLight.position, 'z')
    .min(1)
    .max(10)
    .step(0.01)
    .name('position.z');

  spotLightFolder
    .add(spotLight, 'distance')
    .min(1)
    .max(40)
    .step(0.01);

  spotLightFolder
    .add(spotLight, 'decay')
    .min(0)
    .max(10)
    .step(0.01);


  spotLightFolder
    .add(spotLight, 'penumbra')
    .min(0)
    .max(1)
    .step(0.01);

  spotLightFolder
    .add(spotLight.shadow, 'radius')
    .min(0)
    .max(10)
    .step(0.01)
    .name('shadow.radius');

  render();

  function render() {
    renderer.render(scene, camera);
    // spotLightHelper.update();

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
