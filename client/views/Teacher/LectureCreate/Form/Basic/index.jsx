// Libs
import React from 'react';
import { RaisedButton, Card, CardHeader, CardText } from 'material-ui';

const TeacherLectureCreateFormBasic = React.createClass({

  /* Render
  */

  render() {
    const { errors, done, form } = this.props;

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <Card className='sixteen wide column'>
              <CardHeader
                title='Informações'
                subtitle={`${form.doc.get('info').length} itens`}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>

                <div className='ui grid'>

                  <div className='sixteen wide column'>
                    <PublicContentCreate
                      field='info'
                      schema={Lectures.ContentSchema}
                      contentTypes={ContentTypes}
                      form={form}
                    />
                  </div>

                  <div className='sixteen wide column'>
                    {_.map(form.doc.get('info'), (s, i) =>
                      <div style={{ width: '100%' }} key={i} >
                        <PublicContentShow
                          schema={Lectures.ContentSchema}
                          field='info'
                          form={form}
                          index={i}
                          doc={s}
                        />
                    </div>)}
                  </div>

                </div>
              </CardText>
            </Card>
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

export default TeacherLectureCreateFormBasic;
