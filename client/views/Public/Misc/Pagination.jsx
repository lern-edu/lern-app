import React from 'react';
import { IconButton, FontIcon } from 'material-ui';

/** Public pagination for other views
  * @where {client}
  * @public view utilities
  * @methods this.handlePageLess -> updade 'searchPage' on Session
  * @methods this.handlePageAdd -> updade 'searchPage' on Session
  * @param {number} [length] actual content length on parent
  * @param {number} [size] max size of contents on parent view
  * @param {number} [page] current page
  * @param {number} [total] total counted items
  */

PublicMiscPagination = React.createClass({

  // static data

  defaultStyle: {
    className: 'ui right aligned basic segment',
  },

  // Lifecycle

  componentDidMount() {
    Session.set('searchPage', 0);
  },

  componentWillUnmount() {
    Session.set('searchPage', 0);
  },

  // Handlers

  handlePageLess() {
    Session.set('searchPage', Session.get('searchPage') - 1);
  },

  handlePageAdd() {
    Session.set('searchPage', Session.get('searchPage') + 1);
  },

  // render

  render() {
    const { defaultStyle, props:
      { length, size, page, total, style=null, less, add }, } = this;
    const finalCurrentCount = size * page + length;
    return (
      <div {...style} {...defaultStyle} >
        {`${size * page} - ${finalCurrentCount > total ? total : finalCurrentCount} de ${
          total || 0} resultados`}
        {page === 0 ? undefined :
          <IconButton touch={true} onTouchTap={add || this.handlePageLess}>
            <FontIcon className='material-icons'>keyboard_arrow_left</FontIcon>
          </IconButton>}
        {total === 0 || (page + 1) === Math.ceil(total / size)
          ? undefined :
          <IconButton touch={true} onTouchTap={less || this.handlePageAdd}>
          <FontIcon className='material-icons'>keyboard_arrow_right</FontIcon>
        </IconButton>}
      </div>
    );
  },
});
