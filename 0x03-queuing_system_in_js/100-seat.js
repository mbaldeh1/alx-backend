import { createClient } from 'redis';
import express from 'express';
import { promisify } from 'util';
import { createQueue } from 'kue';

const app = express();

const PORT = 1245;
// create a redis client
const client = createClient();

const queue = createQueue();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// on error console log message
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

// promisify client
const getAsync = promisify(client.get).bind(client);

const reserveSeat = (number) => {
  client.set('available_seats', number);
};

const getCurrentAvailableSeats = async () => {
  const availableSeats = await getAsync('available_seats');
  return availableSeats;
};

app.get('/available_seats', async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();
  res.status(200).json({ numberOfAvailableSeats: availableSeats });
});

let reservationEnabled = true;

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    res.status(400).json({ message: 'Reservation are blocked' });
  }
  // create reservation job
  const data = { seat: 1 };
  const job = queue.create('reserve_seat', data).save((err) => {
    if (err) {
      res.status(500).json({ status: 'Reservation failed' });
    } else {
      res.json({ status: 'Reservation in progress' });
      job.on('complete', () => {
        console.log(`Seat reservation job ${job.id} completed`);
      });
      job.on('failed', (err) => {
        console.log(`Seat reservation job ${job.id} failed ${err}`);
      });
    }
  });
});

app.get('/process', (req, res) => {
  res.json({ status: 'Queuing processing' });
  queue.process('reserve_seat', (job, done) => {
    const seat = Number(getCurrentAvailableSeats());
    if (!seat) {
      reservationEnabled = false;
      done(new Error('No available seats'));
    } else {
      reserveSeat(seat - 1);
      done();
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
