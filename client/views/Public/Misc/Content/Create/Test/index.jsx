// Libs
import React from 'react';
import { FlatButton, Dialog, Paper } from 'material-ui';
import { AutoComplete, TextField, RaisedButton } from 'material-ui';
import { SelectField, MenuItem, Toggle, Divider } from 'material-ui';

// Views
import PublicContentCreateTestTags from './TagsContainer.jsx';
import PublicContentCreateTestShow from './Show/ShowContainer.jsx';

const PublicContentCreateTestView = React.createClass({

  // Lifecycle

  getInitialState() {
    return {
      subjectsIds: undefined,
      subjectText: '',
      tagsIds: undefined,
      tagText: '',
      type: undefined,
      onlyMine: false,
      skip: 0,
      testsCount: 0,
      query: {},
    };
  },

  componentWillMount() {
    this.handleSearch();
  },

  getTestsCount(query) {
    const { course } = this.props;
    Meteor.call('PublicTestsCount', _.assign(query, { course }), (err, testsCount) => {
      err ? snack('Erro ao buscar testes') : this.setState({ testsCount });
    });
  },

  // Handlers

  handleSubjectChange({ text: subjectText, value: subjectsIds }, index) {
    this.setState({
      subjectsIds,
      subjectText,
      tagsIds: undefined,
      tagText: '',
    });
  },

  handleTextChange({ currentTarget }, value) {
    const name = currentTarget.getAttribute('name');
    this.setState({ [name]: value });
  },

  handleClearQuery() {
    this.setState({
      subjectsIds: undefined,
      subjectText: '',
      tagsIds: undefined,
      tagText: '',
      type: undefined,
      onlyMine: false,
      skip: 0,
      testsCount: 0,
      query: {},
    });
    this.handleSearch();
  },

  handleTypeChange(event, index, type) {
    this.setState({ type });
  },

  handleOnlyMineChange(event, onlyMine) {
    this.setState({ onlyMine });
  },

  handleSkipAdd() {
    this.setState({ skip: this.state.skip + 1 });
  },

  handleSkipLess() {
    this.setState({ skip: this.state.skip - 1 });
  },

  handleSearch() {
    const query = _.omit(this.state, ['query', 'subjectText', 'tagText', 'skip', 'testsCount']);
    this.setState({ query });
    this.getTestsCount(query);
  },

  // render

  render() {
    const { form, subjects, open, tags, handleClose, course } = this.props;
    const { subjectsIds, tagsIds, type, onlyMine, tagText, subjectText, skip, } = this.state;
    return (
      <Paper>

        <div className='ui basic segment'>

          <div className='ui equal width grid'>

            <div className='equal width row'>
              <div className='column'>
                <AutoComplete
                  searchText={subjectText}
                  onNewRequest={this.handleSubjectChange}
                  floatingLabelText='Matéria'
                  filter={AutoComplete.fuzzyFilter}
                  maxSearchResults={5}
                  dataSource={_.map(subjects, s => _.zipObject(['text', 'value'],
                    [s.name, s._id])
                  )}
                />
              </div>
              <div className='column'>
                <PublicContentCreateTestTags
                  parent={this}
                  tagText={tagText}
                  subjects={subjects}
                  subject={subjectsIds}
                  tag={_.head(tagsIds)}
                />
              </div>
            </div>

            <div className='equal width row'>
              <div className='column'>
                <SelectField
                  floatingLabelText='Tipo'
                  value={type}
                  onChange={this.handleTypeChange} >
                  {_.map(TestTypes.all('both'), (v, k) =>
                    <MenuItem key={k} value={k} primaryText={v} />)}
                </SelectField>
              </div>

              <div className='column' >
                <Toggle
                  toggled={onlyMine}
                  label='Apenas meus testes'
                  onToggle={this.handleOnlyMineChange}
                />
              </div>
            </div>

            <div className='equal width row'>
              <div className='column'>
                <RaisedButton
                  label='Buscar'
                  primary={true}
                  onTouchTap={this.handleSearch}
                  style={{ marginRight: 5 }}
                />
                <RaisedButton
                  label='Limpar'
                  secondary={true}
                  onTouchTap={this.handleClearQuery}
                />
              </div>
            </div>

            <div className='row'>
              <div className='sixteen wide column' >
                <Divider />
              </div>
            </div>

            <div className='row'>
              <div className='sixteen wide column' >
                <PublicContentCreateTestShow
                  form={form}
                  parent={this}
                  skip={skip}
                  subjects={subjects}
                  query={_.assign(this.state.query, { course })}
                />
              </div>
            </div>

          </div>

        </div>

      </Paper>
    );
  },
});

export default PublicContentCreateTestView;
