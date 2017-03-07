import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

const StudentTestAttemptGlobalInfo = React.createClass({

  // Render

  render() {
    const { open, test } = this.props;

    return (
      <Dialog
        title={`Informações`}
        open={open}
        modal={false}
        contentStyle={{ width: '100%' }}
        style={{ heigth: '100%' }}
        bodyStyle={{ overflow: 'auto' }}
        onRequestClose={this.props.handleClose}
        actions={[
          <FlatButton
            label='Fechar'
            primary={true}
            onTouchTap={this.props.handleClose} />,
         ]} >
          <div className='ui grid'>
            {_.map(test.info, (c, i) =>
              <div className='sixteen wide column' key={i} >
                <PublicContentShow
                  canRemove={false}
                  schema={Tests.ContentSchema}
                  field='info'
                  index={i}
                  doc={c} />
              </div>
            )}
          </div>
      </Dialog>
    );
  },

});

export default StudentTestAttemptGlobalInfo;
