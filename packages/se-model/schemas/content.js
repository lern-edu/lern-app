ContentSchema = (name) => Astro.Class({
  name,
  fields: {
    type: {
      type: 'string',
      validator: Validators.OneOf(ContentTypes.all('keys')),
      immutable: true,
      default: 'text',
    },
    text: {
      type: 'string',
      validator: Validators.or([
        Validators.String({ min: 1, max: 8192 }),
        Validators.Content(),
      ]),
      default: '',
      optional: true,
    },
    title: {
      type: 'string',
      validator: Validators.or([
        Validators.String({ min: 1, max: 8192 }),
        Validators.Content(),
      ]),
      default: '',
      optional: true,
    },
    image: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      default: '',
      immutable: true,
      optional: true,
    },
    audio: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      default: '',
      immutable: true,
      optional: true,
    },
    video: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      default: '',
      immutable: true,
      optional: true,
    },
    document: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      default: '',
      immutable: true,
      optional: true,
    },
    question: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      default: '',
      immutable: true,
      optional: true,
    },
    link: {
      type: 'string',
      default: '',
      validator: Validators.or([Validators.url(), Validators.Content()]),
      optional: true,
    },
  },
});
