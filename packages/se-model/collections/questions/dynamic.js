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
    afterInc(e) {
      const { fieldName } = e.data;
      if (fieldName === 'answerCount' || fieldName === 'hitCount') {
        const { answerCount, hitCount } = this;
        this.set('hitRate', hitCount / answerCount);
      }
    },
  },
});
