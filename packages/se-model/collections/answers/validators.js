Astro.createValidator({
  name: 'AnswerAnswer',
  validate(value) {
    const { finished, type } = this;

    if (!finished && _.isNull(value)) return true;
    else if (type === 'open') {
      return (
        _.isString(value) &&
        _.inRange(value.length, 0, 4096)
      );
    } else if (type === 'closed') {
      return (
        _.isNumber(value) &&
        value >= 0
      );
    } else if (type === 'number') {
      return (
        _.isNumber(value) &&
        value >= 0
      );
    } else if (type === 'unanswered') return _.isNumber(value) || _.isString(value);
    else if (type === 'sudoku') {
      return (
        !_.isNull(value) &&
        _.isArray(value) &&
        value.length === 81 &&
        !_.some(value, (v) => v === null || (v <= 0 || v >= 10))
      );
    } else return false;
  },
});
