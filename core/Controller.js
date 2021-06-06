
const { Player } = require("./Player");
const { Enemy } = require("./Enemy");
const { View } = require("./View");
const { Coin } = require("./Coin");
const { StackFSM } = require("../ai/StackFSM");
const { SearchBehaviour } = require("../behaviour/SaerchBehaviour");
const { PatrolBehaviour } = require("../behaviour/PatrolBehaviour");
const { GameObjectManager } = require("./entities/GameObjectManager");
const { rnadomInt } = require("../math/utils");
const { Map } = require("../math/map");
const { PathFinder } = require("../math/patFinder");

exports.Controller = class Controller {
    constructor() {
        this.width = 50;
        this.heigh = 20;

        this.map = Map.generate(this.width, this.heigh);
        this.pathFinder = new PathFinder(this.map.matrix);
        this.path = [];
        // console.log(JSON.stringify(this.map, null, 4));
        this.view = new View(this.width, this.heigh);
        // this.player = Player.create(2, 2, 'T');
        // this.enemy = Enemy.create(rnadomInt(this.width - 1), rnadomInt(this.heigh - 1));

        // this.generateRandomCoin();
        // this.generateRandomCoin();
        // this.generateRandomCoin();

        this.initAI();
    }

    initAI() {
        this.start = {x: rnadomInt(this.width - 1), y: rnadomInt(this.heigh - 1)};
        this.finish = {x: rnadomInt(this.width - 1), y: rnadomInt(this.heigh - 1)};
        this.path = this.pathFinder.findPath(this.start, this.finish);

        setTimeout(() => {
            this.initAI();
        }, 5000);
        // this.playerAI = new StackFSM();
        // this.playerAI.push(new SearchBehaviour(this.player, Coin.name, 50));

        // this.enemyAI = new StackFSM();
        // this.patrolBehaviour = new PatrolBehaviour(
        //     this.enemy, 
        //     [
        //         {x: this.enemy.x, y: this.enemy.y}, 
        //         {x: rnadomInt(this.width - 1), y: rnadomInt(this.heigh - 1)}
        //     ]
        // );
        // this.enemyAI.push(this.patrolBehaviour);
    }

    draw() {
        this.view.clear();
        this.view.drawMap(this.map);
        this.path.forEach(node => this.view.set(node.x, node.y, '.'));
        this.view.set(this.start.x, this.start.y, '*');
        this.view.set(this.finish.x, this.finish.y, 'X');
        this.view.flush();
        console.log('Start of path: ', this.start);
        console.log('End of path:   ', this.finish);
        console.log('Length of path:     ', this.path.length, '    ');
        // this.view.clear();
        // this.view.drawMap(this.map);
        
        // GameObjectManager.instance.allObjects.forEach(object => {
        //     this.view.set(object.x, object.y, object.char);
        // });
        // this.view.flush();
        // console.log(this.playerAI.currentStateName);
        // console.log(this.enemy);
        // console.log(this.enemyAI.currentState.toString());
        // console.log(this.patrolBehaviour.toString());
        // console.log();
    }

    update(key) {
        // switch(key) {
        //     case 'w': this.player.move(0, -1); break;
        //     case 'a': this.player.move(-1); break;
        //     case 's': this.player.move(0, 1); break;
        //     case 'd': this.player.move(1); break;
        // }

        // this.playerAI.update();
        // this.enemyAI.update();
        this.checkMoneyIntersect();
    }

    checkMoneyIntersect() {
        GameObjectManager.instance
            .getObjectsByTag(Coin.name)
            .forEach(coin => {
                if(coin.intersect(this.player)) {
                    this.player.addMoney(coin.value);
                    GameObjectManager.instance.deleteObject(coin);
                    this.generateRandomCoin();
                }
            });
    }

    generateRandomCoin() {
        const x = rnadomInt(this.width - 1);
        const y = rnadomInt(this.heigh - 1);
        const money = rnadomInt(10, 1);
        Coin.create(x, y, money)
    }
}
