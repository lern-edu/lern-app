import React from 'react';
import { CircularProgress, Paper } from 'material-ui';
import _sudoku from 'sudoku';

class PublicContentShowSudoku extends React.Component {

  constructor(props) {
    super(props);
    const { sudoku, answer } = props;
    this.state = {
      rate: sudoku ? _sudoku.ratepuzzle(sudoku, 5) : undefined,
      answer: answer ? answer : sudoku,
      original: sudoku ? sudoku : undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sudoku && this.props.sudoku !== nextProps.sudoku) {
      this.setState({
        rate: _sudoku.ratepuzzle(nextProps.sudoku, 10),
        answer: nextProps.answer || nextProps.sudoku,
        original: nextProps.sudoku,
      });
    }
  }

  updateAnswer(value, row, col) {
    const { answer } = this.state;
    console.log(value, row, col);
    answer[row * 9 + col] = value;
    this.setState({
      answer: answer,
    });
    this.props.form.defaultHandler({ 'sudoku.answer': answer }, { doc: true });
    this.props.handleSudokuAnswer && this.props.handleSudokuAnswer(answer);
  }

  // render

  render() {
    const { input=true } = this.props;
    const { rate, answer, original } = this.state;

    return (
      <div>
        <table
          style={{
            border: '1px solid black',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: '16pt',
            textAlign: 'center',
          }}>
          <tbody>
            {_.map(_.chunk(answer, 9), (row, idx) =>
              <tr
                style={{
                  border: '0.8px black solid',
                  borderBottom: idx == 2 || idx == 5 ? '3px black solid' : '1px black solid',
                }}
                key={idx}>
                {_.map(row, (cell, i) =>
                  <td
                    style={{
                      width: 35,
                      height: 35,
                      borderRight: i == 2 || i == 5 ? '3px black solid' : '1px black solid',
                    }}
                    key={`row${idx}-col${i}`}>
                    <input
                      disabled={
                        !(input &&
                        (original[idx * 9 + i] === null ||
                        original[idx * 9 + i] === 0))
                      }
                      onInput={(e) => this.updateAnswer(e.target.value, idx, i)}
                      value={cell || ''}
                      style={{ width: 35, textAlign: 'center' }}
                    />
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
        <p>Dificuldade: {rate}/5.0</p>
      </div>
    );
  }
}

export default PublicContentShowSudoku;
