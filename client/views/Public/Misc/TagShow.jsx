import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

PublicMiscTagShow = React.createClass({

  render() {
    const { tag={}, handleClose, open } = this.props;
    return (
      <Dialog
        title={_.get(tag, 'text')}
        actions={[
          <FlatButton
            label='Fechar'
            primary={true}
            onTouchTap={handleClose}
          />,
        ]}
        modal={false}
        open={open}
        onRequestClose={handleClose}
        autoScrollBodyContent={true}
      >

        <div className='ui grid'>

          <div className='row' style={{ marginTop: 15 }} >

            {
              _.isEmpty(_.get(tag, 'info'))
              ? <div className='sixteen column'>
                  <p> Sem descrição </p>
                </div>
              : _.map(tag.get('info'), (s, i) =>
                  <div className='sixteen wide column' key={i} >
                    <PublicContentShow
                      canRemove={false}
                      schema={Tags.ContentSchema}
                      field='info'
                      index={i}
                      doc={s}
                    />
                </div>
              )
            }

          </div>

        </div>

      </Dialog>
    );
  },

});
