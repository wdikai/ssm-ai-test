const { GameObject } = require("./entities/GameObject");

exports.Coin = class Coin extends GameObject {
    static create(x, y, value) {
        return new Coin(x, y, value);
    }

    constructor (x, y, value = 1) {
        super(x, y, '$', Coin.name);

        this.value = value;
    }
}