/* eslint-disable no-unused-expressions */
/* eslint-disable implicit-arrow-linebreak */
import chai from 'chai';
import { describe, it, afterEach, beforeEach } from 'mocha';
import sinon from 'sinon';
import createPushNotificationsJobs from './8-job';

const { expect } = chai;

describe('createPushNotificationsJobs', () => {
  let mockQueue;
  let mockJob;

  beforeEach(() => {
    mockJob = {
      id: 'abc123',
      on: sinon.spy(),
      save: sinon.stub().callsFake((cb) => cb(null)),
    };

    mockQueue = {
      create: sinon.stub().returns(mockJob),
    };

    sinon.spy(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  it('throws an error if jobs is not an array', () => {
    expect(() =>
      createPushNotificationsJobs('not an array', mockQueue)
    ).to.throw('Jobs is not an array');
  });

  it('creates a job for each item in jobs array', () => {
    const jobs = [{}, {}];
    createPushNotificationsJobs(jobs, mockQueue);
    expect(mockQueue.create.callCount).to.equal(2);
  });

  it('saves each job and logs its id', () => {
    const jobs = [{}];
    createPushNotificationsJobs(jobs, mockQueue);
    expect(mockJob.save.callCount).to.equal(1);
    expect(console.log.calledWith('Notification job created: abc123')).to.be
      .true;
  });

  it('sets up event listeners on each job', () => {
    const jobs = [{}];
    createPushNotificationsJobs(jobs, mockQueue);
    expect(mockJob.on.callCount).to.equal(3);
  });
});
