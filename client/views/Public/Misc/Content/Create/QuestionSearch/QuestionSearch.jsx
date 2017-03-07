// Libs
import React from 'react';
import { FlatButton, Dialog } from 'material-ui';
import { AutoComplete, TextField, RaisedButton } from 'material-ui';
import { SelectField, MenuItem, Toggle, Divider } from 'material-ui';

// Views
import PublicContentCreateQuestionSearchTags from './TagsContainer.jsx';
import PublicContentCreateQuestionSearchShow from './Show/ShowContainer.jsx';

const PublicContentCreateQuestionSearch = React.createClass({

  // Static

  column: {
    className:
      'eight wide computer eight wide tablet sixteen wide mobile column',
  },

  // Lifecycle

  getInitialState() {
    return { subjectId: null,
      subjectText: '',
      text: null,
      tagsIds: null,
      tagText: '',
      type: null,
      onlyMine: false,
      skip: 0,
      questionsCount: 0,
      query: {},
    };
  },

  getQuestionsCount(query) {
    Meteor.call('PublicQuestionsCount', query, (err, questionsCount) => {
      err ? snack('Erro ao buscar questões') : this.setState({ questionsCount });
    });
  },

  // Handlers

  handleSubjectChange({ text: subjectText, value: subjectId }, index) {
    if (subjectId) this.setState({ subjectId, subjectText,
      tagsIds: null, tagText: '', });;
  },

  handleTextChange({ currentTarget }, value) {
    const name = currentTarget.getAttribute('name');
    this.setState({ [name]: value });
  },

  handleClearQuery() {
    this.setState({ subjectId: null,
      subjectText: '',
      text: null,
      tagsIds: null,
      tagText: '',
      type: null,
      onlyMine: false,
      skip: 0,
      questionsCount: 0,
      query: {}, });
  },

  handleTypeChange(event, index, type) {
    this.setState({ type });
  },

  handleOnlyMineChange(event, onlyMine) {
    this.setState({ onlyMine });
  },

  handleSkipAdd() {
    const query = _.assign({ notQuestions: this.props.questionsSelected },
      _.omit(this.state.query, ['notQuestions']));
    this.setState({ query, skip: this.state.skip + 1 });
  },

  handleSkipLess() {
    const query = _.assign({ notQuestions: this.props.questionsSelected },
      _.omit(this.state.query, ['notQuestions']));
    this.setState({ query, skip: this.state.skip - 1 });
  },

  handleSearch() {
    const query = _.assign({ notQuestions: this.props.questionsSelected },
      _.omit(this.state,
      ['query', 'subjectText', 'tagText', 'skip', 'questionsCount']));
    this.setState({ query });
    this.getQuestionsCount(query);
  },

  // render

  render() {
    const { form, subjects, open, tags, handleClose } = this.props;
    const { subjectId, tagsIds, text, type,
      onlyMine, tagText, subjectText, skip, } = this.state;

    return (
      <Dialog
        title='Buscar questão'
        actions={[
          <FlatButton
            label='Cancelar'
            secondary={true}
            onTouchTap={handleClose} />,
          <FlatButton
            label='Ok'
            primary={true}
            onTouchTap={handleClose} />,
        ]}
        modal={true}
        contentStyle={{ width: '100%', maxWidth: 'none' }}
        open={open}
        onRequestClose={handleClose}
        autoScrollBodyContent={true} >

        <div className='ui center aligned grid' >

          <div {...this.column} >
            <AutoComplete
              searchText={subjectText}
              onNewRequest={this.handleSubjectChange}
              floatingLabelText='Matéria'
              filter={AutoComplete.fuzzyFilter}
              maxSearchResults={5}
              dataSource={_.map(subjects, s => _.zipObject(['text', 'value'],
                [s.name, s._id])
              )} />
          </div>
          <div {...this.column} >
            <PublicContentCreateQuestionSearchTags
              parent={this}
              tagText={tagText}
              subjects={subjects}
              subject={subjectId}
              tag={_.head(tagsIds)} />
          </div>

          <div {...this.column} >
            <TextField
              name='text'
              value={text || ''}
              floatingLabelText='Texto'
              onChange={this.handleTextChange} />
          </div>
          <div {...this.column} >
            <SelectField
              floatingLabelText='Tipo'
              value={type}
              onChange={this.handleTypeChange} >
              {_.map(QuestionTypes.all('both'), (v, k) =>
                <MenuItem key={k} value={k} primaryText={v} />)}
            </SelectField>
          </div>

          <div className='sixteen wide column' >
            <Toggle
              toggled={onlyMine}
              label='Apenas minhas questões'
              onToggle={this.handleOnlyMineChange} />
          </div>

          <div {...this.column} >
            <RaisedButton
              label='Limpar Busca'
              secondary={true}
              fullWidth={true}
              onTouchTap={this.handleClearQuery} />
          </div>
          <div {...this.column} >
            <RaisedButton
              label='Buscar'
              primary={true}
              fullWidth={true}
              onTouchTap={this.handleSearch} />
          </div>

          <div className='sixteen wide column' >
            <Divider />
          </div>

          <div className='row'>
            <PublicContentCreateQuestionSearchShow
              scored={this.props.scored}
              questionsSelected={this.props.questionsSelected}
              form={form}
              parent={this}
              handleClose={handleClose}
              skip={skip}
              query={this.state.query} />
          </div>

        </div>

      </Dialog>
    );
  },
});

export default PublicContentCreateQuestionSearch;
