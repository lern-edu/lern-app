Posts = new Mongo.Collection('posts');

Posts.ContentSchema = ContentSchema('PostContent');

Posts.Comment = Astro.Class({
  name: 'Comment',
  fields: {
    content: {
      type: 'array',
      nested: 'PostContent',
      validator: Validators.minLength(1),
      default: () => [],
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
    content: {
      type: 'array',
      nested: 'PostContent',
      validator: Validators.minLength(1),
      default: () => [],
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
