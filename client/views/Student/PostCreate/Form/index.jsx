// Libs
import React from 'react';
import { StepContent } from 'material-ui';
import { Stepper, Step, StepButton } from 'material-ui';

// Views
import StudentPostCreateFormBasic from './Basic/index.jsx';
import StudentPostCreateFormTheme from './Theme/Container.jsx';

const StudentPostCreateForm = React.createClass({
  mixins: [AstroForm(Posts.Schema, 'UserPostSave')],

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
    snack('Problemas ao criar post');
  },

  handleSubmitSuccess({ _id: postId, course }) {
    this.setState({ waitingCallback: false });
    console.log(`Post created: ${postId}`);
    snack('Post criado');
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
              <StudentPostCreateFormBasic
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
              <StudentPostCreateFormTheme
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


      </div>
    );
  },
});

export default StudentPostCreateForm;
