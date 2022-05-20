class Car {
    constructor({ x, y, width, height }) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.speed = 0
        this.maxSpeed = 3
        this.maxReverseSpeed = this.maxSpeed / 2
        this.acceleration = 0.2
        this.friction = 0.05

        //Note: in this case, since the y(0) is upwards
        //the unit circle 0 value is also upwards (-90deg)
        //counter-clockwise
        this.angle = 0

        this.controls = new Controls()
    }

    //Fix this after for a proper movement setup
    //Such as:
    //adding a x and y velocity
    //a vector2D
    //normalize function for the vector if such
    //adding a speed variable
    //multiplying the values by the speed
    //MAYBE(HARD MAYBE) adding a Delta for fps fluctuations
    //changing all the values of x and y to change only by 1
    //okay, the tutorial guy is simply a freaking beast and he will teach all of this
    // i think i can rest my neurons now lol
    update() {
        this.#move()
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

            if (this.controls.left) {
                this.angle += 0.03 * flip
            }
            if (this.controls.right) {
                this.angle -= 0.03 * flip
            }

        }

        //the sin of the unit circle is the value between 1 and -1
        this.x -= Math.sin(this.angle) * this.speed
        this.y -= Math.cos(this.angle) * this.speed

    }

    draw(ctx) {

        ctx.save()
        //sets the origin to a new x,y pos
        ctx.translate(this.x, this.y)
        //rotates to -this.angle
        ctx.rotate(-this.angle)


        ctx.beginPath()
        ctx.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        )
        ctx.fill()

        ctx.restore()
    }
}