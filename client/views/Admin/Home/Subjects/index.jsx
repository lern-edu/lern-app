// Libs
import React from 'react';

// Views
import AdminHomeSubjectsCard from './Card.jsx';

export default class AdminHomeSubjects extends React.Component {

  /* Lifecycle
  */

  constructor(props) {
    super(props);
    this.state = { newSubject: '' };
  }

  /* Handlers
  */

  handleInput(newSubject) {
    this.setState({ newSubject });
  }

  handleKeyDown(event) {
    const { newSubject } = this.state;
    if (event.keyCode === 13) {
      event.preventDefault();
      if (newSubject) Meteor.call('AdminSubjectCreate', newSubject, err => {
        if (err) console.log(err);
        else this.setState({ newSubject: '' });
      });
    }
  }

  /* Render
  */

  render() {
    const { newSubject } = this.state;
    const { ready, subjects } = this.props;

    return (
      <div className='ui basic segment'>

        <div className='ui basic vertical segment'>
          <div className='ui large left icon input'>
            <i className='add icon' />
            <Semantic.Input
              type='text'
              placeholder='Nova Matéria'
              value={newSubject}
              onInput={this.handleInput.bind(this)}
              onKeyDown={this.handleKeyDown.bind(this)}
            />
          </div>
        </div>

        <div className='ui basic vertical segment'>
          <div className='ui four cards cards'>
            {
              !ready.subjects || !ready.tags
              ? <div className='ui active inline loader' />
              : _.map(_.sortBy(subjects, 'createdAt'), subject =>
                <AdminHomeSubjectsCard subject={subject} {...this.props} key={subject._id} />
              )
            }
          </div>
        </div>
      </div>
    );
  }
};
