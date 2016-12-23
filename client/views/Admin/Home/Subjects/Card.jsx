import React from 'react';

AdminHomeSubjectsCard = React.createClass({
  mixins: [Semantic.Transition('scale')],

  /* Lifecycle
  */

  getInitialState() {
    return { newTag: '' };
  },

  /* Handlers
  */

  handleInput(newTag) {
    this.setState({ newTag });
  },

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
  },

  /* Render
  */

  render() {
    const { subject, tags } = this.props;
    const { newTag } = this.state;

    return (
      <div className='ui card' ref='animate'>
        <div className='content'>
          <div className='header'>{subject.name}</div>
          <div className='description'>
            <div className='ui bulleted list'>
              {_.map(_.filter(tags, { subject: subject._id }), tag =>
                <div className='item' key={tag._id}>
                  {tag.text}
                </div>
              )}
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
              onInput={this.handleInput}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </div>
      </div>
    );
  },
});
