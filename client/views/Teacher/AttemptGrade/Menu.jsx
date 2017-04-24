// Libs
import React from 'react';
import { StepContent, Stepper, Step, StepButton } from 'material-ui';

import TeacherAttemptGradeMenuQuestion from './Question/index.jsx';

const TeacherAttemptGradeMenu = React.createClass({

  /* Lifecycle
  */

  getInitialState() {
    return { index: null };
  },

  // Handlers

  handleItemClick({ questionId }) {
    const { question } = this.props;
    if (questionId === 'back') FlowRouter.setParams({ questionId: null });
    else if (question && question._id === questionId)
      FlowRouter.setParams({ questionId: null });
    else FlowRouter.setParams({ questionId });
  },

  handleGo(newIndex) {
    const { index } = this.state;
    this.setState({ index: newIndex === index ? null : newIndex });
  },

  /* Render
  */

  render() {
    const { test, questions, answers } = this.props;
    const { index } = this.state;

    return (
      <div className='ui basic segment'>

        <Stepper linear={false} activeStep={index} orientation='vertical' >

          {
            _.map(test.questions, (q, i) =>

              <Step key={q}>
                <StepButton onClick={() => this.handleGo(i)}>
                  Questao {i + 1}
                </StepButton>
                <StepContent>
                  <TeacherAttemptGradeMenuQuestion
                    test={test}
                    answer={_.find(answers, { question: q })}
                    question={_.find(questions, { _id: q })}
                  />
                </StepContent>
              </Step>

            )
          }

        </Stepper>

      </div>
    );
  },
});

export default TeacherAttemptGradeMenu;
