Tests = new Mongo.Collection('tests');

Tests.ContentSchema = ContentSchema('TestContent');

Tests.PageSchema = Astro.Class({
  name: 'TestPage',
  fields: {
    content: {
      type: 'array',
      nested: 'TestContent',
      validator: Validators.minLength(1),
      default: () => [],
    },
    timeout: {
      type: 'number',
      validator: Validators.TestPageTimeout(),
      optional: true,
      immutable: true,
    },
  },
});

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
      type: 'array',
      nested: 'TestContent',
      validator: Validators.minLength(1),
      default: () => [],
    },
    type: {
      type: 'string',
      validator: Validators.OneOf(TestTypes.all('keys')),
    },
    pages: {
      type: 'array',
      nested: 'TestPage',
      validator: Validators.minLength(1),
      default: () => [],
    },
    questions: {
      type: 'array',
      validator: Validators.and([
        Validators.References(),
        Validators.minLength(1),
      ]),
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
  },
  behaviors: [
    'creatable',
    'timestamp',
    'tagable',
    'multiSubject',
    'timeBounds',
  ],
});
