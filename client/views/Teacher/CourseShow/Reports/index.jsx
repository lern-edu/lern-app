import React from 'react';
import TeacherCourseShowReportsInput from './Input.jsx';
import TeacherCourseShowReportsTable from './Table.jsx';

export default class TeacherCourseShowReports extends React.Component{
  /* Lifecycle
  */

  constructor(props) {
    super(props);
    return { activeTags: [] };
  }

  /* Handlers
  */

  handleNewTag(tagId) {
    const { activeTags } = this.state;
    _.pull(activeTags, tagId);
    activeTags.push(tagId);
    this.setState({ activeTags });
  }

  handleClearTags(event) {
    event.preventDefault();
    this.setState({ activeTags: [] });
  }

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
  }
};
