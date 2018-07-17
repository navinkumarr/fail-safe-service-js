module.exports = class OnlineState {
    constructor(failsafeQueue) {
        this.failsafeQueue = failsafeQueue;
    }

    send(data) {
        this.failsafeQueue.service.send(data, (err) => {
            this.failsafeQueue.dlqueue.push(data);
            this.failsafeQueue.changeState('offline');
        });
    }

    activate() {
        this.failsafeQueue.queue.forEach(data => {
            this.failsafeQueue.service.send(data, (err) => {
                this.failsafeQueue.dlqueue.push(data);
                this.failsafeQueue.changeState('offline');
            });
        });

    }
};
