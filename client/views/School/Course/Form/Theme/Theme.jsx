// Libs
import React from 'react';
import { RaisedButton, TextField, MenuItem } from 'material-ui';

// View
import SchoolCourseFormThemeSubjects from './Subjects.jsx';
import SchoolCourseFormThemeTags from './Tags.jsx';

const SchoolCourseFormThemeView = React.createClass({

  /* Render
  */

  render() {
    const { form, done, errors } = this.props;

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <SchoolCourseFormThemeSubjects {...this.props} />
          </div>

          <div className='row'>
            <SchoolCourseFormThemeTags {...this.props} />
          </div>

        </div>
      </div>
    );
  },
});

export default SchoolCourseFormThemeView;
