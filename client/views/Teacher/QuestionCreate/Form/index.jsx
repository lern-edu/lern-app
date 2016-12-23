import React from 'react';

TeacherQuestionCreateForm = React.createClass({
  mixins: [AstroForm(Questions.Schema, 'TeacherQuestionSave')],

  /* Lifecycle
  */

  getInitialState() {
    return {
      index: -1,
    };
  },

  componentDidMount() {
    const index = this.getNextIndex();
    this.setState({ index });
  },

  /* Methods
  */

  getNextIndex() {
    const { errors } = this.state;

    const fields = [
      ['type', 'subject', 'tags'],
      ['text', 'image', 'video'],
      ['options', 'answer'],
    ];

    const states = _.map(fields, fs => _.some(fs, f => errors[f]));
    return !_.some(states) ? fields.length : _.indexOf(states, true);
  },

  /* Handlers
  */

  handleNextClick() {
    const index = this.getNextIndex();
    this.setState({ index });
  },

  handleSubmitSuccess({ _id }) {
    console.log(`Question created: ${_id}`);
    snack('Questão criada');
    FlowRouter.go('TeacherQuestions');
  },

  /* Render
  */

  render() {
    const { errors, index } = this.state;

    return (
      <div className='ui form'>

        <TeacherQuestionCreateFormSteps index={index}/>

        <React.addons.TransitionGroup>
          {[
            <TeacherQuestionCreateFormMeta {...this.props} {...this.state} form={this} />,
            <TeacherQuestionCreateFormText {...this.props} {...this.state} form={this} />,
            <TeacherQuestionCreateFormAnswer {...this.props} {...this.state} form={this} />,
            <TeacherQuestionCreateFormDone {...this.props} {...this.state} form={this} />,
          ][index]}
        </React.addons.TransitionGroup>

        {/*<div>{_.values(errors)}</div>*/}

      </div>
    );
  },
});

// (type)(subject/tags)
// (text/image/video)
// (options/answer)
