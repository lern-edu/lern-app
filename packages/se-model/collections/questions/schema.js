import { Class } from 'meteor/jagi:astronomy';
console.log(Class);

Questions = new Mongo.Collection('questions');

Questions.InfoSchema = Astro.Class({
  name: 'QuestionInfo',
  fields: {
    text: {
      type: 'string',
      validator: Validators.String({ min: 1, max: 8192 }),
      optional: true,
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
    document: {
      type: 'string',
      validator: Validators.Reference(),
      immutable: true,
      optional: true,
    },
    link: {
      type: 'string',
      validator: Validators.url(),
      optional: true,
    },
  },
});

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

Questions.RangeSchema = Astro.Class({
  name: 'QuestionRange',
  fields: {
    min: {
      type: 'number',
      immutable: true,
      optional: true,
    },
    max: {
      type: 'number',
      immutable: true,
      optional: true,
    },
  },
});

Questions.Schema = Astro.Class({
  name: 'Question',
  collection: Questions,
  fields: {
    info: {
      type: 'array',
      nested: 'QuestionInfo',
      validator: Validators.String({ min: 1, max: 2048 }),
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
    range: {
      type: 'object',
      nested: 'QuestionRange',
      validator: Validators.QuestionRange(),
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
  },
  behaviors: [
    'creatable',
    'timestamp',
    'tagable',
    'singleSubject',
  ],
});
