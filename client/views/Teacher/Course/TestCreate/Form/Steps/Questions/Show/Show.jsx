import React from 'react';
import { FlatButton, TextField, Dialog } from 'material-ui';

TeacherTestCreateFormQuestionsShow = React.createClass({

  // Static Data

  styles: {
    item1: { className: 'sixteen wide mobile eight wide tablet eight wide computer column' },
    item2: { className: 'sixteen wide column' },
    grid: { className: 'ui grid' },
  },

  // Initial state

  getInitialState() {
    return { open: false, question: null };
  },

  // render

  render() {
    const { state: { open }, props,
      props: { styles: { subItems }, ready, questions, questionsCount, form,
    }, styles: { item1, grid, item2 }, } = this;

    const pagination = {
      length: questions.length,
      size: 52,
      page: _.parseInt(Session.get('searchPage')),
      total: questionsCount,
    };
    return (
      <div>

        <div {...grid}>
          {ready.questions ?
            _.map(_.chunk(questions, questions.length / 2), (qs, index) =>
            <div {...item1} key={index}>
              <div {...grid}>
                {_.map(qs, q =>
                <div {...item2} key={q._id}>
                  <TeacherTestCreateFormQuestionsShowCard question={q} {...props} parent={this} />
                </div>)}
              </div>
            </div>)
          : <div {...item2}>
              <div className='ui center aligned basic segment'>
                <MUI.CircularProgress />
              </div>
          </div>}
        </div>

        <div {...subItems}>
          <PublicMiscPagination {...pagination} />
        </div>

        <TeacherTestCreateFormQuestionsShowScore open={open} parent={this} form={form} />

      </div>
    );
  },

});
