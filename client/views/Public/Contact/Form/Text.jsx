import React from 'react';
import { TextField } from 'material-ui';

PublicContactFormText = React.createClass({
  render() {
    const { value, form } = this.props;

    return (
      <TextField
        fullWidth={true}
        hintText='Conte-nos'
        value={value}
        multiLine={true}
        rowsMax={8}
        onChange={form.handleTextChange}
      />
    );
  },
});
