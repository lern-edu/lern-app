import React from 'react';
const { render } = Layout.setup();

FlowRouter.route('/', {
  name: 'PublicHome',
  action() {
    render({
      main: <PublicHomeView />,
    });
  },
});

FlowRouter.route('/login', {
  name: 'PublicLogin',
  action() {
    render({
      bar: false,
      main: <PublicLoginView />,
    });
  },
});

FlowRouter.route('/contato', {
  name: 'PublicContact',
  action(params, query) {
    render({
      bar: true, nav: true,
      main: <PublicContactView {...query}/>,
    });
  },
});

FlowRouter.route('/cadastro/:token', {
  name: 'PublicEnrollment',
  action(params, query) {
    render({
      bar: true,
      main: <PublicEnrollmentView {...params}/>,
    });
  },
});
