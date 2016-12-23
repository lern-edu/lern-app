import React from 'react';
import { Tabs, Tab, FontIcon } from 'material-ui';

/** Test Tabs to select views
  * @where {client}
  * @private View only
  * @param {string} [tab] selected tab from url
  */

TeacherTestCreateTabs = React.createClass({
  tabs: {
    info: {
      label: 'Informações',
      icon: 'info_outline',
      valid: 0,
    },
    date: {
      label: 'Data',
      icon: 'date_range',
      valid: 1,
    },
    time: {
      label: 'Tempo',
      icon: 'av_timer',
      valid: 2,
    },
    questions: {
      label: 'Questões',
      icon: 'description',
      valid: 3,
    },
    finish: {
      label: 'Finalizar',
      icon: 'playlist_add_check',
      valid: 4,
    },
  },

  /* Handlers
  */

  handleChange(tab) {
    const { props: { errors, allErrors }, tabs } = this;
    const selected = _.flatten(_.slice(allErrors, 0, _.get(tabs, `${tab}.valid`)));
    if (_.isEmpty(selected) || _.every(_.keys(errors), e => !_.includes(selected, e)))
      FlowRouter.setQueryParams({ tab });
    else {
      snack('Preencha corretamente antes de continuar');
      this.refs.info.click();
    };
  },

  /* Render
  */

  render() {
    const { props: { tab }, tabs } = this;
    return (
      <Tabs value={tab} onChange={this.handleChange}>
        {_.map(tabs, ({ label, icon }, k) =>
          <Tab value={k} label={label} key={k} ref={k}
            icon={<FontIcon className='material-icons'>{icon}</FontIcon>} />
        )}
      </Tabs>
    );
  },
});
