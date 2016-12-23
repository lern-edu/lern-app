Package.describe({
  name: 'lsunsi:se-layouts',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'react',
    'ecmascript',
    'erasaur:meteor-lodash',
    'kadira:react-layout',
    'patrickleet:enquire',
  ], 'client');

  api.addFiles([
    'components/Footer.jsx',
    'components/Navigation.jsx',
    'components/Safe.jsx',
    'components/Snackbar.jsx',

    'mixins/Data.jsx',
    'mixins/Render.jsx',
    'mixins/Screen.jsx',
    'mixins/Theme.jsx',

    'Layout.jsx',
    'NotFound.jsx',
    'Bar.jsx',
  ], 'client');

  api.export('Layout', 'client');
});
