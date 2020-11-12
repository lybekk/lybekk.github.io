/* TODO: consider eventlistener */
/* TODO: Test replacing svg with div and pre */

const symbolList = [
  [`print()`],
  [`console.log()`],
  [`echo`],
  [`if () {`, `} else {`, `}`],
]

function animateSymbol(symbolID) {
  const element = document.getElementById(symbolID)
  const keyframes = [
    {
      filter: `blur(0.2rem)`,
      opacity: 0,
    },
    {
      filter: `blur(0)`,
      opacity: 0.9,
    },
    {
      filter: `blur(0)`,
      opacity: 0.9,
    },
    {
      opacity: 0.9,
    },
    {
      transform: `translateY(-35vh)`,
      opacity: 0,
    },
  ]

  const options = {
    iterations: 1,
    iterationStart: 0,
    delay: 0,
    endDelay: 0,
    duration: 3000,
    fill: `forwards`,
    easing: `ease-in`,
  }

  element.animate(keyframes, options)

  setTimeout(() => {
    try {
      const element = document.getElementById(symbolID)
      element.remove()
    } catch (error) {
      console.log(`Could not remove svg element`, error)
    }
  }, 3500)
}

function spawnSymbol(event) {
  const txtElem = document.createElementNS(`http://www.w3.org/2000/svg`, `text`)
  const cx = event.clientX,
    cy = event.clientY,
    tempId = String(cx + cy + Math.floor(Math.random() * 1000))
  const txtAttributes = [
    [null, `x`, cx],
    [null, `y`, cy],
    [null, `id`, tempId],
  ]
  for (const x of txtAttributes) {
    txtElem.setAttributeNS(x[0], x[1], x[2])
  }
  txtElem.style.fill = `var(--secondary)`
  const displayText = symbolList[Math.floor(Math.random() * symbolList.length)]
  for (const line of displayText) {
    const lineElement = document.createElementNS(`http://www.w3.org/2000/svg`, `tspan`)
    lineElement.appendChild(document.createTextNode(line))
    lineElement.setAttributeNS(null, "x", cx)
    lineElement.setAttributeNS(null, "dy", "1.2em")
    txtElem.appendChild(lineElement)
  }
  document.querySelector(`#spawnArea`).appendChild(txtElem)

  animateSymbol(tempId)
}

/**
 * Creates an SVG container
 * @param {string} [parent] - Optional Parent element to attach to. Uses queryselector. I.E. '#mainContainer'
 */
function createSpawnArea(parent = null) {
  const svg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`)
  svg.setAttributeNS(null, `id`, `spawnArea`)
  svg.setAttributeNS(null, `height`, `100vh`)
  svg.setAttributeNS(null, `width`, `100vw`)
  svg.style.position = `fixed`
  svg.style.top = 0
  svg.style.left = 0
  svg.style.zIndex = -10
  svg.style.fontFamily = `monospace`
  svg.onmouseenter = event => spawnSymbol(event)
  svg.ontouchmove = event => spawnSymbol(event)
  svg.onclick = function (event) {
    spawnSymbol(event)
  }
  const query = parent || `body`
  parent = document.querySelector(query)
  parent.appendChild(svg)
}

/**
 * to_ot
 */
const symbolGenerator = {
  start: (parent = null ) => {
    createSpawnArea(parent || null)
  },
}

export default symbolGenerator
