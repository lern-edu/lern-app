Package.describe({
  name: 'duckdodgerbrasl:youtube-api',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'renaldo:youtube-api',
  ]);

  api.addFiles([
    'init.js',
    'lib/youtube-api.js',
    'lib/methods.js',
    'lib/regex.js',
  ]);

  api.export('Youtube', 'client');
});
