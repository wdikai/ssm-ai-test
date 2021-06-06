const { GameObjectManager } = require("./GameObjectManager");

exports.GameObject = class GameObject {
    constructor(x, y, char, tag) {
        this.x = x;
        this.y = y;
        this.char = char;
        this.tag = tag;

        GameObjectManager.instance.addObject(this);
    }

    intersect(object) {
        return this !== object && this.x === object.x && this.y === object.y;
    }

    move(x = 0, y = 0) {
        this.x += x;
        this.y += y;

        if(this.x < 0) this.x = 0;
        if(this.x > 49) this.x = 49;
        if(this.y < 0) this.y = 0;
        if(this.y > 12) this.y = 12;
    }
}
