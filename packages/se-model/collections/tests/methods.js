Tests.Schema.extend({
  methods: {

    getScore() {
      const scores = this.get('scores');
      if (scores) return _.reduce(scores, _.sum);
      else return undefined;
    },

    findQuestions() {
      const pages = this.get('pages');
      return Fetch.General.questions(_.compact(_.flatMap(pages, (page) =>
        _.flatMap(page.content, (content) =>
          content.type === 'question' ? content.question : undefined
        )
      )));
    },

    findPageQuestions(index) {
      const page = this.get(`pages.[${index}]`);
      return Fetch.General.questions(_.compact(_.map(page.content, 'question')));
    },

    findAttempts(author) {
      const test = this.get('_id');
      return Fetch.General.attempts({ test, author });
    },

    findAnswers(author) {
      const test = this.get('_id');
      const attempts = _.map(Fetch.General.attempts({ test, author }).fetch(), '_id');
      return Answers.find({ attempt: { $in: attempts } });
    },

    findSubjects() {
      const subjectIds = this.get('subjects');
      return Fetch.General.subjects(subjectIds);
    },

    findTags() {
      const tagIds = this.get('tags');
      return Fetch.General.tags(tagIds);
    },

    findValidAttempts(author) {
      const { _id, startDate, endDate } = this;
      return Fetch.General.attempts({
        startedAt: { $gte: startDate },
        finishedAt: { $lte: endDate },
        test: _id,
        author,
      });
    },

    findCourse() {
      const id = this.get('course');
      return Fetch.General.courses(id);
    },

    findDocuments() {
      const id = this.get('documents') || [];
      return Fetch.General.documents(id);
    },
  },
});
