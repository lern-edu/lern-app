Package.describe({
  name: 'lsunsi:se-fetch',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'erasaur:meteor-lodash',

    'lsunsi:se-model',
    'lsunsi:se-files',
  ]);

  api.addFiles([
    'namespace.js',
    'general.js',

    'lib/public.js',
    'lib/user.js',
    'lib/student.js',
    'lib/teacher.js',
    'lib/school.js',
  ]);

  api.export('Fetch');
});
