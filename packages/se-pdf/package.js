Package.describe({
  name: 'duckdodgerbrasl:se-pdf',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'lsunsi:se-fetch',
    'pascoual:pdfkit@1.0.7',
    'froatsnook:request@2.67.0',
  ]);
  api.addFiles([
    'lib/pdf-maker.js',
    'lib/methods.js',
    'init.js',
  ]);

  api.export('PDFMaker', ['client']);
});
