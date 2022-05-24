const simulationCanvas = document.getElementById("simulation__canvas")
simulationCanvas.width = 200

const simulationCtx = simulationCanvas.getContext("2d")
const road = new Road({
    centerAxis: (simulationCanvas.width / 2),
    width: (simulationCanvas.width * 0.9), //90%
    laneCount: 3
})

const car = new Car({ x: road.getLaneCenter(2), y: 100, width: 30, height: 50 })



_process__render()


function _process__render() {
    // updates
    car.update(road.borders)

    //it also clears the canvas each frame(pft, javascript)
    simulationCanvas.height = window.innerHeight

    //draws
    simulationCtx.save()
    simulationCtx.translate(0, -car.y + simulationCanvas.height * 0.7)

    road.draw(simulationCtx)
    car.draw(simulationCtx)

    simulationCtx.restore()
    requestAnimationFrame(_process__render)
}