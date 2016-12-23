import React from 'react';

StudentReportsContent = React.createClass({
  /* Methods
  */

  getMeanGrade({ subjectId, tagId }) {
    const { questions, answers } = this.props;

    const truth = _.filter(answers, ans => {
      const question = _.find(questions, { _id: ans.question });
      const hasTag = !(ref = _.get(question, 'tags')) || _.includes(ref, tagId);
      const hasSubject = !(ref = _.get(question, 'subject')) || ref === subjectId;
      return hasTag || hasSubject;
    });

    const grades = _.map(truth, 'grade');
    return _.mean(grades);
  },

  /* Handlers
  */

  handleOpen(node) {
    const $node = $(node);
    if (!$node.hasClass('tag')) return;
    const tagId = $node.attr('data-key');

    const { answers, questions } = this.props;

    const truth = _.sortBy(_.filter(answers, ans => {
      const question = _.find(questions, { _id: ans.question });
      return _.includes(question.tags, tagId);
    }), 'finishedAt');

    var data = {
      labels: _.concat([], 'Antes', _.map(_.range(truth.length - 2), _.constant('')), 'Agora'),
      series: [
        _.reduce(truth, (mem, ans) => {
          const oldAcc = _.last(mem) * _.get(mem, 'length') || 0;
          const newAcc = oldAcc + ans.grade * 100;
          console.log({ new: newAcc / (_.get(mem, 'length') || 0 + 1) });
          mem.push(newAcc / (_.get(mem, 'length') || 0 + 1));
          return mem;
        }, []),
      ],
    };

    const opts = {
      fullWidth: true,
      chartPadding: { right: 40 },
      axisX: { showGrid: false },
    };
    new Chartist.Line(node, data, opts);
  },

  /* Render
  */

  render() {
    const { subjects, tags } = this.props;

    const { handleOpen } = this;
    const _handleOpen = () => handleOpen(this);

    return (
      <div className='ui grid'>

        <div className='row'>
          <div className='twelve wide column'>Matéria</div>
          <div className='four wide center aligned column'>Aproveitamento</div>
        </div>

        <div className='row'>
          <div className='sixteen wide column'>

            <Semantic.Accordion onOpen={_handleOpen}>

              {_.map(subjects, subject => [

                <StudentReportsTitle
                  value={this.getMeanGrade({ subjectId: subject._id })}
                  key={`title-${subject._id}`}
                  title={subject.name}
                  color='blue'
                  size='medium'
                />,

                <div className='subject content' key={`content-${subject._id}`}>
                  <div className='ui accordion'>

                    {_.map(_.filter(tags, { subject: subject._id }), tag => [
                      <StudentReportsTitle
                        value={this.getMeanGrade({ tagId: tag._id })}
                        key={`title-${tag._id}`}
                        title={tag.text}
                        color='yellow'
                        size='small'
                      />,

                      <div
                        data-key={tag._id}
                        className='tag content'
                        key={`content-${tag._id}`}
                      />,
                    ])}

                  </div>
                </div>,

              ])}

            </Semantic.Accordion>

          </div>
        </div>

      </div>
    );
  },
});
