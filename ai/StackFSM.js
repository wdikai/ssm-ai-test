exports.StackFSM = class StackFSM {
    constructor(initState = null) {
        this.stack = [];

        if(initState) {
            this.push(initState);
        }
    }
    get currentState() {
        return this.stack.length
            ? this.stack[this.stack.length - 1]
            : null;
    }
    get currentStateName() {
        return this.currentState && this.currentState.constructor.name;
    }
    pop() {
        return this.stack.pop();
    }
    push(state) {
        state.setFsm(this);
        this.stack.push(state);
    }
    update() {
        this.currentState && this.currentState.update();
    }
}
