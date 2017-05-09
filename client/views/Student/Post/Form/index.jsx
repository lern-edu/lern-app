// Libs
import React from 'react';
import { StepContent, FontIcon, FloatingActionButton } from 'material-ui';
import { Stepper, Step, StepButton } from 'material-ui';

// Views
import StudentPostFormBasic from './Basic/index.jsx';
import StudentPostFormTheme from './Theme/Container.jsx';

const StudentPostForm = React.createClass({
  mixins: [AstroForm(Posts.Schema, 'UserPostSave')],

  // Styles

  styles: {
    floatingButton: {
      className: 'ui right aligned basic segment',
      style: { position: 'fixed', bottom: '1em', right: '1em', zIndex: '1000' },
    },
  },

  /* Licecycle
  */

  componentDidMount() {
    const { course } = this.props;
    if (!_.isEmpty(course))
      this.defaultHandler({ course }, { query: true, doc: true });
    this.defaultHandler({ type: 'info' }, { query: true, doc: true });
  },

  getInitialState() {
    return { waitingCallback: false, index: 0 };
  },

  // Handlers

  handleSubmit() {
    this.setState({ waitingCallback: true });
    this.defaultSubmit();
  },

  handleSubmitError(error) {
    console.error(error);
    this.setState({ waitingCallback: false });
    snack('Problemas ao atualizar post');
  },

  handleSubmitSuccess({ _id: postId, course }) {
    this.setState({ waitingCallback: false });
    console.log(`Post updated: ${postId}`);
    snack('Post atualizado');
    course
    ? FlowRouter.go('StudentCourseShow', { courseId: course }, { active: 'posts' })
    : FlowRouter.go('StudentPosts');
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

  /* Render
  */

  render() {
    const { valid, waitingCallback, errors, index } = this.state;

    const done = {
      basic: !_.some(['content', 'name', 'type'], k => _.get(errors, k)),
      themes: !_.some(['subjects', 'tags'], k => _.get(errors, k)),
    };

    return (
      <div className='ui basic segment'>

        <Stepper linear={false} activeStep={index} orientation='vertical' >

          <Step completed={done.basic}>
            <StepButton onClick={() => this.setState({ index: 0 })}>
              Informações
            </StepButton>
            <StepContent>
              <StudentPostFormBasic
                errors={this.state.errors}
                index={index}
                done={done.basic}
                {...this.props}
                form={this}
                key='basic'
              />
            </StepContent>
          </Step>

          <Step completed={done.themes}>
            <StepButton onClick={() => this.setState({ index: 1 })}>
              Temas
            </StepButton>
            <StepContent>
              <StudentPostFormTheme
                errors={this.state.errors}
                index={index}
                done={done.basic}
                {...this.props}
                form={this}
                key='theme'
              />
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

export default StudentPostForm;
