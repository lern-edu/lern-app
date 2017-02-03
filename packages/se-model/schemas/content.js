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
      validator: Validators.or([
        Validators.Content(),
        Validators.and([Validators.required(), Validators.object()]),
      ]),
      optional: true,
    },
    title: {
      type: 'string',
      validator: Validators.or([
        Validators.String({ min: 1, max: 8192 }),
        Validators.Content(),
      ]),
      optional: true,
    },
    image: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      immutable: true,
      optional: true,
    },
    audio: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      immutable: true,
      optional: true,
    },
    video: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      immutable: true,
      optional: true,
    },
    document: {
      type: 'string',
      validator: Validators.or([Validators.Reference(), Validators.Content()]),
      immutable: true,
      optional: true,
    },
    link: {
      type: 'string',
      validator: Validators.or([Validators.url(), Validators.Content()]),
      optional: true,
    },
  },
});
