const { makeArray } = require('./utils');

exports.Matrix2d = class Matrix2d {
    constructor (w, h) {
        this.w = w;
        this.h = h;
        this.array = makeArray(h).map(() => makeArray(w));
    }

    forEach(fn) {
        for(let y = 0; y < this.h; y++)
            for(let x = 0; x < this.w; x++)
                fn(this.array.getValue(x, y), x, y, this);
    };

    map(fn) {
        const newValue = new Matrix2d(this.w, this.h);
        for(let y = 0; y < this.h; y++)
            for(let x = 0; x < this.w; x++)
                newValue.setValue(x, y, fn(this.getValue(x, y), x, y, this));

        return newValue;
    }

    setValue (x, y, value) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return;

        this.array[y][x] = value;
    }

    getValue(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return null;

        return this.array[y][x];
    }
} 