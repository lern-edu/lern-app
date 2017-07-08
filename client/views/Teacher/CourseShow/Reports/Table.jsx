import React from 'react';

export default class TeacherCourseShowReportsTable extends React.Component{
  /* Methods
  */

  getMeanGrade({ userId, tagId }) {
    const { answers, questions } = this.props;

    const tagQuestions = _.filter(questions, question => !tagId || _.includes(question.tags, tagId));
    const userAnswers = _.filter(answers, { author: userId });

    const tagQuestionsIds = _.map(tagQuestions, '_id');
    const userTagAnswers = _.filter(userAnswers, ua => _.includes(tagQuestionsIds, ua.question));

    const gradedUserTagAnswers = _.reject(userTagAnswers, { grade: null });
    const avgGrade = _.mean(_.map(gradedUserTagAnswers, 'grade'));

    return { mean: avgGrade, count: gradedUserTagAnswers.length };
  }

  /* Render
  */

  render() {
    const { students, tags, questions, activeTags, onClear } = this.props;

    const tagDocs = _.map(activeTags, t => _.find(tags, { _id: t }));

    return (
      <table className='ui very basic table'>
        <thead>
          <tr>
            <td colSpan='2' className='center aligned'>
              {_.isEmpty(activeTags)
                ? <div className='ui basic label'>Selecione temas para comparação de desempenho</div>
                : <a className='ui basic red label' href='#' onClick={onClear}>Limpar</a>}
            </td>
            {_.map(tagDocs, tag =>
              <td key={tag._id}>
                <div className='ui mini statistic'>
                  <div className='value'>{_.filter(questions, q => _.includes(q.tags, tag._id)).length}</div>
                  <div className='label'>Questões</div>
                </div>
              </td>
            )}
          </tr>
          <tr>
            <th>Alunos</th>
            <th>Desempenho Geral</th>
            {_.map(tagDocs, tag =>
              <th className='six wide' className='' key={tag._id}>
                {tag.text}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {_.map(students, student =>
            <tr key={student._id}>
              <td>{student.getName()}</td>
              <td>{(ref = this.getMeanGrade({ userId: student._id })) && (
                <span>
                  {
                    _.isNaN(ref.mean) ? <i className='minus icon' />
                    : `${numeral(ref.mean).format('0%')} (${ref.count})`
                  }
                </span>
              )}</td>
              {_.map(tagDocs, tag =>
                <td key={tag._id}>
                  {(ref = this.getMeanGrade({ userId: student._id, tagId: tag._id })) && (
                    <span>
                      {
                        _.isNaN(ref.mean) ? <i className='minus icon' />
                        : `${numeral(ref.mean).format('0%')} (${ref.count})`
                      }
                    </span>
                  )}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }
};
