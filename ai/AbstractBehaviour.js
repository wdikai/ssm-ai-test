class AbstractBehaviour {
    constructor(handler) {
        this.handler = handler;
    }
    update() {
        this.handler && this.handler();
    }
}
