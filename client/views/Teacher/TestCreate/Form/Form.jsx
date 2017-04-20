import React from 'react';
import { TextField, RaisedButton, DatePicker, SelectField, MenuItem, Divider, Slider, Checkbox, Paper, } from 'material-ui';

/** Test form and step control
  * @where {client}
  * @private View only
  * @param {Id} [courseId*] From url receive on props
  * @param {object} [query*] From url receive on props
  * @param {Class} [course*] From Reactive data on props
  * @param {[Class]} [questions*] From Reactive data on props
  * @param {[Class]} [ready*] From Reactive data on props
  * @param {[Class]} [tags*] From Reactive data on props
  * @param {[Class]} [tags*] From Reactive data on props
  * @param {[Class]} [images*] From Reactive data on props
  */

TeacherTestCreateForm = React.createClass({
  mixins: [AstroForm(Tests.Schema, 'TeacherTestSave')],

  // Static Data

  viewErrors: [
    ['name', 'info', 'subjects'],
    ['startDate', 'endDate'],
    ['timeout', 'timeoutType'],
    ['questions', 'scores'],
  ],

  styles: {
    main: {
      className: 'ten wide computer sixteen wide tablet column',
    },
    childrens: {
      paper: {
        className: 'row',
        style: { padding: '1em' },
        zDepth: 1,
      },
      subItems: { className: 'ui vertical basic segment' },
      next: {
        className: 'ui right aligned basic segment',
        style: { padding: '0.5em' },
      },
    },
  },

  // Lifecycle

  componentDidMount() {
    const { courseId: course } = this.props;
    this.defaultHandler({ type: 'course', course }, { doc: true, query: true });
    Session.set('searchPage', 0);
  },

  // handles

  handleSubmitSuccess({ _id }) {
    const { props: { course: { _id: courseId } } } = this;
    console.log(`Test created: ${_id}`);
    snack('Teste criado');
    this.sessionControl();
    FlowRouter.go('TeacherCourseShow', { courseId });
  },

  // Session clear

  sessionControl() {
    Session.set('searchPage', null);
    Session.set('searchSubject', null);
    Session.set('searchText', null);
    Session.set('searchTags', null);
    Session.set('searchType', null);
    Session.set('searchOnlyMine', null);
    Session.set('selectedQuestions', null);
  },

  // Render

  render() {
    const { props: { tab='info', ready }, styles: { main, childrens },
    state: { valid, errors }, viewErrors, doc: { scores }, } = this;
    return (
      <div className='ui centered grid'>

        <div {...main} style={{ marginTop: '1em' }}>
          <TeacherTestCreateTabs errors={errors} tab={tab} allErrors={viewErrors}/>
        </div>

        <Semantic.Transitions {...main} component='div'>
          {_.get({
            info: <TeacherTestCreateFormInfo {...this.props} form={this} styles={childrens} />,
            date: <TeacherTestCreateFormDate {...this.props} form={this} styles={childrens} />,
            time: <TeacherTestCreateFormTime {...this.props} form={this} styles={childrens} />,
            questions:
              <TeacherTestCreateFormQuestions {...this.props} form={this} styles={childrens} />,
            finish:
              <TeacherTestCreateFormFinish {...this.props} form={this} styles={childrens} />,
          }, tab)}
        </Semantic.Transitions>

      </div>
    );
  },
});
