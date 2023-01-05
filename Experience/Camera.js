import * as THREE from 'three'
import Experience from './Experience'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    this.createPerspectiveCamera()
    this.createOrthographicCamera()
    this.setOrbitalControls()
  }

  createPerspectiveCamera () {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    )
    this.scene.add(this.perspectiveCamera)
  }

  createOrthographicCamera () {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -10,
      10
    )

    this.orthographicCamera.position.y = 3.5
    this.orthographicCamera.position.z = 5
    this.orthographicCamera.rotation.x = -Math.PI / 6

    this.scene.add(this.orthographicCamera)

    // this.helper = new THREE.CameraHelper(this.orthographicCamera)
    // this.scene.add(this.helper)

    const size = 20
    const division = 20

    // const gridHelper = new THREE.GridHelper(size, division)
    // this.scene.add(gridHelper)

    // const axesHelper = new THREE.AxesHelper(10)
    // this.scene.add(axesHelper)
  }

  setOrbitalControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
    this.controls.enableDamping = true
    this.controls.enableZoom = false
  }

  resize() {
    // Perspective Camera resize
    this.perspectiveCamera.aspect = this.sizes.aspect
    this.perspectiveCamera.updateProjectionMatrix()
    // Orthographic Camera resize
    this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2
    this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2
    this.orthographicCamera.top = this.sizes.frustrum / 2
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2
    this.orthographicCamera.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
    // this.helper.matrixWorldNeedsUpdate = true
    // this.helper.update()
    // this.helper.position.copy(this.orthographicCamera.position)
    // this.helper.rotation.copy(this.orthographicCamera.rotation)
  }
}
