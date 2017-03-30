Tags = new Mongo.Collection('tags');

Tags.ContentSchema = ContentSchema('TagContent');

Tags.Schema = Astro.Class({
  name: 'Tag',
  collection: Tags,
  fields: {
    text: {
      type: 'string',
      validator: Validators.String(),
    },
    info: {
      type: 'array',
      nested: 'TagContent',
      validator: Validators.minLength(0),
      optional: true,
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
