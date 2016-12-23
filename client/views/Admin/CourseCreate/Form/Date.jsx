import React from 'react';

AdminCourseCreateFormDate = React.createClass({
  /* Handlers
  */

  handleDateChange(str, { name }) {
    const { form } = this.props;
    const m = moment(str, 'D/M/YYYY');
    if (m.isValid()) form.defaultHandler({ [name]: m.toDate() }, { doc: true });
    else form.defaultHandler({ [name]: null }, { doc: true });
  },

  /* Render
  */

  render() {
    const { startDate, endDate } = this.props.form.doc;

    return (
      <div className='ui two column grid'>
        <div className='column'>
          <Semantic.Popup parent={this} target='popup0'>
            <div className='ui fluid input'>
              <Semantic.Input placeholder='Início' onInput={this.handleDateChange} name='startDate'/>
            </div>
            <div className='ui popup' ref='popup0'>
              {startDate ? moment(startDate).format('LL') : 'Data no formato: DD/MM/AAAA'}
            </div>
          </Semantic.Popup>
        </div>
        <div className='column'>
          <Semantic.Popup parent={this} target='popup1'>
            <div className='ui fluid input'>
              <Semantic.Input placeholder='Fim' onInput={this.handleDateChange} name='endDate'/>
            </div>
            <div className='ui popup' ref='popup1'>
              {endDate ? moment(endDate).format('LL') : 'Data no formato: DD/MM/AAAA'}
            </div>
          </Semantic.Popup>
        </div>
      </div>
    );
  },
});
