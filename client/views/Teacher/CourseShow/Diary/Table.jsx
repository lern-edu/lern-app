import React from 'react';

TeacherCourseShowDiaryTable = React.createClass({
  mixins: [Semantic.Transition({ appear: 'scale', enter: 'jiggle' })],

  /* Methods
  */

  getTestTable() {
    const { attempts, tests, students } = this.props;

    const sortedAttempts = _.sortBy(attempts, 'startedAt');
    const studentsIds = _.map(students, '_id');

    return _.reduce(tests, (mem, test) => {
      if (_.isNull(test.scores)) return mem;
      const grades = _.map(studentsIds, author => _.get(_.find(sortedAttempts, { author, test: test._id }), 'grade'));
      mem.push({ type: 'test', doc: test, date: test.startDate, grades: _.zipObject(studentsIds, grades) });
      return mem;
    }, []);
  },

  getLectureTable() {
    const { lectures, students } = this.props;

    const studentsIds = _.map(students, '_id');

    return _.reduce(lectures, (mem, lecture) => {
      const attendance = _.map(studentsIds, id => lecture.attendants ? _.includes(lecture.attendants, id) : null);
      mem.push({ type: 'lecture', doc: lecture, date: lecture.startDate, attendance: _.zipObject(studentsIds, attendance) });
      return mem;
    }, []);
  },

  getFinalTable() {
    const { parent } = this.props;
    const { year, month } = parent.state;
    const tTable = this.getTestTable();
    const lTable = this.getLectureTable();
    const joined = _.concat([], tTable, lTable);
    const filtered = _.filter(joined, a => (ref = moment(a.date)) && ref.month() === month && ref.year() === year);
    return _.sortBy(filtered, 'date');
  },

  getPopupInitializer({ ref }) {
    const popup = $(ReactDOM.findDOMNode(this.refs[ref]));
    return node => node.popup({ popup });
  },

  /* Render
  */

  render() {
    const { tags, students } = this.props;

    const tableData = this.getFinalTable();
    const dataTypeIcon = { lecture: 'bookmark', test: 'yellow file text' };

    return (
      <table className='ui celled blue table' ref='animate'>
        <thead>
          <tr>
            <th>Aluno</th>
            {_.map(tableData, rowData =>
              <th key={rowData.doc._id} ref={node => $(node).popup({ popup: ReactDOM.findDOMNode(this.refs[`${rowData.doc._id}-popup`]) })}>
                <i className={`icon ${dataTypeIcon[rowData.type]}`} />
                {moment(rowData.date).format('DD/MM')}
                <div className='ui popup' ref={`${rowData.doc._id}-popup`}>
                  <div className='ui yellow labels'>
                    {_.map(rowData.doc.tags, t =>
                      <div className='ui label' key={t}>
                        {_.find(tags, { _id: t }).text}
                      </div>
                    )}
                  </div>
                </div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {_.map(_.sortBy(students, 'profile.name'), student =>
            <tr key={student._id}>
              <td>{student.getName()}</td>
              {_.map(tableData, rowData =>
                <td key={rowData.doc._id} className='center aligned'>
                  {rowData.type === 'lecture' ? (
                    _.isNull(rowData.attendance[student._id])
                    ? <i className='warning icon' />
                    : rowData.attendance[student._id]
                    ? <i className='blue checkmark icon' />
                    : <i className='red minus icon' />
                  ) : rowData.type === 'test' ? (
                    _.isNull(rowData.grades[student._id])
                    ? <i className='warning icon' />
                    : _.isUndefined(rowData.grades[student._id])
                    ? <i className='red minus icon' />
                    : `${numeral(_.sum(rowData.doc.scores) * rowData.grades[student._id]).format('0.[00]')} de ${_.sum(rowData.doc.scores)}`
                  ) : undefined
                  }
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  },
});
