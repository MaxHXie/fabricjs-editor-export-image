const setAttributes = (obj, attributes = {}) => (
  obj.set({
    strokeWidth: 0,
    borderColor: '#4D4A46',
    cornerColor: '#000',
    cornerSize: 8,
    borderScaleFactor: 5,
    transparentCorners: false,
    hasControls: false,
    ...attributes,
  })
)

export default setAttributes
