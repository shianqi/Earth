import * as THREE from 'three'
import { OrbitControls } from 'LIBS/three/controls/OrbitControls.js'

import Earth from './Earth'
import { point2TyTn, getRightLatOrLng } from './utils'

class App {
  width: number
  height: number
  hasMove: boolean
  app: any
  counter: number

  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  camera: THREE.OrthographicCamera
  controls: OrbitControls
  group: THREE.Group

  earth: any
  mouse: {
    x: number
    y: number
  }

  raycaster: THREE.Raycaster

  constructor (option: { app: any }) {
    const { app } = option

    this.app = app
    this.counter = 0

    this.width = app.clientWidth
    this.height = app.clientHeight
    this.hasMove = false

    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setClearColor('#000000', 1)

    this.camera = new THREE.OrthographicCamera(
      -this.width / 2,
      this.width / 2,
      this.height / 2,
      -this.height / 2
    )
    this.group = new THREE.Group()
    this.earth = new Earth({ radius: this.height * 0.45 })
    // this.messageBox = new MessageBox({ radius: this.height * 0.465 })

    this.mouse = new THREE.Vector2()
    this.raycaster = new THREE.Raycaster()

    document.addEventListener(
      'mousemove',
      () => {
        this.hasMove = true
      },
      false
    )

    document.addEventListener(
      'mousedown',
      () => {
        this.hasMove = false
      },
      false
    )

    document.addEventListener(
      'mouseup',
      event => {
        if (this.hasMove) return
        event.preventDefault()

        const left = this.app.getBoundingClientRect().left
        const top = this.app.getBoundingClientRect().top
        const clientX = event.clientX - left
        const clientY = event.clientY - top

        this.mouse.x = (clientX / this.width) * 2 - 1
        this.mouse.y = -(clientY / this.height) * 2 + 1

        this.raycaster.setFromCamera(this.mouse, this.camera)
        var intersects = this.raycaster.intersectObjects([this.earth.group])

        if (intersects.length > 0) {
          const point0 = intersects[0].point
          const { tn, ty } = point2TyTn(point0)
          const flng = (ty * 180) / Math.PI
          const flat = (tn * 180) / Math.PI

          const lng = getRightLatOrLng(flng)
          const lat = getRightLatOrLng(flat)

          const info = document.getElementById('app-info')
          if (info) {
            info.innerText = `lat: ${lat.toFixed(4)}, lng: ${lng.toFixed(4)}`
          }
        }
      },
      false
    )

    window.addEventListener('resize', this.resize, false)

    this.init()
  }

  initApp () {
    const { app, renderer } = this

    for (const item of Array.from(app.children)) {
      app.removeChild(item)
    }
    app.appendChild(renderer.domElement)
  }

  init () {
    this.initApp()
    this.initRenderer()
    this.initLight()
    this.initThings()
    this.initCamera()
    this.initReflectLight()
  }

  initReflectLight () {
    const spriteMap = new THREE.TextureLoader().load('./static/image/ec.png')
    const spriteMaterial = new THREE.SpriteMaterial({
      map: spriteMap,
      color: 0xffffff
    })
    const sprite = new THREE.Sprite(spriteMaterial)
    sprite.scale.set(this.height * 4 * 0.45, this.height * 4 * 0.45, 1.0)
    console.log(this.height)
    this.scene.add(sprite)
  }

  initCamera () {
    this.camera.position.set(440, 0, -330)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableZoom = false
    this.controls.rotateSpeed = 0.6
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = 0.4
  }

  initRenderer () {
    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }

  initLight () {
    const { scene } = this
    // scene.fog = new THREE.FogExp2(0xffffff, 0.002)
    const pointLight = new THREE.PointLight(0xf0f0f0, 2, 10000, 0)
    pointLight.position.set(800, 0, -600)
    scene.add(pointLight)

    const ambientLight = new THREE.AmbientLight(0x666666)
    scene.add(ambientLight)
  }

  initThings () {
    const { earth, scene } = this
    this.group.add(earth.group)
    scene.add(this.group)
  }

  animate () {
    const { renderer, scene, camera } = this
    this.counter += 1

    this.controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(this.animate.bind(this))
  }

  resize = () => {
    this.width = this.app.clientWidth
    this.height = this.app.clientHeight

    this.renderer.setSize(this.width, this.height)

    this.camera.left = -this.width / 2
    this.camera.right = this.width / 2
    this.camera.top = this.height / 2
    this.camera.bottom = -this.height / 2

    this.camera.updateProjectionMatrix()

    this.earth.updateRadius(this.height * 0.45)

    this.renderer.setSize(this.width, this.height)
  }
}

export default App
