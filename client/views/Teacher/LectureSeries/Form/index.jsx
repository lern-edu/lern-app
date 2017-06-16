// Libs
import React from 'react';
import { StepContent, Stepper, Step, StepButton } from 'material-ui';

// Views
import TeacherLectureSeriesFormDate from './Date/index.jsx';
import TeacherLectureSeriesFormSchedule from './Schedule/index.jsx';

export default class TeacherLectureSeriesForm extends React.Component {

  /* Methods
  */

  nextStep() {
    const { index } = this.state;
    this.setState({ index: index + 1 });
  }

  prevStep() {
    const { index } = this.state;
    this.setState({ index: index - 1 });
  }

  /* Licecycle
  */

  constructor(props) {
    super(props);
    const { startDate, endDate } = props.course;
    this.state = { index: 0, waitingCallback: false, startDate, endDate, schedule: [] };
  }

  componentDidMount() {
    const { course } = this.props;
  }

  // Handlers

  handleSubmit() {
    this.setState({ waitingCallback: true });
    const { course } = this.props;

    Meteor.call(
      'TeacherLecturesSeriesCreate',
      { ..._.omit(this.state, ['index', 'waitingCallback']), courseId: course._id },
      (err, lectures) => {
        if (err) {
          snack('Erro ao criar aulas!');
          console.error(err);
        } else {
          snack('Aulas criadas!');
          FlowRouter.go(
            'TeacherCourseShow',
            { courseId: _.get(course, '_id') },
            { active: 'lectures' },
          );
        };
      });
  }

  /* Render
  */

  render() {
    const { index, waitingCallback } = this.state;

    return (
      <div className='ui basic segment'>

        <Stepper linear={false} activeStep={index} orientation='vertical' >

          <Step>
            <StepButton onClick={() => this.setState({ index: 0 })}>
              Data
            </StepButton>
            <StepContent>
              <TeacherLectureSeriesFormDate
                key='date'
                {...this.props}
                parent={this}
              />
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => this.setState({ index: 1 })}>
              Cronograma
            </StepButton>
            <StepContent>
              <TeacherLectureSeriesFormSchedule
                key='date'
                {...this.props}
                parent={this}
              />
            </StepContent>
          </Step>

        </Stepper>

      </div>
    );
  }

};
