_.forEach(Regex, (v, k) => {
  Astro.createValidator({
    name: k,
    validate(value) {
      return (
        !_.isNull(value) &&
        _.isString(value) &&
        v.test(value)
      );
    },
  });
});
