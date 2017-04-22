import React from 'react';
import { FlatButton, Paper } from 'material-ui';

const TeacherTestShowByTagsViewTags = React.createClass({

  // Lifecycle

  getInitialState() {
    return { tag: null, open: false };
  },

  handleClose() {
    this.setState({ tag: null, open: false });
  },

  // Render

  render() {
    const { tags } = this.props;
    return (
      <Paper className='ui basic segment'>
        {
          _.map(tags, tag =>
            <FlatButton
              key={tag._id}
              label={tag.text}
              secondary={true}
              onTouchTap={() => this.setState({ tag, open: true })}
            />
          )
        }
        <PublicMiscTagShow handleClose={this.handleClose} {...this.state} />
      </Paper>
    );
  },
});

export default TeacherTestShowByTagsViewTags;
