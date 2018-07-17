module.exports = class OfflineState {
    constructor(failsafeQueue) {
        this.failsafeQueue = failsafeQueue;
    }
    send(data) {
        this.failsafeQueue.queue.enqueue(data);
    }
    activate() {
        this.failsafeQueue.service = this.failsafeQueue.service.connect(
            () => {
                this.failsafeQueue.changeState('online');
            },
            () => {
                setTimeout(() => this.activate(), 500);
            }
        );
    }
};
