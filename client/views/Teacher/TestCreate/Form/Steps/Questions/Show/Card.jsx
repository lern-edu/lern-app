import React from 'react';
import { Card, CardActions, CardHeader, RaisedButton, CardText, CardMedia, } from 'material-ui';

TeacherTestCreateFormQuestionsShowCard = React.createClass({

  // Handlers

  handleQuestionPush({ currentTarget }) {
    // Get question from form and questionId to insert
    const { props: { parent, form, form: { doc: { questions: qs, scores } } } } = this;
    const questions = qs || [];
    const question = currentTarget.getAttribute('value');

    // Push new question
    questions.push(question);

    // Define new questions array on form
    form.defaultHandler({ questions }, { doc: true });

    // Set state to open dialog for scores
    parent.setState({ open: !_.isNull(scores), question });
  },

  // render

  render() {
    const { props: { key, subjects, form, images, tags, ready, questions,
      form: { doc: { questions: squestions } },
      question: { _id, subject, tags: qtags, image, text, options, type, answer },
    }, } = this;

    return (
      <Card>
        <CardHeader
          title={_.get(_.find(subjects, s => _.isEqual(s._id, subject)), 'name')}
          subtitle={`${_.join(_.map(qtags, qt =>_.get(_.find(tags, { _id: qt }), 'text')), ', ')
            } -- tipo: ${QuestionTypes.getName(type)}`}
          showExpandableButton={!_.isEmpty(image)}
          actAsExpander={!_.isEmpty(image)} />
        {(image && ready.questions) ?
          <CardMedia expandable={true}>
            <img src={_.find(images, { _id: image }).url()} />
          </CardMedia> : undefined}
        <CardText expandable={!_.isEmpty(image)}>
          <div dangerouslySetInnerHTML={{ __html: text }} />
          <div className='ui basic segments'>
          {type === 'closed' ?
            _.map(options, (opt, index) =>
              <div className='ui basic horizontal segments'
                key={opt.text ? opt.text : opt.image}>
                <div>
                  {index == answer ?
                    <i className='checkmark icon'></i> : undefined}
                </div>
                <div>
                  {opt.text ?
                    <div dangerouslySetInnerHTML={{ __html: opt.text }} /> :
                    <i className='photo icon'></i>}
                </div>
              </div>
            ) : answer}
          </div>
        </CardText>
        <CardActions>
          <RaisedButton
            label='Adicionar'
            disabled={_.includes(squestions, _id)}
            primary={true}
            onTouchTap={this.handleQuestionPush}
            value={_id} />
        </CardActions>
      </Card>
    );
  },
});
