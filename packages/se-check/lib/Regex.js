const patterns = {
  id: /^[a-zA-Z0-9]{17}$/i,
  url: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  cnpj: /^[0-9]{14}$/,
  cpf: /^[0-9]{11}$/,
};

Check.Regex = function (...args) {
  return _.mapValues(patterns, p => () => {
    const valid = _.every(args, a => p.test(a));
    if (!valid) throw new Meteor.Error('regex-police-alarm');
  });
};
