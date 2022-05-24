class Car {
    constructor({ x, y, width, height }) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.polygon

        this.speed = 0
        this.maxSpeed = 3
        this.maxReverseSpeed = this.maxSpeed / 2
        this.acceleration = 0.2
        this.friction = 0.05
        this.damaged = false

        //Note: in this case, since the y(0) is upwards
        //the unit circle 0 value is also upwards (-90deg)
        //counter-clockwise
        this.angle = 0

        this.sensor = new Sensor(this)
        this.controls = new Controls()
    }

    //Fix this after for a proper movement setup
    //MAYBE(HARD MAYBE) adding a Delta for fps fluctuations
    //changing all the values of x and y to change only by 1
    update(roadBorders) {
        if (!this.damaged) {
            this.#move()
            this.polygon = this.#polygonPoints()
            this.damaged = this.#assessDamage(roadBorders)
        }
        this.sensor.update(roadBorders)
    }

    #move() {

        if (this.controls.forward) {
            this.speed += this.acceleration
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration
        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed
        }
        if (this.speed < -this.maxReverseSpeed) {
            this.speed = -this.maxReverseSpeed
        }

        if (this.speed > 0) {
            this.speed -= this.friction
        }
        if (this.speed < 0) {
            this.speed += this.friction
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0
        }
        if (this.speed !== 0) {
            //flips the controls backwards
            const flip = this.speed > 0 ? 1 : -1
            const turnForce = 0.03

            if (this.controls.left) {
                this.angle += turnForce * flip
            }
            if (this.controls.right) {
                this.angle -= turnForce * flip
            }

        }

        //the sin of the unit circle is the value between 1 and -1
        this.x -= Math.sin(this.angle) * this.speed
        this.y -= Math.cos(this.angle) * this.speed

    }

    #assessDamage(roadBorders) {
        for (let i = 0; i < roadBorders.length; i++) {
            if (polygonIntersection(this.polygon, roadBorders[i]))
                return true
        }
        return false
    }

    /**
     * Uses the width and height information
     * to get the radius from the center to a
     * corner (hypotenuse/2).
     *   __c__
     *   |  /
     *  b| /h
     *   |/
     */
    #polygonPoints() {
        const points = []
        const radius = Math.hypot(this.width, this.height) / 2
        const alpha__angle = Math.atan2(this.width, this.height)

        //top right
        points.push({
            x: this.x - Math.sin(this.angle - alpha__angle) * radius,
            y: this.y - Math.cos(this.angle - alpha__angle) * radius
        })
        //top left
        points.push({
            x: this.x - Math.sin(this.angle + alpha__angle) * radius,
            y: this.y - Math.cos(this.angle + alpha__angle) * radius
        })
        //bottom right
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha__angle) * radius,
            y: this.y - Math.cos(Math.PI + this.angle - alpha__angle) * radius
        })
        //bottom left
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha__angle) * radius,
            y: this.y - Math.cos(Math.PI + this.angle + alpha__angle) * radius
        })
        return points
    }

    draw(ctx) {

        if (this.damaged) ctx.fillStyle = 'gray'
        else ctx.fillStyle = 'black'

        ctx.beginPath()
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y)
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y)
        }
        ctx.fill()

        this.sensor.draw(ctx)
    }
}