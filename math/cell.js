exports.Cell = class Cell {
    constructor (x, y, isFree, distance) {
        this.x = x;
        this.y = y;
        this.isFree = isFree;
        this.distance = distance;
    }
} 