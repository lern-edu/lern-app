Lectures = new Mongo.Collection('lectures');

Lectures.Schema = Astro.Class({
  name: 'Lecture',
  collection: Lectures,
  fields: {
    course: {
      type: 'string',
      validator: Validators.Reference(),
    },
    info: {
      type: 'string',
      validator: Validators.String({ min: 0, max: 1024 }),
      optional: true,
    },
    attendants: {
      type: 'array',
      validator: Validators.References(),
      optional: true,
    },
    homework: {
      type: 'boolean',
      validator: Validators.boolean(),
      optional: true,
    },
    test: {
      type: 'string',
      validator: Validators.Reference(),
      optional: true,
    },
  },
  behaviors: [
    'creatable',
    'tagable',
    'timeBounds',
  ],
});
