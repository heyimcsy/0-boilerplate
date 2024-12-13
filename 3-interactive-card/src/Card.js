import * as THREE from 'three';

class Card {
  constructor ({width, height, color}) {
    const geometry = new THREE.PlaneGeometry(width, height)
    const material = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness:0.5
    })

    const mesh = new THREE.Mesh(geometry, material)

    this.mesh = mesh;
  }
}

export default Card;
