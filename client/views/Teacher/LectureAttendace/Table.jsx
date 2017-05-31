// Libs
import React from 'react';
import { Avatar, FontIcon, Chip } from 'material-ui';
import { Table, TableBody, TableFooter, TableHeader } from 'material-ui/Table';
import { TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import _ from 'lodash';

const TeacherLectureAttendanceTable = React.createClass({
  mixins: [AstroForm(Lectures.Schema, 'TeacherLectureSave')],

  // handlers

  handleRows(selectedStudents) {
    const { students } = this.props;
    const orderedStudents = _.sortBy(students, 'profile.name');
    this.defaultHandler({
      attendants: selectedStudents === 'all'
        ? _.map(students, '_id')
        : _.map(
          _.filter(orderedStudents, (val, key) => _.includes(selectedStudents, key)),
          '_id'
        ),
    }, { doc: true });

    this.defaultSubmit();
  },

  // Render

  render() {
    const { students } = this.props;

    return (
      <Table
        selectable={true}
        multiSelectable={true}
        onRowSelection={this.handleRows}
      >
        <TableHeader
          displaySelectAll={true}
          adjustForCheckbox={true}
          enableSelectAll={true}
        >

          <TableRow>
            <TableHeaderColumn tooltip='Nome do aluno'>Aluno</TableHeaderColumn>
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
              _.orderBy(students, 'profile.name'),
              student =>
                <TableRow
                  key={student._id}
                  selected={_.includes(this.doc.attendants, student._id)}
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

                </TableRow>
            )
          }

        </TableBody>

      </Table>
    );
  },
});

export default TeacherLectureAttendanceTable;
