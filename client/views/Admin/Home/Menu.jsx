AdminHomeMenu = React.createClass({
  classes: 'ui secondary blue two item menu',
  items: {
    subjects: {
      icon: 'list',
      name: 'Matérias + Tags',
    },
    users: {
      icon: 'users',
      name: 'Usuários',
    },
  },

  /* Handlers
  */

  handleItemClick({ value }, event) {
    event.preventDefault();
    FlowRouter.setQueryParams({ active: value });
  },

  /* Render
  */

  render() {
    const { active } = this.props;

    return (
      <div className={this.classes}>
        {_.map(this.items, (v, k) =>
          <Semantic.Button tag='a' className={`item ${active === k ? 'active' : ''}`} key={k} value={k} href='#' onClick={this.handleItemClick}>
            <i className={`${v.icon} icon`} />
            <div className='content'>{v.name}</div>
          </Semantic.Button>
        )}
      </div>
    );
  },
});
