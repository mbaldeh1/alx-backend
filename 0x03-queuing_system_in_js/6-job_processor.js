import { createQueue } from 'kue';

const queue = createQueue();

// create a send notification function
const sendNotification = (phoneNumber, message) => {
  console.log(
    `Sending notification to ${phoneNumber} with message: ${message}`
  );
};

queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done();
});
