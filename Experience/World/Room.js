import * as THREE from 'three'
import Experience from '../Experience'

export default class Room {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.room = this.resources.items.room
    this.actualRoom = this.room.scene

    this.setModel()
  }

  setModel() {
    this.actualRoom.children.forEach(child => {
      child.castShadow = true
      child.receiveShadow = true

      if (child instanceof  THREE.Group) {
        child.children.forEach(groupChild => {
          groupChild.castShadow = true
          groupChild.receiveShadow = true
        })
      }

      if (child.name === "Aquarium") {
        child.children[0].material = new THREE.MeshPhysicalMaterial();
        child.children[0].material.roughness = 0;
        child.children[0].material.color.set(0x549dd2);
        child.children[0].material.ior = 3;
        child.children[0].material.transmission = 1;
        child.children[0].material.opacity = 1;
      }

      if (child.name === "Computer") {
        child.children[1].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }
    })
    this.scene.add(this.actualRoom)
    this.actualRoom.scale.set(0.11, 0.11, 0.11)
  }

  resize() {
  }

  update() {
  }
}
