import React from 'react';
import { List, ListItem, Card, CardHeader, CardText, Divider, FontIcon } from 'material-ui';

TeacherTestCreateFormQuestionsStatus = React.createClass({

  // Initial state

  getInitialState() {
    return { status: [] };
  },

  // Lifecycle

  componentWillReceiveProps({ form: { doc: { questions }={} }, questions: questionsObj }) {
    const { state: { status }, props: { form: { doc: { questions: qOld }={} } } } = this;
    const newQuestion = _.head(_.difference(questions, _.map(status, '_id')));
    if (newQuestion) {
      status.push(_.find(questionsObj, { _id: newQuestion }));
      this.setState({ status });
    };
  },

  // Handlers

  handleQuestionRemove({ currentTarget }) {
    const { props: { form, form: { doc: { questions, scores } } }, state: { status } } = this;
    const pulled = currentTarget.getAttribute('data-key');
    const index = _.findIndex(status, ['_id', pulled]);
    _.pull(questions, pulled);
    _.pullAt(status, [index]);
    if (scores)
      _.pullAt(scores, [index]);
    form.defaultHandler({ questions }, { doc: true });
    this.setState({ status });
  },

  // render

  render() {
    const { props :{ subjects, tags, form: { doc: { scores } } }, state: { status } } = this;

    return (
      <Card>
        <CardHeader
          title='Número de questões'
          subtitle={_.isEmpty(scores) ? undefined : `Valor total: ${_.sum(scores)}`} />
          <CardText>

            <List>
              {_.map(status, ({ _id, text }, i) => [
                <ListItem
                  key={_id}
                  primaryText={`Questão ${i + 1}`}
                  initiallyOpen={false}
                  leftIcon={<FontIcon
                    data-key={_id}
                    onTouchTap={this.handleQuestionRemove}
                    className='material-icons'>
                    delete</FontIcon>}
                  nestedItems={[
                    <ListItem
                      key='text'
                      primaryText='Texto'
                      secondaryText={text}
                      disabled={true}
                      secondaryTextLines={2}
                    />, <ListItem
                      key='score'
                      primaryText={`Valor ${_.get(scores, i) || 0}`}
                      disabled={true}
                    />,
                  ]} />, <Divider />,
              ])}
            </List>

        </CardText>
      </Card>
    );
  },

});
