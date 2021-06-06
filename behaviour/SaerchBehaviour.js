const { Behaviour } = require("../ai/Behaviour");
const { GameObjectManager } = require("../core/entities/GameObjectManager");
const { squareDistantce } = require("../math/utils");

const { MoveBehaviour } = require("./MoveBehaviour");

exports.SearchBehaviour = class SearchBehaviour extends Behaviour {
    /**
     * 
     * @param {GameObject} actor 
     * @param {String} targetTag 
     * @param {StackFSM} fsm 
     * @param {Number} scanDistance = 5 
     */
    constructor(actor, targetTag, scanDistance = 5) {
        super();

        this.actor = actor;
        this.targetTag = targetTag;
        this.scanDistance = scanDistance;
    }

    update() {
        if(!this.fsm) return;

        const potentialTarget = GameObjectManager.instance.getObjectsByTag(this.targetTag);
        const targetInfo = Array
            .from(potentialTarget)
            .map(target => ({distance: squareDistantce(this.actor, target), target}))
            .sort((first, second) => first.distance - second.distance)
            .find(target => target.distance < this.scanDistance * this.scanDistance);
    
        if (targetInfo) {
            console.log("Target found", targetInfo);
            this.fsm.push(new MoveBehaviour(this.actor, targetInfo.target, this.fsm));
        }

        console.log("Noting found")
    }
}