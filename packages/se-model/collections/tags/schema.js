Tags = new Mongo.Collection('tags');

Tags.Schema = Astro.Class({
  name: 'Tag',
  collection: Tags,
  fields: {
    text: {
      type: 'string',
      validator: Validators.String(),
    },
    parent: {
      type: 'string',
      validator: Validators.Reference(),
      optional: true,
    },
  },
  behaviors: [
    'singleSubject',
  ],
});
