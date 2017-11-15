import React from 'react';
import { RaisedButton } from 'material-ui';
import sudoku from 'sudoku';

import PublicContentShowSudoku from '../Show/Sudoku.jsx';

class PublicContentCreateSudoku extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    this.state = {
      puzzle: undefined,
    };
  }

  handleSudoku() {
    var puzzle = sudoku.makepuzzle();
    this.setState({
      puzzle: puzzle,
    });
    console.log(this);
    this.props.form.handleSudoku(puzzle);
  }

  // render

  render() {
    const { form } = this.props;
    const { puzzle, rate } = this.state;

    return (
      <div className='ui basic segment'>
        <div className='ui equal width center aligned grid'>

          <div className='row' >

            <div className='column' >
              {
                sudoku ?
                  <PublicContentShowSudoku
                    sudoku={puzzle}
                    input={false}
                  />
                  :
                  undefined
              }
             </div>
           </div>

          <div className='row' >

            <div className='column' >
              <RaisedButton
                onTouchTap={this.handleSudoku.bind(this)}
                label='Gerar Sudoku'
                primary={true}
                fullWidth={true}
              />
             </div>

           </div>

        </div>
      </div>
    );
  }
}

export default PublicContentCreateSudoku;
