const { Behaviour } = require("../ai/Behaviour");

exports.MoveBehaviour = class MoveBehaviour extends Behaviour {
    /**
     * 
     * @param {Player} actor 
     * @param {GameObject} target 
     * @param {StackFSM} fsm
     */
    constructor(actor, target) {
        super();

        this.actor = actor;
        this.target = target;
    }

    get x() {
        return this.actor.x;
    }

    get y() {
        return this.actor.y;
    }

    update() {  
        let x = 0, y = 0;
        if(this.fsm && this.actor.intersect(this.target)) {
            return this.fsm.pop();
        }

        if(this.x < this.target.x) x = 1;
        if(this.x > this.target.x) x = -1;
        if(this.y < this.target.y) y = 1;
        if(this.y > this.target.y) y = -1;
        this.move(x, y);
    }

    move(x, y) {
        this.actor.move(x, y);
    }

    toString() {
        return `MoveBehaviour {target: (${this.target.x}, ${this.target.y})}`;
    }
}