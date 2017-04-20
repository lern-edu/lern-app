import React from 'react';
import { RaisedButton, FlatButton, Paper, Divider } from 'material-ui';

TeacherTestCreateFormQuestions = React.createClass({

  // Lifecycle

  componentDidMount() {
    this.getQuestionsCount();
  },

  //  Initial state

  getInitialState() {
    return {
      questionsCount: 0,
      subject: '',
      tags: [],
      text: '',
      onlyMine: false,
      type: null,
    };
  },

  getQuestionsCount() {
    const { state: { subject, tags, text, onlyMine, type },
      props: { courseId: course, ready }, } = this;
    Meteor.call('TeacherQuestionsCount',
      { course, tags, subject, text, onlyMine, type },
      (err, questionsCount) => {
        if (err) snack('Erro ao buscar questões');
        else this.setState({ questionsCount });
      });
  },

  // Handlers

  handleSearch() {
    Session.set('searchText', _.get(this, 'state.text'));
    Session.set('searchSubject', _.get(this, 'state.subject'));
    Session.set('searchTags', _.get(this, 'state.tagIds'));
    Session.set('searchType', _.get(this, 'state.type'));
    Session.set('searchOnlyMine', _.get(this, 'state.onlyMine'));
    Session.set('searchPage', 0);
    this.getQuestionsCount();
  },

  handleNext() {
    FlowRouter.setQueryParams({ tab: 'finish' });
  },

  /* Render
  */

  render() {
    const { props, props: { ready, form,
        styles: { paper, subItems, next },
        form: { state: { errors } },
      }, state: { questionsCount }, } = this;

    return (
      <Paper {...paper}>

        <div {...subItems}>
          <h5>Busque questões para compor o teste</h5>
        </div>

        <div {...subItems}>
          <TeacherTestCreateFormQuestionsStatus {...props} form={form} />
        </div>

        <Divider />

        <TeacherTestCreateFormQuestionsQuery {...props} parent={this} />

        <div className='ui right aligned basic segment'>
          <RaisedButton
          label='Buscar'
          disabled={!_.every(ready)}
          secondary={true}
          onTouchTap={this.handleSearch} />
        </div>

        <Divider />

          <div {...subItems}>
            <TeacherTestCreateFormQuestionsShow {...props} questionsCount={questionsCount}/>
          </div>

        <Divider />

        <div className='ui basic segment'>
          <div {...next}>
            <FlatButton
              label='Próximo'
              disabled={!_.every(_.keys(errors), e => !_.includes(['scores', 'questions'], e))}
              primary={true}
              onTouchTap={this.handleNext} />
          </div>
        </div>

    </Paper>);
  },
});
