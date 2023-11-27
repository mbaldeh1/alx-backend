import { createClient, print } from 'redis';

const client = createClient();

const redisConnect = () => {
  client
    .on('connect', () => {
      console.log('Redis client connected to the server');
    })
    .on('error', (err) => {
      console.log('Redis client not connected to sever: ', err.message);
    });
};
redisConnect();

client.subscribe('holberton school channel');

client.on('message', (channel, message) => {
  if (message === 'KILL_SERVER') {
    // unsubscribe from the channel
    client.unsubscribe('holberton school channel');

    // close the connection
    client.quit();
  } else {
    console.log(message);
  }
});
