const THREE = require('three')

class Earth {
  radius: number
  center: {
    x: number
    y: number
    z: number
  }

  group: any

  constructor (option: { radius: number }) {
    const { radius = 300 } = option

    this.radius = radius
    this.group = null
    this.center = {
      x: 0,
      y: 0,
      z: 0
    }
    this.init()
  }

  updateRadius (radius: number) {
    const earthGeometry = new THREE.SphereGeometry(radius, 64, 64) // new THREE.SphereGeometry(radius, 128, 128),
    this.group.geometry = earthGeometry
  }

  init () {
    const { center } = this
    // TODO:
    const earthTexture = new THREE.TextureLoader().load(
      './static/image/earth.jpg'
    )
    const earthBump = new THREE.TextureLoader().load('./static/image/bump.jpeg')
    const earthSpecular = new THREE.TextureLoader().load(
      './static/image/spec.jpeg'
    )
    const earthGeometry = new THREE.SphereGeometry(this.radius, 64, 64) // new THREE.SphereGeometry(radius, 128, 128),
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 100,
      bumpScale: 5,
      side: THREE.DoubleSide,
      transparent: true,
      bumpMap: earthBump,
      specularMap: earthSpecular
    })
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)

    earthMesh.position.set(center.x, center.y, center.z)
    earthMesh.rotateY(-(90 / 180) * Math.PI)

    this.group = earthMesh
  }
}

export default Earth
