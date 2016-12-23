import React from 'react';
import { List, ListItem, Avatar } from 'material-ui';
import { darkBlack } from 'material-ui/styles/colors';

AdminQuestionEditQuestions = React.createClass({

  // styles

  styles: {
    subItems: { className: 'ui vertical basic segment' },
    text: { style: { color: darkBlack } },
  },

  // initial state

  getInitialState() { return { open: false, question: null }; },

  // handlers

  handleQuestionDialog({ currentTarget }) {
    this.setState({ open: !this.state.open, question: currentTarget.getAttribute('data-value') });
  },

  // render

  render() {
    const { styles, props: { questions, images, parent, restore }, state: { open, question } } = this;
    return (
      <div>
        <List>
          {_.map(questions, ({ _id, text, type, image }) =>
            <ListItem
              data-value={_id}
              key={_id}
              secondaryText={
                <p><span {...styles.text}>{QuestionTypes.getName(type)}</span> -- {text}</p>}
              secondaryTextLines={2}
              leftAvatar={!image ? undefined :
                <Avatar src={_.find(images, { _id: image }).url()} />}
              onTouchTap={this.handleQuestionDialog} />
          )}
        </List>
        <AdminQuestionEditQuestionsForm
          doc={_.find(questions, { _id: question })} open={open} parent={this} {...this.props}/>
      </div>
    );
  },

});
