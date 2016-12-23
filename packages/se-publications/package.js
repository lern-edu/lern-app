Package.describe({
  name: 'lsunsi:se-publications',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'erasaur:meteor-lodash',
    'reywood:publish-composite',
    'percolate:paginated-subscription',

    'lsunsi:se-fetch',
    'lsunsi:se-check',
  ]);

  api.addFiles([
    'helpers.js',

    'server/public.js',
    'server/user.js',
    'server/student.js',
    'server/teacher.js',
    'server/school.js',
    'server/admin.js',
  ], 'server');
});
