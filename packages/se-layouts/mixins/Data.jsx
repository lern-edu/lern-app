import React from 'react';

const Data = {
  /* Set Context
  */

  getChildContext() {
    const { route, user, logging } = this.props;
    return { route, user, logging };
  },
};

export default Data;
