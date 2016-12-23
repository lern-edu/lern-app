/* Area
*/

SyncedCron.add({
  name: 'TestsAreaMon',
  job: _.partial(TestsArea, { size: 15, area: 'langs' }),
  schedule(parser) {
    return parser.text('every Monday at 1:00am');
  },
});

SyncedCron.add({
  name: 'TestsAreaTue',
  job: _.partial(TestsArea, { size: 15, area: 'math' }),
  schedule(parser) {
    return parser.text('every Tuesday at 1:00am');
  },
});

SyncedCron.add({
  name: 'TestsAreaWed',
  job: _.partial(TestsArea, { size: 15, area: 'human' }),
  schedule(parser) {
    return parser.text('every Wednesday at 1:00am');
  },
});

SyncedCron.add({
  name: 'TestsAreaThu',
  job: _.partial(TestsArea, { size: 15, area: 'natural' }),
  schedule(parser) {
    return parser.text('every Thursday at 1:00am');
  },
});

/* Subjects
*/

SyncedCron.add({
  name: 'TestsSubjects',
  job: _.partial(TestsSubjects, { size: 15 }),
  schedule(parser) {
    return parser.text('every Friday at 1:00am');
  },
});

/* Areas
*/

SyncedCron.add({
  name: 'TestAreas',
  job: _.partial(TestsAreas, { sizeEach: 15 }),
  schedule(parser) {
    return parser.text('every Saturday at 1:00am');
  },
});

/* Misses
*/

SyncedCron.add({
  name: 'TestsMisses',
  job: TestsMisses,
  schedule(parser) {
    return parser.text('every Sunday at 1:00am');
  },
});
