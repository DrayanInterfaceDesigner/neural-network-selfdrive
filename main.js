const simulationCanvas = document.getElementById("simulation__canvas")
const networkCanvas = document.getElementById("network__canvas")

simulationCanvas.width = 200
networkCanvas.width = 300

const simulationCtx = simulationCanvas.getContext("2d")
const networkCtx = networkCanvas.getContext('2d')

const road = new Road({
    centerAxis: (simulationCanvas.width / 2),
    width: (simulationCanvas.width * 0.9), //90%
    laneCount: 3
})

const car = new Car({
    x: road.getLaneCenter(2),
    y: 100,
    width: 30,
    height: 50,
    controlType: 'AI',
    maxSpeed: 3,
    sprite: "blue"
})
const traffic = [
    new Car({ x: road.getLaneCenter(2), y: -100, width: 30, height: 50, sprite: "red" })
]


_process__render()


function _process__render() {

    // updates
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, [])
    }
    car.update(road.borders, traffic)

    //it also clears the canvas each frame(pft, javascript)
    simulationCanvas.height = window.innerHeight
    networkCanvas.height = window.innerHeight
    //draws
    simulationCtx.save()
    simulationCtx.translate(0, -car.y + simulationCanvas.height * 0.7)

    road.draw(simulationCtx)
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(simulationCtx)
    }
    car.draw(simulationCtx)

    simulationCtx.restore()
    // Visualizer.drawNetwork(networkCtx, car.brain)
    requestAnimationFrame(_process__render)
}