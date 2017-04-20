import React from 'react';
import { Paper, RaisedButton, FlatButton, FontIcon } from 'material-ui';

TeacherTestCreateFormFinish = React.createClass({

  styles: {
    questionText: {
      style: { textAlign: 'justify', textJustify: 'inter-word' },
    },
  },

  // Lifecycle

  componentWillMount() {
    const { form: { doc: { questions } } } = this.props;
    Session.set('selectedQuestions', questions);
  },

  componentDidMount() {
    $(this.refs.carousel).slick({ dots: false, arrows: true, infinite: false });
  },

  componentWillUnmount() {
    Session.set('selectedQuestions', null);
    $(this.refs.carousel).unslick();
  },

  // Render

  render() {
    const { props: { questions, images, open, styles: { paper, subItems, next },
        form, form: { doc: { questions: qs }, state: { errors } }, }, } = this;
    const selectedQuestions = _.filter(questions, ({ _id }) => _.includes(qs, _id));
    return (
      <Paper {...paper}>

        <div {...subItems}>
          <h5>Tudo pronto, abaixo você pode conferir o teste:</h5>
        </div>

        <Paper {...subItems} zDepth={4}>
          <div {...paper}>
            <div ref='carousel'>
              {_.map(selectedQuestions,  (q, i) =>
                <TeacherTestCreateFormFinishShow
                  key={q._id}
                  question={q}
                  index={i}
                  {...this.props} />
              )}
            </div>
          </div>
        </Paper>

        <div className='ui basic segment'>
          <div {...next}>
            <RaisedButton
              label='Finalizar'
              disabled={!_.isEmpty(errors)}
              primary={true}
              onTouchTap={form.defaultSubmit} />
          </div>
        </div>

      </Paper>
    );
  },
});
