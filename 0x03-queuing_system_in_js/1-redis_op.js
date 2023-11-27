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

const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, print);
};

const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, value) => {
    if (err) throw err;
    console.log(value);
  });
};

redisConnect();
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
