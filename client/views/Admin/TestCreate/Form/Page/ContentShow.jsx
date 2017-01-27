import React from 'react';
import { CardTitle, Divider, FlatButton } from 'material-ui';

const AdminTestCreateFormPageCreatContentShow = React.createClass({

  // Handlers

  handleRemove() {
    const { index, form, form: { doc: { content } } } = this.props;
    _.pullAt(content, index);
    form.defaultHandler({ content }, { doc: true });
  },

  // Render

  render() {
    const { index, content: { type, text, link, title } } = this.props;

    return (
      <div className='sixteen wide column'>

        <div className='row'>
          <div className='sixteen wide column'>
            {_.get({
              text: <p>{text}</p>,
              link: <a>{link}</a>,
              title: <CardTitle title={title} />,
            }, type)}
          </div>
        </div>

        <div className='row'>
          <FlatButton
            onTouchTap={this.handleRemove}
            primary={true}
            label='Remover' />
        </div>

        <div className='row'>
          <div className='sixteen wide column'>
            <Divider/>
          </div>
        </div>

      </div>
    );
  },

});

export default AdminTestCreateFormPageCreatContentShow;
