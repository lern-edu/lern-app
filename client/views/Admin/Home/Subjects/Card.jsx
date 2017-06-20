import React from 'react';

export default class AdminHomeSubjectsCard extends React.Component {

  /* Lifecycle
  */

  constructor(props) {
    super(props);
    this.state = { newTag: '' };
  }

  /* Handlers
  */

  handleInput(newTag) {
    this.setState({ newTag });
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      const { newTag } = this.state;
      const { subject } = this.props;
      if (newTag) Meteor.call('AdminTagCreate', newTag, subject._id, err => {
        if (err) console.log(err);
        else this.setState({ newTag: '' });
      });
    }
  }

  /* Render
  */

  render() {
    const { subject, tags } = this.props;
    const { newTag } = this.state;

    return (
      <div className='ui card'>
        <div className='content'>
          <div className='header'>{subject.name}</div>
          <div className='description'>
            <div className='ui bulleted list'>
              {
                _.map(_.filter(tags, { subject: subject._id }), tag =>
                  <div className='item' key={tag._id}>
                    {tag.text}
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className='extra content'>
          <div className='ui large transparent left icon input'>
            <i className='add icon' />
            <Semantic.Input
              type='text'
              placeholder='Nova Tag'
              value={newTag}
              onInput={this.handleInput.bind(this)}
              onKeyDown={this.handleKeyDown.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
};
