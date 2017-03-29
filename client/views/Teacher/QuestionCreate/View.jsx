import React from 'react';

import TeacherQuestionCreateForm from './Form/index.jsx';

const TeacherQuestionCreateView = React.createClass({
  render() {

    return (
      <div className='ui container'>
        <Layout.Bar
          title='Criar questão'
          crumbs={[
            { label: 'Minhas questões', path: 'TeacherQuestions' },
          ]} />
        <TeacherQuestionCreateForm {...this.data} restore={this.props.query} />
      </div>
    );
  },
});
export default TeacherQuestionCreateView;
