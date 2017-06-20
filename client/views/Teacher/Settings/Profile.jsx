import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText, SelectField, MenuItem } from 'material-ui';

TeacherSettingsProfile = React.createClass({

  /* Get Context
  */

  contextTypes: {
    user: PropTypes.object,
  },

  // Handlers

  handleChange({ target: { textContent } }, index, school) {
    Meteor.call('UserSchoolSave', { school }, (doc) =>
      snack('Estou na escola ' + textContent));
  },

  render() {
    const { context: { user: { profile: { school } } }, props: { schools } } = this;
    return (
      <Card>
        <CardTitle title='Escola' />
        <CardText>
          <SelectField
            value={school}
            onChange={this.handleChange}
            floatingLabelText='Em qual escola estou?' >
            {
              _.map(schools, ({ _id, profile: { name } }) =>
                <MenuItem key={_id} value={_id} primaryText={name} />
              )
            }
          </SelectField>
        </CardText>
      </Card>
    );
  },
});
