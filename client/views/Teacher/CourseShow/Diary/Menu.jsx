import React from 'react';

TeacherCourseShowDiaryMenu = React.createClass({
  help: [
    { icon: 'yellow file text', text: 'Atividade' },
    { icon: 'bookmark', text: 'Aula' },
    { icon: 'warning', text: 'Pendente' },
    { icon: 'red minus', text: 'Ausente' },
    { icon: 'blue checkmark', text: 'Presente' },
  ],

  /* Render
  */

  render() {
    const { parent } = this.props;
    const { month, year } = parent.state;
    const page = moment({ month, year });

    return (
      <h1 className='ui center aligned grid'>
        <div className='five wide column'>
        </div>
        <div className='one wide column'>
          <Semantic.Button classes='basic icon' onClick={parent.handlePageChange} offset={-1}>
            <i className='left chevron icon' />
          </Semantic.Button>
        </div>
        <div className='three wide middle aligned column'>
          <h2 className='ui header'>
            <div className='content'>
              {_.capitalize(page.format('MMMM'))}
              <div className='sub header'>{page.format('YYYY')}</div>
            </div>
          </h2>
        </div>
        <div className='one wide column'>
          <Semantic.Button classes='basic icon' onClick={parent.handlePageChange} offset={1}>
            <i className='right chevron icon' />
          </Semantic.Button>
        </div>
        <div className='five wide right aligned middle aligned column' åparent={this}>
          <Semantic.Popup tag='span' parent={this}>
            <i className='red small question icon' />
            <div className='ui popup' ref='popup'>
              <div className='ui list'>
                {_.map(this.help, (v, i) =>
                  <div className='item' key={i}>
                    <i className={`icon ${v.icon}`} />
                    <div className='content'>{v.text}</div>
                  </div>
                )}
              </div>
            </div>
          </Semantic.Popup>
        </div>
      </h1>
    );
  },
});
