import React from 'react';

const StudentCourseShowReportsTable = React.createClass({

  /* Methods
  */

  getMeanGrade({ tagId, subjectId }) {
    const { user, answers, questions } = this.props;
    const userId = user._id;

    let filtered = questions;
    if (tagId) filtered = _.filter(filtered, a => _.includes(a.tags, tagId));
    if (subjectId) filtered = _.filter(filtered, { subject: subjectId });

    const userAnswers = _.filter(answers, { author: userId });

    const filteredQuestionsIds = _.map(filtered, '_id');
    const userFilteredAnswers = _.filter(userAnswers, ua =>
      _.includes(filteredQuestionsIds, ua.question));

    const gradedUserTagAnswers = _.reject(userFilteredAnswers, { grade: null });
    const avgGrade = _.mean(_.map(gradedUserTagAnswers, 'grade'));

    return { mean: avgGrade,
      questions: _.get(gradedUserTagAnswers, 'length'),
      answers: _.get(filteredQuestionsIds, 'length'), };
  },

  /* Render
  */

  render() {
    const { user, tests, attempts } = this.props;

    return (
      <table className='ui blue table'>
        <thead>
          <tr className='center aligned'>
            <th className='left aligned eight wide'>Atividade</th>
            <th className='four wide'>Nota</th>
            <th className='four wide'>%</th>
          </tr>
        </thead>
        <tbody>
          {_.map(tests, test => {
            const attempt = _.find(attempts, { test: test._id, author: user._id });
            const totalScore = _.sum(test.scores);
            return (
              <tr key={test._id} className='center aligned'>
                <td className='left aligned'>{test.name}</td>
                {
                  !attempt ? (
                    <td colSpan='2'>
                      <i className='minus icon' />
                    </td>
                  ) : _.isFinite(attempt.grade) ? [
                    <td key='score'>
                      {`${numeral(attempt.grade * totalScore).format('0.[00]')} em ${totalScore}`}
                    </td>,
                    <td key='grade'>
                      {numeral(attempt.grade).format('0.[0]%')}
                    </td>,
                  ] : (
                    <td colSpan='2'>
                      <i className='wait icon' />
                    </td>
                  )
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
});

export default StudentCourseShowReportsTable;
