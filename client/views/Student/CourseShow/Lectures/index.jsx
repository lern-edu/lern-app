import React from 'react';

StudentCourseShowLectures = React.createClass({

  orders: {
    date: {
      name: 'Data',
      sortBy: 'startDate',
      groupBy(lecture) {
        return moment(lecture.startDate).month();
      },

      groupNames(key) {
        return _.capitalize(moment({ month: key }).format('MMMM'));
      },
    },
    tags: {
      name: 'Tema',
      sortBy: 'tags',
      groupBy(lecture) {
        const sorted = _.sortBy(lecture.tags, _.identity);
        return sorted;
      },

      groupNames(key) {
        const ids = key.split(',');
        const { tags } = this.props;
        const keyTags = _.map(ids, t => _.find(tags, { _id: t }));
        return _.map(keyTags, 'text').join(' + ');
      },
    },
  },

  /* Lifecycle
  */

  getInitialState() {
    return { order: 'date' };
  },

  /* Handlers
  */

  handleMenuClick({ value: order }, event) {
    event.preventDefault();
    this.setState({ order });
  },

  /* Render
  */

  render() {
    const { lectures } = this.props;
    const { order } = this.state;

    const groups = _.groupBy(_.sortBy(lectures, this.orders[order].sortBy), _.bind(this.orders[order].groupBy, this));

    return (
      <div>

        <div className='ui blue text menu'>
          <div className='header item'>Ordenar</div>
          {_.map(this.orders, (v, k) =>
            <Semantic.Button tag='a' href='#' className={`item ${k === order ? 'active' : ''}`} key={k} onClick={this.handleMenuClick} value={k}>
              <div className='content'>
                <div className='header'>{v.name}</div>
              </div>
            </Semantic.Button>
          )}
        </div>

        {_.map(groups, (v, k) => [
          <div className='ui header'>
            {this.orders[order].groupNames.call(this, k)}
          </div>,
          <div className='ui centered grid' key={k}>
            {_.map(v, lecture =>
              <StudentCourseShowLecturesCard lecture={lecture} {...this.props} key={lecture._id} />
            )}
          </div>,
        ])}

      </div>
    );
  },
});
