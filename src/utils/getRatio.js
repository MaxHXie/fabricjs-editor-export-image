const getRatio = (group, canvas) => {
  const { width, height } = canvas
  if (group.width >= width && group.height <= height) {
    const ratio = width / group.width
    return {
      width: group.width,
      height: group.height,
      ratio,
    }
  }
  if (group.width <= width && group.height >= height) {
    const ratio = height / group.height
    return {
      width: group.width,
      height: group.height,
      ratio,
    }
  }
  if (group.width >= width && group.height >= height) {
    const ratio = group.width >= group.height
      ? width / group.width
      : height / group.height
    return {
      width: group.width,
      height: group.height,
      ratio,
    }
  }
  if (group.width <= width && group.height <= height) {
    const ratio = width <= height
      ? width / group.width
      : height / group.height
    return {
      width: group.width,
      height: group.height,
      ratio,
    }
  }
}

export default getRatio
