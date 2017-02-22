Attempts = new Mongo.Collection('attempts');

Attempts.PageTimeTrackedSchema = Astro.Class({
  name: 'AttemptsPageTimeTracked',
  behaviors: [
    'timeTracked',
  ],
});

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
    timeTracked: {
      type: 'array',
      nested: 'AttemptsPageTimeTracked',
      validator: Validators.minLength(1),
      optional: true,
    },
  },
  behaviors: [
    'timeTracked',
    'creatable',
  ],
});
