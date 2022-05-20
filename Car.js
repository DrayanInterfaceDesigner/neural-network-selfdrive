class Car {
    constructor({ x, y, width, height }) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height

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
    update() {
        if (this.controls.forward) {
            this.y -= 2
        }
        if (this.controls.reverse) {
            this.y += 2
        }
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.rect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        )
        ctx.fill()
    }
}