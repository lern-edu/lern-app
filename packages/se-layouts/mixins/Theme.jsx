import MUI from 'material-ui';

Theme = {
  pallete: {
    primary1Color: '#2196F3',
    primary2Color: '#1976D2',
    primary3Color: '#BBDEFB',
    accent1Color: '#FFC107',
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    const { ThemeManager: tm, LightRawTheme: light } = MUI.Styles;
    const muiTheme = tm.modifyRawThemePalette(tm.getMuiTheme(light), this.pallete);
    return { muiTheme };
  },
};
