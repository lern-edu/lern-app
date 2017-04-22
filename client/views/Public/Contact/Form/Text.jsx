import React from 'react';
import { TextField } from 'material-ui';

const PublicContactFormText = React.createClass({
  render() {
    const { value, form } = this.props;

    return (
      <TextField
        fullWidth={true}
        hintText='Texto'
        value={value}
        multiLine={true}
        rowsMax={8}
        onChange={form.handleTextChange}
      />
    );
  },
});

export default PublicContactFormText;
