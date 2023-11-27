// import create client from redis use import redis from 'redis';
import { createClient } from 'redis';

const redisConnect = () => {
  const client = createClient();
  client
    .on('connect', () => {
      console.log('Redis client connected to the server');
    })
    .on('error', (err) => {
      console.log('Redis client error', err);
    });
};

redisConnect();
