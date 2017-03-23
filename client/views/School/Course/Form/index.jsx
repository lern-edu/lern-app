// Libs
import React from 'react';
import { Stepper, Step, StepButton, StepContent } from 'material-ui';
import { FloatingActionButton, FontIcon } from 'material-ui';

// Views
import SchoolCourseFormBasic from './Basic/Basic.jsx';
import SchoolCourseFormTheme from './Theme/ThemeContainer.jsx';
import SchoolCourseFormTimeBounds from './TimeBounds/TimeBounds.jsx';
import SchoolCourseFormPeople from './People/PeopleContainer.jsx';

const SchoolCourseFormView = React.createClass({
  mixins: [AstroForm(Courses.Schema, 'SchoolCourseSave')],

  // Styles

  styles: {
    floatingButton: {
      className: 'ui right aligned basic segment',
      style: { position: 'fixed', bottom: '1em', right: '1em', zIndex: '1000' },
    },
  },

  /* Lifecycle
  */

  getInitialState() {
    return { subjects: [], index: 0, allTags: false, waitingCallback: false };
  },

  /* Handlers
  */

  handleSubmit() {
    this.setState({ waitingCallback: true });
    this.defaultSubmit();
  },

  handleSubmitSuccess({ _id }) {
    this.setState({ waitingCallback: false });
    console.log(`Course updated: ${_id}`);
    FlowRouter.go('SchoolCourses');
    snack('Curso atualizado');
  },

  /* Render
  */

  render() {
    const { state: { index, errors, valid, waitingCallback } } = this;

    const done = {
      basic: !_.some(['name', 'info'],
        k => _.get(this, `state.errors[${k}]`)),
      theme: !_.some(['tags', 'subjects'],
        k => _.get(this, `state.errors[${k}]`)),
      timeBounds: !_.some(['endDate', 'startDate'],
        k => _.get(this, `state.errors[${k}]`)),
      people: !_.some(['teachers', 'students'],
        k => _.get(this, `state.errors[${k}]`)),
    };

    return (
      <div>
        <div className='ui basic segment'>

          <Stepper linear={false} activeStep={index} orientation='vertical' >

            <Step completed={done.basic}>
              <StepButton onClick={() => this.setState({ index: 0 })}>
                Informações
              </StepButton>
              <StepContent>
                <SchoolCourseFormBasic
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
                <SchoolCourseFormTheme
                  errors={this.state.errors}
                  done={done.theme}
                  {...this.props}
                  form={this}
                  key='theme' />
              </StepContent>
            </Step>

            <Step completed={done.timeBounds}>
              <StepButton onClick={() => this.setState({ index: 2 })}>
                Duração
              </StepButton>
              <StepContent>
                <SchoolCourseFormTimeBounds
                  errors={this.state.errors}
                  done={done.timeBounds}
                  key='timeBounds'
                  {...this.props}
                  form={this} />
              </StepContent>
            </Step>

            <Step completed={done.people}>
              <StepButton onClick={() => this.setState({ index: 3 })}>
                Pessoas
              </StepButton>
              <StepContent>
                <SchoolCourseFormPeople
                  errors={this.state.errors}
                  done={done.people}
                  key='people'
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
      </div>
    );
  },
});

export default SchoolCourseFormView;
