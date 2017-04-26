import React from 'react';
import { List, ListItem, FontIcon, Styles } from 'material-ui';
import { darkBlack } from 'material-ui/styles/colors';

TeacherPostsList = React.createClass({
  // Handlers

  handleGo({ currentTarget }) {
    FlowRouter.go('TeacherPost', { postId: currentTarget.getAttribute('data-key') });
  },

  // Render

  render() {
    const { posts, subjects } = this.props;

    return !posts.length ? null : (
      <List>
       {_.map(posts, ({ _id, type, text, subjects: ps, tags, title }) =>
         <ListItem
          key={_id}
          data-key={_id}
          onTouchTap={this.handleGo}
          leftAvatar={<FontIcon className='material-icons'>{
              _.isEqual(type, 'info') ? 'info' : (
                _.isEqual(type, 'ask') ? 'help' : 'rate_review'
              )}</FontIcon>}
          primaryText={title}
          secondaryText={<p>
            <span style={{ color: darkBlack }}>{PostTypes.getName(type)}
            </span> -- {text}
          </p>}
          secondaryTextLines={2}
        />
       )}
      </List>
    );
  },
});

// _.map(_.filter(subjects, s => _.includes(ps, s._id)), 'name').join(' - ')
