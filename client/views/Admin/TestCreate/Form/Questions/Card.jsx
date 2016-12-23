import React from 'react';
import { Card, CardActions, CardHeader, RaisedButton, CardText, CardMedia, } from 'material-ui';
AdminTestCreateFormCard = React.createClass({

  // render

  render() {
    const { tags, question, subjects, form, inTest, images } = this.props;

    let image = question.image;

    if (image)
      image = _.first(
        _.filter(images, img => img._id === question.image)
      );

    return (
      <Card>
        <CardHeader
          title={_.get(_.first(
            _.filter(subjects, s => s._id === question.subject)
          ), 'name')}
          subtitle={_.join(_.map(
            _.filter(tags, t => _.includes(question.tags, t._id)),
          'text'), ', ')}
          actAsExpander={true}
          showExpandableButton={true}
        />
        {image ? (
          <CardMedia expandable={true}>
            <img src={image.url()} />
          </CardMedia>
        ) : undefined}
        <CardText expandable={true}>
          <div dangerouslySetInnerHTML={{ __html: question.text }} />
        </CardText>
        <CardText expandable={true}>
          <div className='ui basic segments'>
          {question.type === 'closed' ?
            _.map(question.options, (opt, index) =>
              <div className='ui basic horizontal segments'
                key={opt.text ? opt.text : opt.image}>
                <div class='ui segment'>
                  {index == question.answer ? <i className='checkmark icon'></i> : undefined}
                </div>
                <div class='ui segment'>
                  {opt.text ? <div dangerouslySetInnerHTML={{ __html: opt.text }} />
                    : <i className='photo icon'></i>}
                </div>
              </div>
            ) : question.answer}
          </div>
        </CardText>
        <CardActions>
          <RaisedButton
            label='Adicionar'
            disabled={inTest}
            primary={true}
            onTouchTap={form.handleQuestionPush}
            value={question._id} />
          <RaisedButton
            label='Remover'
            disabled={!inTest}
            secondary={true}
            onTouchTap={form.handleQuestionPull}
            value={question._id} />
        </CardActions>
      </Card>
    );
  },
});
