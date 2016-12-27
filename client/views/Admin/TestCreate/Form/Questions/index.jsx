import React from 'react';
import { CircularProgress, TextField, Divider, AutoComplete, MenuItem, RaisedButton, Dialog, FlatButton, } from 'material-ui';

AdminTestCreateFormQuestions = React.createClass({

  instructions: {
    scores: 'É necessário que o valor seja um número inteiro',
  },

  //  Initial state

  componentDidMount() {
    this.props.form.defaultHandler({ questions: [], scores: [] }, { doc: true });
  },

  getInitialState() {
    return {
      subject: '',
      tagIds: [],
      text: '',
      open: false,
      questionId: null,
      questionIndex: null,
      status: {},
      score: null,
    };
  },

  // Handlers

  handleStatusChange(questionId, remove) {
    const { status } = this.state;
    const question = _.head(_.filter(
      this.props.questions, q => q._id === questionId));
    const value = remove ? (-1) : 1;

    if (status[_.get(question, 'subject')])
      status[_.get(question, 'subject')].value += value;
    else status[_.get(question, 'subject')] = { value: 1, tags: {} };

    _.forEach(question.tags, t => {

      if (status[_.get(question, 'subject')].tags) {
        if (status[_.get(question, 'subject')].tags[t])
          status[_.get(question, 'subject')].tags[t] += value;
        else status[_.get(question, 'subject')].tags[t] = 1;
      } else status[_.get(question, 'subject')].tags[t] = 1;
    });

    this.setState({ status });
  },

  handleSubjectsChange(value, index, options) {
    this.setState({ subject: _.get(options[index], 'value.key') });
  },

  handleTextChange(event) {
    this.setState({ text: event.target.value });
  },

  handleSearch() {
    Session.set('searchText', _.get(this, 'state.text'));
    Session.set('searchSubject', _.get(this, 'state.subject'));
    Session.set('searchTags', _.get(this, 'state.tagIds'));
  },

  handleQuestionPush(event) {
    // Get question from form and questionId to insert
    const { questions, scores } = this.props.form.doc;
    const { form } = this.props;
    const questionId = event.currentTarget.getAttribute('value');

    // insert question and respective score on test
    questions.push(questionId);
    scores.push(0);

    // Update question status
    this.handleStatusChange(questionId, false);

    // Set state to open dialog for scores
    this.setState({ open: true, questionId, questionIndex: questions.length - 1 });

    // Define new questions array on form
    form.defaultHandler({ questions, scores }, { doc: true });
  },

  handleQuestionPull(event) {
    // Get questions and scores from form
    const { questions, scores } = this.props.form.doc;
    const { form } = this.props;
    const questionId = event.currentTarget.getAttribute('value');

    // Get index for selected question
    const index = _.indexOf(questions, questionId);

    // Update question status
    this.handleStatusChange(questionId, true);

    // Remove question and score
    _.pullAt(questions, index);
    _.pullAt(scores, index);

    // Update form
    form.defaultHandler({ scores, questions }, { doc: true });
  },

  handleTagsChange(tag, remove) {
    const { tagIds } = this.state;
    if (remove) _.pull(tagIds, tag);
    else tagIds.push(tag);
    this.setState({ tagIds });
  },

  handleQuestionScoreChange(event) {
    // Get questions and scores from form
    const { scores } = this.props.form.doc;
    const { questionIndex } = this.state;
    const { form } = this.props;
    const score = event.target.value;

    // Update score from selected question index
    scores[questionIndex] = isNaN(score) ? score : parseInt(score);

    // Update state and form
    this.setState({ score });
    form.defaultHandler({ scores }, { doc: true });
  },

  handleQuestionScore() {
    const { score, questionId } = this.state;
    const { errors } = this.props;

    if (!errors.scores && score)
      this.setState({ score: null, open: false, questionId: null });
  },

  handleQuestionScoreClose() {
    const { questions, scores } = this.props.form.doc;
    const { score, questionId } = this.state;
    const { form } = this.props;
    const index = _.indexOf(questions, questionId);

    this.handleStatusChange(questionId, true);

    _.pullAt(questions, index);
    form.defaultHandler({ questions }, { doc: true });

    if (score) {
      _.pullAt(scores, index);
      form.defaultHandler({ scores }, { doc: true });
    };

    this.setState({ score: null, open: false, questionId: null });
  },

  /* Render
  */

  render() {
    const { subjects, form, questions, ready, tags, images, errors } = this.props;
    const { text, score, open, tagIds, subject, status } = this.state;
    const { instructions } = this;

    let questionsToShow;
    if (text) questionsToShow = _.filter(questions, q => q.score > 0.5);
    else questionsToShow = questions;

    return (
      <div className='row'>
        <Divider />
        <div className='ui vertical basic segment'>
          <h3>Buscar questões</h3>
        </div>

        <div className='ui vertical basic segment'>
          <p>Busque questões e defina uma nota para elas.</p>
        </div>

        <div className='ui vertical basic segment'>
          <AutoComplete
            floatingLabelText='Matérias'
            filter={AutoComplete.fuzzyFilter}
            onNewRequest={this.handleSubjectsChange}
            searchText=''
            disableFocusRipple={false}
            dataSource={_.map(subjects, t => _.zipObject(
              ['text', 'value'],
              [t.name, <MenuItem
                primaryText={t.name}
                key={t._id}
              />,
              ])
            )} />
        </div>

          <AdminTestCreateFormQuestionsTags
            tagIds={tagIds}
            form={form}
            tags={_.filter(tags, t => t.subject === subject)}
            tagsChange={this.handleTagsChange} />

          <div className='ui vertical basic segment'>
            <TextField
              hintText='Texto'
              floatingLabelText='Texto'
              multiLine={true}
              rows={4}
              value={text}
              onChange={this.handleTextChange} />
          </div>

          <AdminTestCreateFormQuestionsStatus
            status={status}
            tags={tags}
            subjects={subjects}/>

          <div className='ui right aligned basic segment'>
            <RaisedButton
            label='Buscar'
            secondary={true}
            onTouchTap={this.handleSearch} />
          </div>

          <div className='ui grid'>
            {ready ? _.map(questionsToShow, q =>
                <div className='sixteen wide tree wide large screen tree wide widescreen column'
                  key={q._id}>
                  <AdminTestCreateFormCard
                    question={q}
                    subjects={subjects}
                    images={images}
                    tags={tags}
                    form={this}
                    inTest={_.includes(form.doc.questions, q._id)}/>
                </div>
            ) : <CircularProgress />}
          </div>

          <div className='row'>
            <Dialog
              title='Valor da questão'
              actions={[
                <FlatButton
                label='Cancelar'
                secondary={true}
                onTouchTap={this.handleQuestionScoreClose}
                />,
                <FlatButton
                  label='Ok'
                  primary={true}
                  disabled={!errors.scores && score ? false : true}
                  onTouchTap={this.handleQuestionScore}
                />,
              ]}
              modal={false}
              open={open}
              onRequestClose={this.handleClose}>
              <TextField
                hintText='Valor da questão'
                onEnterKeyDown={this.handleQuestionScore}
                onChange={this.handleQuestionScoreChange}
                name={instructions.scores}
              />
            </Dialog>
          </div>

          <Divider />
        </div>
    );
  },
});
