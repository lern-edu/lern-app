Fetch.Public = function () {
  return {
    subjects() {
      return Fetch.General.subjects();
    },

    tags(tagId) {
      const fields = tagId ? undefined : { text: 1, subject: 1 };
      return Fetch.General.tags(tagId, { fields });
    },

    questions({ tags, author }={}, opts) {
      const selector = { author };
      if (tags) selector.tags = { $elemMatch: { $in: tags } };
      return Fetch.General.questions(selector, opts);
    },

    plans() {
      return Fetch.General.plans();
    },
  };
};
