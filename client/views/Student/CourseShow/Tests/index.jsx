// Libs
import React from 'react';

// Views
import StudentCourseShowTestsCard from './Card.jsx';

const StudentCourseShowTests = React.createClass({

  categories: {
    tries: {
      name: 'Tentativas',
      sortBy: '_id',
      groupNames: _.identity,
      groupBy(test) {
        const { attempts } = this.props;
        const testAttempts = _.filter(attempts, { test: test._id });
        const current = _.find(testAttempts, { finished: null });
        return current ? 'Fazendo' : testAttempts.length > 0 ? 'Já terminadas' : 'Não começadas';
      },
    },

    state: {
      name: 'Estado',
      sortBy: 'startDate',
      groupBy(test) {
        return test.endDate <= _.now();
      },

      groupNames(key) {
        return +key ? 'Terminadas' : 'Em Andamento';
      },
    },

    type: {
      name: 'Tipo',
      sortBy: 'startDate',
      groupBy(test) {
        return _.isNull(test.scores);
      },

      groupNames(key) {
        return +key ? 'Simulado' : 'Avaliada';
      },
    },
  },

  /* Lifecycle
  */

  getInitialState() {
    return { category: 'tries' };
  },

  /* Handlers
  */

  handleMenuClick({ value: category }, event) {
    event.preventDefault();
    this.setState({ category });
  },

  /* Render
  */

  render() {
    const { tests } = this.props;
    const { category } = this.state;

    const cat = this.categories[category];
    const groups = _.groupBy(_.sortBy(tests, cat.sortBy), _.bind(cat.groupBy, this));

    return (
      <div>

        <div className='ui text menu'>
          <div className='header item'>Ordenar</div>
          {_.map(this.categories, (v, k) =>
            <Semantic.Button tag='a' href='#' className={`item ${k === category ? 'active blue' : ''}`} key={k} onClick={this.handleMenuClick} value={k}>
              <div className='content'>
                <div className='header'>{v.name}</div>
              </div>
            </Semantic.Button>
          )}
        </div>

        {_.map(groups, (v, k) => [
          <div className='ui header'>
            {cat.groupNames.call(this, k)}
          </div>,
          <div className='ui four stackable cards' key={k}>
            {_.map(v, test =>
              <StudentCourseShowTestsCard test={test} {...this.props} key={test._id} />
            )}
          </div>,
        ])}

      </div>
    );
  },
});

export default StudentCourseShowTests;
