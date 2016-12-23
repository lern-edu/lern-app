Tests = new Mongo.Collection('tests');

Tests.RequestSchema = Astro.Class({
  name: 'TestRequest',
  fields: {
    date: {
      type: 'date',
      validator: Validators.Date(),
    },
    name: {
      type: 'string',
      validator: Validators.String({ min: 1, max: 1024 }),
    },
    size: {
      type: 'number',
      validator: Validators.and([Validators.lt(11), Validators.gt(0)]),
    },
  },
  behaviors: [
    'tagable',
    'singleSubject',
  ],
});

Tests.Schema = Astro.Class({
  name: 'Test',
  collection: Tests,
  fields: {
    plan: {
      type: 'string',
      validator: Validators.TestPlan(),
    },
    course: {
      type: 'string',
      validator: Validators.TestCourse(),
      optional: true,
    },
    students: {
      validator: Validators.TestStudents(),
    },
    name: {
      type: 'string',
      validator: Validators.String(),
    },
    info: {
      type: 'string',
      validator: Validators.String({ min: 4, max: 32000 }),
    },
    type: {
      type: 'string',
      validator: Validators.OneOf(TestTypes.all('keys')),
    },
    questions: {
      type: 'array',
      validator: Validators.and([Validators.References(), Validators.minLength(1)]),
      immutable: true,
    },
    scores: {
      validator: Validators.TestScores(),
      immutable: true,
      optional: true,
      default: () => [],
    },
    timeout: {
      type: 'number',
      validator: Validators.TestTimeout(),
      immutable: true,
    },
    timeoutType: {
      type: 'string',
      validator: Validators.OneOf(TestTimeoutTypes.all('keys')),
      immutable: true,
    },
    documents: {
      type: 'string',
      validator: Validators.References(),
      optional: true,
    },
  },
  behaviors: [
    'creatable',
    'timestamp',
    'tagable',
    'multiSubject',
    'timeBounds',
  ],
});
