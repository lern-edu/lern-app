Lectures.Schema.extend({
  methods: {
    findCourse() {
      const id = this.get('course');
      return Fetch.General.courses(id);
    },

    findAttendants() {
      const ids = this.get('attendants');
      return Fetch.General.users(ids);
    },
  },
});
