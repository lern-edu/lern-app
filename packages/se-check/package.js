Package.describe({
  name: 'lsunsi:se-check',
  version: '0.0.1',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'check',

    'lsunsi:se-model',
  ]);

  api.addFiles([
    'namespace.js',

    'lib/Cursor.js',
    'lib/User.js',
    'lib/Astro.js',
    'lib/Regex.js',
  ]);

  api.export(['Check', 'Match']);
});
