Astro.createValidator({
  name: 'QuestionAnswer',
  validate(value) {
    const { type, options } = this;
    if (type === 'open') {
      return (
        !_.isNull(value) &&
        _.isString(value) &&
        _.inRange(value.length, 4, 1024)
      );
    } else if (type === 'closed') {
      return (
        !_.isNull(value) &&
        _.isNumber(value) &&
        _.inRange(value, 0, options.length)
      );
    } else return false;
  },
});

Astro.createValidator({
  name: 'QuestionOptions',
  validate(value) {
    const { type } = this;
    if (type === 'unanswered') return true;
    else if (type === 'open') return _.isNull(value);
    else if (type === 'closed') {
      return (
        !_.isNull(value) &&
        _.isArray(value) &&
        value.length > 1
      );
    } else return false;
  },
});
