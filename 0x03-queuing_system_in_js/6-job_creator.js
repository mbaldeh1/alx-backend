import { createQueue } from 'kue';

const queue = createQueue();

const info = {
  phoneNumber: '+2346753889393',
  message: 'Hello World',
};

// create a job

const job = queue.create('push_notification_code', info).save((err) => {
  if (err) {
    throw new Error('Notification job failed');
  } else {
    console.log(`Notification job created: ${job.id}`);
  }
});

job.on('complete', () => {
  console.log('Notification job completed');
});

job.on('failed', (err) => {
  console.error(err);
});
