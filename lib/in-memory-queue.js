module.exports = class InMemoryQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(data) {
        this.queue.push(data);
    }

    forEach(fn) {
        let q = JSON.parse(JSON.stringify(this.queue));
        this.queue = [];
        q.forEach((data) => {
            fn(data);
        });
    }
};
