import React from 'react';
import { CircularProgress, LinearProgress, Divider } from 'material-ui';

AdminQuestionEditView = React.createClass({
  mixins: [ReactMeteorData],

  limit: 50,

  getInitialState() {
    return { questionsCount: 0 };
  },

  getMeteorData() {
    const { query={}, query: { skip } } = this.props;
    const handles = {
      questions: Meteor.subscribe('AdminQuestions', query, { limit: this.limit, skip }),
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      questions: Fetch.General.questions(query).fetch(),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
    };

    Meteor.call('AdminQuestionsCount', query,
      (err, questionsCount) => {
        if (err) snack('Erro ao buscar questões');
        else data.questionsCount = questionsCount;
      });

    if (data.questions) data.images = Fetch.General.images().fetch();

    return data;
  },

  componentWillMount() {
    this.getQuestionsCount();
  },

  componentWillReceiveProps() {
    this.getQuestionsCount();
  },

  getQuestionsCount() {
    Meteor.call('AdminQuestionsCount', this.props.query,
      (err, questionsCount) => {
        if (err) {
          snack('Erro ao buscar questões');
          console.log(err);
        } else this.setState({ questionsCount });
      });
  },

  less() {
    const { query: { skip=0 } } = this.props;
    if (skip) FlowRouter.setQueryParams({ skip: skip - 1 });
  },

  add() {
    const { query: { skip=0 } } = this.props;
    console.log(skip);
    FlowRouter.setQueryParams({ skip: skip + 1 });
  },

  render() {
    const { ready, questions } = this.data;
    const { query: { skip=0 }, query } = this.props;
    const { questionsCount } = this.state;
    return (
      <div className='ui container'>

        <Layout.Bar
          title='Editar questões'
          crumbs={[{ label: 'Conteúdo', path: 'AdminContent' }]} />

        {!(ready.subjects || ready.tags) ? <LinearProgress/> :
          <AdminQuestionEditOptions {...this.data} restore={query} />}
          <Divider />
        {!ready.questions ? <CircularProgress /> : [
          <AdminQuestionEditQuestions {...this.data} restore={query} key='list' />,
          <PublicMiscPagination key='pages' length={questions.length}
            size={this.limit} total={questionsCount} less={() => FlowRouter.setQueryParams({ skip: skip - 1 })}
            add={() => FlowRouter.setQueryParams({ skip: skip + 1 })}
            page={skip} />,
        ]}


      </div>
    );
  },

});
