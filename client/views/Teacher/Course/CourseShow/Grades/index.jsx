import React from 'react';
import { Table, TableHeader, TableRow, TableRowColumn, TableHeaderColumn, TableBody, TableFooter, Paper, RaisedButton, } from 'material-ui';

TeacherCourseShowGrades = React.createClass({

  // initial state

  getInitialState() {
    return { selectedGrades: 'none' };
  },

  // Handlers

  handleSelect(selectedGrades) {
    this.setState({ selectedGrades });
  },

  handleNewGrades() {
    const { selectedGrades } = this.state;
    const { grades, course } = this.props;
    let gradesIds;

    if (selectedGrades === 'all') gradesIds = _.map(grades, '_id');
    else gradesIds = _.map(_.filter(grades,
          (g, index) => _.includes(selectedGrades, index)), '_id');

    FlowRouter.go('TeacherGradesEdit', { courseId: course._id }, { gradesIds });
  },

  // Render
  render() {
    const { grades, students, attempts } = this.props;
    const { selectedGrades } = this.state;

    return (
      <div className='ui container'>

        <div className='ui basic segment'>

          <Paper zDepth={2} className='ui vertical basic segment'>
            <Table
              fixedHeader={true}
              fixedFooter={true}
              multiSelectable={true}
              onRowSelection={this.handleSelect}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn
                  colSpan={3}
                  style={{ textAlign: 'center' }}>
                    <h2>Notas</h2>
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn tooltip='Nome do aluno'>Nome</TableHeaderColumn>
                  <TableHeaderColumn tooltip='Nota do aluno'>Nota</TableHeaderColumn>
                  <TableHeaderColumn
                    tooltip='Total distribuído'>Total</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                deselectOnClickaway={false}
                showRowHover={true}
                stripedRows={true} >
                {_.map(grades, (g, index) => {
                  const student = _.first(_.filter(students,
                    s => s._id === g.student));
                  let studentGrade = total = 0;
                  _.forEach(_.filter(attempts, a =>
                    _.includes(g.attempts, a._id)), ({ score, grade }) => {
                      total += score || 0;
                      studentGrade += grade ? grade * score : 0;
                    });
                  _.forEach(g.deatachedGrades, ({ score, grade }) => {
                    total += score || 0;
                    studentGrade += grade ? grade * score : 0;
                  });
                  return (
                    <TableRow
                      key={g._id}
                      selected={_.includes(selectedGrades, index)} >
                      <TableRowColumn>{_.get(student, 'profile.name')}</TableRowColumn>
                      <TableRowColumn>{studentGrade}</TableRowColumn>
                      <TableRowColumn>{total}</TableRowColumn>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableRowColumn colSpan='3' style={{ textAlign: 'center' }}>
                    <div className='ui right aligned basic segment'>
                      <RaisedButton
                        label='Lançar notas'
                        disabled={selectedGrades === 'none'
                          || _.isEmpty(selectedGrades)}
                        primary={true}
                        onTouchTap={this.handleNewGrades} />
                    </div>
                  </TableRowColumn>
                </TableRow>
              </TableFooter>
            </Table>

          </Paper>

        </div>

      </div>
    );
  },
});
