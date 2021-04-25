import React, { useCallback, useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import { fabric } from 'fabric'
import fabricConfig from './fabricConfig'
import getRatio from './utils/getRatio'
import getUrlSearchParams from './utils/getUrlSearchParams'
import setAttributes from './utils/setAttributes'

const Canvas = () => {
  // State
  const [HTML5Canvas, setCanvas] = useState(null)
  const [isToolkitOpen, setIsToolkitOpen] = useState(false)
  const [canvasDisabled, setCanvasDisabled] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [, setSteps] = useState({
    steps: [],
    currentStep: -1,
  })
  // Ref
  const colorRef = useRef(null)
  // Functions

  const loadImageFromUrl = useCallback(canvas => {
    // Load an SVG from GET parameter upon initialization of image editor
    const imageUrl = 'https://maxhenryxie.com/img/girl_small_1MB.svg'

    if (imageUrl) {
      new Promise(resolve => fabric.loadSVGFromURL(imageUrl, (objects, options) => {
        const group = new fabric.Group(objects)
        resolve(getRatio(group, canvas))
      }))
      .then(({ ratio, width, height }) => {
        fabric.loadSVGFromURL(imageUrl, (objects, options) => {
          try {
            // Get all GET parameter Keys and store in dicts
            var urlParams = getUrlSearchParams()
            const objectPropertiesDict = {}
            const objectIdArray = []
            objects.forEach(obj => {
              objectIdArray.push(obj.id)
            })
            // Loop through the keys
            for(var key of urlParams.keys()) {
              if(key != 'image_id' && objectIdArray.includes(key)){
                var value = urlParams.get(key)
                value = value.replace('r', ',"r":')
                value = value.replace('g', ',"g":')
                value = value.replace('b', ',"b":')
                if (value[0] == ',') {
                  value = value.substring(1);
                }
                var valueDict = JSON.parse("{" + value + "}")
                valueDict['r'] = valueDict['r']/100
                valueDict['g'] = valueDict['g']/100
                valueDict['b'] = valueDict['b']/100
                objectPropertiesDict[key] = valueDict
              }
            }

            objects.forEach(obj => {
              setAttributes(obj, {
                hoverCursor: "pointer",
                perPixelTargetFind: true,
                left: (obj.left * ratio) + ((canvas.width / 2) - ((width * ratio) / 2)),
                top: (obj.top * ratio) + ((canvas.height / 2) - ((height * ratio) / 2)),
              })
              //Display bbox when hovering the object
              obj.on('mouseover', function() {
                this._renderControls(this.canvas.contextTop, {
                  borderColor: '#CAAA9F',
                  hasControls: false
                })
              })
              obj.on('mousedown', function() {
                this.canvas.clearContext(this.canvas.contextTop);
              })
              obj.on('mouseout', function() {
                this.canvas.clearContext(this.canvas.contextTop);
              })
              obj.scale(ratio)
              if (objectPropertiesDict[obj.id] !== undefined){
                const r = objectPropertiesDict[obj.id].r
                const g = objectPropertiesDict[obj.id].g
                const b = objectPropertiesDict[obj.id].b
                const filter = new fabric.Image.filters.ColorMatrix({
                   matrix: [
                     r, r, r, r, 0.000,
                     g, g, g, g, 0.000,
                     b, b, b, b, 0.000,
                     1.000, 1.000, 1.000, 1.000, 0.000
                   ]
                  });
                if (obj.filters) {
                  obj.filters.length = 0
                  obj.filters.push(filter)
                  obj.applyFilters()
                }
              }
              // add filter here to obj
              canvas.add(obj)
            })
            canvas.renderAll()

            //THIS IS THE CRUCIAL BIT, IF THE USER ACCESSES THE APP WITH AN "EXPORT" GET PARAMETER WE WANT TO SEND
            //BACK THE IMAGE THAT THEY CAN USE IN THEIR <IMG SRC="WWW.REACT_APP.COM"> TAG
            var canvasImg = ''
            if(urlParams.get("export") === "png"){
              canvasImg = canvas.toDataURL("image/png")
            } else if (urlParams.get("export") === "pdf") {
              canvasImg = canvas.toDataURL("image/pdf")
            } else {
              console.log('No export was selected, proceed as normal')
            }
          } catch(err) {
            console.log('Could not retrieve that image')
          }
        })
      })
    }
  }, [])

  // Use Effects
  useEffect(() => {
    const canvas = new fabric.Canvas('canvas', {
      preserveObjectStacking: true,
      controlsAboveOverlay: true
    })
    loadImageFromUrl(canvas)
    // eslint-disable-next-line
  }, [])

  return (
    <div className={classNames('Canvas', { isMobile })}>
      <div className="Canvas_Desktop">
        <canvas id="canvas" />
      </div>
    </div>
  )
}

export default Canvas
