import * as THREE from 'three';

class Firework {
  constructor ({x,y}) {
    //랜덤한 숫자를 넘겨주지만 정수로 보여주기 위해 round로 반올림 처리를 해줌
    const count = Math.round(Math.random() * 5000);
    const velocity = 1 + Math.random() * 10;

    const particlesGeometry = new THREE.BufferGeometry();

    this.particles = [];

    for (let i = 0; i < count; i++){
      const particle = new THREE.Vector3(x, y, 0);

      particle.theta = Math.random() + Math.PI * 2;
      particle.phi = Math.random() * Math.PI * 2;

      particle.deltaX = velocity * Math.sin(particle.theta) * Math.cos(particle.phi);
      particle.deltaY = velocity * Math.sin(particle.theta) * Math.sin(particle.phi);
      particle.deltaZ = velocity * Math.cos(particle.theta);

      // particle 이 2차원 구 형식으로 생성이 된다.
      // particle.theta = Math.random() * Math.PI * 2; // 0~2π
      //
      // particle.deltaX = velocity * Math.cos(particle.theta);
      // particle.deltaY = velocity * Math.sin(particle.theta);
      // particle.deltaZ = 0;

      //particle이 정육면체 모양으로 퍼져나간다.
      // particle.deltaX = THREE.MathUtils.randFloatSpread(velocity);
      // particle.deltaY = THREE.MathUtils.randFloatSpread(velocity);
      // particle.deltaZ = THREE.MathUtils.randFloatSpread(velocity);
      this.particles.push(particle);
    }

    particlesGeometry.setFromPoints(this.particles);

    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load('./assets/textures/particle.png');

    const particlesMaterial = new THREE.PointsMaterial({
      size: 1,
      alphaMap:texture,
      transparent:true,
      depthWrite: false,
      color: new THREE.Color(Math.random(),Math.random(),Math.random()),
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(particlesGeometry, particlesMaterial);

    this.points = points;
  }

  update(){
    const position = this.points.geometry.attributes.position;
    for(let i = 0; i < this.particles.length; i++){
     const x = position.getX(i);
     const y = position.getY(i);
     const z = position.getZ(i);

     position.setX(i, x + this.particles[i].deltaX);
     position.setY(i, y + this.particles[i].deltaY);
     position.setZ(i, z + this.particles[i].deltaZ);
    }
    position.needsUpdate = true;
  };
}

export default Firework;