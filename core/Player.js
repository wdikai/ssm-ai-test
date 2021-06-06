const { GameObject } = require("./entities/GameObject");

exports.Player = class Player extends GameObject {
    static create(x, y, char) {
        return new Player(x, y, char);
    }

    constructor(x, y, char) {
        super(x, y, char, Player.name);

        this.money = 0;
    }

    addMoney(money) {
        this.money += money;
    }
}
