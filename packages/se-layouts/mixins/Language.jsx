import i18n from 'meteor/universe:i18n';

const Language = {

  // lifecycle

  getInitialState() {
    i18n.setLocale('pt-BR');
    return { locale: 'pt-BR' };
  },

  onLocale(locale) {
    this.setState({ locale });
  },

  componentWillMount() {
    i18n.onChangeLocale(this.onLocale);
  },

  componentWillUnmount() {
    i18n.offChangeLocale(this.onLocale);
  },

  // set language

  getLanguage() {
    return 'pt-BR';
    // return (
    //     navigator.languages && navigator.languages[0] ||
    //     navigator.language ||
    //     navigator.browserLanguage ||
    //     navigator.userLanguage ||
    //     'pt-BR'
    // );
  },

};

export default Language;
