import React from 'react';

TeacherQuestionsGalleryCard = React.createClass({
  mixins: [Semantic.Transition('scale')],

  /* Render
  */

  render() {
    const { question, subjects, color='' } = this.props;

    const hitRateLabel = (
        !_.isFinite(question.hitRate) ? 'Pendente'
      : question.hitRate <= 0.15 ? 'Dificílima'
      : question.hitRate <= 0.35 ? 'Difícil'
      : question.hitRate <= 0.65 ? 'Média'
      : question.hitRate <= 0.85 ? 'Fácil'
      : question.hitRate <= 1.00 ? 'Facílima'
      : ':('
    );

    return (
      <div className={`ui card ${color}`} key={question._id} ref='animate'>
        <div className='content'>

          <div className='description'>{question.text}</div>

          <div className='ui divider' />

          {question.type === 'open' ? (
            <p>{question.answer}</p>
          ) : question.type === 'closed' ? (
            <div className='ui list'>
              {_.map(question.options, (opt, i) =>
                <div className='item' key={i}>
                  {question.answer === i ? <i className='checkmark icon' /> : undefined}
                  <div className='content'>{opt.text}</div>
                </div>
              )}
            </div>
          ) : undefined}

        </div>

        <div className='extra content'>
          <div className='meta'>
            <span>{_.get(_.find(subjects, { _id: question.subject }), 'name')}</span>
            <span className='right floated'>{moment(question.createdAt).fromNow()}</span>
          </div>
        </div>

        <div className='centered extra content'>
          <span>{`Dificuldade: ${hitRateLabel}`}</span>
        </div>

      </div>
    );
  },
});
