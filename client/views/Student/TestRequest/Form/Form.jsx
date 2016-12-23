import React from 'react';
import { TextField, DatePicker, AutoComplete, MenuItem, Slider, RaisedButton, } from 'material-ui';

StudentTestRequestForm = React.createClass({
  mixins: [AstroForm(Tests.RequestSchema, 'StudentTestRequest')],

  // Static data

  instructions: {
    name: 'Defina um nome',
    date: 'Defina uma data',
    subject: 'Defina uma matéria',
  },

  segment: 'ui vertical basic segment',

  // life cycle

  getInitialState() {
    return { wait: false };
  },

  componentDidMount() {
    this.defaultHandler({ size: 1 }, { doc: true });
  },

  /* Handlers
  */

  handleSubmitSuccess({ _id }) {
    console.log(`Test generated: ${_id}`);
    FlowRouter.go('StudentTests');
    snack('Treino gerado', 'green checkmark');
  },

  handleSubmitError({ reason }) {
    if (reason.questions)
      snack('Não encontramos questões suficientes.');
    else snack('Erro inesperado');
    this.handleWaitChange();
  },

  handleSubjectChange(value, index, options) {
    this.defaultHandler({ subject: _.get(options[index], 'value.key') },
      { doc: true });
  },

  handleNameChange({ target }) {
    this.defaultHandler({ name: target.value }, { doc: true });
  },

  handleDateChange(event, date) {
    this.defaultHandler({ date }, { doc: true });
  },

  handleSizeChange(event, size) {
    this.defaultHandler({ size }, { doc: true });
  },

  handleWaitChange() {
    this.setState({ wait: !this.state.wait });
  },

  handleSubmit() {
    this.handleWaitChange();
    this.defaultSubmit();
  },

  formatDate(date) {
    return moment(date).format('DD/MM/YYYY');
  },

  /* Render
  */

  render() {
    const { valid, errors, wait } = this.state;
    const { subjects } = this.props;
    const { size } = this.doc;
    const { instructions, segment } = this;

    return (
      <div className='ui basic segment'>

        <div className={segment}>
          <h2>Criar teste</h2>
        </div>

        <div className={segment}>
          <TextField
            hintText='Nome'
            floatingLabelText='Nome'
            errorText={errors.name ? instructions.name : undefined}
            onChange={this.handleNameChange} />
        </div>

        <div className={segment}>
          <DatePicker
            hintText='Data'
            floatingLabelText='Data'
            errorText={errors.date ? instructions.date : null}
            onChange={this.handleDateChange}
            formatDate={this.formatDate}
            autoOk={true}
            wordings={{ ok: 'OK', cancel: 'Cancelar' }}
            minDate={new Date()}
          />
        </div>

        <div className={segment}>
          <AutoComplete
            floatingLabelText='Matérias'
            errorText={errors.subject ? instructions.subject : null}
            filter={AutoComplete.fuzzyFilter}
            onNewRequest={this.handleSubjectChange}
            searchText=''
            disableFocusRipple={false}
            dataSource={_.map(subjects, t => {
              return {
                text: t.name,
                value: (
                  <MenuItem
                    primaryText={t.name}
                    key={t._id}
                  />
                ),
              };
            })}/>
        </div>

        <div className={segment}>
          <h4>Número de questões</h4>
        </div>

        <div className={segment}>
          <Slider step={1} min={1} max={10}
            onChange={this.handleSizeChange}
            description={size ? `${size} Questões` : null}/>
        </div>

        <div className='ui right aligned basic segment'>
          <RaisedButton
            label='Terminar'
            disabled={!valid || wait}
            primary={true}
            onTouchTap={this.handleSubmit} />
        </div>

      </div>
    );
  },
});
