import React from 'react';
import { RaisedButton, Paper, TextField } from 'material-ui';

const PublicHomeSubscribe = React.createClass({

  // Handlers

  handleChange({ target: { value }, currentTarget }, idorange) {
    const { parent } = this.props;
    parent.setState({
      [currentTarget.getAttribute('data-key')]: value,
      valid: Match.Regex(value).mail(),
    });
  },

  // Styles

  render() {
    const { parent } = this.props;
    return (
      <Paper className='ui equal width center aligned padded grid fluid' >
        <div className='orange row' style={{ paddingBottom: '0px' }}>
          <div className='column' >
            <h2 style={{ textShadow: '0 0 10px rgba(0,0,0,.85)' }} >
              {this.props.text}
            </h2>
          </div>
        </div>
        <div className='orange row' style={{ padding: '0px' }}>
          <div className='column' >
            <div className='ui equal width center aligned padded grid fluid'>
              <div className='row' style={{ padding: 0 }}>
                <div className='column' >
                  <div className='ui right aligned basic segment' >
                    <TextField
                      hintText='Email'
                      data-key='email'
                      floatingLabelText='Email'
                      onInput={this.handleChange} />
                  </div>
                </div>
                <div className='column' >
                  <div className='ui left aligned basic segment' style={{ marginTop: 19 }}>
                    <RaisedButton
                      secondary={true}
                      label='inscrever'
                      onTouchTap={parent.handleSubmit} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    );
  },
});

export default PublicHomeSubscribe;
