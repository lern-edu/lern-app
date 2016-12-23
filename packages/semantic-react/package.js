Package.describe({
  name: 'lsunsi:semantic-react',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'react',
    'erasaur:meteor-lodash',
  ], 'client');

  api.addFiles([
    'namespace.js',
    'wrapper.jsx',

    'components/Accordion.jsx',
    'components/Button.jsx',
    'components/Dropdown.jsx',
    'components/Input.jsx',
    'components/Popup.jsx',
    'components/Progress.jsx',
    'components/Search.jsx',

    'mixins/Transition.jsx',

  ], 'client');

  api.export('Semantic', 'client');
});
