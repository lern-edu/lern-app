SyncedCron.config({
  log: false,
});

// Cron job

SyncedCron.add({
  name: 'SchedulerTestsGenerator',
  job: Jobs.TestsGenerator,
  schedule(parser) {
    return parser.cron('0 15 1 * * ?');
  },
});

SyncedCron.add({
  name: 'SchedulerTestsMisses',
  job: Jobs.TestsMisses,
  schedule(parser) {
    return parser.cron('0 15 1 * * ?');
  },
});
