import { createQueue } from 'kue';

const queue = createQueue();

// create blacklisted array
const blacklisted = ['4153518781', '4153518780'];

// create a send notification function
const sendNotification = (phoneNumber, message, job, done) => {
  // set job progress
  job.progress(0, 100);
  // check if the phone number is blacklisted
  if (blacklisted.includes(phoneNumber)) {
    done(Error(`Phone number ${phoneNumber} is blacklisted`));
  }
  job.progress(50, 100);
  // send the notification
  console.log(`Sending notification to ${phoneNumber} with message ${message}`);
  done();
};

queue.process('push_notification_code_2', 2, (job, done) => {
  // destructure phone number and message from the job data
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
  done();
});
