Package.describe({
  name: 'lsunsi:se-cron',
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
    'jobs/tests/area.js',
    'jobs/tests/areas.js',
    'jobs/tests/subjects.js',
    'jobs/tests/misses.js',
    'jobs/tests/index.js',

    'config.js',
    // 'start.js',
  ], 'server');
});
