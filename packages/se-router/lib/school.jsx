const { render } = Layout.setup({ protect: 'school', bar: true });

const schoolRoutes = FlowRouter.group({
  prefix: '/escola',
  name: 'School',
});

schoolRoutes.route('/', {
  name: 'SchoolHome',
  action() {
    render(<SchoolHomeView />);
  },
});
