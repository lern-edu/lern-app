// Libs
import React from 'react';

// Views
import TeacherCourseShowLecturesCard from './Card.jsx';
import TeacherCourseShowLecturesToolbar from './Toolbar.jsx';

export default class TeacherCourseShowLectures extends React.Component {

  // Constructor

  constructor(props) {
    super(props);
    this.state = { month: 'all' };
  }

  // Handlers

  handleMonthChange(event, index, month) {
    this.setState({ month });
  }

  /* Render
  */

  render() {
    const { lectures, course } = this.props;
    const { month } = this.state;

    const groupedLectures = _.groupBy(
      _.sortBy(lectures, 'startDate'),
      ({ startDate }) =>
        moment(startDate).format('MMMM')
      );

    return (
      <div className='ui grid container' style={{ marginTop: 10 }}>

        <TeacherCourseShowLecturesToolbar
          handleChange={_.bind(this.handleMonthChange, this)}
          lectures={lectures}
          course={course}
          filter={month}
        />

        {
          month === 'all'
          ? _.map(groupedLectures, (lecturesMapped, key) => [
              <div className='sixteen wide column'>
                <div className='ui header'>
                  {key}
                </div>
              </div>,
              ..._.map(
                lecturesMapped,
                lecture =>
                  <TeacherCourseShowLecturesCard
                    lecture={lecture}
                    {...this.props}
                    key={lecture._id}
                  />
              ),
            ]
          )
          : _.map(
            _.get(groupedLectures, month),
            lecture =>
              <TeacherCourseShowLecturesCard
                lecture={lecture}
                {..._.pick(this.props, ['tags', 'course'])}
                key={lecture._id}
              />
          )
        }
      </div>
    );
  }

};
