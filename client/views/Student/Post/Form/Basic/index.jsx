// Libs
import React from 'react';
import { TextField, SelectField, MenuItem, AutoComplete } from 'material-ui';
import { RaisedButton, Card, CardHeader, CardText } from 'material-ui';

const StudentPostFormBasic = React.createClass({

  // Handlers

  handleInput({ currentTarget, target: { value } }) {
    this.props.form.defaultHandler({
      [currentTarget.getAttribute('name')]: value,
    }, { doc: true });
  },

  handleTypeChange(event, index, type) {
    this.props.form.defaultHandler({ type }, { query: true, doc: true });
  },

  handleCourse({ value }, index) {
    const course = _.get(value, 'key') || null;
    this.props.form.defaultHandler({ course }, { doc: true });
  },

  /* Render
  */

  render() {
    const { errors, done, form, courses, subjects } = this.props;

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <TextField
              value={form.doc.get('name') || ''}
              floatingLabelText='Nome'
              name='name'
              errorText={_.get(form.state.errors, 'name')}
              onInput={this.handleInput}  />
          </div>

          <div className='row'>
            <SelectField
              floatingLabelText='Tipo'
              value={form.doc.get('type')}
              errorText={_.get(form.state.errors, 'type')}
              onChange={this.handleTypeChange} >
              {
                _.map(PostTypes.all('both'), (v, k) =>
                  <MenuItem key={k} value={k} primaryText={v} />
                )
              }
            </SelectField>
          </div>

          <div className='row'>
            <Card className='sixteen wide column'>
              <CardHeader
                title='Conteúdo'
                subtitle={`${form.doc.get('content').length} itens`}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>

                <div className='ui grid'>

                  <div className='sixteen wide column'>
                    <PublicContentCreate
                      field='content'
                      schema={Posts.ContentSchema}
                      disableCreateQuestion={true}
                      contentTypes={ContentTypes}
                      subjects={subjects}
                      form={form}
                    />
                  </div>

                  <div className='sixteen wide column'>
                    {
                      _.map(form.doc.get('content'), (s, i) =>
                        <div style={{ width: '100%' }} key={i} >
                            <PublicContentShow
                              schema={Posts.ContentSchema}
                              field='content'
                              form={form}
                              index={i}
                              doc={s}
                            />
                        </div>
                      )
                    }
                  </div>

                </div>
              </CardText>
            </Card>
          </div>

          <div className='row'>
            <AutoComplete
              onNewRequest={this.handleCourse}
              floatingLabelText='Curso'
              filter={AutoComplete.fuzzyFilter}
              searchText={
                _.get(
                  _.find(
                    courses,
                    { _id: form.doc.get('course') }
                  ),
                  'name'
                )
                || ''
              }
              menuStyle={{ width: '500px' }}
              targetOrigin={{ vertical: 'top', horizontal: 'left' }}
              dataSource={
                _.map(courses, ({ _id, name }) =>
                  _.zipObject(
                    ['text', 'value'],
                    [
                      name,
                      <MenuItem
                        key={_id}
                        primaryText={name}
                        innerDivStyle={{ width: '500px' }}
                      />,
                    ]
                  )
                )
              }
            />
          </div>

          <div className='row'>
            <RaisedButton
              label='Próximo'
              disabled={!done}
              primary={true}
              onTouchTap={form.nextStep}
            />
          </div>

        </div>
      </div>
    );
  },
});

export default StudentPostFormBasic;
