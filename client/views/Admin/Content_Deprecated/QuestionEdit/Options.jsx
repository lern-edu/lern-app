import React from 'react';
import { RaisedButton, Paper, TextField, AutoComplete, Toolbar, ToolbarGroup, ToolbarTitle, MenuItem } from 'material-ui';

AdminQuestionEditOptions = React.createClass({

  // styles

  styles: {
    paper: {
      className: 'row',
      zDepth: 2,
    },
    subItems: { className: 'ui vertical basic segment' },
    next: {
      className: 'ui right aligned basic segment',
      style: { padding: '0.5em' },
    },
  },

  // initial state

  getInitialState() {
    const { props: { restore: { text, subject }={} }} = this;
    return { text, subject };
  },

  // handlers

  handleTextChange({ target: { value: text } }) {
    this.setState({ text });
  },

  handleSubjectsChange(label, index, items) {
    this.setState({ subject: _.get(items, `[${index}].value.key`) });
  },

  handleSearch() {
    FlowRouter.setQueryParams(this.state);
  },

  // render

  render() {
    const { props: { subjects }, state: { text, subject }, styles } = this;

    return (
      <Paper {...styles.paper} >

        <Toolbar>
          <ToolbarGroup float='left' children={<ToolbarTitle text='Buscar Questões' />} />
        </Toolbar>

        <div style={{ padding: '1em' }} >
          <div {...styles.subItems}>
            <AutoComplete
              floatingLabelText='Matéria'
              filter={AutoComplete.fuzzyFilter}
              onNewRequest={this.handleSubjectsChange}
              disableFocusRipple={false}
              searchText={_.get(_.find(subjects, { _id: subject }), 'name')}
              dataSource={_.map(subjects, t => _.zipObject(['text', 'value'],
                [t.name, <MenuItem
                  primaryText={t.name}
                  key={t._id} />,
              ]))} />
          </div>

          <div {...styles.subItems}>
            <TextField
              hintText='Texto'
              floatingLabelText='Texto'
              multiLine={true}
              rows={2}
              onInput={this.handleTextChange} />
          </div>

          <div {...styles.subItems}>
            <div {...styles.next}>
              <RaisedButton
                label='Buscar'
                primary={true}
                onTouchTap={this.handleSearch} />
            </div>
          </div>
        </div>

      </Paper>

    );
  },

});
