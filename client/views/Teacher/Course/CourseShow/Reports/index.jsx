import React from 'react';

TeacherCourseShowReports = React.createClass({
  mixins: [Semantic.Transition('scale')],

  /* Lifecycle
  */

  getInitialState() {
    return { activeTags: [] };
  },

  /* Handlers
  */

  handleNewTag(tagId) {
    const { activeTags } = this.state;
    _.pull(activeTags, tagId);
    activeTags.push(tagId);
    this.setState({ activeTags });
  },

  handleClearTags(event) {
    event.preventDefault();
    this.setState({ activeTags: [] });
  },

  /* Render
  */

  render() {
    const { activeTags } = this.state;

    return (
      <div className='ui basic segment' ref='animate'>
        <TeacherCourseShowReportsInput {...this.props} onSelect={this.handleNewTag} />
        <TeacherCourseShowReportsTable {...this.props} activeTags={activeTags} onClear={this.handleClearTags} />
      </div>
    );
  },
});
