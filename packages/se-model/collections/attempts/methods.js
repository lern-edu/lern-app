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

    findAuthor(author) {
      return Meteor.users.find(this.get('author'));
    },
  },
});
