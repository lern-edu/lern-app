import React from 'react';
import { RaisedButton } from 'material-ui';

const TeacherLectureAttendanceTitle = React.createClass({

  render() {
    const { lecture: { name, attendants, startDate, _id }, course } = this.props;

    return (
      <div className='ui basic segment' style={{ marginBottom: 0 }}>
        <h1 className='ui header' style={{ marginTop: 0 }}>
          <div className='content'>
            Presença {moment(startDate).format('DD/MM')}
            <div className='sub header'>
              Use a tecla shift para selecionar vários
            </div>
          </div>
        </h1>
      </div>
    );
  },
});

export default TeacherLectureAttendanceTitle;
