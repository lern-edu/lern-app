Package.describe({
  name: 'lsunsi:se-router',
  version: '0.0.1',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'kadira:flow-router',

    'lsunsi:se-layouts',
  ]);

  api.addFiles([
    'lib/admin.jsx',
    'lib/school.jsx',
    'lib/public.jsx',
    'lib/student.jsx',
    'lib/teacher.jsx',
  ], 'client');

  api.export('FlowRouter');
});
