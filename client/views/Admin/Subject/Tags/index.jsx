// Libs
import React from 'react';

// Views
import AdminSubjectsTagsToolbar from './Toolbar.jsx';
import AdminSubjectsTagsList from './List.jsx';
import AdminSubjectsTagsForm from './Form/index.jsx';

const AdminSubjectsTags = React.createClass({

  // Lifecycle

  getInitialState() {
    return { createTag: false };
  },

  /* Render
  */

  render() {
    const { subject } = this.props;
    const { createTag } = this.state;
    return (
      <div>

        <AdminSubjectsTagsToolbar {...this.props} parent={this} />

        <AdminSubjectsTagsList {...this.props} />

        <AdminSubjectsTagsForm open={createTag} parent={this} subject={subject} />

      </div>
    );
  },
});

export default AdminSubjectsTags;
