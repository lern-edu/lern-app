import React from 'react';

const TeacherCourseShowLectures = React.createClass({

  /* Render
  */

  render() {
    const { lectures } = this.props;

    return (
      <div style={{ marginTop: 10 }}>
        {
          _.map(_.sortBy(lectures, 'startDate'), lecture =>
            <div className='ui grid container' key={lecture._id}>
              <div className='row'>

                <TeacherCourseShowLecturesCard
                  lecture={lecture}
                  {...this.props}
                  key={lecture._id}
                />

              </div>
            </div>
          )
        }
      </div>
    );
  },
});

export default TeacherCourseShowLectures;
