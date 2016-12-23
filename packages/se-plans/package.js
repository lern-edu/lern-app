Package.describe({
  name: 'lsunsi:se-plans',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'erasaur:meteor-lodash',
    'percolate:synced-cron',
  ], 'server');

  api.addFiles([
    'namespace.js',

    'jobs/generator.js',
    'jobs/misses.js',

    'setup.js',
    'start.js',
  ], 'server');

  api.export('Jobs', 'server');
});
