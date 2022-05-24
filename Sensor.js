class Sensor {
    constructor(entity) {
        this.car = entity
        this.rayCount = 5
        this.rayLength = 100 //px
        this.raySpread = degrees(60)

        this.rays = []
        this.ray_readings = []
    }

    update(roadBorders) {

        this.#castRays()
        this.ray_readings = []
        for (let i = 0; i < this.rays.length; i++) {
            this.ray_readings.push(
                this.#getReading(this.rays[i], roadBorders)
            )
        }
    }

    #getReading(ray, roadBorders) {
        let touches = []
        for (let i = 0; i < roadBorders.length; i++) {

            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            )
            if (touch) {
                touches.push(touch)
            }

        }

        if (touches.length == 0) return null
        else {
            const offsets = touches.map(e => e.offset)
            const minOffset = Math.min(...offsets)
            return touches.find(e => e.offset == minOffset)
        }
    }

    #castRays() {
        this.rays = []

        //Need better understanding of the logic here present
        //!important
        for (let i = 0; i < this.rayCount; i++) {

            const rayAngle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
            ) + this.car.angle

            const start = { x: this.car.x, y: this.car.y }
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            }

            this.rays.push([start, end])
        }
    }

    draw(ctx) {

        for (let i = 0; i < this.rayCount; i++) {

            let end = this.rays[i][1]
            if (this.ray_readings[i]) {
                end = this.ray_readings[i]
            }
            // console.log(this.rays, 'readings: ' + this.ray_readings)

            ctx.beginPath()
            ctx.lineWidth = 2
            ctx.strokeStyle = "red"
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            )
            ctx.lineTo(
                end.x,
                end.y
            )
            ctx.stroke()


            //

            ctx.beginPath()
            ctx.lineWidth = 2
            ctx.strokeStyle = "black"
            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            )
            ctx.lineTo(
                end.x,
                end.y
            )
            ctx.stroke()
        }
    }
}

// this.car.width / 2 = x(15)
// this.car.height - this.car.height / 2 = -y(25)


// topLeft = [this.car.x, this.car.y]
// topRight = [this.car.x + width, this.car.y]
// lerp(topLeft, topRight, i/this.rayCount)