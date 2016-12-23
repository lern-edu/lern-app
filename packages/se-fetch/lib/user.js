Fetch.User = function (userId) {
  return {
    attempts({ test, last, finished }={}) {
      const selector = { author: userId, test, finished };
      const opts = last ? { sort: { startedAt: 1 }, limit: 1 } : undefined;
      return Fetch.General.attempts(selector, opts);
    },

    answers(opts) {
      const selector = { author: userId, grade: { $ne: null } };
      return Fetch.General.answers(selector, opts);
    },
  };
};
