const metas = [
  { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
];

_.forEach(metas, meta => DocHead.addMeta(meta));
