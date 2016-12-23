import React from 'react';

TeacherQuestionsGallery = React.createClass({
  render() {
    const { ready, questions } = this.props;

    return (
      <Semantic.Transitions className='ui four cards'>

        {!ready.questions ? (
          <div className='ui inline active loader' />
        ) : _.map(questions, q =>
          <TeacherQuestionsGalleryCard
            question={q}
            key={q._id}
            {...this.props}
          />
        )}

      </Semantic.Transitions>
    );
  },
});
