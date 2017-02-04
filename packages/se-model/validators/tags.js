Astro.createValidator({
  name: 'Tags',
  validate(values) {
    // TODO tagable can't verify like this bacause will bug automatic tests
    // return true;
    return _.get(this, '_isNew') ? !_.isEmpty(_.get(this, 'tags')) : true;
  },
});
