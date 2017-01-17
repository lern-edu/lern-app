Astro.createValidator({
  name: 'QuestionAnswer',
  validate(value) {
    const { type, options, range: { min, max } } = this;
    if (type === 'open') {
      return (
        !_.isNull(value) &&
        _.isString(value) &&
        _.inRange(value.length, 4, 1024)
      );
    } else if (type === 'number') {
      return min <= value && value <= max && min < max;
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
    if (type === 'number') return _.isNull(value);
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

Astro.createValidator({
  name: 'QuestionRange',
  validate(value) {
    const { type, range } = this;
    console.log(this, value);
    return false;
    if (type === 'number')
      return min < max;
    else return true;
  },
});
