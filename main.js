const simulationCanvas = document.getElementById("simulation__canvas")
simulationCanvas.height = window.innerHeight
simulationCanvas.width = 200

const simulationCtx = simulationCanvas.getContext("2d")
const car = new Car({ x: 100, y: 100, width: 30, height: 50 })
car.draw(simulationCtx)