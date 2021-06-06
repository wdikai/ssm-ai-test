exports.Queue = class Queue {
    constructor() {
        this._data = [];
    }
     
    get isEmpty() {
      return this._data.length === 0;
    }

    get size() {
      return this._data.length;
    }

    enqueue(v) {
        this._data.push(v);
    }

    dequeue() {
        return this._data.shift();
    }

    clear() {
        this._data = [];
    }
}

exports.PriorityQueue = class PriorityQueue extends Queue {}