Questions = new Mongo.Collection('questions');

Questions.OptionSchema = Astro.Class({
  name: 'QuestionOption',
  fields: {
    text: {
      type: 'string',
      validator: Validators.String({ min: 1, max: 1024 }),
      optional: true,
    },
    image: {
      type: 'string',
      validator: Validators.Reference(),
      immutable: true,
      optional: true,
    },
  },
});

Questions.Schema = Astro.Class({
  name: 'Question',
  collection: Questions,
  fields: {
    text: {
      type: 'string',
      validator: Validators.String({ min: 1, max: 2048 }),
    },
    image: {
      type: 'string',
      validator: Validators.Reference(),
      immutable: true,
      optional: true,
    },
    audio: {
      type: 'string',
      validator: Validators.Reference(),
      immutable: true,
      optional: true,
    },
    video: {
      type: 'string',
      validator: Validators.Reference(),
      immutable: true,
      optional: true,
    },
    type: {
      type: 'string',
      validator: Validators.OneOf(QuestionTypes.all('keys')),
      immutable: true,
    },
    answer: {
      validator: Validators.QuestionAnswer({ min: 1, max: 2048 }),
      optional: true,
      immutable: true,
    },
    exams: {
      type: 'array',
      validator: Validators.array(),
      optional: true,
    },
    score: {
      type: 'number',
      validator: Validators.Float(),
      optional: true,
    },
    options: {
      type: 'array',
      nested: 'QuestionOption',
      validator: Validators.QuestionOptions(),
      immutable: true,
    },
    school: {
      type: 'string',
      validator: Validators.Reference(),
      optional: true,
      immutable: true,
    },
    complement: {
      type: 'object',
      validator: Validators.object(),
      optional: true,
    },
  },
  behaviors: [
    'creatable',
    'timestamp',
    'tagable',
    'singleSubject',
  ],
});
