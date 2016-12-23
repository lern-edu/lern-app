Attempts = new Mongo.Collection('attempts');

Attempts.Schema = Astro.Class({
  name: 'Attempt',
  collection: Attempts,
  fields: {
    test: {
      type: 'string',
      validator: Validators.Reference(),
    },
    score: {
      type: 'number',
      validator: Validators.Float({ min: 0, max: 100 }),
      optional: true,
      default: null,
    },
    grade: {
      type: 'number',
      validator: Validators.Float({ min: 0, max: 1 }),
      default: null,
      optional: true,
    },
  },
  behaviors: [
    'timeTracked',
    'creatable',
  ],
});
