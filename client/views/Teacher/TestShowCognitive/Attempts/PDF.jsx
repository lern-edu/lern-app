import React from 'react';
import { FlatButton, Dialog, Toggle, LinearProgress } from 'material-ui';

TeacherTestShowCognitiveToPDF = React.createClass({

  // initial state

  getInitialState() {
    return { index: 0, header: false };
  },

  // Handlers

  handleClose() {
    this.props.parent.setState({ open: false });
  },

  handleHeaderChange(event, header) {
    this.setState({ header });
  },

  handleDownload() {
    const { props: { test, documents }, state: { index, header }, refs: { carousel } } = this;

    if (_.isEqual(index, 2)) {
      let a = document.createElement('a');
      a.setAttribute('href', _.first(documents).url());
      a.setAttribute('target', '_blank');
      a.click();
    } else {
      this.setState({ index: index + 1 });
      PDFMaker.createPDF(test, { header }, (err) => {
        if (err) {
          this.handleClose();
          snack('Problemas ao gerar PDF');
          this.setState({ index: 0 });
        } else
        this.setState({ index: 2 });
      });
    };

  },

  // render

  render() {
    const { props: { open, ready }, state: { index, header } } = this;

    return (
      <Dialog
        title='Exportar para PDF'
        actions={[
          <FlatButton
            label='Cancelar'
            secondary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label={_.isEqual(index, 0) ? 'Gerar' : 'Download'}
            primary={true}
            disabled={_.isEqual(index, 1) || !_.every(ready)}
            onTouchTap={this.handleDownload}
          />,
        ]}
        modal={true}
        open={open}
        onRequestClose={this.handleClose} >
        {_.get([
          <div key={0}>
            <p>Defina o cabeçalho, você pode gerar automáticamente ou deixar um espaço
            em branco para personalizar.</p>
            <Toggle
              onToggle={this.handleHeaderChange}
              toggled={header}
              label='Inserir cabeçalho'
              labelPosition='right' />
          </div>, <div key={1}>
            <LinearProgress />
          </div>, <div key={2}>
            <p>Você já pode fazer download</p>
          </div>,
        ], index)}
      </Dialog>
    );
  },
});
