import { createClient, print } from 'redis';

const client = createClient();

const redisConnect = () => {
  client
    .on('connect', () => {
      console.log('Redis client connected to the server');
    })
    .on('error', (err) => {
      console.log('Redis client error', err);
    });
};

redisConnect();

const data = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2,
};

for (const loc in data) {
  client.hset('HolbertonSchools', loc, data[loc], print);
}

client.hgetall('HolbertonSchools', (err, result) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(result);
});
