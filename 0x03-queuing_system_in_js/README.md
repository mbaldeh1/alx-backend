## Redis Queue

This is a simple queuing system implemented in JavaScript using Redis. It provides a way to store messages in a queue and then process them in a FIFO (first-in, first-out) order.

### Installation

To install the Redis Queue, you can use the following command:

```
npm install redis-queue
```

### Usage

To create a new queue, you can use the following code:

```
const queue = new RedisQueue('my-queue');
```

You can then add messages to the queue by using the `enqueue()` method:

```
queue.enqueue('message');
```

You can also get messages from the queue by using the `dequeue()` method:

```
const message = queue.dequeue();
```

The `dequeue()` method will block until a message is available. If there are no messages in the queue, it will return `null`.

### Example

The following example shows how to use the Redis Queue to send and receive messages.

```
const queue = new RedisQueue('my-queue');

// Send a message to the queue
queue.enqueue('Hello world!');

// Get a message from the queue
const message = queue.dequeue();

console.log(message); // Hello world!
```

### Documentation

For more information, please see the [Redis Queue documentation](https://github.com/nkl/redis-queue#readme).

### License

The Redis Queue is licensed under the MIT License.