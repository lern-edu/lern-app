import React from 'react';
import { List, ListItem, Paper } from 'material-ui';

const AdminSubjectsList = React.createClass({

  // Initialize

  // componentDidMount() {
  //   Meteor.call('AdminTagsCount', (err, tagsCount) => {
  //     if (tagsCount) this.setState({ tagsCount });
  //   });
  //
  //   Meteor.call('AdminSubjectsCount', (err, subjectsCount) => {
  //     if (subjectsCount) this.setState({ subjectsCount });
  //   });
  // },
  //
  // getInitialState() {
  //   return { tagsCount: [], subjectsCount: [] };
  // },

  // handlers

  handleListItem(event) {
    const { tags } = this.props;
    const tagIds = [event.currentTarget.getAttribute('data-value')];
    const subject = _.get(_.first(_.filter(
      tags, t => t._id === _.first(tagIds))), 'subject');
    FlowRouter.go('AdminQuestionCreate', {}, { tags: tagIds, subject });
  },

  handleTagEdit({ currentTarget }) {
    const { tags } = this.props;
    const tagId = currentTarget.getAttribute('data-value');
    const subjectId = _.get(_.first(_.filter(tags, t => t._id === tagId)), 'subject');
    FlowRouter.go('AdminTagEdit', { tagId, subjectId });
  },

  handleSubject({ currentTarget }) {
    FlowRouter.go('AdminQuestionEdit', {},
      { subject: currentTarget.getAttribute('data-value') });
  },

  // render

  render() {
    const { subjects } = this.props;

    return (
      <Paper>
        <List>
          {
            _.map(subjects, ({ _id, name }) =>
              <ListItem
                key={_id}
                primaryText={name}
                href={FlowRouter.path('AdminSubject', { subjectId: _id })}
              />
            )
          }
        </List>
      </Paper>
    );
  },
});

export default AdminSubjectsList;
