Package.describe({
  name: 'lsunsi:se-files',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'cfs:standard-packages',
    'cfs:filesystem',
    'cfs:s3',
  ]);

  api.addFiles([
    'collections/documents.js',
    'collections/images.js',
    'collections/audios.js',
  ]);

  api.export([
    'FS',
  ]);
});
