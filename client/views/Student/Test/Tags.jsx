import React from 'react';
import { FlatButton } from 'material-ui';

StudentTestTags = React.createClass({
  render() {
    const { tags } = this.props;
    return (
      <div>
        {_.map(tags, tag =>
          <FlatButton
            key={tag._id}
            label={tag.text}
            secondary={true}
            
            href={FlowRouter.path('StudentTag', { tagId: tag._id })}
          />
        )}
      </div>
    );
  },
});
