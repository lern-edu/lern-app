// Libs
import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui';
import { ToolbarSeparator, DropDownMenu, MenuItem } from 'material-ui';

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

  handleMenuClick(event, index, category) {
    this.setState({ category });
  },

  /* Render
  */

  render() {
    const { tests } = this.props;
    const { category } = this.state;

    const sorted = _.sortBy(tests, 'startDate');

    return (
      <div>

        {/* <Toolbar>
          <ToolbarGroup >
            <ToolbarTitle text='Testes' />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text='Ordenar' />
            <ToolbarSeparator />
            <DropDownMenu value={category} onChange={this.handleMenuClick}>
              {
                _.map(this.categories, (v, k) =>
                  <MenuItem  key={k} value={k} primaryText={v.name} />
                )
              }
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar> */}

        <div className='ui grid container' style={{ marginTop: 10 }}>

          {
            _.map(sorted, test =>
              <StudentCourseShowTestsCard test={test} {...this.props} key={test._id} />
            )
          }

        </div>

      </div>
    );
  },
});

export default StudentCourseShowTests;
