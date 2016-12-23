Subjects = new Mongo.Collection('subjects');

Subjects.Schema = Astro.Class({
  name: 'Subject',
  collection: Subjects,
  fields: {
    name: {
      type: 'string',
      validator: Validators.String(),
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
