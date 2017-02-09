// Libs
import React from 'react';
import { Card, CardTitle, LinearProgress, CardText } from 'material-ui';

// Views
import SchoolCourseForm from './Form/Container.jsx';

const SchoolCourseView = React.createClass({

  // Handlers

  handleCopyToClipboard() {
    const { course } = this.props;
    const textField = document.createElement('textarea');
    textField.innerText = window.location.origin +
      FlowRouter.path('PublicLogin', {}, { alias: _.get(course, 'alias') });
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    snack('Link copiado!');
  },

  /* Render
  */

  render() {
    const { ready, course } = this.props;

    return (
      <div className='ui container'>
        {!ready.course ? <LinearProgress/> : [
          <Layout.Bar
            key='bar'
            title={_.get(course, 'name')}
            crumbs={[{ label: 'Cursos', path: 'SchoolCourses' }]} />,
          <Card key='access'>
            <CardTitle title={<p>Código de acesso: <b>{_.get(course, 'alias')}</b></p>} />
            <CardText>
              <p>Divulgue esse código com os alunos deste curso seja por este código,
                por meio do <b>link de acesso:</b></p>
              <p><a
                style={{ cursor: 'pointer' }}
                onClick={this.handleCopyToClipboard}>
                {window.location.origin}
                {FlowRouter.path('PublicLogin', {}, { alias: _.get(course, 'alias') })}
              </a></p>
            </CardText>
          </Card>,
          <SchoolCourseForm
            key='form'
            doc={course}
            {..._.omit(this.props, course)} />,
        ]}
      </div>
    );
  },
});

export default SchoolCourseView;
