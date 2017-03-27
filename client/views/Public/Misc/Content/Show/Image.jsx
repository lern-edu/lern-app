import React from 'react';
import { CircularProgress } from 'material-ui';

const PublicContentShowImageView = React.createClass({
  // render

  render() {
    const { form, image, ready, width } = this.props;
    return (
      _.every(ready) && image ?
        <img src={FS.Images.link(image)} width={width ? width : '500px'}/> :
        <CircularProgress />
    );
  },
});

export default PublicContentShowImageView;
