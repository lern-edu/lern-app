import React from 'react';
import { FlatButton, Paper } from 'material-ui';

const StudentCourseShowHomeTags = React.createClass({
  render() {
    const { tags } = this.props;
    return (
      <Paper className='ui basic segment'>
        {_.map(tags, tag =>
          <FlatButton
            key={tag._id}
            label={tag.text}
            secondary={true}

            href={FlowRouter.path('StudentTag', { tagId: tag._id })}
          />
        )}
      </Paper>
    );
  },
});

export default StudentCourseShowHomeTags;
