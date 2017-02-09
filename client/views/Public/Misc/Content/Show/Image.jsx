import React from 'react';
import { CircularProgress } from 'material-ui';

const PublicContentShowImageView = React.createClass({
  // render

  render() {
    const { form, image, ready } = this.props;
    return (
      _.every(ready) && image ? <img src={FS.Images.link(image)} /> : <CircularProgress />
    );
  },
});

export default PublicContentShowImageView;
