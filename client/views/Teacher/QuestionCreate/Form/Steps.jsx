import React from 'react';

TeacherQuestionCreateFormSteps = React.createClass({
  classes: 'four',
  items: [
    {
      icon: 'info',
      title: 'Informações',
    },
    {
      icon: 'edit',
      title: 'Enunciado',
    },
    {
      icon: 'browser',
      title: 'Resposta',
    },
    {
      icon: 'smile',
      title: 'Pronto',
    },
  ],

  /* Render
  */

  render() {
    const { items, classes } = this;
    const { index } = this.props;

    return (
      <div className={`ui ${classes} steps`}>

        {_.map(items, (v, i) =>
          <div className={`step ${index === i ? 'active' : index > i ? 'completed' : ''}`} key={i}>
            <i className={`${v.icon} icon`} />
            <div className='content'>
              <div className='title'>{v.title}</div>
            </div>
          </div>
        )}

      </div>
    );
  },
});
