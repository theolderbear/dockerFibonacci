const keys = require('./keys');

const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redishost,
    port: keys.redisport,
    retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fib(index) {
    console.log("Calculating " + index);
    if (index <2) return index;
    const result = fib(index-1) + fib(index-2);
    console.log("Result of index " + index + " is " + result);
    return result;
}

sub.on('message', (channel, message) => {
    console.log('on' + message);
   redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');