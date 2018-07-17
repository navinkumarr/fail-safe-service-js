# fail-safe-queue-js
A javascript fail safe service library.

When your service goes down this library stores the data in an offline queue and on re connection 
with service it resends the data collected during service downtime for processing.

Do note that the failed request data is stored in dead letter queue. Currently that data is only stored and not resent.

### usage

```
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
```

### Available Offline Queue

* InMemoryQueue - Stores offline queue in simple array.
* LocalStorageQueue - TBD.

### Available Service

* ConsoleService - Logs the data in console.
* HttpService - TBD.


