import { createClient, print } from 'redis';
import { promisify } from 'util';

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

const get = promisify(client.get).bind(client);

const displaySchoolValue = async (schoolName) => {
  try {
    const value = await get(schoolName);
    console.log(value);
  } catch (err) {
    console.log(err);
  }
};
redisConnect();
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
