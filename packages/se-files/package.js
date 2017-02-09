Package.describe({
  name: 'lsunsi:se-files',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'ostrio:files',
  ]);

  api.addFiles([
    'namespace.js',

    /*'collections/documents.js',*/
    'collections/images.js',
    'collections/audios.js',
    'collections/videos.js',
  ]);

  api.export([
    'FS',
  ]);
});
