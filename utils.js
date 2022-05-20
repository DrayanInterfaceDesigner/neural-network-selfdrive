function lerp(a, b, t) {
    return (1 - t) * a + t * b
}
function other_lerp(a, b, t) {
    return a + (b - a) * t
}