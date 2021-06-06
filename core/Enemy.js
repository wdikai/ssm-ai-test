const { GameObject } = require("./entities/GameObject");

exports.Enemy = class Enemy extends GameObject {
    static create(x, y, char = '*') {
        return new Enemy(x, y, char);
    }

    constructor(x, y, char) {
        super(x, y, char, Enemy.name);
    }
}
