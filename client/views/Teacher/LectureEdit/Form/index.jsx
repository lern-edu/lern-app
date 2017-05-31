// Libs
import React from 'react';
import { FontIcon, FloatingActionButton } from 'material-ui';
import { StepContent, Stepper, Step, StepButton } from 'material-ui';

// Views
import TeacherLectureEditFormTheme from './Theme/Container.jsx';
import TeacherLectureEditFormBasic from './Basic/index.jsx';
import TeacherLectureEditFormDate from './Date/index.jsx';

const TeacherLectureEditForm = React.createClass({
  mixins: [AstroForm(Lectures.Schema, 'TeacherLectureSave')],

  // Styles

  styles: {
    floatingButton: {
      className: 'ui right aligned basic segment',
      style: { position: 'fixed', bottom: '1em', right: '1em', zIndex: '1000' },
    },
  },

  /* Methods
  */

  nextStep() {
    const { index } = this.state;
    this.setState({ index: index + 1 });
  },

  prevStep() {
    const { index } = this.state;
    this.setState({ index: index - 1 });
  },

  /* Licecycle
  */

  componentDidMount() {
    const { course } = this.props;
    this.defaultHandler({ course: course._id }, { doc: true });
  },

  getInitialState() {
    return { index: 0, waitingCallback: false };
  },

  // Handlers

  handleSubmit() {
    this.setState({ waitingCallback: true });
    this.defaultSubmit();
  },

  handleSubmitError(error) {
    console.error(error);
    this.setState({ waitingCallback: false });
    snack('Problemas ao atualizar aula');
  },

  handleSubmitSuccess({ _id: lectureId }) {
    this.setState({ waitingCallback: false });
    const { course } = this.props;
    console.log(`Lecture updated: ${lectureId}`);
    snack('Aula atualizada');
    FlowRouter.go('TeacherCourseShow', { courseId: course._id }, { active: 'lectures' });
  },

  /* Render
  */

  render() {
    const { index, valid, waitingCallback } = this.state;

    const done = {
      basic: !_.some(['info'],
        k => _.get(this, `state.errors[${k}]`)),
      theme: !_.some(['tags', 'subjects'],
        k => _.get(this, `state.errors[${k}]`)),
      date: !_.some(['endDate', 'startDate'],
        k => _.get(this, `state.errors[${k}]`)),
    };

    return (
      <div className='ui basic segment'>

        <Stepper linear={false} activeStep={index} orientation='vertical' >

          <Step completed={done.basic}>
            <StepButton onClick={() => this.setState({ index: 0 })}>
              Informações
            </StepButton>
            <StepContent>
              <TeacherLectureEditFormBasic
                errors={this.state.errors}
                done={done.basic}
                {...this.props}
                form={this}
                key='basic' />
            </StepContent>
          </Step>

          <Step completed={done.theme}>
            <StepButton onClick={() => this.setState({ index: 1 })}>
              Temas
            </StepButton>
            <StepContent>
              <TeacherLectureEditFormTheme
                errors={this.state.errors}
                done={done.theme}
                {...this.props}
                form={this}
                key='theme' />
            </StepContent>
          </Step>

          <Step completed={done.application}>
            <StepButton onClick={() => this.setState({ index: 2 })}>
              Data
            </StepButton>
            <StepContent>
              <TeacherLectureEditFormDate
                errors={this.state.errors}
                done={done.date}
                key='date'
                {...this.props}
                form={this} />
            </StepContent>
          </Step>

        </Stepper>

        <div {...this.styles.floatingButton} >
          <FloatingActionButton
            disabled={!valid || waitingCallback}
            onTouchTap={this.handleSubmit}
            children={<FontIcon className='material-icons' >check</FontIcon>} />
        </div>

      </div>
    );
  },
});

export default TeacherLectureEditForm;
