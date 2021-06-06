const { Behaviour } = require("../ai/Behaviour");
const { MoveBehaviour } = require("./MoveBehaviour");

exports.PatrolBehaviour = class PatrolBehaviour extends Behaviour {
    /**
     * 
     * @param {Player} actor 
     * @param {GameObject} positions
     */
    constructor(actor, positions) {
        super();

        this.actor = actor;
        this.start = positions[0];
        this.finish = positions[1];
    }

    update() {
        if(!this.fsm) return;

        if(this.actor.intersect(this.start)) {
            this.fsm.push(new MoveBehaviour(this.actor, this.finish));
        }

        this.fsm.push(new MoveBehaviour(this.actor, this.start));
    }

    toString() {
        return `PatrolBehaviour {start: (${this.start.x}, ${this.start.y}), finish: (${this.finish.x}, ${this.finish.y})}`;
    }
}