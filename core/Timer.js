exports.Timer = class Timer {
    constructor(fn, timeout) {
        this.interval = null;
        this.fn = fn;
        this.timeout = timeout;
    }

    start() {
        this.interval = setInterval(() => this.fn(), this.timeout);
    }

    stop() {
        clearInterval(this.interval);
    }
}
