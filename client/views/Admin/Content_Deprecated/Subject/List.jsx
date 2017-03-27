import React from 'react';
import { List, ListItem, Divider } from 'material-ui';

AdminSubjectList = React.createClass({

  render() {
    const { tags, subject: { _id: subjectId } } = this.props;

    const groupTags = _.groupBy(tags, 'parent');

    const showTags = (tags, inset) => _.isEmpty(tags) ? [] :
      _.map(tags, tag => [<ListItem key={_.get(tag, '_id')}
        onTouchTap={() => FlowRouter.go('AdminTagEdit', { tagId: _.get(tag, '_id'), subjectId })}
        nestedItems={showTags(groupTags[tag._id], true)}>
       {_.get(tag, 'text')}
       </ListItem>, _.isEmpty(groupTags[tag._id]) ? undefined : <Divider inset={inset}/>,
     ]);

    return _.isEmpty(tags) ? null :
      <List>
       {showTags(groupTags[null], false)}
      </List>;
  },
});
