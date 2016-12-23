Posts = new Mongo.Collection('posts');

Posts.Comment = Astro.Class({
  name: 'Comment',
  fields: {
    text: {
      type: 'string',
      validator: Validators.String(),
    },
    answer: {
      type: 'boolean',
      validator: [Validators.boolean(), Validators.UniqAnswer()],
      optional: true,
      immutable: true,
    },
  },
  behaviors: ['creatable', 'evaluate'],
});

Posts.Schema = Astro.Class({
  name: 'Post',
  collection: Posts,
  fields: {
    course: {
      type: 'string',
      validator: Validators.Reference(),
      optional: true,
      default: null,
    },
    title: {
      type: 'string',
      validator: Validators.String(),
    },
    text: {
      type: 'string',
      validator: Validators.String({ min: 4, max: 32000 }),
    },
    images: {
      type: 'array',
      validator: Validators.References(),
      optional: true,
    },
    documents: {
      type: 'array',
      validator: Validators.References(),
      optional: true,
    },
    questions: {
      type: 'array',
      validator: Validators.References(),
      optional: true,
    },
    type: {
      type: 'string',
      validator: Validators.OneOf(PostTypes.all('keys')),
      default: 'info',
      immutable: true,
    },
    comments: {
      type: 'array',
      nested: 'Comment',
      optional: true,
    },
  },
  behaviors: [
    'multiSubject',
    'creatable',
    'timestamp',
    'tagable',
    'evaluate',
  ],
});
