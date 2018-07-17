const OfflineState = require('./offline-state');
const OnlineState = require('./online-state');
const InMemoryQueue = require('./in-memory-queue');
const ConsoleService = require('./console-service');

class FailsafeService {
    constructor(options) {
        this.options = options;
        // @TODO: localStorage queue
        this.queue = options.queue || new InMemoryQueue();
        // dead letter queue
        this.dlqueue = [];
        this.currentState = null;
        this.service = options.service || new ConsoleService();
        this.states = {
            offline: new OfflineState(this),
            online: new OnlineState(this)
        };
        this.changeState('offline');
    }

    changeState(state) {
        this.currentState = this.states[state];
        this.currentState.activate();
    }

    send(data) {
        this.currentState.send(data);
    }

    getDLQueue() {
        return this.dlqueue;
    }
}

module.exports = FailsafeService;
