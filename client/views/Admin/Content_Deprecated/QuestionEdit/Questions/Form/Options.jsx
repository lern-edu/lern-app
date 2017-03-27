import React from 'react';
import { Paper, Checkbox } from 'material-ui';

AdminQuestionEditQuestionsFormOptions = React.createClass({

  // Static data

  instructions: {
    image: 'Selecione uma imagem no formato jpg',
    text: 'Pressione enter para salvar a alternativa',
    type: 'Selecione um tipo de alternativa',
  },

  // render
  render() {
    const { answer, options } = this.props.form.doc;
    const { images } = this.props;
    const { instructions } = this;

    return (
      <Paper zDepth={1} style={{ marginTop: '10px' }}>
        <table className='ui definition table' >
          <thead>
            <tr><th>Resposta</th><th>Alternativa</th></tr>
          </thead>
          <tbody>
            {_.map(options, ({ text, image }, index) =>
              <tr key={text || image}>
                <td>
                  <Checkbox checked={_.isEqual(index, answer) ? true : false} disabled={true} />
                </td>
                <td>{text ? text : <img src={_.find(images, { _id: image }).url()} />}</td>
              </tr>)}
          </tbody>
        </table>
      </Paper>
    );
  },
});
