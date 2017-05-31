import React from 'react';
import { RaisedButton } from 'material-ui';

const TeacherLectureAttendanceTitle = React.createClass({

  render() {
    const { lecture: { name, attendants, startDate } } = this.props;

    return (
      <div className='ui basic segment' style={{ marginBottom: 0 }}>
        <h1 className='ui header' style={{ marginTop: 0 }}>
          <div className='content'>
            Aula {moment(startDate).format('DD/MM')}: {name}
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
