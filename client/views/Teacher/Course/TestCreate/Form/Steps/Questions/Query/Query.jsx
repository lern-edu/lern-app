import React from 'react';
import { AutoComplete, TextField, SelectField, MenuItem, Checkbox } from 'material-ui';

TeacherTestCreateFormQuestionsQuery = React.createClass({

  // Handlers

  handleSubjectsChange(value, index, options) {
    this.props.parent.setState({ subject: _.get(options[index], 'value.key') });
  },

  handleTextChange({ target: { value } }) {
    this.props.parent.setState({ text: value });
  },

  handleOptionsTypeChange(event, index, type) {
    this.props.parent.setState({ type: _.isEqual(type, 'all') ? null : type });
  },

  handleAuthorChange(event, onlyMine) {
    this.props.parent.setState({ onlyMine });
  },

  // render

  render() {
    const { props: { subjects, tags, parent, styles: { subItems },
      parent: { state: { text, type, onlyMine, subject } }, }, } = this;

    return (
      <div>
        <div {...subItems}>
          <AutoComplete
            floatingLabelText='Matérias'
            filter={AutoComplete.fuzzyFilter}
            onNewRequest={this.handleSubjectsChange}
            disableFocusRipple={false}
            dataSource={_.map(subjects, t => _.zipObject(['text', 'value'],
              [t.name, <MenuItem
                primaryText={t.name}
                key={t._id} />,
            ]))} />
        </div>

        <TeacherTestCreateFormQuestionsTags
          tags={_.filter(tags, t => _.isEqual(t.subject, subject))}
          parent={parent} />

        <div {...subItems}>
          <TextField
            hintText='Texto'
            floatingLabelText='Texto'
            multiLine={true}
            rows={2}
            value={text}
            onChange={this.handleTextChange} />
        </div>

        <div {...subItems}>
          <SelectField
            value={type}
            onChange={this.handleOptionsTypeChange}
            floatingLabelText='Tipo de questão' >
            {_.map(_.concat(QuestionTypes.all('keys'), 'all'), qt =>
              <MenuItem
                key={qt}
                value={qt}
                primaryText={QuestionTypes.getName(qt) || 'Todos'}/>)}
         </SelectField>
        </div>

        <div {...subItems}>
          <Checkbox
            checked={onlyMine}
            label='Buscar entre minhas questões'
            onCheck={this.handleAuthorChange} />
        </div>

      </div>
    );
  },
});
