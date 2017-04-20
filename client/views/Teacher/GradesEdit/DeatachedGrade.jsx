import React from 'react';
import { TextField, Slider } from 'material-ui';

TeacherGradesEditDeatachedGrade = React.createClass({

  // Static data

  instructions: {
    name: 'Defina um nome',
    score: 'Defina um valor entre 1 e 100',
  },

  // Initial state

  getInitialState() {
    return { errors: {} };
  },

  componentDidMount() {
    this.doc = new Grades.DeatachedGradeSchema();
    this.updateValidator();
  },

  // Validators

  updateValidator() {
    this.doc.validate(false);
    this.setState({ errors: this.doc.getValidationErrors() });
    this.props.handleDeatachedGrade(this.doc);
  },

  // Handlers

  handleNameChange({ target }) {
    this.doc.set('name', _.get(target, 'value'));
    this.updateValidator();
  },

  handleValueChange({ target }) {
    this.doc.set('score', _.get(target, 'value'));
    this.updateValidator();
  },

  // Render

  render() {
    const { errors } = this.state;
    const { name, score } = this.instructions;
    return (
      <div className='ui vertical basic segment'
        style={{ padding: '10px' }}>
        <div className='ui grid'>
          <div className='sixteen wide mobile eight wide computer column'>
            <TextField
              hintText='Nome'
              floatingLabelText='Nome'
              errorText={errors.name ? name : undefined}
              onChange={this.handleNameChange} />
          </div>

          <div className='sixteen wide mobile eight wide computer column'>
            <TextField
              hintText='Valor'
              floatingLabelText='Valor'
              errorText={errors.score ? score : undefined}
              onChange={this.handleValueChange} />
          </div>
        </div>
      </div>
    );
  },
});
