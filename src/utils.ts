export const point2TyTn = (point: { x: number; y: number; z: number }) => {
  let ty = Math.atan(point.x / point.z)
  if (point.z < 0 && point.x > 0) {
    ty += Math.PI
  } else if (point.z < 0 && point.x < 0) {
    ty -= Math.PI
  }
  const tn = Math.asin(
    point.y /
      Math.sqrt(point.z * point.z + point.x * point.x + point.y * point.y)
  )
  return {
    ty,
    tn
  }
}

export const rotation2TyTn = (rotation: {
x: number
y: number
z: number
}) => {
  const ty = rotation.y
  const sinT = Math.sqrt(
    (Math.tan(rotation.x) * Math.tan(rotation.x)) /
      (Math.tan(rotation.x) * Math.tan(rotation.x) +
        Math.tan(rotation.y) * Math.tan(rotation.y) +
        1)
  )
  return {
    ty,
    tn: Math.asin(sinT)
  }
}

export const getRightLatOrLng = (lntOrlng: number) => {
  let res = lntOrlng
  while (Math.abs(res) > 180) {
    if (res < 0) {
      res += 360
    } else {
      res -= 360
    }
  }
  return res
}
