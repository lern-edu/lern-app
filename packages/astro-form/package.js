Package.describe({
  name: 'lsunsi:astro-form',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'react',
    'erasaur:meteor-lodash',
  ], 'client');

  api.addFiles([
    'mixin.jsx',
  ], 'client');

  api.export('AstroForm', 'client');
});
