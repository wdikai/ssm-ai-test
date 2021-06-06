const { rnadomInt } = require('./utils');
const { Matrix2d } = require('./matrix2d');

exports.Map = class Map {
    constructor (w, h, matrix) {
        this.w = w;
        this.h = h;
        this.matrix = matrix ? matrix : new Matrix2d(w, h);
    }

    isFree(x, y) {
        return this.getValue(x, y) === Map.Empty;
    }

    setValue (x, y, value) {
        this.matrix.setValue(x, y, value);
    }

    getValue(x, y) {
        return this.matrix.getValue(x, y);
    }

    static generate (w, h) {
        let matrix = new Matrix2d(w, h);
        for(let y = 0; y < h; y++) {
            for(let x = 0; x < w; x++) {
                const value = rnadomInt(10) > 5 ? 1 : 0;
                matrix.setValue(x, y, value);
            }
        }

        matrix = matrix.map((value, x, y, m) => 
            m.getValue(x - 1, y - 1) + 
            m.getValue(x - 1, y) + 
            m.getValue(x - 1, y + 1) + 
            m.getValue(x + 1, y - 1) +
            m.getValue(x + 1, y) +
            m.getValue(x + 1, y + 1) + 
            m.getValue(x, y - 1) + 
            m.getValue(x, y + 1) +
            value > 4 
                ? Map.Wall
                : Map.Empty
        );

        return new Map(w, h, matrix);
    }

    static get Wall() {
        return '#';
    }

    static get Empty() {
        return ' ';
    }
} 