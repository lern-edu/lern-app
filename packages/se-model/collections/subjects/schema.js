Subjects = new Mongo.Collection('subjects');

Subjects.ContentSchema = ContentSchema('SubjectContent');

Subjects.Schema = Astro.Class({
  name: 'Subject',
  collection: Subjects,
  fields: {
    name: {
      type: 'string',
      validator: Validators.String(),
    },
    info: {
      type: 'array',
      nested: 'SubjectContent',
      validator: Validators.minLength(0),
      optional: true,
    },
    area: {
      type: 'string',
      validator: Validators.OneOf(SubjectAreas.all('keys')),
      optional: true,
    },
  },
  behaviors: [
    'timestamp',
  ],
});
