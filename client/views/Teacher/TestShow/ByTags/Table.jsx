// Libs
import React from 'react';
import _ from 'lodash';
import { Table, TableBody, TableFooter, TableHeader } from 'material-ui/Table';
import { TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Avatar, FontIcon, Chip } from 'material-ui';
import { DropDownMenu, MenuItem } from 'material-ui';

// Views
import TeacherTestShowByTagsTableChart from './Chart.jsx';

const TeacherTestShowByTagsTable = React.createClass({

  // initial state

  getInitialState() {
    const { students, attempts } = this.props;
    const orderedStudents = _.sortBy(students, 'profile.name');
    return _.assign(
      _.zipObject(
        _.map(orderedStudents, '_id'),
        _.map(orderedStudents, ({ _id: studentId }) =>
          _.get(
            _.first(
              _.sortBy(
                _.filter(attempts, ({ author, finished }) =>
                  author === studentId && finished
                ),
                'startedAt'
              )
            ),
            '_id'
          )
        )
      ),
      { selectedStudents: _.map(students, '_id') }
    );
  },

  // Handlers

  handleRows(selectedStudents) {
    const { students } = this.props;
    const orderedStudents = _.sortBy(students, 'profile.name');
    this.setState({
      selectedStudents: selectedStudents === 'all'
        ? _.map(students, '_id')
        : _.map(
          _.filter(orderedStudents, (val, key) => _.includes(selectedStudents, key)),
          '_id'
        ),
    });
  },

  handleAttempt(event, index, attemptId) {
    const { attempts } = this.props;
    const attempt = _.find(attempts, { _id: attemptId });
    this.setState({ [attempt.author]: attemptId });
  },

  /* Render
  */

  render() {
    const { selectedStudents } = this.state;
    const { students, attempts, answers } = this.props;

    return (
      <div>
        <Table
          selectable={true}
          multiSelectable={true}
          allRowsSelected={true}
          onRowSelection={this.handleRows}
        >
          <TableHeader
            displaySelectAll={true}
            adjustForCheckbox={true}
            enableSelectAll={true}
          >

            <TableRow>
              <TableHeaderColumn tooltip='Nome do aluno'>Aluno</TableHeaderColumn>
              {/* <TableHeaderColumn tooltip='Média geral'>Média</TableHeaderColumn> */}
              <TableHeaderColumn tooltip='A tentativa'>Tentativa</TableHeaderColumn>

            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={true}
            deselectOnClickaway={false}
            showRowHover={false}
            stripedRows={true}
          >
            {
              _.map(
                _.omit(this.state, ['selectedStudents']),
                (attemptId, studentId) => {
                  const student = _.find(students, { _id: studentId });
                  return (
                    <TableRow
                      key={studentId}
                      selected={_.includes(selectedStudents, [studentId])}
                    >
                      <TableRowColumn>
                        <Chip>
                          {
                            _.get(student, 'profile.profilePic')
                            ? <Avatar src={_.get(student, 'profile.profilePic')} />
                            : <Avatar size={32}>
                              {
                                _.first(
                                  _.get(student, 'profile.name')
                                )
                              }
                            </Avatar>
                          }
                          {
                            _.get(student, 'profile.name')
                          }
                        </Chip>
                      </TableRowColumn>

                      {/* <TableRowColumn>
                        {
                          numeral(
                            _.meanBy(
                              _.filter(answers, { attempt: attemptId }),
                              'answer'
                            ) || 0
                          ).format('0.0')
                        }
                      </TableRowColumn> */}

                      <TableRowColumn>
                        <DropDownMenu
                          value={attemptId}
                          onChange={this.handleAttempt}
                        >
                          {

                            _.map(
                              _.sortBy(
                                _.filter(attempts, ({ author, finished }) =>
                                  author === studentId && finished
                                ),
                                'startedAt'
                              ), ({ _id }, index) =>
                                <MenuItem
                                  key={_id}
                                  value={_id}
                                  primaryText={`Tentativa ${index + 1}`}
                                />
                            )
                          }

                        </DropDownMenu>
                      </TableRowColumn>
                    </TableRow>
                  );
                }
              )
            }

          </TableBody>

        </Table>

        <TeacherTestShowByTagsTableChart {...this.props} query={this.state} />

      </div>
    );
  },
});

export default TeacherTestShowByTagsTable;
