Attempts.Schema.extend({
  methods: {
    getGrade() {
      const score = this.get('score');
      const grade = this.get('grade');
      return !_.isNull(score) && score * grade;
    },

    findTest() {
      const id = this.get('test');
      return Fetch.General.tests(id);
    },

    findAnswers(author) {
      const attempt = this.get('_id');
      return Fetch.General.answers({ attempt, author });
    },

    findPageAnswers(index) {
      const test = _.head(Fetch.General.tests(id).fetch());
      const questionsId = _.compact(_.map(_.get(test, `pages.[${index}].content`), 'question'));
      return Fetch.General.answers({ attempt, author, question: questionsId });
    },

    findAuthor(author) {
      return Meteor.users.find(this.get('author'));
    },
  },
});
