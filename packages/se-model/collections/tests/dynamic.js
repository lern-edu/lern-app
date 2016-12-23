// Wrong yet


Questions.Schema.extend({
  fields: {
    answerCount: {
      type: 'number',
      default: 0,
    },
    hitCount: {
      type: 'number',
      default: 0,
    },
    hitRate: {
      type: 'number',
      default: NaN,
    },
  },
  events: {
    beforeRemove(e) {
      const { _id } = this;
      const attempts = Attempts.find({ test: _id }).fetch();
      _.forEach(attempts, a => a.remove());
    },
  },
});
