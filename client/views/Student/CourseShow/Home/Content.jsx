import React from 'react';
import { Paper } from 'material-ui';

const StudentCourseShowHomeContent = React.createClass({

  /* Render
  */

  render() {
    const { course } = this.props;

    return (
      <Paper className='ui basic segment'>

        {
          _.map(course.info, (info, index) =>
            <PublicContentShow
              key={index}
              canRemove={false}
              index={index}
              schema={Courses.ContentSchema}
              doc={info}
            />
          )
        }

      </Paper>
    );
  },
});

export default StudentCourseShowHomeContent;
