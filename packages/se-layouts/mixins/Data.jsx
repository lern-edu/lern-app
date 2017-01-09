import React from 'react';

Data = {
  /* Set Context
  */

  getChildContext() {
    const { route, user, logging } = this.props;
    return { route, user, logging };
  },
};
