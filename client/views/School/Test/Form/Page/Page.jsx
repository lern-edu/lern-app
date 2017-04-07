// Libs
import React from 'react';
import { RaisedButton, TextField, MenuItem, Divider } from 'material-ui';

// View
import SchoolTestFormPageCreate from './Create.jsx';
import SchoolTestFormPageShow from './Show.jsx';

const SchoolTestFormPage = React.createClass({

  // Lifecycle

  getInitialState() {
    return { questionsSelected: this.questionsSelected() };
  },

  componentWillReceiveProps() {
    this.updateQuestionsSelected();
  },

  // Functions

  questionsSelected() {
    return _.flatten(_.map(this.props.form.doc.get('pages'), p =>
      _.compact(_.map(p.get('content'), 'question'))));
  },

  updateQuestionsSelected() {
    this.setState({ questionsSelected: this.questionsSelected() });
  },

  /* Render
  */

  render() {
    const { form, done, subjects, scored } = this.props;
    const { questionsSelected } = this.state;

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            {_.map(form.doc.get('pages'), (c, i) =>
              <div className='sixteen wide column' key={i}>
                <SchoolTestFormPageShow
                  updateQuestionsSelected={this.updateQuestionsSelected}
                  scored={scored}
                  index={i}
                  form={form}
                  doc={c} />
                  <Divider/>
              </div>)}
          </div>

          <div className='row'>
            <RaisedButton
              label='Voltar'
              secondary={true}
              style={{ marginRight: 5 }}
              onTouchTap={form.prevStep} />
            <RaisedButton
              label='Próximo'
              disabled={!done}
              primary={true}
              onTouchTap={form.defaultSubmit} />
          </div>

        </div>
      </div>
    );
  },
});

export default SchoolTestFormPage;
