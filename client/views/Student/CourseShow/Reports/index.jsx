import React from 'react';

StudentCourseShowReports = React.createClass({

  render() {
    return (
      <div className='ui basic segment'>

        <div className='ui centered grid'>
          <div className='row'>
            <div className='eight wide column'>
              <StudentCourseShowReportsStats {...this.props} />
            </div>
          </div>
          <div className='row'>
            <div className='eight wide column'>
              <StudentCourseShowReportsTable {...this.props} />
            </div>
          </div>
        </div>

      </div>
    );
  },
});
