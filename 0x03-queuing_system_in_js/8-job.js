const createPushNotificationsJobs = (jobs, queue) => {
  if (jobs instanceof Array) {
    jobs.forEach((jobData) => {
      const job = queue.create('push_notification_code_2', jobData);
      job.save((err) => {
        if (err) {
          throw err;
        } else {
          console.log(`Notification job created: ${job.id}`);
        }
      });
      job.on('complete', () => {
        console.log('Notification job completed');
      });

      job.on('failed', (err) => {
        console.log(`Notification job failed: ${err}`);
      });

      job.on('progress', (progress) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });
    });
  } else {
    throw new Error('Jobs is not an array');
  }
};

module.exports = createPushNotificationsJobs;
