import React from 'react';
import { Divider } from 'material-ui';

TeacherTestCreateFormFinishShow = React.createClass({

  // Static data

  styles: {
    questionText: {
      style: { textAlign: 'justify', textJustify: 'inter-word' },
    },
  },

  // render

  render() {
    const { props: { images, index,
      question: { options, answer, text, image, _id },
      styles: { questionText }, }, } = this;
    return (
      <div>
        <div className='row'>
          <h5>Questão {index + 1}</h5>
        </div>

        <br/>

        <div className='row'>
              <div {...questionText} dangerouslySetInnerHTML={{ __html: text }} />
        </div>
        {image ? (<div className='row'>
            <img className='ui centered medium image'
              src={_.find(images, { _id: image }).url()} />
          </div>) : undefined}

        <br/><Divider /><br/>

        {_.isEmpty(options) ? <div className='row'>
              <div {...questionText} dangerouslySetInnerHTML={{ __html: answer }} />
        </div> : _.map(options, (op, index) =>
          <div className='row' key={index}>
            {op.image ? <img className='ui centered medium image'
              src={_.find(images, { _id: op.image }).url()} /> :
              <div {...questionText} dangerouslySetInnerHTML={{ __html: op.text }} />}
          </div>
        )}
      </div>
    );
  },

});
