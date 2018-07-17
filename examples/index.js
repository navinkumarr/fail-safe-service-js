const FailsafeService = require('../');
const ConsoleService = require('../lib/console-service');
const InMemoryQueue = require('../lib/in-memory-queue');

const failsafeService = new FailsafeService({
    service : new ConsoleService(), // optional
    queue: new InMemoryQueue() // optional
});

let counter = 0;


// NOTE: some numbers will be missing in console prints.
// They are stored in dead letter queue.
// Can be accessed using failsafeService.getDLQueue();
setInterval(() => {
    failsafeService.send(counter);
    counter += 1;
}, 100);
