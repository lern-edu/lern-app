import React from 'react';
import { TextField } from 'material-ui';

PublicContactFormText = React.createClass({
  render() {
    const { value, form } = this.props;

    return (
      <TextField
        fullWidth={true}
        floatingLabelText='Mensagem'
        value={value}
        multiLine={true}
        rows={2}
        onChange={form.handleTextChange}
      />
    );
  },
});
