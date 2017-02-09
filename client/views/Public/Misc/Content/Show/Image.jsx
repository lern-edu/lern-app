import React from 'react';
import { RaisedButton } from 'material-ui';

const PublicContentShowImageView = React.createClass({
  // render

  render() {
    const { form, image } = this.props;

    console.log(this.props);

    return (
      <img src={image.link}/>
    );
  },
});

export default PublicContentShowImageView;
