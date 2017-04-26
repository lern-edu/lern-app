Posts.Schema.extend({
  methods: {
    findImages() {
      const ids = this.get('images');
      return ids && Fetch.General.images(ids);
    },

    findDocuments() {
      const ids = this.get('documents');
      return ids && Fetch.General.documents(ids);
    },

    findAuthor() {
      const id = this.get('author');
      return id && Fetch.General.users(id);
    },

    findSubjects() {
      const ids = this.get('subjects');
      return ids && Fetch.General.subjects(ids);
    },

    findTags() {
      const ids = this.get('tags');
      return ids && Fetch.General.tags(ids);
    },

    findUsers() {
      const comments = _.map(this.get('comments'), 'author');
      return Fetch.General.users(_.concat(comments, this.get('author')));
    },

    findCourse() {
      const id = this.get('course');
      return Fetch.General.courses(id);
    },
  },
});
