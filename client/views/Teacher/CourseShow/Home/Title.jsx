import React from 'react';
import { FlatButton, RaisedButton, Avatar, Chip } from 'material-ui';

const TeacherCourseShowHomeTitle = React.createClass({

  render() {
    const { course, subjects, teachers, tags, students } = this.props;

    return (
      <div className='ui basic segment' style={{ marginBottom: 0 }}>

        <h1 className='ui header' style={{ marginTop: 0 }}>

          <div>
            {_.get(course, 'name')}
            <div className='sub header'>
              {
                `Matéria${
                  subjects.length === 1 ? '' : 's'
                }: ${
                  _.join(_.map(subjects, 'name'), ', ')
                }`
              }
            </div>

            <div className='sub header' style={{ display: 'flex', flexWrap: 'wrap' }} >
              <span style={{ marginTop: 11 }} >
                {`Professor${teachers.length === 1 ? '' : 'es'}: `}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                  _.map(teachers, ({ profile: { profilePic, name }, _id }) =>
                    <Chip key={_id} style={{ margin: 5 }} >
                      {
                        profilePic
                        ? <Avatar src={profilePic} />
                        : <Avatar size={32}>{_.first(name)}</Avatar>
                      }
                      {name}
                    </Chip>
                  )
                }
              </div>
            </div>

            <div className='sub header' style={{ display: 'flex', flexWrap: 'wrap' }} >
              <span style={{ marginTop: 11 }} >
                {`Aluno${students.length === 1 ? '' : 's'}: `}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                  _.map(students, ({ profile: { profilePic, name }, _id }) =>
                    <Chip key={_id} style={{ margin: 5 }} >
                      {
                        profilePic
                        ? <Avatar src={profilePic} />
                        : <Avatar size={32}>{_.first(name)}</Avatar>
                      }
                      {name}
                    </Chip>
                  )
                }
              </div>
            </div>

          </div>
        </h1>

      </div>
    );
  },
});

export default TeacherCourseShowHomeTitle;
