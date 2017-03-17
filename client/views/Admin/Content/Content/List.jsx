import React from 'react';
import { LinearProgress, List, ListItem, Badge, FontIcon, Paper } from 'material-ui';

const AdminContentList = React.createClass({

  // Initialize

  componentDidMount() {
    Meteor.call('AdminTagsCount', (err, tagsCount) => {
      if (tagsCount) this.setState({ tagsCount });
    });

    Meteor.call('AdminSubjectsCount', (err, subjectsCount) => {
      if (subjectsCount) this.setState({ subjectsCount });
    });
  },

  getInitialState() {
    return { tagsCount: [], subjectsCount: [] };
  },

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
    const { tags, subjects } = this.props;
    const { tagsCount, subjectsCount } = this.state;

    const groupedTags = _.groupBy(tags, 'subject');

    return (_.isEmpty(tagsCount) || _.isEmpty(subjectsCount) ? <LinearProgress/> :
      <Paper>
        <List>
          {_.map(groupedTags, (value, subjectId) => {
            const subject = _.first(_.filter(
              subjects, s => s._id === subjectId));
            const subjectCount = _.first(_.filter(
              subjectsCount, sc => sc._id === subjectId));
            return (
              <ListItem
                data-value={subject._id}
                key={subject._id}
                primaryText={subject.name}
                leftIcon={
                  <Badge
                    badgeContent={subjectCount ? subjectCount.count : 0}
                    badgeStyle={{ fontSize: 16 }} >
                </Badge>}
                initiallyOpen={false}
                primaryTogglesNestedList={false}
                onTouchTap={this.handleSubject}
                nestedItems={_.map(value, tag => {
                  const tagCount = _.first(_.filter(
                    tagsCount, tc => tc._id === tag._id));
                  return (<ListItem
                    key={tag._id}
                    primaryText={tag.text}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    leftIcon={
                      <Badge
                        badgeContent={tagCount ? tagCount.count : 0}
                        badgeStyle={{ fontSize: 16 }} >
                    </Badge>}
                    nestedItems={[
                      <ListItem
                        data-value={tag._id}
                        key='add'
                        primaryText='Adicionar questões'
                        onTouchTap={this.handleListItem}
                        leftIcon={
                          <FontIcon
                            className='material-icons'>
                          library_add</FontIcon>
                        }
                      />,
                      <ListItem
                        data-value={tag._id}
                        key='edit'
                        primaryText='Editar tag'
                        onTouchTap={this.handleTagEdit}
                        leftIcon={
                          <FontIcon
                            className='material-icons'>
                          edit</FontIcon>
                        }
                      />,
                    ]}
                  />);
                })}
              />
            );
          })}
        </List>
      </Paper>
    );
  },
});

export default AdminContentList;
