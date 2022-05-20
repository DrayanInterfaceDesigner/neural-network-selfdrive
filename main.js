const simulationCanvas = document.getElementById("simulation__canvas")
simulationCanvas.width = 200

const simulationCtx = simulationCanvas.getContext("2d")
const car = new Car({ x: 100, y: 100, width: 30, height: 50 })



_process__render()


function _process__render() {
    // updates
    car.update()

    //it also clears the canvas each frame(pft, javascript)
    simulationCanvas.height = window.innerHeight

    //draws
    car.draw(simulationCtx)
    requestAnimationFrame(_process__render)
}