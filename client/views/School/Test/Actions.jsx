import React from 'react';
import { RaisedButton, LinearProgress } from 'material-ui';

const SchoolTestActions = React.createClass({

  getInitialState() {
    return { loading: false };
  },

  handleCreatePDF() {
    const { test } = this.props;
    this.setState({ loading: true });
    PDFMaker.createPDF(test, { header: false }, (file) => {
      this.setState({ loading: false });
    });
  },

  handleDownloadPDF() {
    const { documents } = this.props;
    const a = document.createElement('A');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', documents.url());
    a.click();
  },

  render() {
    const { documents } = this.props.test;
    const { loading } = this.state;

    return (
      <div className='ui right aligned basic segment'>
        {loading ? <LinearProgress /> : (
          _.isNull(documents) ?
            <RaisedButton
              label='Gerar PDF'
              disabled={true || !_.isNull(documents)}
              secondary={true}
              onTouchTap={this.handleCreatePDF} /> :
            <RaisedButton
              label='Download PDF'
              disabled={_.isNull(documents)}
              secondary={true}
              onTouchTap={this.handleDownloadPDF} />
        )}
      </div>
    );
  },
});

export default SchoolTestActions;
