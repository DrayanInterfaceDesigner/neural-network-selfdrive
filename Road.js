class Road {

    // const infinity = 999999999; JS gotta be kidding me

    constructor({ centerAxis, width, laneCount = 3 }) {
        this.centerAxis = centerAxis
        this.width = width
        this.laneCount = laneCount

        this.left = centerAxis - width / 2
        this.right = centerAxis + width / 2

        //DON'T SET THIS VALUE ABOVE THIS TRESHOLD
        const INFINITY = 99999;
        this.top = -INFINITY
        this.bottom = +INFINITY

        // Borders
        const TOP_LEFT = { x: this.left, y: this.top }
        const BOTTOM_LEFT = { x: this.left, y: this.bottom } //a line is formed (left)
        const TOP_RIGHT = { x: this.right, y: this.top }
        const BOTTOM_RIGHT = { x: this.right, y: this.bottom }

        this.borders = [
            [TOP_LEFT, BOTTOM_LEFT],
            [TOP_RIGHT, BOTTOM_RIGHT]
        ]
    }

    getLaneCenter(lane = 1) {
        if (lane <= 0) lane = 1
        const laneWidth = this.width / this.laneCount

        return this.left + laneWidth / 2 +
            Math.min((lane - 1), this.laneCount - 1) * laneWidth
    }

    draw(ctx) {
        ctx.lineWidth = 5
        ctx.strokeStyle = "white"

        //takes the middle lanes
        for (let i = 1; i <= (this.laneCount - 1); i++) {
            const x_coord_for_lane_division = lerp(
                this.left,
                this.right,
                i / this.laneCount
            )

            // add dashes to the middle lanes
            // if (i > 0 && i < this.laneCount) {

            // }
            // else {
            //     ctx.strokeStyle = "white"
            //     ctx.setLineDash([])
            // }
            ctx.strokeStyle = "#664c00"
            ctx.setLineDash([25, 25])
            ctx.beginPath()
            ctx.moveTo(x_coord_for_lane_division, this.top)
            ctx.lineTo(x_coord_for_lane_division, this.bottom)
            ctx.stroke()
        }

        //Draws according the borders
        ctx.setLineDash([])
        this.borders.forEach(border => {
            ctx.beginPath()
            ctx.moveTo(border[0].x, border[0].y)
            ctx.lineTo(border[1].x, border[1].y)
            ctx.stroke()
        })
    }
}