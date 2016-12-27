import React from 'react';
import { Paper, SelectField, MenuItem, RaisedButton, Toggle } from 'material-ui';

StudentSettingsStudy = React.createClass({

  /* Handlers
  */

  handlePlanChange(__, __, value) {
    const { planProfile } = this.props.user;
    planProfile.set({
      plan: value,
      focusSubjects: [],
    });
    Meteor.call('StudentPlanProfileSave', planProfile, err => snack(err ? ':(' : 'Atualizado'));
  },

  handleSubjectChange(index, __, __, subjectId) {
    const { planProfile } = this.props.user;
    planProfile.set({
      [`focusSubjects.${index}`]: subjectId,
    });
    Meteor.call('StudentPlanProfileSave', planProfile, err => snack(err ? ':(' : 'Atualizado'));
  },

  handleToggleChange(event, bool) {
    const name = $(event.target).attr('name');
    const { planProfile } = this.props.user;
    planProfile.set({
      [`get${name}`]: bool,
    });
    Meteor.call('StudentPlanProfileSave', planProfile, err => snack(err ? ':(' : 'Atualizado'));
  },

  /* Render
  */

  render() {
    const { subjects, user, plans } = this.props;
    const { planProfile } = user;
    const { focusSubjects=[], plan } = planProfile;

    return (
      <Paper className='ui basic segment' style={{ margin: '0px' }}>
        <div className='ui header'>
          Plano
        </div>
        <SelectField onChange={this.handlePlanChange} hintText='Plano' value={plan}>
          {_.map(plans, plan =>
            <MenuItem
              key={plan._id}
              value={plan._id}
              primaryText={plan.name}
            />
          )}
        </SelectField>
        <div className='ui header'>
          Quero focar meus estudos em:
        </div>
        {_.map(_.range(2), i =>
          <SelectField onChange={_.partial(this.handleSubjectChange, i)} value={focusSubjects[i]} hintText='Matéria' style={{ textAlign: 'left', paddingRight: '1em' }} key={i}>
            {_.map(subjects, s =>
              <MenuItem
                key={s._id}
                value={s._id}
                primaryText={s.name}
              />
            )}
          </SelectField>
        )}
        {false && (
          <div>
            <div className='ui header'>
              Desejo Receber
            </div>
            <Toggle
              label='Diária'
              toggled={!!_.get(user, 'planProfile.getDaily')}
              labelPosition='right'
              onToggle={this.handleToggleChange}
              name='Daily'
            />
            <Toggle
              label='Simulado'
              toggled={!!_.get(user, 'planProfile.getMock')}
              labelPosition='right'
              onToggle={this.handleToggleChange}
              name='Mock'
            />
          </div>
        )}
      </Paper>
    );
  },
});
